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

  // AB.loadMarkers();

  // google.maps.event.addListener(AB.marker, 'click', function() {
  //   alert("yo");
  //   var infowindow = new google.maps.InfoWindow({
  //     map: AB.map,
  //     position: AB.pos,
  //     content: 'Current ballers:'
  //     });
  //   AB.map.setCenter(AB.marker.getPosition());
  // });
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


AB.loadMarkers = function() {
  console.log("markers loading")
  // var newPos = new google.maps.LatLng(37.7811588, -122.41146719999999);
  // load different image based on size?
  AB.marker = new google.maps.Marker({
    position: AB.pos,
    map: AB.map,
    title: "Hello World!"
  })
}