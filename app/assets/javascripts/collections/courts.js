AB.Collections.Courts = Backbone.Collection.extend({
	url: "/courts",
  model: AB.Models.Court,
  _removeReference: function(model) {
  	model.positionMarker.setMap(null);
  	google.maps.event.removeListener(model.markerClickID);
  }

});
