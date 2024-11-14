// Variables globales
let afirmaciones = [];
let devoluciones = [];
let respondidas = 0;
let porcentajeRespondidas = 0;
let media = 0;
let devStandard = 0;

// Variables para cada tipo de respuesta del Eneagrama
let atributos = { e1: 0, e2: 0, e3: 0, e4: 0, e5: 0, e6: 0, e7: 0, e8: 0, e9: 0 };
let devolucionesAtributos = { a1: "", a2: "", a3: "", a4: "", a5: "", a6: "", a7: "", a8: "", a9: "" };

// Recupera afirmaciones desde el JSON
const fetchAfirmaciones = async () => {
    try {
        const resp = await fetch('https://raw.githubusercontent.com/alanabadi92/ProyectoFinalAbadi/main/json/afirmaciones.json');
        afirmaciones = await resp.json();
        cargarAfirmacionesYMostrarHtml();
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
function cargarAfirmacionesYMostrarHtml() {
    shuffleArray(afirmaciones);
    const lista = document.getElementById('listaAfirmaciones');
    lista.innerHTML = "";

    afirmaciones.forEach(afirmacion => {
        lista.innerHTML += `<li> 
            <input type="checkbox" onchange="cargarVariables(this)" data-eneatipo="e${afirmacion.eneatipo}"> 
            <label class="afirmaciones">${afirmacion.texto}</label> 
        </li>`;
    });
}

// Ajusta los valores de atributos al seleccionar o deseleccionar una afirmación
function cargarVariables(checkbox) {
    const eneatipo = checkbox.getAttribute('data-eneatipo');

    if (checkbox.checked) {
        atributos[eneatipo]++;
        respondidas++;
    } else {
        atributos[eneatipo]--;
        respondidas--;
    }
}

// Procesa las devoluciones en función de los valores obtenidos
async function devolver() {
    await fetchDevoluciones();

    for (let i = 1; i <= 9; i++) {
        const eneatipoKey = `e${i}`;
        const devolucionKey = `a${i}`;
        const valor = atributos[eneatipoKey] - media;

        if (valor >= devStandard) {
            devolucionesAtributos[devolucionKey] = devoluciones.find(item => item.e === String(i) && item.id === 'eneatipo').descripcion;
        } else if (valor <= -devStandard) {
            devolucionesAtributos[devolucionKey] = devoluciones.find(item => item.e === String(i) && item.id === 'ausente').descripcion;
        } else if (valor >= 0 && valor < devStandard) {
            devolucionesAtributos[devolucionKey] = devoluciones.find(item => item.e === String(i) && item.id === 'atributo').descripcion;
        } else {
            devolucionesAtributos[devolucionKey] = devoluciones.find(item => item.e === String(i) && item.id === 'atributono').descripcion;
        }
    }
}

// Realiza los cálculos necesarios para los resultados
function operar() {
    porcentajeRespondidas = ((respondidas * 100) / afirmaciones.length);
    media = Object.values(atributos).reduce((a, b) => a + b, 0) / 9;

    const sumatoria = Object.values(atributos).reduce((acc, valor) => acc + Math.pow(valor - media, 2), 0);
    devStandard = Math.sqrt(sumatoria / 8); // n-1 donde n es 9
}

// Botón enviar que procesa, guarda y redirige a la página de resultados
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
        v1: atributos.e1, v2: atributos.e2, v3: atributos.e3, v4: atributos.e4, v5: atributos.e5,
        v6: atributos.e6, v7: atributos.e7, v8: atributos.e8, v9: atributos.e9,
        ...devolucionesAtributos
    };

    sessionStorage.setItem("sesion", JSON.stringify(guardado));
    localStorage.setItem(nombre, JSON.stringify(guardado));

    window.location.href = "./html/devolucion.html";
};

// Cargar afirmaciones al inicio
fetchAfirmaciones();
