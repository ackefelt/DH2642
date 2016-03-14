var DinnerOverView = function (container,model) {
	this.update = function (obj) {
		if(obj === "addDishToMenu" || obj === "removeDishFromMenu" || obj === "setNumberOfGuests"){
			this.chosenDishes();
			this.dishesPrep();
		}
	}

	this.chosenDishes = function() {
		var dishes = model.getSelectedDish();
		var numDishes = dishes.length;
		$('#numPeople2').html(model.getNumberOfGuests());

		this.chosenDishes1.html("");
		for(var i = 0; i < numDishes; i++) {
			this.chosenDishes1.append(
				"<div class=\"dishThumb\">" + 
					"<img src=\"images/" + dishes[i].image + "\" class=\"img-thumbnail center-block\">" +
					"<h1>" + dishes[i].name + "</h1>" +
					"<p class=\"text-right\">" + model.getDishPrice(dishes[i].id) + " SEK</p>" +
				"</div>");	
		}
		this.chosenDishes1.append(
			"<div class=\"totPrice\">" +
				"Total:<br />" +
				"<p>" + model.getTotalMenuPrice() + " SEK</p>" +
			"</div>");	
	}

	this.dishesPrep = function() {
		var dishes = model.getSelectedDish();
		var numDishes = dishes.length;
		var numPeople = model.getNumberOfGuests();

		this.chosenDishesPrep.html("");
		for(var i = 0; i < numDishes; i++) {
			var ingredients = model.getDishIngredients(dishes[i].id);
			var ingredientsOut = "";

			for(var j = 0; j < ingredients.length; j++) {
				ingredientsOut = ingredientsOut + numPeople*ingredients[j].quantity + " " + ingredients[j].unit + " " + ingredients[j].name + "<br/>";
			}
			this.chosenDishesPrep.append(
				"<div class='row preparation'>" +
					"<div class='col-md-2'>" +
						"<img src='images/" + dishes[i].image + "' class='img-thumbnail center-block'>" +
					"</div>" +
					"<div class='col-md-4'>" +
						"<h3>" + dishes[i].name.toUpperCase() + "</h3>" +
						ingredientsOut +
					"</div>" +
					"<div class='col-md-6'>" +
						"<h4>PREPARATION</h4>" +
						dishes[i].description +
						"</div>" +
				"</div>");
		}
	}

	this.toggleView = function() {
		this.chosenDishes1.toggleClass('dontDisplay');
		this.chosenDishes2.toggleClass('dontDisplay');
		this.chosenDishesPrep.toggleClass('dontDisplay');
	}

	model.addObserver(this);

	this.chosenDishes1 = $('#chosenDishes');
	this.chosenDishes2 = $('#chosenDishesBot');
	this.chosenDishesPrep = $('#chosenDishesPrep');


	this.backBtn = $('#overviewBackBtn');
	this.printBtn = $('#overviewPrintBtn');
}