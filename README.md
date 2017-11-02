# VIP Share Ride Web Simulation

This project was developed as a part of NYU's [Vertically Integrated Project](http://engineering.nyu.edu/research/student/vip) (VIP) course for [Smart Cities Technologies](https://wp.nyu.edu/jack_bringardner/smart-cities-vip/).  The concept of a Vertically Integrated Project first began at Georgia Tech to unite undergraduate students and faculty members in a team-based research.  In particular, I am a part of the Transportation Users Sub-Team which deals with improving transportation in urban environments.        

## Simulation
 
![Simulation](https://github.com/VIPTransportationUsers/VIPWebSimulation/blob/master/static/simulation.png)

## User Input Web Interface
![User Input](https://github.com/VIPTransportationUsers/VIPWebSimulation/blob/master/static/inputSample.png)

## Currently Implemented

* Google Maps Distance API
* Vehicle Animation Along Route   
* Vehicle Optimal Pathing
* Request Constraint to New York City Region
* Dedicated Busy Loop While Vehicle is Unoccupied
* Multiple Vehicles  
* User Input Web Interface
* Locations Auto Complete Google Locations API

## To Be Employed

* Effective Scheduling (Current Vehicle Capacity, User Waiting Time from Request to Destination, Optimal Pick-up/Drop-off Pathing)
* Overload on Server Due to Multiple Vehicles (Concurrency)
* More Analysis on Priority of Variables Associated with Order of Pick up/Drop off  
* Have the database keep state rather than the webpage

## Authors

* **Robe Zhang** [ThirdRepublic](https://github.com/ThirdRepublic)

## Notes

To test this, you would need to setup Apache and MySQL server as well as obtain a Google Maps API Key. <br />
While updating the files on localhost, use [Hard Reload](https://stackoverflow.com/questions/25723801/file-not-updating-on-localhost) to see changes

## Setup 
1. Install [XAMPP](https://www.apachefriends.org/index.html) 
2. Download the [VIPWebSimulation Directory](https://github.com/VIPTransportationUsers/VIPWebSimulation)
    * Use [Github Desktop](https://desktop.github.com/) or [cmd](https://help.github.com/articles/set-up-git/) 
    * Store the VIPWebSimulation Directory into xampp/htdocs
3. Run XAMPP
    - Start up Apache and MySQL
    - Make sure the Apache Module and MySQL Module is green 
![XAMPP Example](https://github.com/VIPTransportationUsers/VIPWebSimulation/blob/master/static/xamppExample.PNG)
4. Setup Database
    * Type [localhost/phpmyadmin/](http://localhost/phpmyadmin/) into your web browser
    * Click on 'new' on the left panel
![LocalHost Setup](https://github.com/VIPTransportationUsers/VIPWebSimulation/blob/master/static/localhostsetup1.PNG)
    * Create a database named 'vip_user_request'
![LocalHost Setup](https://github.com/VIPTransportationUsers/VIPWebSimulation/blob/master/static/localhostsetup2.PNG)
    * Select Import option
![LocalHost Setup](https://github.com/VIPTransportationUsers/VIPWebSimulation/blob/master/static/localhostsetup3.PNG)
    * Select Choose File and select 'userrequests.sql' located in xampp/htdocs/VIPWebSimulation/server/
    * Click go
5. Obtain a [Google Maps API Key](https://developers.google.com/maps/documentation/javascript/get-api-key) <br />
***Keep your key private to yourself***
6. Set up Google API Key
    * Place your Google Maps Key between the empty double quotes
    ```shell
    var googleMapsKey = "//INSERT_KEY_HERE";
    var imported = document.createElement('script');
    imported.src = 'https://maps.googleapis.com/maps/api/js?key='+googleMapsKey+'&&libraries=places&callback=initMap';
    ```

To launch the simulation, [click here](http://localhost/VIPWebSimulation/Simulation.html)

To make a request, [click here](http://localhost/VIPWebSimulation/server/userInput.html)
