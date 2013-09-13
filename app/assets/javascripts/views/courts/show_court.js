AB.Views.ShowCourt = Backbone.View.extend({
	initialize: function(){
		this.$el.attr("id", "court-show")
		this.currentCheckIn = this.model.get("check_ins")._findCheckInByBallerId(AB.Store.CurrentUser.id)
		this.on("checkInChange", this.render);
		// bind?
	},

	template: JST["courts/show"],
	events: {
		"click .check-in-button": "checkIn",
		"click .check-out-button": "checkOut"
	},

	render: function() {
		console.log("rendering");
		this.$el.html(this.template({court: this.model, checkIn: this.currentCheckIn}));
		return this;
	},

	checkIn: function(event) {
		event.target.disabled = true;
		$(event.target).html("Checking In...")

		var showView = this;

		this.currentCheckIn = this.model.get("check_ins").create({court_id: this.model.id}, {
			success: function(createdCheckIn, response){
				console.log("great success");
				showView.trigger("checkInChange")
				
				// had to add date to baller in UTC time, javascript was treating it oddly
				// var checked_in_at = new Date(response.get("created_at"));
				// checked_in_at.setHours(checked_in_at.getHours() + checked_in_at.getTimezoneOffset()/60);
				// showView.currentCheckIn.set({"created_at": checked_in_at});
			}
		});
	},

	checkOut: function(event) {
		event.target.disabled = true;
		$(event.target).html("Checking Out...");

		var showView = this;
		this.currentCheckIn.destroy({
			success: function() {
				showView.currentCheckIn = false;
				console.log("HE GONE")
				showView.trigger("checkInChange")
			},
			wait: true
		});
	},
})