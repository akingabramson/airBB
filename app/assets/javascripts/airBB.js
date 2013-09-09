window.AB = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Store: {}
}

AB.initialize = function() {
  var courts = new AB.Collections.Courts();
  AB.Store.CurrentUser = new AB.Models.CurrentUser(CURRENT_USER, {parse: true});

  AB.Router = new AB.Routers.Main({$mapContainer: $(".map-container"),
																	 $newCourtButton: $("#new-court-button"),
                                   $content: $("#content"),
                                    markersCollection: courts});
  Backbone.history.start();
  // AB.startMap();  
}




$(function(){
  AB.initialize();
});

