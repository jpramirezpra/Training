var oojs = (function(oojs){

	//Event Types
	var PropertyValueChangedEvent = function(type, value){
		EventType.call(this, type);

		Object.defineProperty(this,"value",{
			value: value,
			enumerable: true
		});
	}

	PropertyValueChangedEvent.prototype = Object.create(EventType.prototype);

	var ItemAddedEvent = function(item){
		EventType.call(this, "itemadded");

		Object.defineProperty(this, "item",{
			value: item, 
			enumerable: true
		});
	};
	ItemAddedEvent.prototype = Object.create(EventType.prototype);

	var ItemAddedEvent = function(item){
		EventType.call(this, "itemadded");

		Object.defineProperty(this, "item",{
			value: item, 
			enumerable: true
		});
	};
	ItemAddedEvent.prototype = Object.create(EventType.prototype);


	//Toolbar Item!!!!!
	var ToolbarItem = function(itemElement){
		EventTarget.call(this);
		Object.defineProperty(this,"___el",{
			value: itemElement
		});
	};

	ToolbarItem.prototype = Object.create(EventTarget.prototype,{
		toggleActiveState : {
			value : function(){
					this.activated = !this.activated;
			},
			enumerable : true	
		},
		enabled:{
					get: function(){
						return !this.___el.classList.contains("disabled");
					},
					set: function(value){
						var currentValue = this.enabled;

						if(currentValue === value){
							return;
						}

						if(value){
							this.___el.classList.remove("disabled");
						}
						else{
							this.___el.classList.add("disabled");
						}

						this.__fire(new PropertyValueChangedEvent("enabledchanged",value));
					}
				},
		activated:{
					get: function(){
						return this.___el.classList.contains("active");
					},
					set: function(value){
						var currentValue = this.activated;

						if(currentValue === value){
							return;
						}

						if(value){
							this.___el.classList.add("active");
						}
						else{
							this.___el.classList.remove("active");
						}

						this.__fire({
							type : "activatedchanged",
							value : value
						});
					}
				}

	});

	var createToolbarItems = function(itemElements){
		var items = [];

		[].forEach.call(itemElements, function(el, index, array){ //forEach elementValue, index of Element, the array beingtraversed
			var item = new ToolbarItem(el);

			items.push(item); //include the item objec in the items array
		});


		return items;
	};



	var createItemObject = function(element){	
		var item = {
			toggleActiveState: function(){
					this.activated = !this.activated;
			}
		};

		Object.defineProperties(item,{
				el:{
					value: element
				},
				enabled:{
					get: function(){
						return !this.el.classList.contains("disabled");
					},
					set: function(value){
						if(value){
							this.el.classList.remove("disabled");
						}
						else{
							this.el.classList.add("disabled");
						}
					}
				},
				activated:{
					get: function(){
						return this.el.classList.contains("active");
					},
					set: function(value){
						if(value){
							this.el.classList.add("active");
						}
						else{
							this.el.classList.remove("active");
						}
					}
				}
			});

		return item
	}


	var Toolbar = function(toolbarElement){
		EventTarget.call(this);
		var items = toolbarElement.querySelectorAll(".toolbar-item");
		

		Object.defineProperties(this,{
			__el : {
				value : toolbarElement
			},
			items : {
				value : createToolbarItems(items),
				enumerable : true
			}
		});
	};

	Toolbar.prototype = Object.create(EventTarget.prototype,{
		addItem : {
			value : function(options){
				var item = document.createElement("SPAN");
				item.className = "toolbar-item";
				this.__el.appendChild(item);
				var itemObj = new ToolbarItem(item);
				this.items.push(itemObj);

				this.__fire({
					type : "itemadded",
					item : item
				});
			},
			enumerable : true
		},
		removeItem : {
			value : function(index){
				if(index > -1 && index < this.items.length){
					this.__el.removeChild(this.items[index].___el);
					this.items.splice(index,1);
				}
				else{
					throw new Error ("Index mismatch cannot remove button")
				}

				this.__fire({
					type : "itemremoved"
				});

			},
			enumerable : true
		}
	});
	///MAIN FUNCTION///

	oojs.createToolbar = function(elementId){

		var element = document.getElementById(elementId);
		if(!element){
			element = document.createElement("DIV");
			element.setAttribute("id",elementId);
			element.classList.add("toolbar");
			document.body.appendChild(element);
		}

		var items = element.querySelectorAll(".toolbar-item");
		// if(!element){ create a div if it does not already exist
		// 	element = docuemnt.createElement("DIV")
		// 	element.id = elementId;

		return new Toolbar(element);


		// var toolbar = {
		// 	el : element,
		// 	items : createToolbarItems(items),
		// 	addItem : function(){
		// 		item = document.createElement("SPAN");
		// 		item.classList.add("toolbar-item");
		// 		this.el.appendChild(item);
		// 		var itemObj = createItemObject(item);
		// 		this.items.push(itemObj);
		// 	},
		// 	removeItem : function(index){
		// 		if(index > -1 && index < this.items.length){
		// 			this.el.removeChild(this.items[index].el);
		// 			this.items.splice(index,1);
		// 		}
		// 		else{
		// 			console.log("Index mismatch cannot remove button")
		// 		}

		// 	}
		// };//returns an object that has an array of items i.e. the toolbar

		return toolbar;
		// }
	};

	return oojs;
}(oojs || {}));




// var toolbar = oojs.createToolbar("myToolbar");

// var toolbarItem = toolbar.items[0];

// // toolbarItem.setEnabled(true);
// // toolbarItem.getEnabled();



// {  //OLD WAY OF DOING THINGS
			// 	el : el,
			// 	disable : function() {
			// 		this.el.classList.add("disabled");
			// 	},
			// 	enable : function() {
			// 		this.el.classList.remove("disabled");
			// 	},
			// 	isDisabled : function(){
			// 		return this.el.classList.contains("disabled");
			// 	},
			// 	activate : function(){
			// 		if(this.isDiabled){
			// 			return;
			// 		}
			// 		else{
			// 			this.el.classList.add("active");
			// 		}
			// 	},
			// 	deactivate : function(){
			// 		if(this.isDiabled){
			// 			return;
			// 		}
			// 		else{
			// 			this.el.classList.remove("active");
			// 		}
			// 	},
			// 	isActive : function(){
			// 		return this.el.classList.contains("active");
			// 	},
			// 	toggleActiveState : function (){
			// 		if (this.isActive()){
			// 			this.deactivate();
			// 		}
			// 		else{
			// 			this.activate();
			// 		}
			// 	}

			// };