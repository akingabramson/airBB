AB.Store.swapButtonText = function() {
	var $button = $("#new-court-button");
	if (AB.Store.buttonClicked) {
    $button.html("New Court");
  } else {
  	$button.html("Back To Map");
  }

  AB.Store.buttonClicked = !AB.Store.buttonClicked;
}