// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu

// TODO in Lab 5: Implement the methods to get the dinner menu
// add dish to menu and get total menu price
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {

	$scope.numberOfGuests = Dinner.getNumberOfGuests();
	$scope.chosenDishes = Dinner.getSelectedDishes();

	$scope.setNumberOfGuest = function(number){
		Dinner.setNumberOfGuests(number);
	}

	$scope.getNumberOfGuests = function() {
		return Dinner.getNumberOfGuests();
	}
	
	$scope.getDishPrice = function(data) {
		return Dinner.getDishPrice(data);
	}	

	$scope.getCurrentDishPrice = function() {
		var dish = Dinner.getSelectedDish();
		if(dish) {
			return $scope.getDishPrice(dish);
		} else {
			return 0;
		}
	}

    $scope.totalMenuCost = function() {
        return Dinner.getTotalMenuPrice()+$scope.getCurrentDishPrice();
    }

    $scope.removeDish = function(id) {
        Dinner.removeDishFromMenu(id);
    }


});