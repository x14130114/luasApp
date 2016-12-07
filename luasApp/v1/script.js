var stopLook;
var lat;
var longi;
$(document).ready(function() {
stopLook = prompt('Enter the stop name');
getStopName();
getCoordinates();
});

//view-source:http://luasforecasts.rpa.ie/xml/get.ashx?action=stops&encrypt=false all the stop names

//getting the stop names from the xml
function getStopName(){
	$.ajax({
    type: "GET",
    url: "http://luasforecasts.rpa.ie/xml/get.ashx?action=forecast&stop="+stopLook+"&encrypt=false",
    dataType: "xml",
    success: function(data){	
		//getting the luas stops going towards The Point
		$('#luas').append('<b>Directon The Point:</b><br />');
		$(data).find('direction[name=Inbound]').find('tram').each(function(index){
            var due = $(this).attr('dueMins');
            var dest = $(this).attr('destination');
                $('#luas').append('<li>'+due+' min '+dest+'</li>');
        });
		//getting luas stops going towards Tallaght
		$('#luas').append('<b>Directon Tallaght:</b><br />');
		$(data).find('direction[name=Outbound]').find('tram').each(function(index){
            var due = $(this).attr('dueMins');
            var dest = $(this).attr('destination');
            $('#luas').append('<li>'+due+' min '+dest+'</li>');
        });
			
    }
	});
}


function getCoordinates(){
	$.ajax({
    type: "GET",
    url: "http://luasforecasts.rpa.ie/xml/get.ashx?action=stops&encrypt=false",
    dataType: "xml",
    success: function(data){
			lat = $(data).find('stop[abrev='+stopLook.toUpperCase()+']').attr('lat');
			longi = $(data).find('stop[abrev='+stopLook.toUpperCase()+']').attr('long');
			map();
        }
	});
}
			
			function map() {
                // Basic options for a simple Google Map
                // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
                var mapOptions = {
                    // How zoomed in you want the map to start at (always required)
                    zoom: 17,
                    scrollwheel: false,
                    mapTypeControl: false,
                    streetViewControl: false,
                    // The latitude and longitude to center the map (always required)
                    center: new google.maps.LatLng(lat, longi)

                    // How you would like to style the map. 
                };

                // Get the HTML DOM element that will contain your map 
                // We are using a div with id="map" seen below in the <body>
                var mapElement = document.getElementById('location');

                // Create the Google Map using our element and options defined above
                var map = new google.maps.Map(mapElement, mapOptions);
                
            }

