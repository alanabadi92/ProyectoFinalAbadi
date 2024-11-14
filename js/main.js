// Variables globales
let afirmaciones = [];
let devoluciones = [];
let respondidas = 0;
let atributos = { e1: 0, e2: 0, e3: 0, e4: 0, e5: 0, e6: 0, e7: 0, e8: 0, e9: 0 };
let devolucionesAtributos = { ge1: "", ge2: "", ge3: "", ge4: "", ge5: "", ge6: "", ge7: "", ge8: "", ge9: "" };

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

// Calcula media y desviación estándar
function calcularEstadisticas() {
    const valores = Object.values(atributos);
    const media = valores.reduce((acc, val) => acc + val, 0) / valores.length;
    const sumatoria = valores.reduce((acc, val) => acc + Math.pow(val - media, 2), 0);
    const devStandard = Math.sqrt(sumatoria / (valores.length - 1));
    return { media, devStandard };
}

// Procesa las devoluciones en función de los valores obtenidos
function procesarDevoluciones(media, devStandard) {
    for (let i = 1; i <= 9; i++) {
        const eneatipoKey = `e${i}`;
        const devolucionKey = `ge${i}`;
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

// Función para guardar y redirigir con los datos correctos
async function guardarYRedirigir() {
    const nombre = document.getElementById("inputNombre").value;
    const { media, devStandard } = calcularEstadisticas();

    await fetchDevoluciones();
    procesarDevoluciones(media, devStandard);

    const guardado = {
        nombre: nombre,
        respondidas,
        porcentaje: ((respondidas * 100) / afirmaciones.length).toFixed(2),
        media,
        devStandard,
        ...atributos,
        ...devolucionesAtributos
    };

    sessionStorage.setItem("sesion", JSON.stringify(guardado));
    window.location.href = "./html/devolucion.html";
}

// Evento de botón enviar
document.getElementById('enviar').onclick = guardarYRedirigir;

// Cargar afirmaciones al inicio
fetchAfirmaciones();
