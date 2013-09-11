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

  if (!!window.CURRENT_USER){
    AB.Store.CurrentUser = new AB.Models.CurrentUser(CURRENT_USER, {parse: true});
  } else {
    AB.Store.CurrentUser = new AB.Models.CurrentUser()
  }

  AB.Router = new AB.Routers.Main({$mapContainer: $(".map-container"),
																	 $newCourtButton: $("#new-court-button"),
                                   $content: $("#content"),
                                    markersCollection: courts});

  Backbone.history.start({pushState: true});

  // AB.Router.navigate('/');
  // window.intendedLocation = window.intendedLocation || "";
  // AB.Router.navigate(window.intendedLocation, {trigger: true}); 
}




$(function(){
  AB.initialize();
});

