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

			let ID;
			// Create ID
			if(data.items.length > 0){
				ID = data.items[data.items.length - 1].id + 1;
			} else {
				ID = 0;
			}

			// Calories to number
			calories = parseInt(calories);

			// Create new item
			newItem = new Item(ID, name, calories);

			// Add to items array
			data.items.push(newItem);

			return newItem;
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
				</a></li>`;
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
		addListItem: function(item){
			// Create li element
			const li = document.createElement('li');
			// Add class
			li.className = 'collection-item';
			// Add ID
			li.id = `item-${item.id}`;
			// Add HTML
			li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
				<a href="#" class="secondary-content">
					<i class="edit-item fa fa-pencil"></i>
				</a>`;
			// Insert element
			document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
		},
		clearInputs: function(){
			document.querySelector(UISelectors.itemNameInput).value = '';
			document.querySelector(UISelectors.itemCaloriesInput).value = '';
		}
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

			// Add item to UI list
			UICtrl.addListItem(newItem);

			UICtrl.clearInputs();
		}

		// Print new items
		console.log(ItemCtrl.logData());

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