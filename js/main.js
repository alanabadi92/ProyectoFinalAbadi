/*

El programa es un test de personalidad basado en la psicología del Eneagrama.

Hace preguntas que corresponden a distintos tipos de personalidad y devuelve cuántas 
preguntas fueron respondidas de cada tipo de personalidad. Eso configura un perfil de 
personalidad. La funcionalidad del programa se puede escalar hasta dar una 
devolución automática.

*/


// Recupero las afirmaciones del json
const fetchAfirmaciones = async () => {
    try {
        let resp = await fetch('https://raw.githubusercontent.com/alanabadi92/ProyectoFinalAbadi/main/json/afirmaciones.json');
        afirmaciones = await resp.json();
    } catch (error) {
        console.error('No se pudo cargar las afirmaciones', error);
    }
};

// Recupero las devoluciones del jason
const fetchDevoluciones = async () => {
    try {
        let resp = await fetch ('https://raw.githubusercontent.com/alanabadi92/ProyectoFinalAbadi/main/json/devoluciones.json');
        devoluciones = await resp.json();
    } catch (error) {
        console.error('No se pudo cargar las devoluciones', error);
    }
}

// Guardo en un archivo json
async function guardarEnJson(objeto,nom) {
    try {
     let resp = await fetch('https://raw.githubusercontent.com/alanabadi92/ProyectoFinalAbadi/main/json/guardados.json');
     let datos = await resp.json(); 
 
     datos.push(objeto); 

     let datosActualizadosJSON = JSON.stringify(datos, null, 2);
 
     // Crea un Blob con la cadena JSON
     const blob = new Blob([datosActualizadosJSON], { type: 'application/json' });
 
     saveAs(blob, 'Test Eneagrama: '+nom);
 
    } catch (error) {
     console.error('Error al leer el archivo guardados.json:', error);
    }
 }
 


// Mezclo el contenido de un array
function shuffleArray(array) {
    array.sort(() => Math.random() - 0.5);
}



// Muestro la mezcla en el Html
function mostrarMezclaHtml() {
    const lista = document.getElementById('listaAfirmaciones');

    afirmaciones.forEach(afirmacion => {
        lista.innerHTML += `<li> <input type="checkbox" onchange="cargarVariables(this)" id=${afirmacion.eneatipo} > <label class="afirmaciones">${afirmacion.texto}</label> </li>`
    });
}

//Cargo y valido los check
function cargarVariables(checkbox) {

    if (checkbox.checked) {
        window["e"+checkbox.id] ++;
        respondidas ++;
    }else{
        window["e"+checkbox.id] --;
        respondidas --;
    }
 }

//Mezclo las afirmaciones y las cargo en el Html
function cargarAfirmacionesYMostrarHtml() {
    
    fetchAfirmaciones()

        .then(() => {
            shuffleArray(afirmaciones);
            mostrarMezclaHtml();
        })

}



