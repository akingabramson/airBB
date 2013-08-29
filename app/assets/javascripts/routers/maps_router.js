AB.Routers.Main = Backbone.Router.extend({
	routes: {
		"": "main",
	},
	initialize: function(options) {
		this.$content = options.$content
	},
	main: function(){
		if (!!AB.map) {
			loadMain();
		} else {
			AB.startMap();
		}
	},

	// called after map loads on main view
	loadMain: function() {
		var bounds = AB.Store.getBounds();
		var southwest = bounds[0], northeast = bounds[1];
		var markersCollection = new AB.Collections.Courts();
		
		var router = this;
		markersCollection.fetch({
			success: function(){
				AB.Store.mainView = new AB.Views.Main({el: router.$content, collection: markersCollection});
				AB.Store.mainView.addNewCourtForm()
				router.currentView && router.currentView.remove();
				router.currentView = AB.Store.mainView;
			},
			error: function(thing) {
				console.log(thing);
			},
			data: {
				southwest: southwest,
				northeast: northeast
			}
		})
	},

	_swapView: function(newView) {
		this.currentView && this.currentView.remove();
		this.currentView = newView;

		this.$content.html(this.currentView.render().$el);

	}
});
