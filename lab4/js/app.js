$(function() {
	//We instantiate our model
	var model = new DinnerModel();
	
	//And create the needed controllers and views
	var indexView = new IndexView($("#index"), model);
	var selectDishView = new SelectDishView($("#selectDish"), model);
	var dinnerOverView= new DinnerOverView($("#dinnerOverView"), model);

	var indexViewController = new IndexViewController(indexView, model);
	var selectDishViewController = new SelectDishViewController(selectDishView, model);
	var dinnerOverViewController = new DinnerOverViewController(dinnerOverView, model);
});