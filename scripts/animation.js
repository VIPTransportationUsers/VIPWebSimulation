var step = 50; //Meters moved
var tick = 100; //Interval in milliseconds

function updatePoly(d,vehicleIndex){
    // Spawn a new polyline every 20 vertices, because updating a 100-vertex poly is too slow
    if(vehicles[vehicleIndex].poly2.getPath().getLength()>20){
        vehicles[vehicleIndex].poly2 = new google.maps.Polyline([vehicles[vehicleIndex].polyline.getPath().getAt(vehicles[vehicleIndex].lastVertex)]);
    }
    if(vehicles[vehicleIndex].polyline.GetIndexAtDistance(d)<vehicles[vehicleIndex].lastVertex+1){
        if(vehicles[vehicleIndex].poly2.getPath().getLength()>1){
            vehicles[vehicleIndex].poly2.getPath().removeAt(vehicles[vehicleIndex].poly2.getPath().getLength()-1)
        }
        vehicles[vehicleIndex].poly2.getPath().insertAt(vehicles[vehicleIndex].poly2.getPath().getLength(),vehicles[vehicleIndex].polyline.GetPointAtDistance(d));
    } 
    else{
        vehicles[vehicleIndex].poly2.getPath().insertAt(vehicles[vehicleIndex].poly2.getPath().getLength(),vehicles[vehicleIndex].endLocation.latlng);
    }
}
function animate(d,vehicleIndex){
    console.log("moving");
    if(d>vehicles[vehicleIndex].fullDist){
        console.log(vehicleIndex);
        vehicles[vehicleIndex].vehicleMarker.setPosition(vehicles[vehicleIndex].endLocation.latlng);
        vehicles[vehicleIndex].polyline.setMap(null);
        directionsDisplay.setMap(null);
            console.log("Reached relative dest, Temp user :" + vehicles[vehicleIndex].tempIndexUser);
            if(!vehicles[vehicleIndex].userPathArray[vehicles[vehicleIndex].tempIndexUser].reachStart){
                vehicles[vehicleIndex].userPathArray[vehicles[vehicleIndex].tempIndexUser].reachStart = true;
                vehicles[vehicleIndex].userPathArray[vehicles[vehicleIndex].tempIndexUser].startMarker.setMap(null);
            }
                  
            else
                if(!vehicles[vehicleIndex].userPathArray[vehicles[vehicleIndex].tempIndexUser].reachDestination){
                    vehicles[vehicleIndex].userPathArray[vehicles[vehicleIndex].tempIndexUser].reachDestination = true;
                    vehicles[vehicleIndex].userPathArray[vehicles[vehicleIndex].tempIndexUser].destinationMarker.setMap(null);
                }
            if(vehicles[vehicleIndex].userPathArray[vehicles[vehicleIndex].tempIndexUser].reachStart&&vehicles[vehicleIndex].userPathArray[vehicles[vehicleIndex].tempIndexUser].reachDestination){
                vehicles[vehicleIndex].userPathArray.splice(vehicles[vehicleIndex].tempIndexUser,1);
                console.log("clear1");
                console.log(vehicles[vehicleIndex].userPathArray.length);
                if(!vehicles[vehicleIndex].hasUserState&&vehicles[vehicleIndex].userPathArray.length!=0){
                    //vehicles[vehicleIndex].userPathArray[0].startMarker.setMap(map);
                    vehicles[vehicleIndex].userPathArray[0].destinationMarker.setMap(map);
                }
            }
        return calcRoute(vehicleIndex);  
    }
    var p = vehicles[vehicleIndex].polyline.GetPointAtDistance(d);
    vehicles[vehicleIndex].vehicleMarker.setPosition(p);
    updatePoly(d,vehicleIndex);
    vehicles[vehicleIndex].timerHandle = setTimeout("animate("+(d+step)+","+vehicleIndex+")", tick);
}
function startAnimation(vehicleIndex){

    vehicles[vehicleIndex].lastVertex = 0;
    vehicles[vehicleIndex].fullDist = vehicles[vehicleIndex].polyline.Distance();
    vehicles[vehicleIndex].poly2 = new google.maps.Polyline({
        path:[vehicles[vehicleIndex].polyline.getPath().getAt(0)], 
    });
    setTimeout("animate(50,"+vehicleIndex+")",500);// Allow time for the initial map display
}

