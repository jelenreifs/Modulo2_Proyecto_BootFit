
/* GET ACTIVIDADES: Cargar dinámicamente las actividades en los selects  */

let actividad = document.getElementById("actividad")
let actividadSelected = actividad.options[actividad.selectedIndex].value;

let optionsActividad = "";
  
fetch("/activities")
  .then(res => res.json())
  .then(datos => {

    for (let i = 0; i < datos.length; i++) {
     optionsActividad += `<option value="${datos[i].actividad}">${datos[i].actividad}</option>`
    }
    document.getElementById("actividad").innerHTML = optionsActividad;
  })


/************************************/
/*        GET ENTRENAMIENTO         */
/************************************/

let itemsEntrenamiento = "";
 
fetch("/entrenamientos")
    .then(res => res.json())
    .then(datos => {
      for (let i = 0; i < datos.length; i++) {
        itemsEntrenamiento =
          ` <li>${ Math.round(datos[i].pasos)} Pasos</li>
            <li>${datos[i].duracion} Activo</li>
            <li>${ Math.round(datos[i].calorias)} Calorias</li>
            <li>${datos[i].distancia} Km</li> `
      }
      document.getElementById("listaEntrenamiento").innerHTML = itemsEntrenamiento;

    /* GRAFICO RESUMEN */
      let options = {
        series: [70],
      chart: {
        height: 230,
        foreColor: '#ffffff',
        fontFamily: '"Ubuntu", Arial, sans-serif',
        fontSize: '30px',
        size: 100,
        type: 'radialBar',
        },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        }
      },
      
    },
    labels: ['Activo'],
    };

    let chart = new ApexCharts(document.getElementById("grafico-entrenamiento"), options);
  chart.render();
    })


    
/************************************/
/*        GET PASOS         */
/************************************/
let dataPasos = "";

  fetch("/entrenamientos")
    .then(res => res.json())
    .then(datos => {
      console.log(datos)

      for (let i = 0; i < datos.length; i++) {
        dataPasos += `${datos[i].pasos}, `
      
      }

      var options = {
      series: [{
        name: 'Pasos',
        data: [7.5, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
        //data: [ ]
      }],
      chart: {
        height: 240,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        }
      },
        };
      

      let arrayPasos = options.series[0].data;
      arrayPasos.push(dataPasos) 


        var chart = new ApexCharts(document.getElementById("grafico-pasos"), options);
      chart.render();
      
       
      
    })

        
/************************************/
/*        GET SUEÑO        */
/************************************/
let dataDormir = "";
let arrayNuevo = [];
//let arrayDormir = options.series[0].data;

  fetch("/dreams")
    .then(res => res.json())
    .then(datos => {
      console.log(datos)

      for (let i = 0; i < datos.length; i++) {
        dataDormir += `${datos[i].horasTotal}, `
        arrayNuevo.push(dataDormir) 
      }

      var options = {
      series: [{
        name: 'Sueño',
        //data: [7.5, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
        data: arrayNuevo,
      }],
      chart: {
        height: 240,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        }
      },
        };
      
      var chart = new ApexCharts(document.getElementById("grafico-dormir"), options);
      chart.render();  
    })



/************************************/
/*        POST ENTRENAMIENTO         */
/************************************/

/* POST ENTRENAMIENTO: Iniciar un entrenmiento  */
function entrenaInit() {

  const activity = document.getElementById("actividad").value;
  const intensity = document.getElementById("intensidad").value;
  const duration = document.getElementById("duracion").value;


  const entrenamiento = {
    activity,
    intensidad,
    duration
  };


  fetch("/entrenamientos/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entrenamiento),
  })
    .then(res => res.json)
    .then(data => {
      console.log(data);
    });
}



/************************************/
/*        POST SEGUIMIENTO SUEÑO         */
/************************************/

function dormirInit() {
  let diaInicio = document.getElementById("diaInicio").value;
  let diaFin = document.getElementById("diaFin").value;
  let horaInicio = document.getElementById("horaInicio").value;
  let horaFin = document.getElementById("horaFin").value;


  const dream = {
    diaInicio,
    diaFin,
    horaInicio,
    horaFin
  };


  fetch("/dreams/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dream),
  })
    .then(res => res.json)
    .then(data => {
      console.log(data);
    });
}


/***********************************************/
/*        GET RESUMEN ENTRENAMIENTOS     **    */
/***********************************************/

 let listado = "";

function seguimiento() {
    fetch("/seguimiento")
    .then(res => res.json())
    .then(datos => {
      console.log(datos)

      for (let i = 0; i < datos.length; i++) {
      
      listado += 
        `<div class="detalle-list-item">
            <div id="tiempo">
                <i class="far fa-image"></i>
                <p>${datos.duracion} Minutos</p>
            </div>
            <div id="kilometros">
                <i class="far fa-image"></i>
                <p>${datos.calorias} Caloriaa</p>
            </div>
            <div id="pasos">
                <i class="far fa-image"></i>
                 <p>${datos.paos} Pasos</p>
            </div>
          </div>
        `
      }
       document.getElementById("detalle-list").innerHTML = listado;
      
    })

}
 


  
 



  



        


