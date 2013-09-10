window.AB = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Store: {}
}

AB.initialize = function() {
  var courts;
  if (window.bootstrappedCourt) {
    var court = new AB.Models.Court(window.bootstrappedCourt);
    courts = new AB.Collections.Courts([court]);
  } else {
    courts = new AB.Collections.Courts();
  }

  
  AB.Store.CurrentUser = new AB.Models.CurrentUser(CURRENT_USER, {parse: true});

  AB.Router = new AB.Routers.Main({$mapContainer: $(".map-container"),
																	 $newCourtButton: $("#new-court-button"),
                                   $content: $("#content"),
                                    markersCollection: courts});

  Backbone.history.start({silent: true, pushState: true});

  AB.Router.navigate('/');
  window.intendedLocation = window.intendedLocation || "#/";
  AB.Router.navigate(window.intendedLocation, {trigger: true});
  // AB.startMap();  
}




$(function(){
  AB.initialize();
});

