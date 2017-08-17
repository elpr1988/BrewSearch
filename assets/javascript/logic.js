$(document).ready(function() {
    var markers = [];
    var id = [];
    var map;

    locationList();



    function locationList() {

        location = localStorage.location;
        if (typeof location == 'undefined' && location == null) {
            initMap();
        }




        var location = localStorage.location;

        var queryURL = "https://beermapping.com/webservice/loccity/3bbcd085dbe77ae9690c3252ab266741/" + location + "&s=json";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {


            var nlat = localStorage.lat;
            var nlng = localStorage.lng;
            var location = localStorage.location;


            var mapOptions = {
                center: new google.maps.LatLng(nlat, nlng),
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map = new google.maps.Map(document.getElementById('map'), mapOptions);





            for (var i = 0; i < response.length; i++) {
                id.push(response[i].id);

                setTimeout(function(brewery) {
	                var url = "https://beermapping.com/webservice/locmap/3bbcd085dbe77ae9690c3252ab266741/" + brewery.id + "&s=json";

                    $.ajax({
                        url: url,
                        method: "GET"
                    }).done(function(brewery, locmap) {
                        var lat = parseFloat(locmap[0].lat);
                        var lng = parseFloat(locmap[0].lng);
                        var locations = {
                            lat: lat,
                            lng: lng
                        };
                        console.log(locations);
                        
                        // (function(index) {
	                    var marker = new google.maps.Marker({
	                        position: locations,
	                        map: map,
	                        title: brewery.name,
	                        animation: google.maps.Animation
	                    });
	                    var content  = '<div id="content">'+
				          '<div id="siteNotice">'+
				          '</div>'+
				          '<h1 id="firstHeading" class="firstHeading">'+ brewery.name +'</h1>'+
				          '<div id="bodyContent">'+
				          '<div class="address">' + brewery.street + '<br>' +
				          brewery.city + ', ' + brewery.state + ' ' + brewery.zip + '<br>' +
				          brewery.country + '<br>' + brewery.phone + '<br>' + brewery.status +
				          '</div>'+ '</div>';  
				        var mapURL = "https://beermapping.com/webservice/locmap/3bbcd085dbe77ae9690c3252ab266741/" + brewery.id + "&s=json";
					    
					    var infoWindow = new google.maps.InfoWindow();
	                    marker.addListener("click", function() {
	                        // do something with this marker ...
	                        infoWindow.setContent(content);
	                        infoWindow.open(map, marker);
	                    });
                        // })(i);

                    }.bind(null, brewery));
                }.bind(null, response[i]), 1 + 100 * i);
            }

        });

    }

    $("#citySubmit").on("click", function() {

        event.preventDefault();


        var NewLocation = $("#entry").val();
        localStorage.setItem('location', NewLocation);
        alert("entry:" + NewLocation);
        var geoURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + NewLocation + "&key=AIzaSyC6f7J7XFQFcZRQhG5Ep9egZ3_uBMhlwXM"
        alert("location for geoURL:" + NewLocation);


        $.ajax({
            url: geoURL,
            method: "GET"
        }).done(function(geoResponse) {


            var lat = geoResponse.results[0].geometry.location.lat;
            var lng = geoResponse.results[0].geometry.location.lng;
            alert(lat + ", " + lng + ", " + location);
            // locationList(NewLocation);
            localStorage.setItem("lat", geoResponse.results[0].geometry.location.lat);
            localStorage.setItem("lng", geoResponse.results[0].geometry.location.lng);
            locationList();
        });
    });




    function initMap() {
        $.getJSON('https://ipapi.co/json/', function(response) {
            console.log(response);
            currentLat = response.latitude;
            currentLong = response.longitude;
            localStorage.setItem("lat", currentLat);
            localStorage.setItem("lng", currentLong);
            console.log(currentLat + ", " + currentLong);
            var currentLocation = response.city + "," + response.region_code;
            localStorage.setItem('location', currentLocation);

            locationList();
        });
    }

});