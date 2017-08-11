$(document).ready(function(){


	function map(lat, lng){

		var mapOptions = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var map = new google.maps.Map(document.getElementById('map'), mapOptions);
     


    // var markerOptions = {
    //   position: new google.maps.LatLng(currentLat, currentLong)
    // };
    // var marker = new google.maps.Marker(markerOptions);
    // marker.setMap(map);
	}


$.getJSON('https://ipapi.co/json/', function(response){
      console.log(response);
      currentLat = response.latitude;
      currentLong = response.longitude;
    
      map(currentLat, currentLong);
      
 });





});