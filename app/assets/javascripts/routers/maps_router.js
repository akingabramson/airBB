AB.Routers.Main = Backbone.Router.extend({
	routes: {
		"": "main",
		"courts/new": "newCourt",
		"courts/:id": "show",
	},
	initialize: function(options) {
		this.$content = options.$content, this.$newCourtButton = options.$newCourtButton;
	},
	// add link back to main again?
	main: function(){
		this.$newCourtButton.off("click");

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
		var showView = new AB.Views.ShowCourt({el: this.$content.find("#court-show")})
		this._swapView(showView);
		// start the view and stuff
	},

	newCourt: function() {
		this.$newCourtButton.off("click");
		// test whether we need

		if (!this.courtFormView) {
			this.courtFormView = new AB.Views.NewCourt();
			this.$content.prepend(this.courtFormView.render().$el);
			this.courtFormView.setUpAutoComplete();
		}
		this.courtFormView.$el.fadeToggle("fast");
		this.$newCourtButton.on("click", AB.Store.backToMain.bind(AB.Store, this.courtFormView));
		AB.Store.swapButtonText();
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
					router.mainView = new AB.Views.Main({el: router.$content, collection: router.markersCollection});
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

		this.$newCourtButton.on("click", function(){router.navigate("courts/new", {trigger:true})})
	},

	_swapView: function(newView) {
		this.currentView && this.currentView.remove();
		this.currentView = newView;

		this.$content.html(this.currentView.render().$el);

	}
});
