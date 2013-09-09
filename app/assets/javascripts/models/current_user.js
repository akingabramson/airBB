AB.Models.CurrentUser = Backbone.Model.extend({
	url: "/current_user",
	parse: function(data) {
		data.check_ins = new AB.Collections.CheckIns(data.check_ins);
		return data
	}
})