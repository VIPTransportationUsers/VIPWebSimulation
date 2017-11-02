var googleMapsKey = "";
var imported = document.createElement('script');
imported.src = 'https://maps.googleapis.com/maps/api/js?key='+googleMapsKey+'&&libraries=places&callback=initMap';

var loc = window.location.pathname;
var dir = loc.substring(0, loc.lastIndexOf('/'));
console.log(dir);
preText = ""
if(dir=="/VIPWebSimulation/server")
    preText = "../"
var imported2 = document.createElement('script');
imported2.src = preText+'scripts/v3_epoly.js';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function load() {
  document.body.appendChild(imported);
  await sleep(1000);
document.body.appendChild(imported2);

}

load();