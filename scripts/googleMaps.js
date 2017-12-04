//User start and destination locations
//if(isStart==true) start
//if(isStart==false) destination
function createMarker(latlng,label,isStart,img){
    if(isStart){
        var image ={
            url:"static/"+img,                
            anchor:new google.maps.Point(15, 17.5),// The offset of the image to center on point
        };
    }
    else{
        var image ={
            url:"static/"+img,                              
            anchor:new google.maps.Point(15, 17.5),// The offset of the image to center on point
        };
    }
    var infoWindowContent = new google.maps.InfoWindow({
        content: '<b>'+label+'</b>',
    });
    var userMarker = new google.maps.Marker({
        map:map,
        position:latlng,
        icon:image,
        zIndex:3,
        infowindow:infoWindowContent,
    }); 
    if(isStart)
        userMarker.setAnimation(google.maps.Animation.BOUNCE);
    userMarker.myname = label;
    infoWindowMarkerList.push(userMarker);
    google.maps.event.addListener(userMarker,'click',function(){ 
        hideAllInfo();
        if(this.infowindow.getContent().indexOf("<br/>")>=0)
            this.infowindow.setContent(this.infowindow.getContent().substring(0,this.infowindow.getContent().indexOf("<br/>")));
        this.infowindow.open(map,this);
    });
    return userMarker;
}

function initMap(){
    //sendMess();
   
    infowindow = new google.maps.InfoWindow({});
    directionsService = new google.maps.DirectionsService();
    map = new google.maps.Map(document.getElementById('mapEle'),{
        zoom:14,
        streetViewControl:false,
        mapTypeControl:false,  
        maxZoom:19,
        minZoom:2,
    });
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address':'New York'}, function(results, status){
        map.setCenter(results[0].geometry.location);
    });
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
    //creates a marker on the map with given latlng, label and optional text
    //marker denote the vehicle            
    function createVehicleMarker(latlng,label){
        var image ={
            url:"static/NYU.png",                
            anchor:new google.maps.Point(15, 17.5),// The offset of the image to center on point
        };
        var infoWindowContent = new google.maps.InfoWindow({
            content: '<b>'+label+'</b>',
        });
        var vehicleMarker = new google.maps.Marker({
            map:map,
            position:latlng,
            icon:image,
            zIndex:10,
            infowindow:infoWindowContent,
        });
        vehicleMarker.myname = label;
        infoWindowMarkerList.push(vehicleMarker);
        google.maps.event.addListener(vehicleMarker,'click',function(){
            hideAllInfo();
            if(this.infowindow.getContent().indexOf("<br/>")>=0)
                this.infowindow.setContent(this.infowindow.getContent().substring(0,this.infowindow.getContent().indexOf("<br/>")));
            this.infowindow.open(map,this);
        });
        return vehicleMarker;
    }
    geocoder.geocode({'address':deployStationLoc},function(results, status){
        deployStationLocLatLng = results[0].geometry.location;
        var infoWindowContent = new google.maps.InfoWindow({
            content: '<b>Deploy Station</b>',
        });
        deployStationMarker = new google.maps.Marker({
            map:map,
            icon:"static/googleMarkerBus.png",
            position:deployStationLocLatLng,
            animation:google.maps.Animation.DROP,
            opacity:0.6,
            infowindow:infoWindowContent,
        });
        infoWindowMarkerList.push(deployStationMarker);
        google.maps.event.addListener(deployStationMarker,'click',function(){ 
            hideAllInfo();
            if(this.infowindow.getContent().indexOf("<br/>")>=0)
                this.infowindow.setContent(this.infowindow.getContent().substring(0,this.infowindow.getContent().indexOf("<br/>")));
            this.infowindow.open(map,this);
        });
        for(var i=0;i<vehicles.length;i++){
            vehicles[i] = new vehicle();
            vehicles[i].vehicleMarker = createVehicleMarker(deployStationLocLatLng,"Vehicle "+i);
            vehicles[i].polyline = new google.maps.Polyline({
                path:[],
            });
            vehicles[i].poly2 = new google.maps.Polyline({
                path:[],
            });
            
            <!-- vehicles[i].vehicleMarker.hasUserState = true; -->
            <!-- appendUserInput(vehicles[i].vehicleMarker.position,new google.maps.LatLng(40.69430554518469,-73.98714780807495)); -->
            
        }
        loadUserRequest();
    });
    new google.maps.places.Autocomplete(startEle);
    new google.maps.places.Autocomplete(destinationEle);
}


//AJAX Request****************************************************************************                    
function loadUserRequest(){
    var request = new XMLHttpRequest();
    request.onreadystatechange=function(){
        if (this.readyState == 4 && this.status == 200){
            if(this.responseText.indexOf("&&")<0){
                console.log("Nothing");
                return setTimeout(function(){loadUserRequest()},4000);
            }
            console.log("Start");
            console.log(this.responseText);
            var userCoords = this.responseText.split("&&");
            start = userCoords[0].split(",");
            dest = userCoords[1].split(",");
            
            var startLatLng = new google.maps.LatLng(parseFloat(start[0]),parseFloat(start[1]));
            var destLatLng = new google.maps.LatLng(parseFloat(dest[0]),parseFloat(dest[1]));
            appendUserInput(startLatLng,destLatLng);
            console.log("Past");
            setTimeout(function(){loadUserRequest()},4000);
        }
    };
    url = "server/getUserRequest.php";
    request.open("POST", url, true);
    request.send();
}
//AJAX Request****************************************************************************                   
    
//key listeners
isInfoVisible = false;
window.onkeydown = function(e){
    var code = e.which || e.keyCode;
    if(code == 32 ){ //space
        //
        console.log(code + " clicked");
        console.log(infoWindowMarkerList);
        //
        if(isInfoVisible){
            for(var i = 0; i < infoWindowMarkerList.length;i++){
                infoWindowMarkerList[i].infowindow.close(map,infoWindowMarkerList[i]);
            }
            isInfoVisible = false;
        }
        else{
            for(var i = 0; i < infoWindowMarkerList.length;i++){
                //append content
                //infoWindowMarkerList[i].infowindow.setContent(infoWindowMarkerList[i].infowindow.getContent()+"<br/>"+i);
                infoWindowMarkerList[i].infowindow.open(map,infoWindowMarkerList[i]);
            }
            isInfoVisible = true;
        }
            
    }   
}
function hideAllInfo() {
    for(var i = 0; i < infoWindowMarkerList.length;i++){
        infoWindowMarkerList[i].infowindow.close(map,infoWindowMarkerList[i]);
    }
}