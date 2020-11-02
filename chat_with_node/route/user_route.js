// define routes here..
var express = require('express');
var router = express.Router();
var path = require('path');
var auth = require('../model/user_authentication/user_service');
const ensureToken = require('../middleware/ensureToken');
var {upload} = require('../config/server.js')

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
	//res.setHeader('Access-Control-Allow-Credentials', 'true');
	//res.status(404).send("Invalid call!")
	//console.log(Date.now())
	next()
})

router.get('/', function (req, res) {
    //res.send('<html><body><h1>Hello World</h1></body></html>');
	
	//res.sendFile('views/user/index.htm', { root: path.dirname(__dirname)  });
	res.render('user/index',{})
});

//authenticate user
router.post('/authenticateUser', function (req, res, next) {
	const useremail = req.body.useremail;
	const userpassword = req.body.userpassword;

	auth.loginUser(useremail, userpassword).then(function(result){
		//res.header("authorization", 'Bearer ' + result.data.token );
		res.send(result);
	}).catch(function (err){
		console.log(err)
		res.send(err);
	});
	//res.sendFile('index.htm', { root: __dirname });
	//res.status(200).send('OK')
});

//register user
router.post('/registerUser', function (req, res, next) {
	const username = req.body.username
	const useremail = req.body.useremail;
	const userpassword = req.body.userpassword;
	const url = req.headers.origin;
//console.log(req.headers.origin)
	auth.registerUser(username, useremail, userpassword, url).then(function(result){
		//console.log(result)
		res.send(result);
		
	}).catch(function (err){
		//console.log(err)
		res.send(err);
	});
	//res.sendFile('index.htm', { root: __dirname });
	//res.status(200).send('OK')
});

//verify user registration
router.get('/verifyuser', function (req, res, next) {
	
	const user = req.query.useremail
	const token = req.query.token;

	auth.verifyUserRegistration(user, token).then(function(result){
		//console.log(result)
		res.send(result);
		
	}).catch(function (err){
		//console.log(err)
		res.send(err);
	})
	//res.sendFile('index.htm', { root: __dirname });
	//res.status(200).send('OK')
});

// send verification mail again
router.post('/sendverificationmail', function (req, res, next) {
	
	const useremail = req.body.useremail
	const url = req.headers.origin;

	auth.sendVerificationMailAgain(useremail, url).then(function(result){
		//console.log(result)
		res.send(result);
		
	}).catch(function (err){
		//console.log(err)
		res.send(err);
	})
	//res.sendFile('index.htm', { root: __dirname });
	//res.status(200).send('OK')
});

// send password to mail
router.post('/sendPassword', function (req, res, next) {
	
	const user = req.body.email
	//const url = req.headers.origin;

	auth.sendPassword(user).then(function(result){
		//console.log(result)
		res.send(result);
		
	}).catch(function (err){
		//console.log(err)
		res.send(err);
	})
	//res.sendFile('index.htm', { root: __dirname });
	//res.status(200).send('OK')
});

// file upload
router.post('/fileupload', ensureToken, function (req, res, next) {

	upload(req, res, function(err){
		const file = req.file

		// upload.single('file'),
		if (!file) {
			// const error = new Error('Please upload a file')
			// error.httpStatusCode = 400
			// return next(error)
			res.send({
				status: false,
				message: 'No file uploaded'
			});
		}
		// else if (err instanceof multer.MulterError) {
        //     return res.send(err);
		// }
		else if(err){
			res.send(err)
		}
		// fs.readFile(req.files.displayImage.path, function (err, data) {
		// 	var newPath = __dirname + "/uploads/uploadedFileName";
		// 	fs.writeFile(newPath, data, function (err) {
		// 	  res.redirect("back");
		// 	});
		//   });
		// console.log(res.req.file)
		res.send({
			file : res.req.file.filename,
			original_file_name : res.req.file.originalname,
			msg :'file received successfully'
		})
	})
	
})

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