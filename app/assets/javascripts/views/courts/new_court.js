AB.Views.NewCourt = Backbone.View.extend({
	template: JST["courts/new"],
	initialize: function() {
		this.$el.attr("id", "new-court-div");
	},

	events: {
		"click #submit-court": "submitCourt",
	},

	render: function() {
		var renderedForm = this.template();
		this.$el.html(renderedForm);
		return this;
	},

	setUpAutoComplete: function() {
		var input = document.getElementById("court-address");
		this.autocomplete = new google.maps.places.Autocomplete(input)
		this.autocomplete.bindTo('bounds', AB.map);
	},

	submitCourt: function() {
		var courtName = $("#court-name").val();
		var courtAddress = $("#court-address").val();
		var courtLatLong = this.autocomplete.getPlace().geometry.location;
		var courtLat = courtLatLong.lat();
		var courtLng = courtLatLong.lng();

		var courtData = {
			"court[name]": courtName,
			"court[latitude]": courtLat,
			"court[longitude]": courtLng,
			"authenticity_token": AUTH_TOKEN,
		};

		$.ajax({
			url: "/courts",
			type: "POST",
			data: courtData,
			success: this.courtSubmitted,
			error: this.courtError
		});
	},

	courtSubmitted: function() {

	},

	courtError: function(message) {
		alert("ERROR");
	}


})