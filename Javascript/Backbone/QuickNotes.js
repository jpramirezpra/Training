// generating a model class
var Class = Backbone.Model.extend({
  default: {
    attribute: 'Default Value'
  },
  urlRoot: '/restRoot',
  functionName: function(){
  }
});

//Generating a model instance
var instance = new Class(
  {attribute: 'value'}
);

instance.get('attribute');
instance.set({attribute:'otherValue'});

instance.fetch(); //must have defined id
instance.save(); //save changes to RST Api
instance.destroy(); //DELTE id


//built in events
'change'
'change:<attr>'
'destory'
'sync'
'error'
'all'


//VIEWS
var View = Backbone.View.extend({
  template: _.template(),
  events:{
    "click" : "alertTitle",
    "<event> <selector>" : "<method>"
    //will delegate to inside the View, not bubble out
  },
  initialize: function(){
    this.model.on('change', this.render, this);
    //need to pass this context, if not would be the window context
  },
  alertTitle: function(){
    alert(this.model.get('title'));
  },
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
  },
  remove: function(){
    this.$el.remove();
  }
})

var viewInstance = new View({model: instance});
//can call the render function on init, or can call it yourself later
viewInstance.render();

//Collections
var CollectionList = Backbone.Collection.extend({
  url: '/restUrlPlural'
});

var list = new CollectionList();

list.fetch();

list.length; // = length

list.on('event-name', function(){

});

//events
//add , remove, reset   on add and remove you can pass in the instance

list.on('add', function(item){

});




// COllection View

var ClassListView = Backbone.View.extend({
  render: function(){
    this.collection.forEach(function(item){
      var instanceView = new View({model: item});
      this.$el.append(instanceView.render().el);
    });
  }
});
var instanceListView = new ClassListView({collection: list});
//will need to add to the DOM
$('#container').html(instanceListView.render().el);
