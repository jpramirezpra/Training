//Namespacing example

(function(){
	//ONLY TWO Global Variables

	window.App = {
		Models: {},
		Views: {},
		Collections: {}
	};

	//Helper
	//window.App.helpers.template
	window.template = function(id){
		return _.template( $('#'+id).html() );
	}


	var examplex = "Appointment, AppointmentView, AppointmentsCollection, App.Models.Appointment, App.Views.Appoitnment, App.Collections.Appointments, App.Models.Person = Backbone.Model.extend({});, App.Views.Person = Backbone.Views.extend({});, App.Collections.People = Backbone.Collection.extend({});"


	//MODEL
	App.Models.Adult = Backbone.Model.extend({
		defaults: {
			name: 'John doe',
			age: 30, 
			occupation: "worker"
		},
		validate: function(attrs){//Pass the entire attributes
			if ( attrs.age < 0 ) {
				return 'Age must be positive stupid';
			}

			if( ! attrs.name){
				return 'Every person must have a name';
			}
		},
		work: function() { return this.get('name')+' is working.'}
	});

	var p = new App.Models.Adult({name:"jose"}); // will override the defaults

	p.on('error',function(model, error){console.log(error)});


	//COLLECTION 
	App.Collections.People = Backbone.Collection.extend({
		model: App.Models.Adult, //will reference the Class not the object
	});

	//COLLECTION VIEW
	App.Views.People = Backbone.View.extend({
		tagName: 'ul', //container for li should be an ul, since all people will be wrapped in li

		render: function(){
			//filter through all items in a collection,
			//for each create a new person view
			//render the PersonView and Append it to the root element

			//1. need access to the collection
			//this.collection is the collection that was passed to it
			this.collection.each(function(person){
				var personView = new App.Views.Person({ model: person});
				this.$el.append(personView.render().el);
			},this);

			console.log(this);
			return this;
			
		}

	});

	//VIEW
	App.Views.Person = Backbone.View.extend({
		tagName: 'li', //wrap it in <li>

		template: template('personTemplate'),//_.template($('#personTemplate').html()),//or Just '#personTemplate' and then call it in the render funciton


		//_.template("<%= name %> (<%= age %>"),//INLINES TEMPLATE  

		// initialize: function(){
		// 	console.log(this.model);
		// 	this.render();
		// },

		//Can take care of initialize in the People View part of the app.

		render: function(){
			//anti-pattern
			//this.$el.html(this.model.get('name')+ ' (' + this.model.get('age')+')');
			this.$el.html(this.template(this.model.toJSON())); // model is set when you create a new Person View
			//or
			//*********
			//var template = _.template( $(this.template).html() );
			//this.$el.html(template(this.model.toJSON()));

			return this; //it is good practice to return this at the end of render function to ensure that you can continue chaining.
		}
	});

	var personView = new App.Views.Person({model:p});
	//APPEND TO THE DOM
	//document.body.appendChild(personView.el);

	var peopleCollection = new App.Collections.People([
			{
				name: "Jeremy",
				age: 27
			},
			{
				name:"James",
				age: 28
			},
			{
				name:'Dwight',
				age:29 
			}
		]);

	peopleCollection.add(p);

	console.log(peopleCollection.toJSON());

	var peopleView = new App.Views.People({collection: peopleCollection }); //make the collection available to the object
	document.body.appendChild(peopleView.render().el);
	//********** JavaScirpt Way ****
	// var Person = function(config) {
	// 	this.name = config.name;
	// 	this.age = config.age;
	// 	this.occupation = config.occupation;

	// }

	// Person.prototype.work = function(){
	// 	return this.name+" is working";
	// }

	// var per = new Person({name:"Jose",age:23,occupation:"Consultant"});
})();