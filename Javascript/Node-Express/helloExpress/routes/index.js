var express = require('express');
var router = express.Router();

var count = 1;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/testRoute', function(req, res){
  res.send("Hello test Route");
});

router.get('/hi', function(req, res){
	var message = [
	"<h1>Hello Express</h1>",
	"<p>Welcome to a the page</p>",
	"<ul>",
	"<li>List 1</li>",
	"<li>List 2</li>",
	"</ul>"].join("\n");

	res.send(message);
});

router.get('/userExample/:userId', function(req, res){
	res.send("<h1>Hello, User #" + req.params.userId);
});

router.get('/home',function(req,res){
	res.render('home.jade', {title: "Having some fun with Node and Express; something else"});
});

router.get('/hello.txt', function(req,res,next){
	count++;
	next();
});

router.get('/count', function(req,res,next){
	res.send("The count is "+count);
});

//// Users and Functoins
var users = [
	{name: "Andrew"},
	{name: "Adriano"},
	{name: "Anderson"},
	{name: "Andrei"},
	{name: "Alex"},
];

function loadUser(req,res,next){
	req.users = users[parseInt(req.params.usid,10)];
	next(); //yield control o next function
}

router.get('/us/:usid', loadUser, function(req,res){
	res.json(req.users);
});

router.post('/posttest', function(req,res){
	res.send(200, "Update carried out for " + req.body.username);
});

//COOKIES

router.get('/cookie/:name', function(req, res, next){
	//For Cookies
	res.cookie('name', req.params.name).send('<p>To see it in action Go <a href="/cookie">here</a>')
});


router.get('/cookie',function(req,res,next){
	res.clearCookie('name').send(req.cookies.name);
});

// SESSIONS
router.get('/session/:name', function(req,res,next){
	req.session.name = req.params.name;
	res.send('<p>To see it in action Go <a href="/session">here</a>');
});

router.get('/session', function(req,res){
	res.send(req.session.name);
});

module.exports = router;
