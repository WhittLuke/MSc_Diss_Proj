
// Global variables go here!!
var borough = "";
var year = "";
// var vehicle = "";
var road_type = "";
// var file_path = "/Users/lukewhittaker/Desktop/MSc_Data_Science_Project_Data/London_Traffic_Data/Cleaned_Data/MSc_Diss_Proj/LondonTrafficVisualisation/data/";

// TODO: Add the Leaflet map to the web page
// Try and add the map to the web page
var map = L.map( 'map', {
    center: [51.505, -0.09],
    minZoom: 2,
    zoom: 9
});


// L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: ['a','b','c']
}).addTo( map );


// TODO: Create functions for accessing the values associated with the list boxes
function getUserRequestedData()
{

    borough = document.getElementById("selBoroughs").value;
    year = document.getElementById("selYear").value;
    // vehicle = document.getElementById("selVehicle").value;
    road_type = document.getElementById("selRoad").value;


    if (borough == "Sutton" && year == "2014" && road_type == "Major_Roads" || borough == "City_of_London" && road_type == "Minor_Roads" || borough == "Southwark" && road_type == "Minor_Roads")
    {
        switch(borough)
        {
            case "Sutton":
                alert("Unfortunately we do not have any data for Sutton in 2014 for Major Roads.");
                break;

            case "City_of_London":
                alert("Unfortunately we do not have any data for City of London for Minor Roads.");
                break;

            case "Southwark":
                alert("Unfortunately we do not have any data for Southwark for Minor Roads.");
                break;
        
        } // End of switch block

        
    } // End of if block
 
    else
    {
        // Try this code when we can finally access the data
        // map.removeLayer(londonData);

        // L.marker([51.58907823999999906, -0.20425690499999999]).addTo(map)
        //     .bindPopup("Popup within the getUserRequestedData()");

        // L.marker([51.505, -0.09]).addTo(map)
        //     .bindPopup('Second marker at this point')
            // .openPopup();

        // var londonData = L.geoCsv(null, {
        //     onEachFeature: function(feature, layer)
        //     {
        //         // Instantiate the a string to be used as the popup message to the user
        //         var popup = "";
        //         for (var feat in feature.properties)
        //         {
        //             var title = londonData.getPropertyTitle(feat);
        //             popup += "<b>" + title + "<b><br />" + feature.properties[feat] + "<br /><br />";
        //             console.log("Hello World");
        //         }
        //         layer.bindPopup(popup);
        //     },

        //     // This part should place all of the data at the lat long points
        //     pointToLayer: function(feature, latlng)
        //     {
        //         return L.marker(latlng, {
        //             icon: L.icon({
        //                 iconurl: "test_marker.png",
        //                 shadowurl: "marker_shadow.png",
        //                 iconSize: [50,70],
        //                 shadowSize: [41,41],
        //                 showdowAnchor: [13,20]
        //             })
        //         });
        //     },
        //     firstLineTitles: true
        // });


        var dataPathString = "data/" + road_type + "/" + borough + "Year" + year + ".json";
        console.log(dataPathString); 

        $.ajax({
            type: 'GET',
            url: dataPathString,
            dataType: 'json',

            error: function(e)
            {
                console.log(e);
                alert("Unfortunately, the data can not be found or there is a problem accessing the requested data.")
            },
            success: function(jsonData)
            {
                // Try and use the MarkerCluster to bind all the points to their own cluster
                //console.log(csv);
                

                //console.log(csv);

                // Maybe try and call a function that will be passed the csv data
                displayData(jsonData);





          //       var londonData = L.geoCsv(null, 
          //       {

		        //     firstLineTitles: true,
		        //     fieldSeparator: ",",

		        //     onEachFeature: function(feature, layer)
		        //     {
		        //         // Instantiate the a string to be used as the popup message to the user
		        //         var popup = "";
		        //         for (var feat in feature.properties)
		        //         {
		        //             var title = londonData.getPropertyTitle(feat);
		        //             popup += "<b>" + title + "<b><br />" + feature.properties[feat] + "<br /><br />";
		        //             console.log("Hello World");
		        //         }
		        //         layer.bindPopup(popup);
		            
		        //     }, // End of onEachFeature

		        //     // This part should place all of the data at the lat long points
		        //     pointToLayer: function(feature, latlng)
		        //     {
		        //         return L.marker(latlng, 
		        //         {
		        //             icon: L.icon({
		        //                 iconurl: "test_marker.png",
		        //                 shadowurl: "marker_shadow.png",
		        //                 iconSize: [50,70],
		        //                 shadowSize: [41,41],
		        //                 showdowAnchor: [13,20]
		        //             })

		        //         }); // End of return marker
		            
		        //     }, // End of PointToLayer

		        // }); // End of geoCsv function


		        // var markerClusters = new L.MarkerClusterGroup();
          //       londonData.addData(csv);
          //       markerClusters.addLayer(londonData);

          //       // Then we can try and add the layer with all the data on to the map
          //       map.addLayer(markerClusters);
          //       map.fitBounds(markerClusters.getBounds());

            } // End of success

        }); // End of AJAX call

        function displayData(data)
        {
        	// Simply write all of the data to the console
        	console.log("Data passed through to the displayData function");
        	console.log(data);


        	for (var i = 0; i < data.length; i++)
        	{
        		L.marker([data[i].lat, data[i].lng])
        			.bindPopup("<p><b>Boro: </b>" + data[i].borough + "</p>"
        				+ "<p><b>Bicycles: </b>" + data[i].PC + "</p>"
        				+ "<p><b>Motor bikes: </b>" + data[i].MV + "</p>"
        				+ "<p><b>Cars: </b>" + data[i].CAR + "</p>"
        				+ "<p><b>Buses: </b>" + data[i].BUS + "</p>"
        				+ "<p><b>LGVs: </b>" + data[i].LGV + "</p>"
        				+ "<p><b>HGVs: </b>" + data[i].HGV + "</p>"
        				+ "<p><b>Road: </b>" + data[i].Road + "</p>"
        				+ "<p><b>Road Category: </b>" + data[i].RCat + "</p>"
        				+ "<p><b>Direction: </b>" + data[i].iDir + "</p>"
        				+ "<p><b>Year: </b>" + data[i].Year + "</p>"
        				+ "<p><b>Day:  </b>" + data[i].dCount + "</p>"
        				
        				)
        			.addTo(map);
        	
        	} // End of for loop
        
        } // End of displayData function


    } // End of else block
   
} // End of getUserRequestedData function








