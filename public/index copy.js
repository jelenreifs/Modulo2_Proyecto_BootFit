

const KEY = 'AIzaSyBCrYbbpL_0EMnuTi1Dg2BK3hFGSsTo28s';


//const URL_Maps = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=Seattle&destinations=San+Francisco&key=${KEY}`;

var p1 = new google.maps.LatLng(45.463688, 9.18814);
var p2 = new google.maps.LatLng(46.0438317, 9.75936230000002); 
/* var p1 = new google.maps.LatLng(ORIGEN)
var p2 = new google.maps.LatLng(DESTINO);
 */
function calcDistance() {
  const ORIGEN = document.getElementById('origen').value;
  const DESTINO = document.getElementById('destino').value;
  const URL_MAPS = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${ORIGEN}&destinations=${DESTINO}&key=${KEY}`; 
  fetch(URL_MAPS)
    .then(res => res.json())
      .then(datos => {
          console.log(datos)
          console.log(ORIGEN, DESTINO);
        
      })
   
}
  
 



        



