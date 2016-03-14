// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope, $routeParams, Dinner) {
  
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case
	$scope.getNumberOfGuests = function() {
		return Dinner.getNumberOfGuests();
	}

	$scope.ingredientAmount = function(ingredient) {
		return (Dinner.getNumberOfGuests()*ingredient.MetricQuantity/$scope.devider).toFixed(2);
	}

	$scope.totalCost = function() {
		var totalCost = 0;
		if($scope.data) {
			for(ing in $scope.data.Ingredients) {
				totalCost += parseFloat($scope.ingredientAmount($scope.data.Ingredients[ing]));
			}
			return totalCost.toFixed(2);
		}
	}

	$scope.addDishToMenu = function() {
		Dinner.addDishToMenu($scope.data)
	}

	Dinner.Dish.get({id:$routeParams.dishId}, function(data){
		$scope.data = data;
		$scope.name = data.Title;
		$scope.image = data.ImageURL;
		$scope.description = data.Description;
		$scope.preparations = data.Instructions;

		$scope.ingredients = data.Ingredients;
		$scope.devider = data.YieldNumber;

		Dinner.setSelectedDish(data);

	},function(data){
		$scope.status = "There was an error";
	});
});