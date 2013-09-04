AB.Views.ShowCourt = Backbone.View.extend({
	template: JST["courts/show"],
	render: function() {
		this.$el.html(this.template({court: this.model}));
		return this;
	}
})