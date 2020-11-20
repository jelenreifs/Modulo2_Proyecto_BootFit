
/* GET ACTIVIDADES: Cargar dinámicamente las actividades en los selects  */

let telefono;
/************************************/
/*          NUEVO REGISTRO          */
/************************************/

function nuevoRegistro() {

  const tfno = document.getElementById("tfnoAdd").value;
  const nombre = document.getElementById("nombreAdd").value;
  const apellido = document.getElementById("apellidoAdd").value;
  const password = document.getElementById("passwordAdd").value;
   const objetivo = document.getElementById("objetivo").value;

  const user = {
    tfno,
    nombre,
    apellido,
    objetivo,
    password
  };

  console.log(login)

  fetch("/users/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then(res => res.json)
    .then(data => {
      console.log(data);
    });
}


 
/************************************/
/*            LOGIN                */
/************************************/

function login() {

  const tfno = document.getElementById("telefono").value;
  const password = document.getElementById("password").value;

  const login = {
    tfno,
    password,
  };

  console.log(login)

  fetch("/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(login),
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      telefono = data.usuario[0].tfno
      location.replace("dashboard.html")
      
      
      
    });
}




/**************************************************/
/*        SELECTOR DE ACTIVIDADES DINAMICO       */
/*************************************************/


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
 let arrayPasos = [];

  fetch("/entrenamientos")
    .then(res => res.json())
    .then(datos => {
      console.log(datos)

      for (let i = 0; i < datos.length; i++) {
        arrayPasos.push((datos[i].pasos)) 
      
      }

      var options = {
      series: [{
        name: 'Pasos',
        data: arrayPasos
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
    

        var chart = new ApexCharts(document.getElementById("grafico-pasos"), options);
      chart.render();

       
      
    })
 
        
/************************************/
/*        GET SUEÑO        */
/************************************/
 let dataDormir = "";
let arrayNuevo = [];

  fetch("/dreams")
    .then(res => res.json())
    .then(datos => {
      console.log(datos)

      for (let i = 0; i < datos.length; i++) {
        arrayNuevo.push(datos[i].horasTotal) 
      }
      console.log(arrayNuevo)

      var options = {
      series: [{
        name: 'Sueño',
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
/*        POST ENTRENAMIENTO      */
/************************************/

 function entrenaInit() {
    let actividad = document.getElementById("actividad").value;
    let intensidad = document.getElementById("intensidad").value;
    let duracion = document.getElementById("duracion").value;
 

   const entrenamiento = {
    tfno,
    actividad,
    intensidad,
    duracion 
   };
   
   console.log(entrenamiento)

  fetch("/entrenamientos/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entrenamiento),
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    });
}

 

/************************************/
/*        POST SEGUIMIENTO SUEÑO         */
/************************************/

  function devolverHoras(horaMinutos) {
    return (parseInt(horaMinutos.split(":")[0])) + parseInt(horaMinutos.split(":")[1]);
  }

function dormirInit() {
    let dayStart = document.getElementById("diaInicio").value;
    let dayEnd = document.getElementById("diaFin").value;
    let hourStart = devolverHoras(document.getElementById("horaInicio").value);
    let hourEnd = devolverHoras(document.getElementById("horaFin").value); 
  
   let horasTotal = Math.abs((hourStart - hourEnd))
  console.log(horasTotal)

  const dream = {
    dayStart,
    dayEnd,
    hourStart,
    hourEnd,
    horasTotal
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

 
 



  



        


