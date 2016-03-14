var SelectDishView = function (container,model) {

	this.update = function (obj) {
		if(obj === "setNumberOfGuests"){
			this.numberOfGuests.html(model.getNumberOfGuests());
			if(model.getCurrentDishID() != 0) {
				this.ingredientsTable(model.getSelectedDish());
				this.dishPrice.html(model.getDishPrice(model.getSelectedDish()));
				this.totalMenuPrice.html(model.getTotalMenuPrice() + model.getDishPrice(model.getSelectedDish()));
			} else {
				this.totalMenuPrice.html(model.getTotalMenuPrice());
			}
			this.chosenDishes();
		} else if(obj === "addDishToMenu" || obj === "removeDishFromMenu"){
			this.chosenDishes();
			this.totalMenuPrice.html(model.getTotalMenuPrice());
		} else if(obj.ResultCount) {
			$('#loadingDishes').addClass('dontDisplay');
			$('#availableDishes').removeClass('dontDisplay');
			this.availableDishes(obj);
		} else if(obj.Ingredients) {
			$('#loadingDish').addClass('dontDisplay');
			$('#loadedDish').removeClass('dontDisplay');
			$('#dishPreperations').removeClass('dontDisplay');
			this.getDish(obj);
		} else if(obj.toLowerCase().indexOf("error") > -1) {
			$('#loadingDish').html("<h3>"+obj+"</h3>");
			$('#loadingDishes').html("<h3>"+obj+"</h3>");
		}
	}

	this.availableDishes = function(data) {
		var dishes = data;
		var output = document.getElementById("availableDishes");
		
		$(output).html("Showing recipe 1-"+dishes.Results.length+" of "+dishes.ResultCount+"<br /><br />");
		for(var i = 0; i < dishes.Results.length; i++) {
			$(output).append(
				"<a id='"+dishes.Results[i].RecipeID+"' title='' href='#' class='dishThumb'>" +
				"<img src='"+dishes.Results[i].ImageURL120+"' class='img-thumbnail center-block'>" +
				"<h1>"+dishes.Results[i].Title+"</h1>" +
				"</a>");
		}
	}

	this.chosenDishes = function() {
		this.dishesList.html("");
		var selDishes = model.getSelectedDishes();
		console.log(model.getSelectedDishes());
		console.log(selDishes.length);

		for(var i = 0; i < selDishes.length; i++) {
			console.log(selDishes);
			this.dishesList.append("<li>"+selDishes[i].Title+"<button type='button' id='"+selDishes[i].RecipeID+"' class='close deleteBtn' aria-label='Close'>&times;</button> <span class='pull-right'>"+model.getDishPrice(selDishes[i])+"</span></li>");
		}
		if(selDishes.length > 0) {
			this.confirmDinnerBtn.removeAttr("disabled");
		} else {
			this.confirmDinnerBtn.attr("disabled","disabled");
		}
	}

	this.ingredientsTable = function(data) {
		$('#numPeopleDish').html(model.getNumberOfGuests());
		var ingredients = data.Ingredients;
		var numIngredients = ingredients.length;
		var numGuests = model.getNumberOfGuests();
		var table = $("#ingredientsTbl");
		table.html("");
		var totDishPrice = 0;

		for(var i = 0; i < numIngredients; i++) {
			$(table).append(
				"<tr>" +
				"<td>" + (numGuests * ingredients[i].MetricQuantity/data.YieldNumber).toFixed(2) + " " + ingredients[i].MetricUnit +"</td>" +
				"<td>" + ingredients[i].Name + "</td>" +
				"<td>SEK</td>" +
				"<td>" + (numGuests*ingredients[i].MetricQuantity/data.YieldNumber).toFixed(2) + "</td>" +
				"</tr>");
			totDishPrice += numGuests*ingredients[i].MetricQuantity/data.YieldNumber;
		}
		$('#totDishPrice').html(totDishPrice.toFixed(2));
	}

	this.getDish = function(data) {
		this.dishPrice.html(model.getDishPrice(data));
		this.totalMenuPrice.html(model.getTotalMenuPrice() + model.getDishPrice(data));

		this.dishName.html(model.getSelectedDish().Title);
		this.dishPic.html("<img src='"+model.getSelectedDish().ImageURL+"' width='300'>");
		this.dishDesc.html(model.getSelectedDish().Description)
		this.dishPrep.html(model.getSelectedDish().Instructions);
		this.ingredientsTable(data);
	}

	this.toggleView = function() {
		console.log("toggleView");
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

	this.confirmDinnerBtn = $('#confirmBtn');

	this.dishtype = $("#dishType");

	this.searchForm = $("#searchDishForm");
	this.searchField = $("#search");
	this.searchBtn = $("#searchBtn");

	this.dishPrice = $('#pendingDishPrice');
	this.totalMenuPrice = $('#totMenuPrice');


	this.dishName = $('#dishName');
	this.dishPic = $('#dishPicture');
	this.dishPrep = $('#dishPrep');
	this.dishDesc = $('#dishDescription');
	this.backBtn = $('#backBtn');

	this.confirmDishBtn = $('#addDishBtn');

	model.addObserver(this);
	model.getAllDishes();

	this.numberOfGuests.html(model.getNumberOfGuests());
  	this.dishPrice.html("0");
	this.totalMenuPrice.html(model.getTotalMenuPrice());
}