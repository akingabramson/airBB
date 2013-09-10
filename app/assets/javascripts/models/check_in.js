AB.Models.CheckIn = Backbone.Model.extend({
	parse: function(data) {
		data.baller = new AB.Models.CurrentBaller(data.baller);
		return data
	}
});