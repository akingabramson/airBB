AB.startMap = function() {
	var mapOptions = {
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  AB.map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  AB.checkGeo();
  // Try HTML5 geolocation
  
}

AB.checkGeo = function() {
	if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      AB.pos = new google.maps.LatLng(position.coords.latitude,
                                      position.coords.longitude);

      AB.map.setCenter(AB.pos);
      AB.Router.loadMain();
    }, function() {
      AB.handleNoGeolocation(true);
      AB.Router.loadMain();
    }); 

  } else {
    // Browser doesn't support Geolocation
    AB.handleNoGeolocation(false);
    AB.Router.loadMain();
  }
}

AB.handleNoGeolocation = function(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: AB.map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  AB.map.setCenter(options.position);
}