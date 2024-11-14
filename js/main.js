// Variables globales
let afirmaciones = [];
let devoluciones = [];
let respondidas = 0;  // Variable para contar el total de respuestas seleccionadas
let porcentajeRespondidas = 0;
let media = 0;
let devStandard = 0;
let e1 = 0, e2 = 0, e3 = 0, e4 = 0, e5 = 0, e6 = 0, e7 = 0, e8 = 0, e9 = 0;
let ge1 = "", ge2 = "", ge3 = "", ge4 = "", ge5 = "", ge6 = "", ge7 = "", ge8 = "", ge9 = "";

// Función para recuperar afirmaciones desde el JSON
const fetchAfirmaciones = async () => {
    try {
        const resp = await fetch('https://raw.githubusercontent.com/alanabadi92/ProyectoFinalAbadi/main/json/afirmaciones.json');
        afirmaciones = await resp.json();
    } catch (error) {
        console.error('No se pudo cargar las afirmaciones:', error);
    }
};

// Función para recuperar devoluciones desde el JSON
const fetchDevoluciones = async () => {
    try {
        const resp = await fetch('https://raw.githubusercontent.com/alanabadi92/ProyectoFinalAbadi/main/json/devoluciones.json');
        devoluciones = await resp.json();
    } catch (error) {
        console.error('No se pudo cargar las devoluciones:', error);
    }
};

// Función para guardar datos de usuario en localStorage
function guardarEnLocalStorage(objeto, nombre) {
    try {
        localStorage.setItem(nombre, JSON.stringify(objeto));
        console.log(`Datos guardados para ${nombre}`);
    } catch (error) {
        console.error('Error al guardar en localStorage:', error);
    }
}

// Mezcla el contenido de un array
function shuffleArray(array) {
    array.sort(() => Math.random() - 0.5);
}

// Muestra las afirmaciones en el HTML
function mostrarMezclaHtml() {
    const lista = document.getElementById('listaAfirmaciones');
    lista.innerHTML = "";  // Limpia el contenido previo

    afirmaciones.forEach(afirmacion => {
        lista.innerHTML += `<li> 
            <input type="checkbox" onchange="cargarVariables(this)" id="eneatipo_${afirmacion.eneatipo}" data-eneatipo="${afirmacion.eneatipo}"> 
            <label class="afirmaciones">${afirmacion.texto}</label> 
        </li>`;
    });
}

// Función para cargar y validar las selecciones de las afirmaciones
function cargarVariables(checkbox) {
    const eneatipo = checkbox.getAttribute('data-eneatipo');
    
    if (checkbox.checked) {
        window["e" + eneatipo]++;
        respondidas++;
    } else {
        window["e" + eneatipo]--;
        respondidas--;
    }
}

// Mezcla las afirmaciones y las muestra en el HTML
function cargarAfirmacionesYMostrarHtml() {
    fetchAfirmaciones().then(() => {
        shuffleArray(afirmaciones);
        mostrarMezclaHtml();
    });
}

// Procesa las devoluciones
async function devolver() {
    await fetchDevoluciones();

    if ((e1 - media) >= devStandard) {
        ge1 = devoluciones.find(item => item.e === '1' && item.id === 'eneatipo').descripcion;
    } else if ((e1 - media) <= -devStandard) {
        ge1 = devoluciones.find(item => item.e === '1' && item.id === 'ausente').descripcion;
    } else if ((e1 - media) >= 0 && (e1 - media) < devStandard) {
        ge1 = devoluciones.find(item => item.e === '1' && item.id === 'atributo').descripcion;
    } else {
        ge1 = devoluciones.find(item => item.e === '1' && item.id === 'atributono').descripcion;
    }
    // Repite la misma lógica para ge2, ge3, ..., ge9 con sus correspondientes valores de e2, e3, etc.
}

// Realiza los cálculos necesarios para los resultados
function operar() {
    porcentajeRespondidas = ((respondidas * 100) / afirmaciones.length);
    media = ((e1 + e2 + e3 + e4 + e5 + e6 + e7 + e8 + e9) / 9);

    const atributos = [e1, e2, e3, e4, e5, e6, e7, e8, e9];
    let sumatoria = 0;

    for (const atributo of atributos) {
        sumatoria += Math.pow(atributo - media, 2);
    }
    devStandard = Math.sqrt(sumatoria / (9 - 1));
}

// Botón para cargar archivo JSON desde Swal
const botonCargar = document.getElementById("cargar");
botonCargar.onclick = () => {
    pedirArchivo(); // Esta función debería estar definida para usar Swal y cargar un archivo JSON
};

// Botón para borrar datos
const botonBorrar = document.getElementById("borrar");
botonBorrar.onclick = () => {
    Swal.fire({
        title: 'Estás seguro?',
        text: "No vas a poder revertir esto",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borra todo!'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear();
            sessionStorage.clear();
            Swal.fire('Borrado', 'Tus datos han sido borrados', 'success');
        }
    });
};

// Cargar afirmaciones en el HTML
cargarAfirmacionesYMostrarHtml();

// Relaciono el botón enviar con el código js
const botonEnviar = document.getElementById('enviar');
botonEnviar.onclick = async () => {
    operar();
    await devolver();

    let nombre = document.getElementById("inputNombre").value;

    const guardado = {
        resp: respondidas,
        nombre: nombre,
        porcentaje: porcentajeRespondidas,
        media: media,
        desv: devStandard,
        v1: e1, v2: e2, v3: e3, v4: e4, v5: e5, v6: e6, v7: e7, v8: e8, v9: e9,
        a1: ge1, a2: ge2, a3: ge3, a4: ge4, a5: ge5, a6: ge6, a7: ge7, a8: ge8, a9: ge9
    };

    sessionStorage.setItem("sesion", JSON.stringify(guardado));
    guardarEnLocalStorage(guardado, nombre);

    // Abre la página de resultados en la misma pestaña
    window.location.href = "./html/devolucion.html";
};
