AB.Models.Court = Backbone.Model.extend({
	initialize: function(json, options){

		if (!options.notAdding) {
			var numOfImages = 7;
			var ballerCount = this.get("baller_count");

			var imageId;
			if (ballerCount > numOfImages ) {
				imageId = numOfImages;
			} else {
				imageId = ballerCount;
			}
			
			var image = {
	    	url: "/assets/bball_templates/" + imageId.toString() + ".png",
		    // This marker is 20 pixels wide by 32 pixels tall.
		    size: new google.maps.Size(26, 26),
		    // The origin for this image is 0,0.
		    origin: new google.maps.Point(0,0),
		    // The anchor for this image is the base of the flagpole at 0,32.
		    anchor: new google.maps.Point(13, 13)
		  };

			this.positionMarker = new google.maps.Marker({
	      position: this.get("position"),
	      map: AB.map,
	      icon: image,
	      animation: google.maps.DROP
	    });

			var court = this;
	    this.markerClickID = google.maps.event.addListener(this.positionMarker, "click", function(){
	    	AB.Router.navigate("courts/"+court.id, {trigger: true});
	    });
		}
	},

	parse: function(jsonData){
		jsonData.position = new google.maps.LatLng(jsonData.latitude, jsonData.longitude);
		jsonData.check_ins = new AB.Collections.CheckIns(jsonData.check_ins, {parse: true});
		return jsonData
  },
});

