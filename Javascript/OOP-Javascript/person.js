//Factory Function

var createPerson = function(first, last){
	var person = {};

	Object.defineProperties(person,{
		first: {
			value:first,
			writable: true
		},
		last : {
			value: last,
			writable: true
		},
		fullName: {
			get : function() {return this.first + " " + this.last}
		}
	});

	person.fullName = person.first + " " + person.last;
	// Object.defineProperty(person,"first", {
	// 	value : first
	// });

	// Object.defineProperty(person,"first", {
	// 	value : last
	// });

	return person;
};

var johnDoe = createPerson("John", "Doe");

//Constructor function for the Perosn Object

var Person = function(fist, last){
	Object.defineProperties(this, {
		firstName : {
			value: first,
			writable : true, //default false
			enumerable : true //default false
		},
		lastName : {
			value : last,
			writable : true,
			enumrable : true
		}
	});
}

Object.defineProperties(Person.prototype, {
	sayHi : {
		value : function(){
			return "Hello There";
		},
		writable : true,
		enumerable : true
	}
});

var janeDoe = new Person("Jane", "Doe");