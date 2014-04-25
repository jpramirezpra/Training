var express = require('express');
var router = express.Router();

router.param('username', function(req,res,next,username){
	if(username !== "JosePablo"){
		req.user = username;
		next(); // will fall through to the next route
	} else {
		next(new Error("User "+username+" not found")); // will fall through to last route of error because it is the only one that can handle the error
	}
});
/* GET users listing. */
router.get('/', function(req, res) {
  res.send('resource sent');
});

router.get('/:username', function(req,res,next){
	//WE are taking care of this in the Param for better organization
	//if(req.params.username === "andrew"){
	//	var err = Error('User does not Exist');
	//	next(err);
	//} 
	res.send(req.user + "'s profile");
});

module.exports = router;
