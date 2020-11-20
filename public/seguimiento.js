
/***********************************************/
/*        GET RESUMEN ENTRENAMIENTOS     **    */
/***********************************************/

let listado = "";
 
seguimiento();

function seguimiento() {
    fetch("/entrenamientos")
    .then(res => res.json())
    .then(datos => {
      console.log(datos)

      for (let i = 0; i < datos.length; i++) {
      
      listado += 
        `<div class="detalle-list-item">
            <div class="tiempo">
                <i class="fas fa-clock"></i>
                <p class="list-item-dato">${datos[i].duracion}</p>
                 <p>Minutos</p>
            </div>
            <div class="kilometros">
                <i class="fas fa-tachometer-alt"></i>
                  <p class="list-item-dato">${datos[i].calorias}</p>
                 <p>Calorias</p>
            </div>
            <div class="pasos">
                <i class="fas fa-shoe-prints"></i>
                  <p class="list-item-dato">${datos[i].pasos}</p>
                  <p>Pasos</p>
            </div>
          </div>
        `
      }
       document.getElementById("detalle-list").innerHTML = listado;
      
    })

}
 
