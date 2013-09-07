AB.Views.ShowCourt = Backbone.View.extend({
	template: JST["courts/show"],
	events: {
		"click check-in-button": "checkIn"
	},

	render: function() {
		this.$el.html(this.template({court: this.model}));
		return this;
	},

	checkIn: function() {
		AB.Store.CurrentUser.checkIn = AB.Store.CurrentUser.checkIn || new AB.Models.CheckIn()
	}
})