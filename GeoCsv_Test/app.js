
// First we will need to load the Leaflet map on to the webpage
var map = L.map('map', {center: [51.505, -0.09],
  minZoom: 2,
  zoom: 11
  });

// L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
// 	maxZoom: 18
// }).addTo(map);

L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: ['a', 'b', 'c']
}).addTo( map )


// Create a placeholder that will be used to access and display the data
var londonData = L.geoCsv(null, {
	onEachFeature: function(feature, layer){
		// Instantiate a string that will be used to print the contents from the CSV file
		var popup = '';
		for (var feat in feature.properties){
			var title = londonData.getPropertyTitle(feat);
			popup += '<b>' + title + '<b><br />' + feature.properties[feat] + '<br /><br />';
		}
		layer.bindPopup(popup); // This prints the popup string to the map
	},
	// This part places the marker at the position of the lat lng values
	pointToLayer: function(feature, latlng){
		return L.marker(latlng, {
			icon: L.icon({
				iconUrl: "test_marker.png",
				shadowUrl: "marker-shadow.png",
				iconSize: [25,41],
				shadowSize: [41,41],
				shadowAnchor: [13,20]
			})
		});
	},
	firstLineTitles: true
});


// Now, we can try and load the data from the Year2010 CSV file using AJAX. Fingers crossed this works
$.ajax({
	type: 'GET',
	dataType: 'text',
	url: 'Year2010_geoCsv.csv',
	error: function(e){
		console.log(e);
		alert('No data available');
	},
	// This should add the data from the CSV file to the map tile
	success: function(csv){
		londonData.addData(csv);
	 	map.addLayer(londonData)
	 }
});



// Tutorial to help with the code

// var mapa = L.map('mapa', {attributionControl:false}).setView([40.46, -3.75], 5);

// L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
// 	maxZoom: 18
// }).addTo(mapa);

// var bankias = L.geoCsv(null, {
// 	onEachFeature: function (feature, layer) {
// 		var popup = '';
// 		for (var clave in feature.properties) {
// 			var title = bankias.getPropertyTitle(clave);
// 			popup += '<b>'+title+'</b><br />'+feature.properties[clave]+'<br /><br />';
// 		}
// 		layer.bindPopup(popup);
// 	},
// 	pointToLayer: function (feature, latlng) {
// 		return L.marker(latlng, {
// 			icon:L.icon({
// 				iconUrl: 'marcador-bankia.png',
// 				shadowUrl: 'marker-shadow.png',
// 				iconSize: [25,41],
// 				shadowSize:   [41, 41],
// 				shadowAnchor: [13, 20]
// 			})
// 		});
// 	},
// 	firstLineTitles: true
// });

// $.ajax ({
// 	type:'GET',
// 	dataType:'text',
// 	url:'bankias.csv',
//    error: function() {
//      alert('No se pudieron cargar los datos');
//    },
// 	success: function(csv) {
//       var cluster = new L.MarkerClusterGroup();
// 		bankias.addData(csv);
// 		cluster.addLayer(bankias);
// 		mapa.addLayer(cluster);
// 		mapa.fitBounds(cluster.getBounds());
// 	},
//    complete: function() {
//       $('#cargando').delay(500).fadeOut('slow');
//    }
// });