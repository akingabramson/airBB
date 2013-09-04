window.AB = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Store: {}
}

AB.initialize = function() {
  AB.Router = new AB.Routers.Main({$content: $(".map-container")});
  Backbone.history.start();
  // AB.startMap();  
}




$(function(){
  AB.initialize();
});

