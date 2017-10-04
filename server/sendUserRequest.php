<?php
    $startLatLng = $_POST["startLatLng"];
    $destLatLng = $_POST["destLatLng"];
    // $startLatLng = "40.75057315544191,-73.99352073669434";
    // $destLatLng = "40.75057315544191,-73.99352073669434";

    $conn = new PDO("mysql:host=localhost;dbname=vip_user_request", "root", "");
    $statement = $conn->prepare("INSERT INTO UserRequests VALUES ('$startLatLng','$destLatLng')");
    $statement->execute();
    echo "Request Sucessfully Sent";
?>
