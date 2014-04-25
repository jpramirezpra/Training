var createPerson = function(firstName, lastName){
	var person = {
		firstName: firstName,
		lastName: lastName,
		sayHello : function(){
			return "Hello ";
		}
	};

	Object.defineProperties(person, {
		fullName:{
			get: function(){
				return this.firstName + " " + this.lastName;
			},
			configurable: true
		}
	});

	return person;
};

var createEmployee = function(firstName, lastName, position){
	var person = createPerson(firstName, lastName);

	var fullName = Object.getOwnPropertyDescriptor(person, "fullName");
	var fullNameFunc = fullName.get.bind(person);
	var sayHello = Object.getOwnPropertyDescriptor(person, "sayHello");
	var sayHelloFunc = sayHello.value.bind(person);

	Object.defineProperties(person, {
		position: {
			value: position
		},
		fullName : {
			get: function(){
				return fullNameFunnc() + ", " + this.position;
			},
			configurable: true,
			enumerable: true
		},
		sayHello : {
			value: function(){
				return sayHelloFunc() + " My Name is "+fullName;
			}
		}
	});
};

var johnDoe = createEmployee("John", "Doe", "Manager");

