// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.

  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details

dinnerPlannerApp.factory('Dinner',function ($resource, $cookieStore) {
  
  this.selectedDishes = [];
  this.selectedDishesID = [];
  this.currentDishID = 0;

  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:'8vtk7KykflO5IzB96kb0mpot0sU40096'});
  this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:'8vtk7KykflO5IzB96kb0mpot0sU40096'});

  var selectedDish;

  if($cookieStore.get('numberOfGuests')) {
    var numberOfGuests = $cookieStore.get('numberOfGuests');
  } else {
    var numberOfGuests = 4;
  }

  if($cookieStore.get('selectedDishes')) {
    var dishes = $cookieStore.get('selectedDishes')
    for(i in dishes) {
      this.Dish.get({id:dishes[i]}, (data) => {
        this.addDishToMenu(data);
      });
    }
  }

  this.setNumberOfGuests = function(num) {
    numberOfGuests = num;
    $cookieStore.put('numberOfGuests', num);
  }

  this.getNumberOfGuests = function() {
    return numberOfGuests;
  }

  this.setCurrentDishID = function(id) {
    this.currentDishID = id;
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
    return this.selectedDishes;
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
    return parseInt(dishPrice * numberOfGuests);
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
    return parseInt(totalPrice * numberOfGuests);
  }

  //Adds the passed dish to the menu. If the dish of that type already exists on the menu
  //it is removed from the menu and the new one added.
  this.addDishToMenu = function(data) {
    this.selectedDishes.push(data);
    this.selectedDishesID.push(data.RecipeID);
    $cookieStore.put('selectedDishes',this.selectedDishesID);
  
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
    var k = this.selectedDishesID.indexOf(id);
    if(k > -1) {
      this.selectedDishesID.splice(k, 1);
    }
    $cookieStore.put('selectedDishes',this.selectedDishesID);
  }


  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});