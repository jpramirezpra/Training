(function(){
	window.App = {
		Models: {},
		Views: {},
		Collections: {}
	};

	window.template = function(id){
		return _.template( $('#'+id).html() );
	}

	App.Models.Task = Backbone.Model.extend({
		validate: function( attr ){
			if ( ! $.trim(attr.title) ) {//asking if title is null
				//trim will check if only spaces were entered as well.
				return 'A task requires a valid title';
			}
		},
	});

	App.Collections.Tasks = Backbone.Collection.extend({
			model: App.Models.Task,
		});

	App.Views.Tasks = Backbone.View.extend({
		tagName: 'ul',

		initialize: function(){
			this.collection.on('add',this.addOne,this);
		},

		render: function(){
			var self = this;
			self.collection.each(this.addOne,this);
			return self;
		},

		addOne: function(task){
			var taskView = new App.Views.Task({model:task});
			this.$el.append(taskView.render().el);
		},

	});

	App.Views.Task = Backbone.View.extend({
		tagName: 'li',

		template: template('taskTemplate'),

		initialize: function(){
			this.model.on('change', this.render, this);//setcontext at the end
			this.model.on('destroy', this.remove, this);
		},

		events: {
			'click':'showAlert',
			'click button.edit': 'editTask',
			'click button.delete': 'destroy'
		},

		showAlert: function(){
			console.dir(this.model.toJSON());
		},

		editTask: function(){
			var newTitle = prompt("What would you like to change the title to?", this.model.get('title'));
			//if(newTitle) can do a check here, but it is better practice to insert a validaiton to the model
			//insert validation to stop the value from changing if it is empty
			//because the value does not change, the re render is not called
			if(!newTitle) return;

			this.model.set('title',newTitle);
		},

		destroy: function(){
			this.model.destroy();
		},

		remove: function(){
			this.$el.remove();
		},

		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	App.Views.AddTask = Backbone.View.extend({
		el: '#addTask',//Use existing DOM element on the page.

		events:{
			'submit':'submit'
		},

		initialize: function(){
			//console.log(this.el.innerHTML);
		},

		submit: function(e){
			e.preventDefault();//need to prevent default of posting back on submit form
			var newTaskTitle = $(e.target).find('input[type=text]').val();
			//console.log(newTaskTitle);
			var task = new App.Models.Task( {title:newTaskTitle} );
			this.collection.add(task);
			console.log(tasks.toJSON());
		},


	});

	//Can have only One task, instead use the Collection
	// var task = new App.Models.Task({
	// 	title:'This is my task',
	// 	priority: 4,
	// 	dueDate: 'Tomorrow'
	// });

	var tasks = new App.Collections.Tasks([
		{
			title:'This is my task',
			priority: 4,
			dueDate: 'Today'
		},
		{
			title:'This is my second task',
			priority: 4,
			dueDate: 'Tomorrow'
		},
		{
			title:'This is my third task',
			priority: 4,
			dueDate: 'Yesterday'
		}
	]);

	var addTask = new App.Views.AddTask({collection:tasks});
	var taskCollectionView = new App.Views.Tasks({collection:tasks});
	taskCollectionView.render();
	console.log(taskCollectionView.el);
	$('#taskList').html(taskCollectionView.el);

	// var view = new App.Views.Task({model:task});

	// console.log(view.render().el);

})();
