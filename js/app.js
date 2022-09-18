// Storage controller
const StorageCtrl = (function(){
	// Public methods
	return {
		storeItem: function(item){
			let items;
			// Check if any items in localStorage
			if(localStorage.getItem('items') === null){
				items = [];
				// Push new item
				items.push(item);
				// Set localStorage
				localStorage.setItem('items', JSON.stringify(items));
			}else{
				// Get what is already in localStorage
				items = JSON.parse(localStorage.getItem('items'));
				// Push new item
				items.push(item);
				// Set localStorage
				localStorage.setItem('items', JSON.stringify(items));
			}
		},
		getItemsFromStorage: function(){
			let items;
			if(localStorage.getItem('items') === null){
				items = [];
			}else{
				items = JSON.parse(localStorage.getItem('items'));
			}
			return items;
		},
		updateItemStorage: function(updatedItem){
			let items = JSON.parse(localStorage.getItem('items'));
			// Find and update current element
			items.forEach(function(item, index){
				if(updatedItem.id === item.id){
					items.splice(index, 1, updatedItem);
				}
			});
			// Update localStorage
			localStorage.setItem('items', JSON.stringify(items));
		},
		deleteItemFromStorage: function(currentItem){
			let items = JSON.parse(localStorage.getItem('items'));
			// Find and delete current element
			items.forEach(function(item, index){
				if(currentItem.id === item.id){
					items.splice(index, 1);
				}
			});
			// Update localStorage
			localStorage.setItem('items', JSON.stringify(items));
		},
		clearItemsFromStorage: function(){
			localStorage.removeItem('items');
		}
	}
})();

// Item Controller - data state
const ItemCtrl = (function(){
	// Item Constructor
	const Item = function(id, name, calories){
		this.id = id;
		this.name = name;
		this.calories = calories;
	}
	// Data Structure / State
	const data = {
		items: StorageCtrl.getItemsFromStorage(),
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
			// Create ID
			let ID;
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
		},
		getTotalCalories: function(){
			let total = 0;
			// Loop through items and add cals
			data.items.forEach(function(item){
				total += item.calories
			});
			// Set total calories in data structure
			return data.totalCalories = total;
		},
		getItemById: function(id){
			let found = null;
			// Loop through items
			data.items.forEach(function(item){
				if(item.id === id){
					found = item;
				}
			});
			return found;
		},
		setCurrentItem: function(item){
			data.currentItem = item;
		},
		getCurrentItem: function(){
			return data.currentItem;
		},
		updateItem: function(name, calories){
			// Calories to number
			calories = parseInt(calories);
			let found = null;
			data.items.forEach(function(item){
				if(item.id === data.currentItem.id){
					item.name = name;
					item.calories = calories;
					found = item;
				}
			});
			return found;
		},
		deleteItem: function(id){
			// Get ids
			const ids = data.items.map(function(item){
				return item.id;
			});
			// Get index
			const index = ids.indexOf(id);
			// Remove item
			data.items.splice(index, 1);
		},
		clearAllItems: function(){
			data.items = [];
		}
	}
})();

