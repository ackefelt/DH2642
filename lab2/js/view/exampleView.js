//ExampleView Object constructor
var ExampleView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	
	this.ingredientsTable = function(id) {
		container.find("#numPeopleDish").html(model.getNumberOfGuests());
		var numIngredients = model.getDish(id).ingredients.length;
		var ingredients = model.getDish(id).ingredients;
		var numGuests = model.getNumberOfGuests();
		var table = document.getElementById("ingredientsTbl");
		var totDishPrice = 0;

		for(var i = 0; i < numIngredients; i++) {
			$(table).append(
				"<tr>" +
				"<td>" + numGuests * ingredients[i].quantity + " " + ingredients[i].unit +"</td>" +
				"<td>" + ingredients[i].name + "</td>" +
				"<td>SEK</td>" +
				"<td>" + numGuests*ingredients[i].price + "</td>" +
				"</tr>");
			totDishPrice += numGuests*ingredients[i].price;
		}
		$(table).append(
			"<tr class=\"ingredientSum\">"+
				"<td colspan=2><a href=\"#\" class=\"btn submitBtn\">Confirm Dish</a></td>"+
				"<td>SEK</td>"+
				"<td>"+ totDishPrice +"</td>"+
			"</tr>");
	}

	this.availableDishes = function(type) {
		var dishes = model.getAllDishes(type);
		var numDishes = dishes.length;
		console.log(numDishes);
		var output = document.getElementById("availableRecipes");
		$(output).append("<h3>"+type.toUpperCase()+"</h3>");
		for(var i = 0; i < numDishes; i++) {
			$(output).append(
				"<a href=\"#\" class=\"dishThumb\">" +
				"<img src=\"images/"+dishes[i].image + "\" class=\"img-thumbnail center-block\">" +
				"<h1>" + dishes[i].name+"</h1>"+
				"<p>v</p>"+
				"</a>");
		}
	}

	this.chosenDishes = function() {
		var dishes = model.getSelectedDish();
		var numDishes = dishes.length;
		var output = document.getElementById("chosenDishes");

		for(var i = 0; i < numDishes; i++) {
			$(output).append(
				"<div class=\"dishThumb\">" + 
					"<img src=\"images/" + dishes[i].image + "\" class=\"img-thumbnail center-block\">" +
					"<h1>" + dishes[i].name + "</h1>" +
					"<p class=\"text-right\">" + model.getDishPrice(dishes[i].id) + " SEK</p>" +
				"</div>");		
		}
		$(output).append(
			"<div class=\"totPrice\">" +
				"Total:<br />" +
				"<p>" + model.getTotalMenuPrice() + " SEK</p>" +
			"</div>");		
	}

	this.prepareDishes = function() {
		var dishes = model.getSelectedDish();
		var numDishes = dishes.length;
		var output = document.getElementById("chosenDishes");

		for(var i = 0; i < numDishes; i++) {
			$(output).append(
				"<div class=\"row preparation\">" +
					"<div class=\"col-md-2\">" +
						"<img src=\"images/" + dishes[i].image + "\" class=\"img-thumbnail center-block\">" +
					"</div>" +
					"<div class=\"col-md-4\">" +
						"<h3>" + dishes[i].name.toUpperCase() + "</h3>" +
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce risus turpis, rutrum quis ipsum non, consequat accumsan nisi. Phasellus eget consequat erat. Vivamus mattis aliquet orci, vel accumsan velit varius sit amet. Nunc luctus vel arcu at malesuada." +
					"</div>" +
					"<div class=\"col-md-6\">" +
						"<h4>PREPARATION</h4>" +
						dishes[i].description +
						"</div>" +
				"</div>");
		}
	}
	this.numberOfGuests = container.find("#numPeople");
	this.plusButton = container.find("#addPeople");
	this.minusButton = container.find("#minusPeople");
	model.setNumberOfGuests(4);
	this.numberOfGuests.html(model.getNumberOfGuests());

 	if($('body').is('.selectDish')) {
		container.find("#pendingDishPrice").html("0");
		container.find("#totMenuPrice").html(model.getTotalMenuPrice());
		this.availableDishes("starter");
  	}

	if($('body').is('.dish')) {
  		container.find("#pendingDishPrice").html(model.getDishPrice(1));
		container.find("#totMenuPrice").html(model.getTotalMenuPrice()+model.getDishPrice(1));
		container.find("#dishName").html(model.getDish(1).name);
		container.find("#dishPicture").html("<img src=\"images/"+model.getDish(1).image+"\">");
		container.find("#dishPrep").html(model.getDish(1).description);
		this.ingredientsTable(1);
	}

	if($('body').is('.selectedDish')) {
		model.addDishToMenu(1);
		container.find("#chosenDishName").html(model.getDish(1).name);
		container.find("#chosenDishPrice").html(model.getDishPrice(1));
		container.find("#pendingDishPrice").html("0");
		container.find("#totMenuPrice").html(model.getTotalMenuPrice());
		this.availableDishes("starter");
	}

	if($('body').is('.dinnerOverview')) {
		model.addDishToMenu(101);
		model.addDishToMenu(201);
		model.addDishToMenu(202);

		this.chosenDishes();
	}

	if($('body').is('.dinnerPrep')) {
		model.addDishToMenu(101);
		model.addDishToMenu(201);
		model.addDishToMenu(202);

		this.prepareDishes();
	}	
}
 
