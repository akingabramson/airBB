AB.Views.NewCourt = Backbone.View.extend({
	template: JST["courts/new"],
	initialize: function() {
		this.$el.attr("id", "new-court-form");
		// this.$el.addClass("hidden");
	},
	render: function() {
		var renderedForm = this.template()
		this.$el.html(renderedForm)
		return this;
	}
})