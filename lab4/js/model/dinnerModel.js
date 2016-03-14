//DinnerModel Object constructor
var DinnerModel = function() { 

	this.numberOfGuests = 4;
	this.selectedDishes = [];
	this.currentDishID = 0;
	observers = [];
	var selectedDish;

	this.setNumberOfGuests = function(num) {
		this.numberOfGuests = num;
		notifyObservers("setNumberOfGuests");
	}

	// should return 
	this.getNumberOfGuests = function() {
		return this.numberOfGuests;
	}

	this.setCurrentDishID = function(id) {
		this.currentDishID = id;
		notifyObservers("setCurrentDishID");
	}

	this.getCurrentDishID = function() {
		return this.currentDishID;
	}
	//Returns the dishes that is on the menu for selected type 
	this.getSelectedDishes = function(type) {
		return this.selectedDishes;
	}

	this.setSelectedDish = function(data) {
		selectedDish = data;
	}

	this.getSelectedDish = function() {
		return selectedDish;
	}	

	//Returns all the dishes on the menu.
	this.getFullMenu = function() {
		return $(this.selectedDishes);
	}

	//Returns all ingredients for every dish on the menu.
	this.getAllIngredients = function() {
		var ingredientsA = [];
		for(i in this.selectedDishes) {
			ingredientsA.push(this.selectedDishes[i].Ingredients);
		}
		return ingredientsA;
	}

	//Returns all ingredients for the selected dish
	this.getDishIngredients = function() {
		for(var i = 0; i < dishes.length; i++) {
			if(dishes[i].id == id) {
				return dishes[i].ingredients;
			}
		}
	}

	this.getDishPrice = function(data) {
		var dishPrice = 0;
		var ingredientsA = data.Ingredients;
		for(i in ingredientsA) {
			dishPrice += ingredientsA[i].MetricQuantity/data.YieldNumber;
		}
		return parseInt(dishPrice * this.numberOfGuests);
	}

	//Returns the total price of the menu (all the ingredients multiplied by number of guests).
	this.getTotalMenuPrice = function() {
		var totalPrice = 0;
		for(var i = 0; i < this.selectedDishes.length; i++) {
			var dish = this.selectedDishes[i];
			var ingredientsL = dish.Ingredients;

			for(var j = 0; j < ingredientsL.length; j++) {
				var numIngredient = ingredientsL[j];
				totalPrice += parseFloat(numIngredient.MetricQuantity/dish.YieldNumber);
			}
		}
		console.log(parseInt(totalPrice * this.numberOfGuests));
		return parseInt(totalPrice * this.numberOfGuests);
	}

	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	this.addDishToMenu = function(data) {
		this.selectedDishes.push(data);
		notifyObservers("addDishToMenu");
	}

	//Removes dish from menu
	this.removeDishFromMenu = function(id) {
		var i = 0;
		for(j in this.selectedDishes) {
			if(this.selectedDishes[j].RecipeID == id) {
				this.selectedDishes.splice(i, 1);
				break;
			}
			i++;
		}
		notifyObservers("removeDishFromMenu");
	}

	this.getAllDishes = function (type,filter) {
		var APIKey = "8vtk7KykflO5IzB96kb0mpot0sU40096";
		var pg = 1;
	 	var rpp = 10;
	 	var URL = "http://api.bigoven.com/recipes?pg="+pg+"&rpp="+rpp+"&api_key="+APIKey;

	 	if(filter) {
	 		URL = URL+"&title_kw="+filter;
	 	}
	 	if(type && type != "all") {
	 		URL = URL+"&any_kw="+type;
	 	}
	 	console.log("REQUEST: "+URL);
	 	$.ajax({
	 		type: "GET",
	 		dataType: "json",
	 		cache: false,
	 		url: URL,
	 		error: function (data) {
	 			console.log("error");
	 		},
	 		success: function (data) {
	 			console.log("success");
				notifyObservers(data);
	 		},
	 		timeout: 2000
	 	});
	}

	//function that returns a dish of specific ID
	this.getDish = function(id) {
		var APIKey = "8vtk7KykflO5IzB96kb0mpot0sU40096";
		var URL = "http://api.bigoven.com/recipe/"+id+"?api_key="+APIKey;

	 	$.ajax({
	 		type: "GET",
	 		dataType: "json",
	 		cache: false,
	 		url: URL,
	 		error: function (data) {
	 			console.log("error");
	 		},
	 		success: function (data) {
	 			console.log("success");
				selectedDish = data;
				notifyObservers(selectedDish);
	 		},
	 		timeout: 2000
	 	});
	}

	this.addObserver = function(observer) {
		observers.push(observer);
	} 

	var notifyObservers = function(obj) {
		for (var i = 0; i < observers.length; i++) {
			observers[i].update(obj);
		}
	}
	// the dishes variable contains an array of all the 
	// dishes in the database. each dish has id, name, type,
	// image (name of the image file), description and
	// array of ingredients. Each ingredient has name, 
	// quantity (a number), price (a number) and unit (string 
	// defining the unit i.e. "g", "slices", "ml". Unit
	// can sometimes be empty like in the example of eggs where
	// you just say "5 eggs" and not "5 pieces of eggs" or anything else.
	var dishes = [{
		'id':1,
		'name':'French toast',
		'type':'starter',
		'image':'toast.jpg',
		'description':"In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
		'ingredients':[{ 
			'name':'eggs',
			'quantity':0.5,
			'unit':'',
			'price':10
			},{
			'name':'milk',
			'quantity':30,
			'unit':'ml',
			'price':6
			},{
			'name':'brown sugar',
			'quantity':7,
			'unit':'g',
			'price':1
			},{
			'name':'ground nutmeg',
			'quantity':0.5,
			'unit':'g',
			'price':12
			},{
			'name':'white bread',
			'quantity':2,
			'unit':'slices',
			'price':2
			}]
		},{
		'id':2,
		'name':'Sourdough Starter',
		'type':'starter',
		'image':'sourdough.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'active dry yeast',
			'quantity':0.5,
			'unit':'g',
			'price':4
			},{
			'name':'warm water',
			'quantity':30,
			'unit':'ml',
			'price':0
			},{
			'name':'all-purpose flour',
			'quantity':15,
			'unit':'g',
			'price':2
			}]
		},{
		'id':3,
		'name':'Baked Brie with Peaches',
		'type':'starter',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'round Brie cheese',
			'quantity':10,
			'unit':'g',
			'price':8
			},{
			'name':'raspberry preserves',
			'quantity':15,
			'unit':'g',
			'price':10
			},{
			'name':'peaches',
			'quantity':1,
			'unit':'',
			'price':4
			}]
		},{
		'id':100,
		'name':'Meat balls',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
		'ingredients':[{ 
			'name':'extra lean ground beef',
			'quantity':115,
			'unit':'g',
			'price':20
			},{
			'name':'sea salt',
			'quantity':0.7,
			'unit':'g',
			'price':3
			},{
			'name':'small onion, diced',
			'quantity':0.25,
			'unit':'',
			'price':2
			},{
			'name':'garlic salt',
			'quantity':0.7,
			'unit':'g',
			'price':2
			},{
			'name':'Italian seasoning',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'dried oregano',
			'quantity':0.3,
			'unit':'g',
			'price':3
			},{
			'name':'crushed red pepper flakes',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'Worcestershire sauce',
			'quantity':6,
			'unit':'ml',
			'price':7
			},{
			'name':'milk',
			'quantity':20,
			'unit':'ml',
			'price':4
			},{
			'name':'grated Parmesan cheese',
			'quantity':5,
			'unit':'g',
			'price':8
			},{
			'name':'seasoned bread crumbs',
			'quantity':15,
			'unit':'g',
			'price':4
			}]
		},{
		'id':101,
		'name':'MD 2',
		'type':'main dish',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':15,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':10,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':102,
		'name':'MD 3',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':2,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':10,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':5,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':103,
		'name':'MD 4',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':4
			},{
			'name':'ingredient 2',
			'quantity':12,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':6,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':200,
		'name':'Chocolat Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':201,
		'name':'Vanilla Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':202,
		'name':'Strawberry',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		}
	];

}
