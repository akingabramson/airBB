AB.Views.Main = Backbone.View.extend({
  template: JST['maps/index'],
  render: function() {
  	var courtFormView = new AB.Views.NewCourt()
  	this.$el.html(courtFormView.render().$el);
  },

});
