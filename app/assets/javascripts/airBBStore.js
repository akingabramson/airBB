AB.Store.swapButtonText = function() {
	var $button = $("#new-court-button");
	if (AB.Store.buttonClicked) {
    $button.html("New Court");
  } else {
  	$button.html("Back To Map");
  }

  AB.Store.buttonClicked = !AB.Store.buttonClicked;
};

AB.Store.getBounds = function() {
	var southwestArr = _.map(AB.map.getBounds().getSouthWest().toUrlValue().split(","), function(pos){return parseFloat(pos)});
	var northeastArr = _.map(AB.map.getBounds().getNorthEast().toUrlValue().split(","), function(pos){return parseFloat(pos)});


	var southwest = {latitude: southwestArr[0], longitude: southwestArr[1]};
	var northeast = {latitude: northeastArr[0], longitude: northeastArr[1]};

	return [southwest, northeast]
}

