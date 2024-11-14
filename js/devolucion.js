// Recupera los datos del usuario desde sessionStorage
const usuarioAUtilizar = JSON.parse(sessionStorage.getItem("sesion"));

if (!usuarioAUtilizar) {
    alert('No se encontraron datos de la sesión. Por favor, inicia el test nuevamente.');
    window.location.href = './index.html'; // Redirige al inicio si no hay datos
} else {
    // Declara variables y las carga con los resultados guardados en sessionStorage
    let nombre = usuarioAUtilizar.nombre;
    let e1 = usuarioAUtilizar.v1;
    let e2 = usuarioAUtilizar.v2;
    let e3 = usuarioAUtilizar.v3;
    let e4 = usuarioAUtilizar.v4;
    let e5 = usuarioAUtilizar.v5;
    let e6 = usuarioAUtilizar.v6;
    let e7 = usuarioAUtilizar.v7;
    let e8 = usuarioAUtilizar.v8;
    let e9 = usuarioAUtilizar.v9;
    let respondidas = usuarioAUtilizar.resp;
    let porcentajeRespondidas = usuarioAUtilizar.porcentaje;
    let media = usuarioAUtilizar.media;
    let devStandard = usuarioAUtilizar.desv;
    let ge1 = usuarioAUtilizar.a1;
    let ge2 = usuarioAUtilizar.a2;
    let ge3 = usuarioAUtilizar.a3;
    let ge4 = usuarioAUtilizar.a4;
    let ge5 = usuarioAUtilizar.a5;
    let ge6 = usuarioAUtilizar.a6;
    let ge7 = usuarioAUtilizar.a7;
    let ge8 = usuarioAUtilizar.a8;
    let ge9 = usuarioAUtilizar.a9;

    // Función para mostrar valores en HTML
    function mostrarValores() {
        const resultado = document.getElementById("resultado");

        const presentacion = document.createElement("h3");
        presentacion.textContent = `${nombre}, según tus respuestas, tus resultados son:`;

        const atributos = document.createElement("ul");
        atributos.innerHTML = `
                                <li>Atributo 1: ${e1}</li>
                                <li>Atributo 2: ${e2}</li>
                                <li>Atributo 3: ${e3}</li>
                                <li>Atributo 4: ${e4}</li>
                                <li>Atributo 5: ${e5}</li>
                                <li>Atributo 6: ${e6}</li>
                                <li>Atributo 7: ${e7}</li>
                                <li>Atributo 8: ${e8}</li>
                                <li>Atributo 9: ${e9}</li>
                                `;

        const operaciones = document.createElement("ul");
        operaciones.innerHTML = `
                                <li>Porcentaje de afirmaciones respondidas: %${parseInt(porcentajeRespondidas)}</li>
                                <li>Media: ${media}</li>
                                <li>Desviación estándar: ${devStandard}</li>
                                `;

        resultado.appendChild(presentacion);
        resultado.appendChild(atributos);
        resultado.appendChild(operaciones);
    }

    // Función para mostrar devoluciones en HTML
    function mostrarDevoluciones() {
        const devoluciones = document.getElementById("devoluciones");

        const atributos = document.createElement("ul");
        atributos.innerHTML = `
                                <div class="devolucion">
                                    <li>Atributo 1:</li><li>${ge1}</li>
                                </div>
                                <div class="devolucion">
                                    <li>Atributo 2:</li><li>${ge2}</li>
                                </div>
                                <div class="devolucion">
                                    <li>Atributo 3:</li><li>${ge3}</li>
                                </div>
                                <div class="devolucion">
                                    <li>Atributo 4:</li><li>${ge4}</li>
                                </div>
                                <div class="devolucion">
                                    <li>Atributo 5:</li><li>${ge5}</li>
                                </div>
                                <div class="devolucion">
                                    <li>Atributo 6:</li><li>${ge6}</li>
                                </div>
                                <div class="devolucion">
                                    <li>Atributo 7:</li><li>${ge7}</li>
                                </div>
                                <div class="devolucion">
                                    <li>Atributo 8:</li><li>${ge8}</li>
                                </div>
                                <div class="devolucion">
                                    <li>Atributo 9:</li><li>${ge9}</li>
                                </div>
                            `;

        devoluciones.appendChild(atributos);
    }

    // Arma la gráfica con los datos
    const datos = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
        datasets: [
            {
                data: [e1 - media, e2 - media, e3 - media, e4 - media, e5 - media, e6 - media, e7 - media, e8 - media, e9 - media],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2
            },
            {
                data: [devStandard, devStandard, devStandard, devStandard, devStandard, devStandard, devStandard, devStandard, devStandard],
                pointRadius: 0,
                borderWidth: 3,
                borderColor: 'grey',
                type: 'line'
            },
            {
                data: [-devStandard, -devStandard, -devStandard, -devStandard, -devStandard, -devStandard, -devStandard, -devStandard, -devStandard],
                pointRadius: 0,
                borderWidth: 3,
                borderColor: 'gray',
                type: 'line'
            }
        ]
    };

    const ctx = document.getElementById('grafico').getContext('2d');

    function crearGrafico() {
        return new Chart(ctx, {
            type: 'bar',
            data: datos,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    let miGrafico = crearGrafico();

    // Destruye y recrea el gráfico al redimensionar
    window.addEventListener('resize', () => {
        miGrafico.destroy();
        miGrafico = crearGrafico();
    });

    // Genera el PDF usando html2canvas y jsPDF
    const { jsPDF } = window.jspdf;

    function generarPDF() {
        const elementoHTML = document.getElementById('cuerpo');

        html2canvas(elementoHTML, { scale: 2 })
            .then(function (canvas) {
                const pdf = new jsPDF('p', 'mm', 'a4');
                const imgData = canvas.toDataURL('image/jpeg');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
                pdf.save(`${nombre}.pdf`);
            });
    }

    const botonImprimir = document.getElementById("imprimir");
    botonImprimir.onclick = () => {
        generarPDF();
    };

    // Muestra los valores y devoluciones en la página
    mostrarValores();
    mostrarDevoluciones();
}
