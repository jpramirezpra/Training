 //Old way

var person = new Object(); 

person.firstName = "Jose";
person.lastName = "Ramirez";

perosn.sayHi() = function(){
	return "Hello, there!";
}


var person = {
	firstName: "Jose",
	lastName: "Ramirez",
	sayHi: function(){
		return "Hello, there"
	}
};

var employee = {
	firstName:"Jim",
	lastName:"Black",
	position:"Manager"
};

//Factory Function

var createPerson = function(firstName, lastName){
	return {
		firstName: firstName,
		lastName: lastName,
		sayHi : function(){
			return "Hi There";
		}
	};
};

var johnDoe = createPerson("John","Doe");

var janeDoe = createPerson("Jane", "Doe");

//THE THIS KEY WORD

var person = {
	name: "Jose Ramirez",
	greet: function(){
		return "Hello "+person.name;
	}
};

//Problem with this is that I could chnage the name of the object and find and arror in the greet funciton

({
	name:"Jose",
	greet: function(){
		return "hello "+this.name;
	}
})



var makeRequest = function(url, callback){
	var data = 10;
	callback(data);
};

var obj = {
	someValue : 20,
	loadData: function(data){
		var sum = data + this.someValue;
		alert(sum);
	}
	prepareData : function(){
		var url= "http://numberservice.com";
		makeRequest(url, this.loadData.bind(this));//bind will make sure that the this is referrrring to obj and not window when we call make request
	}
}