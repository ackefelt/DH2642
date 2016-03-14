dinnerPlannerApp.controller('OverviewCtrl', function ($scope, Dinner) {

    $scope.dishes = Dinner.getSelectedDishes();

    $scope.getNumberOfGuests = function() {
        return Dinner.getNumberOfGuests();
    }

    $scope.getTotalMenuPrice = function() {
        return Dinner.getTotalMenuPrice();
    }

    $scope.getDishPrice = function(data) {
        return Dinner.getDishPrice(data);
    }
});