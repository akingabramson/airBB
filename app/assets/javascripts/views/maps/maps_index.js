AB.Views.Main = Backbone.View.extend({
  template: JST['maps/index'],
  events: {
    "click #new-court-button": "showNewCourtForm",
  },

  initialize: function() {
    google.maps.event.addListener(AB.map, "dragend", this.updateCollection.bind(this));
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

  updateCollection: function() {
    var bounds = AB.Store.getBounds()
    this.collection.fetch({
      data: {
        southwest: bounds[0],
        northeast: bounds[1]
      },
      success: this.collection.reset.bind(this.collection),
      error: function() {
        alert("couldn't update");
      }
      // bind it?
    });
  }
});
