//Namespacing example

(function(){
	//ONLY TWO Global Variables

	window.App = {
		Models: {},
		Views: {},
		Collections: {},
		Router: {},
		Helpers: {}
	};

	//Helper
	//window.App.helpers.template
	App.Helpers.template = function(id){
		return _.template( $('#'+id).html() );
	}

	App.Router = Backbone.Router.extend({
		routes : {
			'':'index',
			'page':''
			'show/:id':'show'//
		},

		index: function(){
			console.log("hello from index")
		},

		show: function(){
			console.log("hello from show")
		},

	});

	new App.Router;
	Backbone.history.start();

})();