AB.Models.Court = Backbone.Model.extend({
	initialize: function(){
		var image = {
    	url: "/assets/bball_template.png",
	    // This marker is 20 pixels wide by 32 pixels tall.
	    size: new google.maps.Size(26, 26),
	    // The origin for this image is 0,0.
	    origin: new google.maps.Point(0,0),
	    // The anchor for this image is the base of the flagpole at 0,32.
	    anchor: new google.maps.Point(13, 13)
	  };

		this.positionMarker = new google.maps.Marker({
      position: this.position,
      map: AB.map,
      icon: image,
      animation: google.maps.DROP
    });
		var court = this;

    this.markerClickID = google.maps.event.addListener(this.positionMarker, "click", function(){
    	AB.Router.navigate("courts/"+court.id, {trigger: true});
    });

	},
	parse: function(jsonData){
		this.position = new google.maps.LatLng(jsonData.latitude, jsonData.longitude);
		_.each(jsonData.check_ins, function(checkIn){
			var time = new Date(checkIn.created_at).toLocaleTimeString()
			checkIn.created_at = time.slice(0,4) + time.slice(7,10);;
		});
		return jsonData
  },
});
