AB.Routers.Main = Backbone.Router.extend({
	routes: {
		"courts/new": "newCourt",
		"courts/:id": "show",
		"_=_": "main",
		"": "main",
	},
	initialize: function(options) {
		this.$mapContainer = options.$mapContainer, this.$newCourtButton = options.$newCourtButton,
		this.$content = options.$content;
		this.markersCollection = options.markersCollection;
		this.$newCourtButton.on("click", this._flipContent.bind(this));
		this.mapLoaded = false;
		AB.startMap();
		var router = this;
		google.maps.event.addListenerOnce(AB.map, 'bounds_changed', function(){
			router.mapLoaded = true;
		});
	},
	
	main: function(){
		if (!this.mapLoaded) {
			// loading screen?
			google.maps.event.addListenerOnce(AB.map, 'bounds_changed', this.loadMain.bind(this));
		} else {
			this.loadMain();	
		}	
	},

	show: function(id) {
		var router = this;
		court = this.markersCollection.findToFetch(id);
		court.fetch({
			success: function() {
				var showView = new AB.Views.ShowCourt({model:court})
				router._swapView(showView);
			},
			error: function() {
				
			}
		});
		
	},

	newCourt: function() {
		if (!this.courtFormView) {
			this.courtFormView = new AB.Views.NewCourt();
		}
		this._swapView(this.courtFormView);
		this.courtFormView.setUpAutoComplete();
	},

	// called after map loads on main view
	loadMain: function() {
		var router = this;
		if (!this.mainView) {
			var bounds = AB.Store.getBounds();
			var southwest = bounds[0], northeast = bounds[1];
			this.markersCollection = this.markersCollection || new AB.Collections.Courts();		
			this.markersCollection.fetch({
				success: function(){
					router.mainView = new AB.Views.Main({el: router.$mapContainer, collection: router.markersCollection});
				},
				error: function(thing) {
					console.log(thing);
				},
				data: {
					southwest: southwest,
					northeast: northeast
				}
			});
		}
	},


	_flipContent: function(){
		if (this.currentView) {
			this._swapView(false);
			if (!!this.mainView) {this.mainView.updateCollection()};
			this.navigate("", {trigger: true});
		} else {
			this.navigate("courts/new", {trigger:true});
		}
	},

	_swapView: function(newView) {
		// fades in a new view, or fades out old view
		if (newView) {
			this.currentView = newView;
			this.$content.html(this.currentView.render().$el)
			this.$content.fadeToggle("fast");
		} else {
			this.$content.fadeToggle("fast");
			this.currentView.remove();
			this.currentView = false;
		}
		AB.Store.swapButtonText();
	}
});
