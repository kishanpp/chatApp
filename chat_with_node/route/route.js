// define routes here..
var express = require('express');
var router = express.Router();
var path = require('path');
var auth = require('../model/user_authentication/user_service');
const ensureToken = require('../middleware/ensureToken');


// middleware of all calls in this router - order is important. so call next() to carry routes further otherwise request will hault.
/*
	var app = express()
	var blog = express()
	var blogAdmin = express()

	app.use('/blog', blog)
	blog.use('/admin', blogAdmin)

	console.dir(app.path()) // ''
	console.dir(blog.path()) // '/blog'
	console.dir(blogAdmin.path()) // '/blog/admin'
*/
router.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	//res.status(404).send("Invalid call!")
	//console.log(Date.now())
	next()
})

router.get('/', function (req, res) {
    //res.send('<html><body><h1>Hello World</h1></body></html>');
	//console.log(process.cwd())
	//res.sendFile('index.htm', { root: path.dirname(__dirname)  });
	
	res.render("index",{})
});

router.get('/about', function (req, res) {
    //res.send('<html><body><h1>chat it v1.0</h1></body></html>');
	res.render("about",{})
	//res.sendFile('index.htm', { root: __dirname });
});



// some protected route
router.post('/protectedroute', ensureToken, function (req, res, next) {
	/* auth.verifyUser(req.headers.authorization).then(function(result){
		res.send(result)
	}).catch(function(err){
		//console.log(err)
		res.send(err)
	}) */
	res.send({msg:'its good'})
})




module.exports = router ;