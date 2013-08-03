AB.Routers.Main = Backbone.Router.extend({
	routes: {
		"": "main",
	},
	initialize: function(options) {
		this.$content = options.$content
	},
	main: function(){
		var mainView = new AB.Views.Main();

		this._swapView(mainView);
	},

	_swapView: function(newView) {
		this.currentView && this.currentView.remove();
		this.currentView = newView;

		this.$content.html(this.currentView.render().$el);

	}
});
