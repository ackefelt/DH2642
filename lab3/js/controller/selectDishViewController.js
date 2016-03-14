var SelectDishViewController = function(view, model) {

	selectToOverView = function (id){
		$('#selectDishView').toggleClass('dontDisplay');
		$('#dinnerOverView').toggleClass('dontDisplay');

		$('#chosenDishes').removeClass('dontDisplay');
		$('#chosenDishesBot').removeClass('dontDisplay');
		$('#chosenDishesPrep').addClass('dontDisplay');
	}

	$('.dishThumb').click(function() {
		view.viewDish(this.id);
		model.setCurrentDishID(this.id);
	});

	view.plusBtn.on('click', function(event) {
		console.log("tryck");
		model.setNumberOfGuests(model.getNumberOfGuests() + 1);
	});

	view.minusBtn.on('click', function(event) {
		if(model.getNumberOfGuests() > 1) {
			model.setNumberOfGuests(model.getNumberOfGuests() - 1);
		}
	});

	view.searchForm.on('submit', function(event) {
		event.preventDefault();
		view.availableDishes(this.elements[2].value, this.elements[0].value);
		$('.dishThumb').click(function() {
			view.viewDish(this.id);
			model.setCurrentDishID(this.id);
		});
	});

	view.backBtn.on('click', function(event) {
		view.toggleView();
		model.setCurrentDishID(0);
	});

	view.confirmDishBtn.on('click', function(event) {
		model.addDishToMenu(model.getCurrentDishID());
		view.toggleView();
		model.setCurrentDishID(0);
		$('.deleteBtn').click(function() {
			console.log("id: "+this.id);
			model.removeDishFromMenu(this.id);
		});
	});

	view.confirmDinnerButton.on('click', function(event) {
		selectToOverView();
	});
}