AB.Views.NewCourt = Backbone.View.extend({
	template: JST["courts/new"],
	render: function() {
		var renderedForm = this.template()
		this.$el.html(renderedForm)
		return this;
	}
})