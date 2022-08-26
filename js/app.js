// Item Controller
const ItemCtrl = (function(){
	// Item Constructor
	const Item = function(id, name, calories){
		this.id = id;
		this.name = name;
		this.calories = calories;
	}

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
		getItems: function(){
			return data.items;
		},
		logData: function(){
			return data;
		},
		addItem: function(name, calories){
			console.log(name, calories);
		}
	}
})();

// UI Controller
const UICtrl = (function(){
	// Define selectors
	const UISelectors = {
		itemList: '#item-list',
		addBtn: '.add-btn',
		itemNameInput: '#item-name',
		itemCaloriesInput: '#item-calories',
	}
	// Public methods
	return {
		populateItemList: function(items){
			let html = '';
			items.forEach(function(item){
				// console.log(item);
				html += `<li class="collection-item" id="item-${item.id}">
				<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
				<a href="#" class="secondary-content">
					<i class="edit-item fa fa-pencil"></i>
				</a>`;
			});

			// Insert list items
			document.querySelector(UISelectors.itemList).innerHTML = html;
		},
		getSelectors: function(){
			return UISelectors;
		},
		getItemInput: function(){
			return {
				name: document.querySelector(UISelectors.itemNameInput).value,
				calories: document.querySelector(UISelectors.itemCaloriesInput).value,
			}
		},
	}
})();

// App Controller
const AppCtrl = (function(ItemCtrl, UICtrl){
	// Load event listeners
	const loadEventListeners = function(){
		// Get UI selectors
		const UISelectors = UICtrl.getSelectors();

		// Add item event
		document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
	};

	// Add item submit
	const itemAddSubmit = function(e){
		e.preventDefault();

		// Get form input from UI Controller
		const input = UICtrl.getItemInput();

		// Check for name and calorie input
		if(input.name !== '' && input.calories !== '') {
			console.log('Item added');
			console.log(input);
			const newItem = ItemCtrl.addItem(input.name, input.calories);
		}

	}

	// Public methods
	return {
		init: function(){
			// Fetch items from data structure
			const items = ItemCtrl.getItems();
			console.log(items);

			// Populate list with items
			UICtrl.populateItemList(items);

			// Load event listeners
			loadEventListeners();
		}
	}
})(ItemCtrl, UICtrl);

// Initializing App
AppCtrl.init();