// Recupero las afirmaciones del JSON
const fetchAfirmaciones = async () => {
    try {
        let resp = await fetch('https://raw.githubusercontent.com/alanabadi92/ProyectoFinalAbadi/main/json/afirmaciones.json');
        afirmaciones = await resp.json();
    } catch (error) {
        console.error('No se pudo cargar las afirmaciones', error);
    }
};

// Recupero las devoluciones del JSON
const fetchDevoluciones = async () => {
    try {
        let resp = await fetch('https://raw.githubusercontent.com/alanabadi92/ProyectoFinalAbadi/main/json/devoluciones.json');
        devoluciones = await resp.json();
    } catch (error) {
        console.error('No se pudo cargar las devoluciones', error);
    }
};

// Guarda datos de usuario en localStorage en lugar de descargar JSON automáticamente
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

// Muestra las afirmaciones mezcladas en el HTML
function mostrarMezclaHtml() {
    const lista = document.getElementById('listaAfirmaciones');
    afirmaciones.forEach(afirmacion => {
        lista.innerHTML += `<li> <input type="checkbox" onchange="cargarVariables(this)" id=${afirmacion.eneatipo} > <label class="afirmaciones">${afirmacion.texto}</label> </li>`;
    });
}

// Carga y valida los checks
function cargarVariables(checkbox) {
    if (checkbox.checked) {
        window["e" + checkbox.id]++;
        respondidas++;
    } else {
        window["e" + checkbox.id]--;
        respondidas--;
    }
}

// Mezcla las afirmaciones y las carga en el HTML
function cargarAfirmacionesYMostrarHtml() {
    fetchAfirmaciones().then(() => {
        shuffleArray(afirmaciones);
        mostrarMezclaHtml();
    });
}

// Procesa las devoluciones en función de las variables "e"
async function devolver() {
    await fetchDevoluciones();
    // Procesa y almacena devoluciones en variables ge1, ge2, ..., ge9
    // Código para asignar las descripciones a cada ge
    // ...
}

// Realiza los cálculos para mostrar resultados
function operar() {
    porcentajeRespondidas = ((respondidas * 100) / (afirmaciones.length));
    media = ((e1 + e2 + e3 + e4 + e5 + e6 + e7 + e8 + e9) / 9);

    const atributos = [e1, e2, e3, e4, e5, e6, e7, e8, e9];
    let sumatoria = 0;

    for (const atributo of atributos) {
        sumatoria += Math.pow(atributo - media, 2);
    }
    devStandard = Math.sqrt(sumatoria / (9 - 1));
}

// Botón cargar archivo
const botonCargar = document.getElementById("cargar");
botonCargar.onclick = () => {
    // Código para cargar archivo JSON con Swal
    pedirArchivo();
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

// Fin del programa
