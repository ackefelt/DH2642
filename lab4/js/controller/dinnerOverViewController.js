var DinnerOverViewController = function(view, model) {

	overViewToSelect = function (id){
		$('#selectDishView').toggleClass('dontDisplay');
		$('#dinnerOverView').toggleClass('dontDisplay');
	}

	view.backBtn.on('click', function() {
		overViewToSelect();
	});

	view.printBtn.on('click', function() {
		view.toggleView();
	})
}