
// Let's try and get access to the elements from the user search

// Global variables
var borough = "";
var year = "";
var vehicle = "";
var road_type = "";


function getBorough(){
    borough = document.getElementById("selBoroughs").value;
    console.log("Borough: " + borough);
}

function getYear(){

    year = document.getElementById("selYear").value;
    console.log("Year: " + year);
}

function getVehicleType(){

    vehicle = document.getElementById("selVehicle").value;
    console.log("Vehicle Type: " + vehicle);
}

function getRoadType(){

    road_type = document.getElementById("selRoad").value;
    console.log("Road Type: " + road_type);
}