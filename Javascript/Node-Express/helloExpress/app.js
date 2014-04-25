var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var expressSession = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(expressSession({ secret: "this is a secret" }));
app.use(methodOverride());
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use('/', routes);
app.use('/usersnodb', users); // will go to users.js file for all urls whtat start with /users
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb://localhost/helloExpress");

var  UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

//user object will be what we use to update modify and delet
var Users = mongoose.model('Users', UserSchema);

//app get for DB example

//GET ALL
app.get('/users',function(req,res){
    Users.find({}, function(err, docs){
        res.render('users/index', {users: docs});
    });
});

//NEW
app.get('/users/new', function(req,res){
    res.render("users/new");
});

//CREATE
app.post('/users', function(req,res){
    var b = req.body;
    new Users({
        name: b.name,
        email: b.email,
        age: b.age
    }).save(function(err, user){
        if(err) res.json(err)
        res.redirect('/users/'+user.name);
    });
});

//SHOW
app.get('/users/:uname', function(req,res,next){
    res.render('users/show',{user: req.user});
});

app.param('uname', function(req, res, next, name){
    console.log(name + "search for got >");
    Users.find({name: name}, function(err, docs){
        if(!err){
            req.user = docs[0];
            console.log(req.user);
            next();
        } else {
            next(err);
        }
    });
});

//EDIT
app.get('/users/:uname/edit', function(req,res){
    res.render("users/edit",{user: req.user});
});

//UPDATE
app.put('/users/:uname', function(req,res){
    var b = req.body;
    console.log("about to update");
    Users.update(
        {name: req.params.uname}, //Conditions to find, the params address was set before changes could be made, so we know it is still the old name that can be found in the database
        {name: b.name, email: b.email, age: b.age},
        function(err){
            res.redirect("/users/"+b.name); // updated name will be the same as request.body.name
        });
});

//REMOVE
app.delete('/users/:uname', function(req,res){
    Users.remove({name: req.params.uname}, function(err){
        res.redirect('/users');
    })
});

//Example of Params
var userArray = ["jose","Joe","Jimmy","John","Jacob","Jendrik","Justin"];

app.param('from', function(req,res,next,from){
    req.from = parseInt(from, 10);
    next();
});

app.param('to', function(req,res,next,to){
    req.to = parseInt(to, 10);
    next();
});

app.get("/array/:from-:to", function(req,res,next){
    //var from = parseInt(req.params.from,10);
    //var to = parseInt(req.params.to,10);
    res.json(userArray.slice(req.from, req.to+1));
});

//Exaomple of RegEx Routes
// app.get(/\/users\/(\d*)\/?(edit)?/, function(req,res,next){
//     // Will match
//     // /users/10
//     // /users/123/
//     // /users/10/edit

//     var msg = "User Number " + req.params[0]

//     if(req.params[1] === 'edit'){
//         msg = "Editing "+msg;
//     }
//     else {
//         msg = "Viewing "+msg;
//     }

//     res.send(msg);
// });

//Request Object
//Default Param Example
app.get("/names/:name?", function(req,res){
    var ua = req.get('user-agent');
    res.send(req.param('name', 'NoName')+" is using "+ua)

});

//Post handler
app.post("/postsite", function(req, res){
    //can send status code as first argument
    res.send(500, "Update carried out for " + req.body.username);
    //res.json({message:body}) will set header and serialize javascript to respond in json
    //res.type('text/plain')
});


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
