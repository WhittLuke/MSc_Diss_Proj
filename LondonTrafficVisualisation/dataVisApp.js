
// Global variables go here!!
var borough = "";
var year = "";
var vehicle = "";
var road_type = "";


// TODO:Create functions for accessing the values associated with the list boxes
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



// TODO: Create one or two functions for reading in the data requested for by the user
// TODO: Will probably need to convert the coordinated into the GIS values.


// TODO: Then we can work on creating the map here
