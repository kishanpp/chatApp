const token = require ('../config/jwt');

var ensureToken = function(req, res, next) {
	
	const clientToken = req.headers.authorization;
	
	var result = {};
	result.message = 'server error';
	result.data = {};
	result.isDone = 0;
	
	token.jwt.verify(clientToken, token.jwtkey, function(err, decode){
		if(err) {
			console.log(err)
			result.message = 'token expired';
			res.send(result)
		}
		else{
			result.isDone = 1;
			result.message = 'token valid';
			next()
		}
		
	})
}

module.exports = ensureToken ;