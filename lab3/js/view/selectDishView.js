var SelectDishView = function (container,model) {

	this.update = function (obj) {
		if(obj === "setNumberOfGuests"){
			this.numberOfGuests.html(model.getNumberOfGuests());
			if(model.getCurrentDishID() != 0) {
				this.ingredientsTable(model.getCurrentDishID());
				this.dishPrice.html(model.getDishPrice(model.getCurrentDishID()));
				this.totalMenuPrice.html(model.getTotalMenuPrice() + model.getDishPrice(model.getCurrentDishID()));
			} else {
				this.totalMenuPrice.html(model.getTotalMenuPrice());
			}
			this.chosenDishes();
		}
		else if(obj === "addDishToMenu" || obj === "removeDishFromMenu"){
			this.chosenDishes();
		}
	}

	this.availableDishes = function(type,filter) {
		
		console.log(type);
		console.log(filter);

		if(type == "all") {
			var dishes = model.getAllDishes("", filter);
		} else {
			var dishes = model.getAllDishes(type, filter);
			console.log(dishes);
		}
		var numDishes = dishes.length;
		console.log(numDishes);
		var output = document.getElementById("availableDishes");
		$(output).html("");
		for(var i = 0; i < numDishes; i++) {
			$(output).append(
				"<a id='"+dishes[i].id+"' title='' href='#' class='dishThumb'>" +
				"<img src='images/"+dishes[i].image+"' class='img-thumbnail center-block'>" +
				"<h1>"+dishes[i].name+"</h1>" +
				"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce risus turpis, rutrum quis ipsum non, consequat accumsan nisi. Phasellus eget consequat erat. Suspendisse tempor lacus tempor nulla luctus, at cursus dolor mattis. Sed vel tortor purus. Sed auctor nec orci eget venenatis.</p>" +
				"</a>");
		}
	}

	this.chosenDishes = function() {
		this.dishesList.html("");
		var selectedDishes = model.getSelectedDish();
		console.log(selectedDishes);

		for(var i = 0; i < selectedDishes.length; i++) {
			this.dishesList.append("<li>"+selectedDishes[i].name+"<button type='button' class='close deleteBtn' aria-label='Close'>&times;</button> <span class='pull-right'>"+model.getDishPrice(selectedDishes[i].id)+"</span></li>");
		}
		if(selectedDishes.length > 0) {
			this.confirmDinnerButton.removeAttr("disabled");
		}
	}

	this.ingredientsTable = function(id) {
		$('#numPeopleDish').html(model.getNumberOfGuests());
		var numIngredients = model.getDish(id).ingredients.length;
		var ingredients = model.getDish(id).ingredients;
		var numGuests = model.getNumberOfGuests();
		var table = $("#ingredientsTbl");
		table.html("");
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
		$('#totDishPrice').html(totDishPrice);
	}

	this.viewDish = function(id) {
		this.toggleView();
		this.getDish(id);
	}

	this.getDish = function(id) {
		this.dishPrice.html(model.getDishPrice(id));
		this.totalMenuPrice.html(model.getTotalMenuPrice() + model.getDishPrice(id));

		this.dishName.html(model.getDish(id).name);
		this.dishPic.html("<img src='images/"+model.getDish(id).image+"'>");
		this.dishPrep.html(model.getDish(id).description);
		this.ingredientsTable(id);
	}

	this.toggleView = function() {
		this.options.toggleClass('dontDisplay');
		this.availDishes.toggleClass('dontDisplay');

		this.dishView.toggleClass('dontDisplay');
		this.dishPreperations.toggleClass('dontDisplay');

		this.dishPrice.html("0");
		this.totalMenuPrice.html(model.getTotalMenuPrice());
	}

	this.mainframe = $('#mainframe');
	this.dishesList = $('#dishesList');
	this.options = $('#options');
	this.availDishes = $('#availableDishes');
	this.dishView = $('#dishView');
	this.dishPreperations = $('#dishPreperations');

	this.numberOfGuests = $("#numPeople");
	this.minusBtn = $("#minusPeople");
	this.plusBtn = $("#addPeople");

	this.confirmDinnerButton = $('#confirmBtn');

	this.dishtype = $("#dishType");

	this.searchForm = $("#searchDishForm");
	this.searchField = $("#search");
	this.searchBtn = $("#searchBtn");

	this.dishPrice = $('#pendingDishPrice');
	this.totalMenuPrice = $('#totMenuPrice');


	this.dishName = $('#dishName');
	this.dishPic = $('#dishPicture');
	this.dishPrep = $('#dishPrep');
	this.backBtn = $('#backBtn');

	this.confirmDishBtn = $('#addDishBtn');

	model.addObserver(this);
	this.numberOfGuests.html(model.getNumberOfGuests());
  	this.dishPrice.html("0");
	this.totalMenuPrice.html(model.getTotalMenuPrice());
	this.availableDishes("all");
}