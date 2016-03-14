dinnerPlannerApp.controller('PreparationCtrl', function ($scope, Dinner) {

    $scope.dishes = Dinner.getSelectedDishes();

    $scope.ingredientsPrint = function(ing, dish) {

        return (Dinner.getNumberOfGuests()*ing.MetricQuantity/dish.YieldNumber).toFixed(2) + " " + ing.MetricUnit + " " + ing.Name;
        return output;
    }
});