// UI Controller - render UI
const UICtrl = (function(){
	// Define selectors
	const UISelectors = {
		itemList: '#item-list',
		listItems: '#item-list li',
		addBtn: '.add-btn',
		updateBtn: '.update-btn',
		deleteBtn: '.delete-btn',
		backBtn: '.back-btn',
		itemNameInput: '#item-name',
		itemCaloriesInput: '#item-calories',
		totalCalories: '.total-calories',
		clearBtn: '.clear-btn',
	}
	// Public methods
	return {
		// Render list items
		populateItemList: function(items){
			let html = '';
			items.forEach(function(item){
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
			// Show list
			document.querySelector(UISelectors.itemList).style.display = 'block';
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
		},
		hideList: function(){
			document.querySelector(UISelectors.itemList).style.display = 'none';
		},
		showTotalCalories: function(totalCalories){
			document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
		},
		clearEditState: function(){
			UICtrl.clearInputs();
			document.querySelector(UISelectors.updateBtn).style.display = 'none';
			document.querySelector(UISelectors.deleteBtn).style.display = 'none';
			document.querySelector(UISelectors.backBtn).style.display = 'none';
			document.querySelector(UISelectors.addBtn).style.display = 'inline';
		},
		addItemToForm: function(){
			document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
			document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
			UICtrl.showEditState();
		},
		showEditState: function(){
			document.querySelector(UISelectors.updateBtn).style.display = 'inline';
			document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
			document.querySelector(UISelectors.backBtn).style.display = 'inline';
			document.querySelector(UISelectors.addBtn).style.display = 'none';
		},
		updateListItem: function(item){
			let listItems = document.querySelectorAll(UISelectors.listItems);
			// Turn node list into array
			listItems = Array.from(listItems);
			listItems.forEach(function(listItem){
				const itemId = listItem.getAttribute('id');
				if(itemId === `item-${item.id}`){
					document.querySelector(`#${itemId}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
					<a href="#" class="secondary-content">
						<i class="edit-item fa fa-pencil"></i>
					</a>`;
				}
			});
		},
		deleteListItem: function(id){
			const itemId = `#item-${id}`;
			const item = document.querySelector(itemId);
			item.remove();
		},
		removeItems: function(){
			let listItems = document.querySelectorAll(UISelectors.listItems);
			// Turn node list into array
			listItems = Array.from(listItems);
			// Remove each item
			listItems.forEach(function(item){
				item.remove();
			});
		}
	}
})();

// App Controller - init app and run events
const AppCtrl = (function(){
	// Load event listeners
	const loadEventListeners = function(){
		// Get UI selectors
		const UISelectors = UICtrl.getSelectors();
		// Add item event
		document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
		// Disable submit on enter
		document.addEventListener('keypress', function(e){
			// If Enter
			if(e.keyCode === 13 || e.which === 13){
				e.preventDefault();
			}
		})
		// Edit item event
		document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
		// Update item event
		document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
		// Delete item event
		document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);
		// Back button event
		document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);
		// Clear all items event
		document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
	};
	// Add item submit
	const itemAddSubmit = function(e){
		e.preventDefault();
		// Get form input from UI Controller
		const input = UICtrl.getItemInput();
		// Check for name and calorie input
		if(input.name !== '' && input.calories !== ''){
			const newItem = ItemCtrl.addItem(input.name, input.calories);
			// Add item to UI list
			UICtrl.addListItem(newItem);
			// Store in localStorage
			StorageCtrl.storeItem(newItem);
			// Get total calories
			const totalCalories = ItemCtrl.getTotalCalories();
			// Add total calories to UI
			UICtrl.showTotalCalories(totalCalories);
			// Clear inputs
			UICtrl.clearInputs();
		}
	}
	// Click edit item
	const itemEditClick = function(e){
		if(e.target.classList.contains('edit-item')){
			// Get list item ID
			const listId = e.target.parentNode.parentNode.id;
			// Break into an array
			const listIdArr = listId.split('-');
			// Get the actual ID
			const id = parseInt(listIdArr[1]);
			// Get item to edit
			const itemToEdit = ItemCtrl.getItemById(id);
			ItemCtrl.setCurrentItem(itemToEdit);
			// Add item to form
			UICtrl.addItemToForm();
		}
		e.preventDefault();
	}
	// Item update submit
	const itemUpdateSubmit = function(e){
		e.preventDefault();
		// Get item input
		const input = UICtrl.getItemInput();
		// Update item
		const updatedItem = ItemCtrl.updateItem(input.name, input.calories);
		// Update UI
		UICtrl.updateListItem(updatedItem);
		// Update localStorage
		StorageCtrl.updateItemStorage(updatedItem);
		// Get total calories
		const totalCalories = ItemCtrl.getTotalCalories();
		// Add total calories to UI
		UICtrl.showTotalCalories(totalCalories);
		// Clear edit state
		UICtrl.clearEditState();
	}
	// Delete item
	const itemDeleteSubmit = function(e){
		e.preventDefault();
		const currentItem = ItemCtrl.getCurrentItem();
		// Delete item from data structure
		ItemCtrl.deleteItem(currentItem.id);
		// Delete item from UI
		UICtrl.deleteListItem(currentItem.id);
		// Delete from localStorage
		StorageCtrl.deleteItemFromStorage(currentItem);
		// Get total calories
		const totalCalories = ItemCtrl.getTotalCalories();
		// Add total calories to UI
		UICtrl.showTotalCalories(totalCalories);
		// Clear edite state
		UICtrl.clearEditState();
	}
	// Clear all items
	const clearAllItemsClick = function(){
		// Delete all items from data structure
		ItemCtrl.clearAllItems();
		// Remove all items from UI
		UICtrl.removeItems();
		// Get total calories
		// Clear items from from localStorage
		StorageCtrl.clearItemsFromStorage();
		const totalCalories = ItemCtrl.getTotalCalories();
		// Add total calories to UI
		UICtrl.showTotalCalories(totalCalories);
		UICtrl.hideList();
	}
	// Public methods
	return {
		init: function(){
			// Clear edit state and hide buttons on init
			UICtrl.clearEditState();
			// Fetch items from data structure
			const items = ItemCtrl.getItems();
			// Check if any items
			if(items.length === 0){
				UICtrl.hideList();
			} else {
				// Populate list with items
				UICtrl.populateItemList(items);
			}
			// Get total calories
			const totalCalories = ItemCtrl.getTotalCalories();
			// Add total calories to UI
			UICtrl.showTotalCalories(totalCalories);
			// Load event listeners
			loadEventListeners();
		}
	}
})();

// Initializing App
AppCtrl.init();