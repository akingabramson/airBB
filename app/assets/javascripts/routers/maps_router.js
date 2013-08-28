AB.Routers.Main = Backbone.Router.extend({
	routes: {
		"": "main",
	},
	initialize: function(options) {
		this.$content = options.$content
	},
	main: function(){
		AB.startMap();
		var markersCollection = 
		AB.Store.mainView = new AB.Views.Main({el: this.$content});
		AB.Store.mainView.addNewCourtForm()
		this.currentView && this.currentView.remove();
		this.currentView = AB.Store.mainView;
		
	},

	_swapView: function(newView) {
		this.currentView && this.currentView.remove();
		this.currentView = newView;

		this.$content.html(this.currentView.render().$el);

	}
});
