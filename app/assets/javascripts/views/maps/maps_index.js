AB.Views.Main = Backbone.View.extend({
  template: JST['maps/index'],
  render: function() {
  	var renderedMapContent = this.template();
  	this.$el.html(renderedMapContent);
  	var courtFormView = new AB.Views.NewCourt();
  	this.$el.prepend(courtFormView.render().$el);
  	return this;
  },

});