// Cargo las devoluciones a ser guardadas dependiendo de cuanto valgan las variables "e"
async function devolver () {

    await fetchDevoluciones();


    if ((e1-media) >= devStandard) {
        ge1 = ((devoluciones.filter(item => item.e === '1')).find(item => item.id === 'eneatipo').descripcion);
    }    
    if ((e1-media) <= (-devStandard)){
        ge1 = ((devoluciones.filter(item => item.e === '1')).find(item => item.id === 'ausente').descripcion);
    }
    if (((e1-media) >= 0) && ((e1-media) < devStandard)){
        ge1 = ((devoluciones.filter(item => item.e === '1')).find(item => item.id === 'atributo').descripcion);
    }
    if (((e1-media) < 0) && ((e1-media) > (-devStandard))){
        ge1 = ((devoluciones.filter(item => item.e === '1')).find(item => item.id === 'atributono').descripcion);
    }

    
    
    if ((e2-media) >= devStandard) {
        ge2 = ((devoluciones.filter(item => item.e === '2')).find(item => item.id === 'eneatipo').descripcion);
    }
    if ((e2-media) <= (-devStandard)){
        ge2 = ((devoluciones.filter(item => item.e === '2')).find(item => item.id === 'ausente').descripcion);
    }
    if (((e2-media) >= 0) && ((e2-media) < devStandard)){
        ge2 = ((devoluciones.filter(item => item.e === '2')).find(item => item.id === 'atributo').descripcion);
    }
    if (((e2-media) < 0) && ((e2-media) > (-devStandard))){
        ge2 = ((devoluciones.filter(item => item.e === '2')).find(item => item.id === 'atributono').descripcion);
    }

    
    
    if ((e3-media) >= devStandard) {
        ge3 = ((devoluciones.filter(item => item.e === '3')).find(item => item.id === 'eneatipo').descripcion);
    }
    if ((e3-media) <= (-devStandard)){
        ge3 = ((devoluciones.filter(item => item.e === '3')).find(item => item.id === 'ausente').descripcion);
    }
    if (((e3-media) >= 0) && ((e3-media) < devStandard)){
        ge3 = ((devoluciones.filter(item => item.e === '3')).find(item => item.id === 'atributo').descripcion);
    }
    if (((e3-media) < 0) && ((e3-media) > (-devStandard))){
        ge3 = ((devoluciones.filter(item => item.e === '3')).find(item => item.id === 'atributono').descripcion);
    }

    
    
    if ((e4-media) >= devStandard) {
        ge4 = ((devoluciones.filter(item => item.e === '4')).find(item => item.id === 'eneatipo').descripcion);
    }
    if ((e4-media) <= (-devStandard)){
        ge4 = ((devoluciones.filter(item => item.e === '4')).find(item => item.id === 'ausente').descripcion);
    }
    if (((e4-media) >= 0) && ((e4-media) < devStandard)){
        ge4 = ((devoluciones.filter(item => item.e === '4')).find(item => item.id === 'atributo').descripcion);
    }
    if (((e4-media) < 0) && ((e4-media) > (-devStandard))){
        ge4 = ((devoluciones.filter(item => item.e === '4')).find(item => item.id === 'atributono').descripcion);
    }

     
    
    if ((e5-media) >= devStandard) {
        ge5 = ((devoluciones.filter(item => item.e === '5')).find(item => item.id === 'eneatipo').descripcion);
    }
    if ((e5-media) <= (-devStandard)){
        ge5 = ((devoluciones.filter(item => item.e === '5')).find(item => item.id === 'ausente').descripcion);
    }
    if (((e5-media) >= 0) && ((e5-media) < devStandard)){
        ge5 = ((devoluciones.filter(item => item.e === '5')).find(item => item.id === 'atributo').descripcion);
    }
    if (((e5-media) < 0) && ((e5-media) > (-devStandard))){
        ge5 = ((devoluciones.filter(item => item.e === '5')).find(item => item.id === 'atributono').descripcion);
    }

    
    
    if ((e6-media) >= devStandard) {
        ge6 = ((devoluciones.filter(item => item.e === '6')).find(item => item.id === 'eneatipo').descripcion);
    }
    if ((e6-media) <= (-devStandard)){
        ge6 = ((devoluciones.filter(item => item.e === '6')).find(item => item.id === 'ausente').descripcion);
    }
    if (((e6-media) >= 0) && ((e6-media) < devStandard)){
        ge6 = ((devoluciones.filter(item => item.e === '6')).find(item => item.id === 'atributo').descripcion);
    }
    if (((e6-media) < 0) && ((e6-media) > (-devStandard))){
        ge6 = ((devoluciones.filter(item => item.e === '6')).find(item => item.id === 'atributono').descripcion);
    }

    
    
    if ((e7-media) >= devStandard) {
        ge7 = ((devoluciones.filter(item => item.e === '7')).find(item => item.id === 'eneatipo').descripcion);
    }
    if ((e7-media) <= (-devStandard)){
        ge7 = ((devoluciones.filter(item => item.e === '7')).find(item => item.id === 'ausente').descripcion);
    }
    if (((e7-media) >= 0) && ((e7-media) < devStandard)){
        ge7 = ((devoluciones.filter(item => item.e === '7')).find(item => item.id === 'atributo').descripcion);
    }
    if (((e7-media) < 0) && ((e7-media) > (-devStandard))){
        ge7 = ((devoluciones.filter(item => item.e === '7')).find(item => item.id === 'atributono').descripcion);
    }

    
    
    if ((e8-media) >= devStandard) {
        ge8 = ((devoluciones.filter(item => item.e === '8')).find(item => item.id === 'eneatipo').descripcion);
    }
    if ((e8-media) <= (-devStandard)){
        ge8 = ((devoluciones.filter(item => item.e === '8')).find(item => item.id === 'ausente').descripcion);
    }
    if (((e8-media) >= 0) && ((e8-media) < devStandard)){
        ge8 = ((devoluciones.filter(item => item.e === '8')).find(item => item.id === 'atributo').descripcion);
    }
    if (((e8-media) < 0) && ((e8-media) > (-devStandard))){
        ge8 = ((devoluciones.filter(item => item.e === '8')).find(item => item.id === 'atributono').descripcion);
    }

    
    
    if ((e9-media) >= devStandard) {
        ge9 = ((devoluciones.filter(item => item.e === '9')).find(item => item.id === 'eneatipo').descripcion);
    }
    if ((e9-media) <= (-devStandard)){
        ge9 = ((devoluciones.filter(item => item.e === '9')).find(item => item.id === 'ausente').descripcion);
    }
    if (((e9-media) >= 0) && ((e9-media) < devStandard)){
        ge9 = ((devoluciones.filter(item => item.e === '9')).find(item => item.id === 'atributo').descripcion);
    }
    if (((e9-media) < 0) && ((e9-media) > (-devStandard))){
        ge9 = ((devoluciones.filter(item => item.e === '9')).find(item => item.id === 'atributono').descripcion);
    }

}

