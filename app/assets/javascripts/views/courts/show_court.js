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
		var checkIn = AB.Store.CurrentUser.get("check_ins").findWhere({court_id: parseInt(this.model.id)});
		debugger;
		this.$el.html(this.template({court: this.model, checkIn: checkIn}));
		return this;
	},

	checkIn: function(event) {
		event.target.disabled = true;
		$(event.target).html("Checking In...")

		var showView = this;

		AB.Store.CurrentUser.get("check_ins").create({court_id: this.model.id},{
			success: function(model, response){
				console.log("great success");
				// have to add date to baller in UTC time, javascript is treating it oddly
				var checked_in_at = new Date(response.get("created_at"));
				checked_in_at.setHours(checked_in_at.getHours() + checked_in_at.getTimezoneOffset()/60);
				AB.Store.CurrentUser.set({"checked_in_at": checked_in_at});
				showView.model.get("current_ballers").push(AB.Store.CurrentUser);
			}
		});
	}
})