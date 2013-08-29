AB.Models.Court = Backbone.Model.extend({
	initialize: function(){
		this.positionMarker = new google.maps.Marker({
      position: this.position,
      map: AB.map,
      animation: google.maps.DROP
    });
	},
	parse: function(jsonData){
		this.position = new google.maps.LatLng(jsonData.latitude, jsonData.longitude);
		return jsonData
  },
});
