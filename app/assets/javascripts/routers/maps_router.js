AB.Routers.Main = Backbone.Router.extend({
	routes: {
		"": "main",
		"courts/new": "newCourt",
		"courts/:id": "show",
	},
	initialize: function(options) {
		this.$mapContainer = options.$mapContainer, this.$newCourtButton = options.$newCourtButton,
		this.$content = options.$content;
		this.$newCourtButton.on("click", this._flipContent.bind(this));
	},

	_flipContent: function(){
		if (this.currentView) {
			this._swapView(false);
			this.navigate("", {trigger: true});
		} else {
			this.navigate("courts/new", {trigger:true});
		}
	},
	
	main: function(){
		if (!!AB.map) {
			this.loadMain();
		} else {
			AB.startMap();
		}
	},

	show: function(id) {

		console.log(this.markersCollection.get(id));
		var showView = new AB.Views.ShowCourt({model: this.content})
		this._swapView(showView);
		// start the view and stuff
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
			this.markersCollection = new AB.Collections.Courts();		
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
