function calcRoute(vehicleIndex){
    console.log("Current position:" + vehicles[vehicleIndex].vehicleMarker.position);
    if(vehicles[vehicleIndex].timerHandle){
        clearTimeout(vehicles[vehicleIndex].timerHandle);
    }  
    vehicles[vehicleIndex].polyline.setMap(null);
    vehicles[vehicleIndex].poly2.setMap(null);
    vehicles[vehicleIndex].polyline = new google.maps.Polyline({
        path:[],
        strokeColor:routeColors[vehicleIndex],
        strokeOpacity:0.5,
        strokeWeight:6,
    });
    vehicles[vehicleIndex].poly2 = new google.maps.Polyline({
        path:[],
    });
    if(vehicles[vehicleIndex].userPathArray.length==0){
        console.log("Finished");
        vehicles[vehicleIndex].hasUserState = false;
        //busy loop stopped
        return
    }

    //Next Stop for vehicle
    var minDist = Number.MAX_SAFE_INTEGER;//distance of min
    var minIndex = 0;//index of min
    var tempDest;                
    var isStartMin = true;//start or destination
    
    console.log("Next, Number of Users:" + vehicles[vehicleIndex].userPathArray.length);
    //******
    console.log(vehicles[vehicleIndex].userPathArray[0].start.lat());
    for(var i=0;i<vehicles[vehicleIndex].userPathArray.length;i++){
        if(!vehicles[vehicleIndex].userPathArray[i].reachStart){
            if(distLinear(vehicles[vehicleIndex].vehicleMarker.position,vehicles[vehicleIndex].userPathArray[i].start)<minDist){
                minDist = distLinear(vehicles[vehicleIndex].vehicleMarker.position,vehicles[vehicleIndex].userPathArray[i].start);
                minIndex = i;
                isStartMin = true;
            }
        }
        else{
            console.log("How?");
            if(distLinear(vehicles[vehicleIndex].vehicleMarker.position,vehicles[vehicleIndex].userPathArray[i].destination)<minDist){
                minDist = distLinear(vehicles[vehicleIndex].vehicleMarker.position,vehicles[vehicleIndex].userPathArray[i].destination);
                minIndex = i;
                isStartMin = false;
            }
        }
    }
    if(isStartMin){
        console.log("User " + minIndex + " is getting picked up:" + !vehicles[vehicleIndex].userPathArray[minIndex].reachStart);
        tempDest = vehicles[vehicleIndex].userPathArray[minIndex].start;
        vehicles[vehicleIndex].tempIndexUser = minIndex;
    }
        
    else{
        console.log("User " + minIndex + " is getting dropped off:" + !vehicles[vehicleIndex].userPathArray[minIndex].reachDestination);
        tempDest = vehicles[vehicleIndex].userPathArray[minIndex].destination;
        vehicles[vehicleIndex].tempIndexUser = minIndex;
    }
    console.log("Start:" + vehicles[vehicleIndex].vehicleMarker.position + " Dest:" + tempDest);
    var request ={
        origin:vehicles[vehicleIndex].vehicleMarker.position,
        destination:tempDest,
        travelMode:google.maps.DirectionsTravelMode.DRIVING,
    }; 
     
    // Route the directions and pass the response to a
    // function to create markers for each step.
    directionsService.route(request, function(response, status){
        if(status == google.maps.DirectionsStatus.OK){
            vehicles[vehicleIndex].startLocation = new Object();
            vehicles[vehicleIndex].endLocation = new Object();
            // For each route, display summary information.
            var path = response.routes[0].overview_path;
            var legs = response.routes[0].legs;
            for(var i=0;i<legs.length;i++){
                if(i==0){ 
                    vehicles[vehicleIndex].startLocation.latlng = legs[i].start_location;
                    vehicles[vehicleIndex].startLocation.address = legs[i].start_address;   
                }
                vehicles[vehicleIndex].endLocation.latlng = legs[i].end_location;
                vehicles[vehicleIndex].endLocation.address = legs[i].end_address;
                var steps = legs[i].steps;
                for(var j=0;j<steps.length;j++){
                    var nextSegment = steps[j].path;
                    for(k=0;k<nextSegment.length;k++){
                        vehicles[vehicleIndex].polyline.getPath().push(nextSegment[k]);
                    }
                }
            }
            vehicles[vehicleIndex].polyline.setMap(map);
            console.log("Animate");
            startAnimation(vehicleIndex);
        }                                                    
    });
}  
function appendUserInput(startLatLng,destLatLng){
    console.log(startLatLng.lat());
    console.log(startLatLng.lng());
    console.log(destLatLng.lat());
    console.log(destLatLng.lng());
    //user object
    aUser = new user(startLatLng,destLatLng);
    console.log("added");
    console.log(startLatLng);
    console.log(destLatLng);
    console.log(aUser.start.lat());
    console.log(aUser.start.lng());
    console.log(aUser.destination.lat());
    console.log(aUser.destination.lng());
    //Needs to schedule *************************
    if(v>=numVehicles)
        v=0;
    //Scheduler needed************** 
    vehicles[v].userPathArray.push(aUser);//////////////////////////////////////////
    calcRoute(v);
    v++;
}
function validateUserInput(){
    geocoder.geocode({'address':startEle.value,componentRestrictions:{country:'US'}}, function(results, status){
        if(status==google.maps.GeocoderStatus.OK&&startEle.value!=""){
            if(bounds.indexOf(results[0].address_components[3].long_name)<0&&bounds.indexOf(results[0].address_components[2].long_name)<0){
                //alert
                console.log("Invalid Starting Location: " + results[0].address_components[3].long_name);
                return;
            }
            startLatLng = results[0].geometry.location;
            geocoder.geocode({'address':destinationEle.value,componentRestrictions:{country:'US'}}, function(results, status){
                if(status==google.maps.GeocoderStatus.OK&&destinationEle.value!=""){
                    if(bounds.indexOf(results[0].address_components[3].long_name)<0&&bounds.indexOf(results[0].address_components[2].long_name)<0){
                        //alert
                        console.log("Invalid Destination Location: " + results[0].address_components[3].long_name);
                        return;
                    }
                    destLatLng = results[0].geometry.location;
                    appendUserInput(startLatLng,destLatLng);
                }
                else{
                    //alert
                    console.log("Invalid Destination Location");
                    return;
                }        
            });
        }
        else{
            //alert
            console.log("Invalid Starting Location");
            return;
        }
    });
    console.log("New User");
}

function distLinear(latlng1,latlng2){
    <!-- if(user1.reachStart) -->
        <!-- latlng1 = user1.destination; -->
    <!-- else -->
        <!-- latlng1 = user1.start; -->
    <!-- if(user2.reachStart) -->
        <!-- latlng2 = user2.destination; -->
    <!-- else -->
        <!-- latlng2 = user2.start; -->
    console.log("distLinear");
    console.log(latlng1.lat());
    console.log(latlng2.lat());
    console.log(latlng1.lng());
    console.log(latlng2.lng());
    return Math.sqrt(Math.pow(latlng1.lat()-latlng2.lat(),2)+Math.pow(latlng1.lng()-latlng2.lng(),2));
}