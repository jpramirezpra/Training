// generating a model class
var Class = Backbone.Model.extend({
  default: {
    attribute: 'Default Value'
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
