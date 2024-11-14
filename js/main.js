// Variables globales para almacenar datos y respuestas
let afirmaciones = [];
let devoluciones = [];
let respondidas = 0;  // Conteo de respuestas seleccionadas
let porcentajeRespondidas = 0;
let media = 0;
let devStandard = 0;

// Variables para cada tipo de respuesta del Eneagrama
let e1 = 0, e2 = 0, e3 = 0, e4 = 0, e5 = 0, e6 = 0, e7 = 0, e8 = 0, e9 = 0;
let ge1 = "", ge2 = "", ge3 = "", ge4 = "", ge5 = "", ge6 = "", ge7 = "", ge8 = "", ge9 = "";

// Recupera afirmaciones desde el JSON
const fetchAfirmaciones = async () => {
    try {
        const resp = await fetch('https://raw.githubusercontent.com/alanabadi92/ProyectoFinalAbadi/main/json/afirmaciones.json');
        afirmaciones = await resp.json();
    } catch (error) {
        console.error('No se pudo cargar las afirmaciones:', error);
    }
};

// Recupera devoluciones desde el JSON
const fetchDevoluciones = async () => {
    try {
        const resp = await fetch('https://raw.githubusercontent.com/alanabadi92/ProyectoFinalAbadi/main/json/devoluciones.json');
        devoluciones = await resp.json();
    } catch (error) {
        console.error('No se pudo cargar las devoluciones:', error);
    }
};

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
            <input type="checkbox" onchange="cargarVariables(this)" data-eneatipo="${afirmacion.eneatipo}"> 
            <label class="afirmaciones">${afirmacion.texto}</label> 
        </li>`;
    });
}

// Función para cargar y validar las selecciones de las afirmaciones
function cargarVariables(checkbox) {
    const eneatipo = checkbox.getAttribute('data-eneatipo');

    // Verifica si la variable correspondiente existe antes de sumar
    if (checkbox.checked) {
        switch (eneatipo) {
            case '1': e1++; break;
            case '2': e2++; break;
            case '3': e3++; break;
            case '4': e4++; break;
            case '5': e5++; break;
            case '6': e6++; break;
            case '7': e7++; break;
            case '8': e8++; break;
            case '9': e9++; break;
        }
        respondidas++;
    } else {
        switch (eneatipo) {
            case '1': e1--; break;
            case '2': e2--; break;
            case '3': e3--; break;
            case '4': e4--; break;
            case '5': e5--; break;
            case '6': e6--; break;
            case '7': e7--; break;
            case '8': e8--; break;
            case '9': e9--; break;
        }
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

    // Lógica para asignar las devoluciones a las variables ge1, ge2, ..., ge9
    ge1 = devolverAtributo(e1, "1");
    ge2 = devolverAtributo(e2, "2");
    ge3 = devolverAtributo(e3, "3");
    ge4 = devolverAtributo(e4, "4");
    ge5 = devolverAtributo(e5, "5");
    ge6 = devolverAtributo(e6, "6");
    ge7 = devolverAtributo(e7, "7");
    ge8 = devolverAtributo(e8, "8");
    ge9 = devolverAtributo(e9, "9");
}

// Función auxiliar para devolver la descripción de un atributo específico
function devolverAtributo(valor, tipo) {
    if ((valor - media) >= devStandard) {
        return devoluciones.find(item => item.e === tipo && item.id === 'eneatipo').descripcion;
    } else if ((valor - media) <= -devStandard) {
        return devoluciones.find(item => item.e === tipo && item.id === 'ausente').descripcion;
    } else if ((valor - media) >= 0 && (valor - media) < devStandard) {
        return devoluciones.find(item => item.e === tipo && item.id === 'atributo').descripcion;
    } else {
        return devoluciones.find(item => item.e === tipo && item.id === 'atributono').descripcion;
    }
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
    localStorage.setItem(nombre, JSON.stringify(guardado));

    // Abre la página de resultados en la misma pestaña
    window.location.href = "./html/devolucion.html";
};
