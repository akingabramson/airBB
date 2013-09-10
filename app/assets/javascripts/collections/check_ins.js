AB.Collections.CheckIns = Backbone.Collection.extend({
	url: "/check_ins/",
	model: AB.Models.CheckIn,

	_findCheckInByBallerId: function(id) {

		var foundCheckIn = false
		_.each(this.models, function(checkIn){
			if (checkIn.get("baller").id === id) {
				foundCheckIn = checkIn;
			}
		});
		return foundCheckIn;
	}
});