//Hago las operaciones para mostrar
function operar (){
    
    //calcular porcentaje de afirmaciones respondidas
    porcentajeRespondidas = ((respondidas*100)/(afirmaciones.length));    

    
    //calcular la media
    media = ((e1+e2+e3+e4+e5+e6+e7+e8+e9)/9);


    //Calcular la desviación estandar
    const atributos = [e1,e2,e3,e4,e5,e6,e7,e8,e9];

    let sumatoria = 0;

        for (const atributo of atributos) {
            sumatoria += Math.pow(atributo - media, 2);
        }

    devStandard = Math.sqrt(sumatoria/(9-1));
}

//Pido un archivo json y lo muestro en html
async function pedirArchivo() {
    const { value: file } = await Swal.fire({
      title: 'Seleccione su archivo .json',
      input: 'file',
      confirmButtonColor: 'rgb(24, 88, 173)',
      inputAttributes: {
        'accept': '.json',
        'aria-label': 'Cargar'
      }
    })
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        // Obtengo el contenido del archivo como objeto
        const contenidoJson = JSON.parse(e.target.result);
  
        // Verifica si el contenidoJson es un array y tiene al menos 2 elementos
        if (Array.isArray(contenidoJson) && contenidoJson.length >= 2) {
          // Obtengo el segundo objeto del array (índice 1)
          const objetoDeseado = contenidoJson[1];
  
          // Almaceno el objeto deseado en sessionStorage
          sessionStorage.setItem("recuperacion", JSON.stringify(objetoDeseado));
  
          Swal.fire(
            'Éxito',
            'Tu archivo ha sido cargado',
            'success'
          );
  
          window.open("./html/recuperacion.html", "_blank");
        } else {
          Swal.fire(
            'Error',
            'El archivo JSON no contiene al menos dos objetos',
            'error'
          );
        }
      };
  
      reader.readAsText(file);
    }
  }
  
  
  


    //Se ejecuta la interface

    //Declaro variables a contabilizar
    e1 = 0;
    e2 = 0;
    e3 = 0;
    e4 = 0;
    e5 = 0;
    e6 = 0;
    e7 = 0;
    e8 = 0;
    e9 = 0;

    //Declaro variables de operaciones
    let respondidas = 0;
    let porcentajeRespondidas = 0;
    let media = 0;
    let devStandard = 0;


    // Declaro variables de guardado
    let ge1 = " ";
    let ge2 = " ";
    let ge3 = " ";
    let ge4 = " ";
    let ge5 = " ";
    let ge6 = " ";
    let ge7 = " ";
    let ge8 = " ";
    let ge9 = " ";

    

    let afirmaciones = [];

    let devoluciones = [];

    const botonCargar = document.getElementById("cargar");
    const botonBorrar = document.getElementById("borrar");

    

    botonCargar.onclick = () => {
        
        Swal.fire({
            title: '<h5>Quiere buscar por nombre de usuario o cargar un archivo?</h5>',

            confirmButtonText: 'Buscar',
            confirmButtonColor: 'rgb(24, 88, 173)',
            buttonsStyling: true,

            showDenyButton: true,
            denyButtonText: `Cargar`,
            denyButtonColor: `rgb(24, 88, 173)`

          }).then((result) => {
            
            // Buscar archivo en el local por nombre de usuario
            if (result.isConfirmed) {
              
                Swal.fire({
                    title: 'Indique nombre de usuario',
                    input: 'text',
                    inputAttributes: {
                      autocapitalize: 'off'
                    },
                    showCancelButton: true,
                    cancelButtonText: 'Cancelar',
                    confirmButtonText: 'Buscar',
                    confirmButtonColor: 'rgb(24, 88, 173)',
                    showLoaderOnConfirm: true,
                    preConfirm: usuario => {
                        
                        if (!(localStorage.getItem(usuario))) {
                            Swal.showValidationMessage(
                            `Usuario no encontrado`
                            )
                        }else{
                            const usuarioAMostrar = localStorage.getItem(usuario);
                    
                            sessionStorage.setItem("recuperacion",usuarioAMostrar);
        
                            window.open("./html/recuperacion.html", "_blank");
                        }
                
                    },
        
                    allowOutsideClick: () => !Swal.isLoading()
                })

            } if (result.isDenied) {
               
            pedirArchivo();

            }
    
        })

        
    }
        
    

 

    botonBorrar.onclick = () => {
        
        Swal.fire({
            title: 'Estás seguro?',
            text: "No vas a poder revertir esto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrá todo!'
          }).then((result) => {
            if (result.isConfirmed) {

                localStorage.clear();
                sessionStorage.clear();
                
              Swal.fire(
                'Borrado',
                'Tu archivo ha sido borrado',
                'success'
              )
            }
          })
    }
    
    
    
    cargarAfirmacionesYMostrarHtml();




    //Relaciono el boton enviar con el codigo js
    const botonEnviar = document.getElementById('enviar');
   
    //Al apretar el boton ejecuto las funciones de procesamiento de devolucion
    botonEnviar.onclick = async () => {

        operar();
    
        await devolver();

        let nombre = document.getElementById("inputNombre").value;

        const guardado = {resp: respondidas, nombre: nombre, porcentaje: porcentajeRespondidas, media: media, desv: devStandard, v1: e1, v2: e2, v3: e3, v4: e4, v5: e5, v6: e6, v7: e7, v8: e8, v9: e9, a1: ge1, a2: ge2, a3: ge3, a4: ge4, a5: ge5, a6: ge6, a7: ge7, a8: ge8, a9: ge9}
    
        sessionStorage.setItem("sesion", JSON.stringify(guardado));
        localStorage.setItem(nombre, JSON.stringify(guardado));
        
        guardarEnJson(guardado,nombre);

        window.open("./html/devolucion.html", "_blank");
        
    }


//Fin del programa