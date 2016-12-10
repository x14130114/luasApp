//init variables
var stopAbrev;
var lat;
var longi;
var station;
$(document).ready(function() {
$('#luas').hide();//this hides luas div on startup
stations();
});

function stations(){
	$.ajax({
    type: "GET",
    url: "http://luasforecasts.rpa.ie/xml/get.ashx?action=stops&encrypt=false",
    dataType: "xml",
    success: function(a){	
		//getting the luas stops of red line
		$(a).find("line[name='Luas Red Line']").find('stop').each(function(){
            var abrev = $(this).attr('abrev');
            var name = $(this).attr('pronunciation');
            $('select[id=stationsred]').append('<option value="'+abrev+'">'+name+'</option>');
        });
		//getting luas stops of green line
		$(a).find("line[name='Luas Green Line']").find('stop').each(function(){
            var abrev = $(this).attr('abrev');
            var name = $(this).attr('pronunciation');
            $('select[id=stationsgreen]').append('<option value="'+abrev+'">'+name+'</option>');
        });	
        }
	});
}

function clickRed (){
	stopAbrev = $('select[id=stationsred]').val();
	$('#luas').show();
	showResult();
	gps();
}

function clickGreen(){
	stopAbrev = $('select[id=stationsgreen]').val();
	$('#luas').show();
	showResult();
	gps();
}

function showResult(){
	$.ajax({
    type: "GET",
    url: "http://luasforecasts.rpa.ie/xml/get.ashx?action=forecast&stop="+stopAbrev+"&encrypt=false",
    dataType: "xml",
    success: function(a){	
		//getting the luas stops going towards The Point
		$('#station').empty();
        station = $(a).find('stopInfo').attr('stop');
        $('#station').append('<h1><span class="glyphicon glyphicon-transfer"></span>  '+station+'</h1>');
        $('#inbound').empty();
		$('#outbound').empty();
        
        
		$(a).find('direction[name=Inbound]').find('tram').each(function(index){
            var due = $(this).attr('dueMins');
			var time = 'min';
			if(due == 'DUE' || due == ''){
				time = '';
			}
            var dest = $(this).attr('destination');
            $('#inbound').append('<tr><td>'+dest+'</td><td>'+due+' '+time+'</td></tr>');
        });
		//getting luas stops going towards Tallaght
		$(a).find('direction[name=Outbound]').find('tram').each(function(index){
            var due = $(this).attr('dueMins');
			var time = 'min'; //variable time sets by default to 'min'
			if(due == 'DUE'){
				time = '';//if due time is DUE it sets to empty to avoid DUE min output
			}
            var dest = $(this).attr('destination');
            $('#outbound').append('<tr><td>'+dest+'</td><td>'+due+' '+time+'</td></tr>');
        });
			
    }
	});
	setTimeout(showResult, 5000);
}

function gps(){
	$.ajax({
    type: "GET",
    url: "http://luasforecasts.rpa.ie/xml/get.ashx?action=stops&encrypt=false",
    dataType: "xml",
    success: function(a){
			lat = $(a).find('stop[abrev='+stopAbrev+']').attr('lat');
			longi = $(a).find('stop[abrev='+stopAbrev+']').attr('long');
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
                    // The latitude and longitude to center the map (always required)
                    center: new google.maps.LatLng(lat, longi)
                };

                // Get the HTML DOM element that will contain your map 
                var mapElement = document.getElementById('location');

                // Create the Google Map using our element and options defined above
                var map = new google.maps.Map(mapElement, mapOptions);
                
            }