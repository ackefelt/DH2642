var SelectDishViewController = function(view, model) {

	selectToOverView = function (id){
		$("#selectDishView").toggleClass('dontDisplay');
		$("#dinnerOverView").toggleClass('dontDisplay');

		$("#chosenDishes").removeClass('dontDisplay');
		$("#chosenDishesBot").removeClass('dontDisplay');
		$("#chosenDishesPrep").addClass('dontDisplay');
	}

	$("body").on("click", ".dishThumb", function() {
		console.log("dish-tryck");
		view.toggleView();
		$("#loadingDish").removeClass('dontDisplay');
		$("#loadedDish").removeClass('dontDisplay');
		$("#dishPreperations").removeClass('dontDisplay');

		model.setCurrentDishID(this.id);
		model.getDish(model.getCurrentDishID());
	});

	view.plusBtn.on("click", function(event) {
		console.log("tryck");
		model.setNumberOfGuests(model.getNumberOfGuests() + 1);
	});

	view.minusBtn.on("click", function(event) {
		if(model.getNumberOfGuests() > 1) {
			model.setNumberOfGuests(model.getNumberOfGuests() - 1);
		}
	});

	view.searchForm.on("submit", function(event) {
		$("#loadingDishes").removeClass('dontDisplay');
		$("#availableDishes").addClass('dontDisplay');
		event.preventDefault();
		model.getAllDishes(this.elements[2].value, this.elements[0].value);
	});

	view.backBtn.on("click", function(event) {
		view.toggleView();
		model.setCurrentDishID(0);
	});

	$('body').on('click', '.deleteBtn', function(){
		model.removeDishFromMenu(this.id);
	});	

	view.confirmDishBtn.on("click", function(event) {
		view.toggleView();
		model.addDishToMenu(model.getSelectedDish());
		model.setSelectedDish("");
		model.setCurrentDishID(0);

	});

	view.confirmDinnerBtn.on("click", function(event) {
		selectToOverView();
	});
}