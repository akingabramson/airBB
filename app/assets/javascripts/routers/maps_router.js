AB.Routers.Main = Backbone.Router.extend({
	routes: {
		"/": "main",
	},
	main: function(){
		var mainView = new AB.Views.Main();

		this._swapView(mainView);
	},

	_swapView: function(newView) {
		this.currentView && this.currentView.remove();
		this.currentView = newView;
		this.$content.html(mainView.render().$el)
	}
});
