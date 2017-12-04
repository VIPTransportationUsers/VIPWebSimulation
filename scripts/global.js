//Global for all vehicles
var map;
var directionsService;
var deployStationLoc = "NYU Tandon";
var geocoder;
var numVehicles = 1;

var v = 0;//////////////////////////////////////////

//Array of vehicles
var vehicles = new Array(numVehicles);

//infoWindowList
var infoWindowMarkerList = new Array();

function vehicle(){
    //variables for each vehicle object
    this.polyline = null;//full path, x Used for animation
    this.poly2 = null;//small steps within path, dx/dt Used for animation
    this.infowindow = null;//marks the vehicle 
    this.timerHandle = null;//animating time
    this.vehicleMarker = null;//vehicle icon 
    this.tempIndexUser;//current user index
    this.hasUserState = false;
    //stores User objects that holds start/destination
    this.userPathArray = [];
    
    this.startLocation;
    this.endLocation;
   
    this.fullDist;
    this.lastVertex;
}

//Vehicle Bounds
//restricted to these boroughs/counties 
var bounds = ["Brooklyn","New York","Queens","Bronx","Staten Island"]; 

//Vehicle Route Colors
var routeColors = ["#0077c3","#643db1","#991111","#272d25","#7e7450"];

function user(startLatLng,destLatLng){
    this.start = startLatLng;
    this.reachStart = false;
    this.startMarker = createMarker(startLatLng,startEle.value,true,"startMarker.png");
    this.destination = destLatLng;
    this.reachDestination = false;
    this.destinationMarker = createMarker(destLatLng,destinationEle.value,false,"destMarker.png");
}