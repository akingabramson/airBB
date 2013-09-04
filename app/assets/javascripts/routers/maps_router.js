AB.Routers.Main = Backbone.Router.extend({
	routes: {
		"": "main",
		"courts/:id": "show"
	},
	initialize: function(options) {
		this.$content = options.$content;
		// this.main()
	},
	main: function(){
		if (!!AB.map) {
			this.loadMain();
		} else {
			AB.startMap();
		}
	},

	show: function(id) {
		alert("here");
		var that = this;
		console.log(that.markersCollection.get(id));
		// start the view and stuff
	},

	// called after map loads on main view
	loadMain: function() {
		var bounds = AB.Store.getBounds();
		var southwest = bounds[0], northeast = bounds[1];
		this.markersCollection = new AB.Collections.Courts();		
		var router = this;
		this.markersCollection.fetch({
			success: function(){
				AB.Store.mainView = new AB.Views.Main({el: router.$content, collection: router.markersCollection});
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
