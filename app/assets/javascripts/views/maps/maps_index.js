AB.Views.Main = Backbone.View.extend({
  template: JST['maps/index'],
  events: {
    "click #new-court-button": "showNewCourtForm",
  },

  initialize: function() {
    this.dragID = google.maps.event.addListener(AB.map, "drag", this.updateLoop.bind(this));

    var mainView = this;
    google.maps.event.addListener(AB.map, "dragend", function() {
      setTimeout(mainView.updateCollection.bind(mainView), 200);
      clearInterval(mainView.interval);
      mainView.dragID = google.maps.event.addListener(AB.map, "drag", mainView.updateLoop.bind(mainView));
    });
  },

  addNewCourtForm: function() {
  	this.courtFormView = new AB.Views.NewCourt();
  	this.$el.prepend(this.courtFormView.render().$el);
  	return this;
  },

  showNewCourtForm: function() {
    AB.Store.swapButtonText();
  	this.$el.find("#new-court-div").fadeToggle("fast");
    this.courtFormView.setUpAutoComplete();
  },

  updateLoop: function() {
    console.log(this.dragID)
    google.maps.event.removeListener(this.dragID);

    var mainView = this;
    this.interval = setInterval(function(){
      mainView.updateCollection()
      }, 1000);
    
  },

  updateCollection: function() {
    var bounds = AB.Store.getBounds()
    var view = this;
    this.collection.fetch({
      data: {
        southwest: bounds[0],
        northeast: bounds[1]
      },
      reset: true,
      success: function(){
        console.log(view.collection)
      },
      error: function() {
        alert("couldn't update");
      }
      // bind it?
    });
  }
});
