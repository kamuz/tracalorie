// Storage Controller

// Item Controller
const ItemCtrl = (function(){
	console.log('Item Controller');

	// Data Structure / State
	const data = {
		items: [
			{id: 0, name: 'Steak Dinner', calories: 1200},
			{id: 1, name: 'Cookie', calories: 400},
			{id: 2, name: 'Eggs', calories: 300},
		],
		currentItem: null,
		totalCalories: 0
	}

	// Public methods
	return {
		logData: function(){
			return data;
		}
	}
})();

// UI Controller
const UICtrl = (function(){
	console.log('UI Controller');

	// Public methods
	return {

	}
})();

// App Controller
const AppCtrl = (function(ItemCtrl, UICtrl){
	console.log('App Controller');
	console.log(ItemCtrl.logData());

	// Public methods
	return {
		init: function(){
			console.log('Initializing App...')
		}
	}
})(ItemCtrl, UICtrl);

// Initializing App
AppCtrl.init();