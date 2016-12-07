
$(document).ready(function() {
stations();
$('#luas').hide();
});
//list of stations
function stations(){
	$.ajax({
    type: "GET",
    url: "http://luasforecasts.rpa.ie/xml/get.ashx?action=stops&encrypt=false",
    dataType: "xml",
    success: function(data){	
		//getting the luas stops of red line
		$(data).find("line[name='Luas Red Line']").find('stop').each(function(index){
            var abrev = $(this).attr('abrev');
            var name = $(this).attr('pronunciation');
            $('datalist[id=stationsred]').append('<option value="'+name+' - '+abrev+'">');
        });
		//getting luas stops of green line
		$(data).find("line[name='Luas Green Line']").find('stop').each(function(index){
            var abrev = $(this).attr('abrev');
            var name = $(this).attr('pronunciation');
            $('datalist[id=stationsgreen]').append('<option value="'+name+' - '+abrev+'">');
        });
			
    }
	});
}






