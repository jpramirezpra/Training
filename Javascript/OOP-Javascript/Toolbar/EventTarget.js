var EventTarget = function() {
	Object.defineProperty(this, "__listeners",{
		value : {}
	});
};

Object.defineProperties(EventTarget.prototype,{
	addListener: {
		value : function(type,listener){
			if (typeof this.__listeners[type] === "undefined"){
				this.__listeners[type] = [];
			}

			this.__listeners[type].push(listener)
		},
		enumerable: true
	},
	__fire : {
		value: function(evtObj){
			//type
			//target
			if(!(evtObj instanceof EventType)){
				throw new Error ("must be of event type")
			}

			//make sure object passed has a type
			if(typeof evtObj.type === "undefined"){
				throw new Error ("Event Object needs type");
			}

			//make sure obj passd has a target
			if(typeof evtObj.target === "undefined"){
				evtObj.target = this;
			}

			var listeners = this.__listeners[evtObj.type];

			if(typeof listeners === "undefined"){
				return;
			}

			for(var i =0, len = listeners.length; i< len; i++){
				listeners[i].call(this, evtObj);
			}

		}

	},
	removeListner: {
		value : function(type, listner){
			var listeners = this.__listeners[type];

			if(typeof listeners === "undefined"){
				return;
			}

			for(var i =0, len = listeners.length; i< len; i++){
				if (listeners[i] === listeners){
					listeners.splice(i,1);
					break;
				}
			}
		},
		enumerable: true
	}
})
// add listner
// remove
// event object

var EventType = function(type){
	if (typeof type !== "string"){
		throw new Error ("Must be a string");
	}

	Object.defineProperty(this, "type",{
		value: type,
		enumerable: true
	});
};