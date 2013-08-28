AB.Views.Main = Backbone.View.extend({
  template: JST['maps/index'],
  initialize: function() {
    this.listenToMap();
  },

  events: {
  	"click #new-court-button": "showNewCourtForm",
  },

  addNewCourtForm: function() {
    // var renderedMapContent = this.template();
  	// this.$el.html(renderedMapContent);
  	this.courtFormView = new AB.Views.NewCourt();
  	this.$el.prepend(this.courtFormView.render().$el);
  	return this;
  },

  showNewCourtForm: function() {
    AB.Store.swapButtonText();
  	$("#new-court-div").fadeToggle("fast");
    this.courtFormView.setUpAutoComplete();
  },

  listenToMap: function() {
    google.maps.event.addListener(AB.map, "dragend", function(){
      
    })
  }
});
