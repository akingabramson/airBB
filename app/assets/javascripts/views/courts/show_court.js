AB.Views.ShowCourt = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.model.get("current_ballers"), "add", this.render)
		// current ballers?
	},
	template: JST["courts/show"],
	events: {
		"click .check-in-button": "checkIn",
	},

	render: function() {
		console.log("rendering")
		var checkIn = AB.Store.CurrentUser.get("check_ins").findWhere({court_id: this.model.id})
		this.$el.html(this.template({court: this.model, checkIn: checkIn}));
		return this;
	},

	checkIn: function(event) {
		event.target.disabled = true;
		$(event.target).html("Checking In...")

		var showView = this;
		AB.Store.CurrentUser.get("check_ins").create({
			court_id: this.model.id,
			success: function(){
				showView.model.get("current_ballers").push(AB.Store.CurrentUser)
			}
		});
	}
})