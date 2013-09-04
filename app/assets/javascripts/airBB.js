window.AB = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Store: {}
}

AB.initialize = function() {
  AB.Router = new AB.Routers.Main({$mapContainer: $(".map-container"),
																	 $newCourtButton: $("#new-court-button"),
                                   $content: $("#content")});
  Backbone.history.start();
  // AB.startMap();  
}




$(function(){
  AB.initialize();
});

