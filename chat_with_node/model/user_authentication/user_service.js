const token = require ('../../config/jwt');
const user_model = require('./user_model');
const transport = require('../../config/mail')

module.exports = {
	loginUser: function(useremail, userpassword){
		var result = {};
		result.message = 'server error';
		result.data = {};
		result.isDone = 0;
		
		return new Promise((resolve, reject) => {
			
			/*res.cookie('token'
				,jwttoken
				,{
					maxAge: token.jwtExpirySeconds * 1000
				}
			)*/
			user_model.isRegisteredUser(useremail, userpassword).then(function(res){
				
				const jwttoken = token.jwt.sign(
					{
						user_id : res.data,
						useremail : useremail
					}
					,token.jwtkey
					,{
						algorithm: 'HS256'
						,expiresIn: token.jwtExpirySeconds
					}
				)
				
				result.isDone = res.isDone;
				result.message = res.message;
				if(result.isDone === 1) result.data = {token : jwttoken, user_id : res.data};
				//console.log(result)
				resolve(result);
			}).catch(function(err) {
				console.log(err)
				reject(err);
			})
		})
	},
	createVerificationToken : function(){
		//create random 16 character token
		const chars = 'JHJGSDAF6786HDSKJF345J35V3V534K45B3435J33K5LJ64590232SDJKFHSKFKLDSFBKS203N32JVJ';
		var token = '';
		for (var i = 16; i > 0; --i) {
			token += chars[Math.round(Math.random() * (chars.length - 1))];
		}

		// create expiration date
		var expires = new Date();
		//expires.setSeconds(expires.getSeconds() + 55);
		expires.setMinutes(expires.getMinutes() + 5);

		const verificationToken = {
			token: token,
			expires: encodeURI(expires)
		};
		
		return verificationToken
	},
	registerUser : function(username, useremail, userpassword, url){
		var result = {};
		result.message = 'server error';
		result.data = {};
		result.isDone = 0;
		const ref = this
		
		const verificationToken = this.createVerificationToken()
		
		return new Promise((resolve, reject) => {
			
			if(!username){
				result.message = 'Enter first name';
				reject(result);
			}
			else if(username.length > 49){
				result.message = 'username cannot be more than 49 characters';
				reject(result);
			}
			if(!useremail){
				result.message = 'Enter Email Id';
				reject(result);
			}
			else if(!userpassword){
				result.message = 'Enter password';
				reject(result)
			}
			else{
				user_model.userRegistration(username, useremail, userpassword, JSON.stringify(verificationToken)).then(function(res){
					result.isDone = res.isDone;
					result.message = res.message;
					//result.data = jwttoken;
					
					ref.sendRegistrationMail(useremail, verificationToken, url)
					resolve(result);
				}).catch(function(err) {
					//console.log(err)
					result.isDone = err.isDone;
					result.message = err.message;
					reject(result);
				})
			}
		})
	},
	sendRegistrationMail: function(userMailId, verificationToken, url){
		var result = {};
		result.message = 'server error';
		result.data = {};
		result.isDone = 0;
				
		url = url + '/verifyuser?useremail='+ userMailId +'&token=' + verificationToken.token + '&expiry=' + encodeURI(verificationToken.expires)

		const message = {
			from : 'chatapp.123.noreply@gmail.com',
			to : userMailId,
			subject : 'Welcome to Chat app',
			//text : 'Congratulations !! You have created a new account on Chat App',
			html : 'Congratulations !! You have created a new account on Chat App <br /> please follow the <a href="'+ url +'">link</a> to verify yourself ',
		}
		transport.sendMail(message, function(err, res){
			if(err) console.log(err)
			
			//console.log(res)
			transport.close()
		})
	
	},
	// verify user registration
	verifyUserRegistration : function(userMailId, token){
		var result = {};
		result.message = 'server error';
		result.data = {};
		result.isDone = 0;
		
		return new Promise((resolve, reject) => {
			user_model.getRegistrationToken(userMailId).then(function(res){
				
				result.data = JSON.parse(res.data.USER_VERIFICATION_TOKEN)
				
				var user_token = result.data.token
				var user_expires = decodeURI(result.data.expires)
				
				if(token !== user_token){
					result.message = 'token invalid'
					reject(result)
				}
				else if(new Date() > new Date(user_expires)){
					result.message = 'link expired'
					reject(result)
				}
				else{
					const active = 1
					// make user active 
					user_model.updateUserActive(userMailId, active)
					result.isDone = res.isDone
					result.message = 'user validated successfully'
					resolve(result)
				}
			}).catch(function(err){
				result.isDone = err.isDone;
				result.message = err.message;
				reject(err)
			})
		})
	
	},
	// send registration mail again + update token
	sendVerificationMailAgain : function(userMailId, url){
		var result = {};
		result.message = 'server error';
		result.data = {};
		result.isDone = 0;
		const ref = this
		
		return new Promise((resolve, reject) => {
			
			// check if user is not active
			user_model.getUserActiveStatus(userMailId).then(function(res){
				result.message = 'user already activated'
				if(result.data.USER_ACTIVE) reject(result)
				else{
					const verificationToken = ref.createVerificationToken()
					
					// update token
					user_model.updateUserRegistrationVerificationToken(userMailId, JSON.stringify(verificationToken))
					
					//send mail
					ref.sendRegistrationMail(userMailId, verificationToken, url)
					
					result.message = 'verification link sent'
					result.isDone = 1
					resolve(result)
				}
			}).catch(function(err){
				reject(err)
			})
		})
	},
	// send password mail
	sendPassword : function(userMailId){
		var result = {};
		result.message = 'server error';
		result.data = {};
		result.isDone = 0;
		
		return new Promise((resolve, reject) => {
			if(userMailId.length){
				
				user_model.getUserPassword(userMailId).then(function(res){
					const getPassword = res.data.USER_PASSWORD
					
					const message = {
						from : 'kish101993@gmail.com',
						to : userMailId,
						subject : 'Welcome to Chat app',
						//text : 'Password Recovery mail - Chat App',
						html : 'your password for '+ userMailId +' is ' + getPassword ,
					}
					transport.sendMail(message, function(err, res){
						if(err) console.log(err)
						
						//console.log(res)
						transport.close()
					})
					
					result.isDone = 1
					result.message = 'Email sent successfully'
					resolve(result)
					
				}).catch(function(err){
					result.message = err.message
					reject(result)
				})
								
			}
			else{
				result.message = 'invalid user email'
				reject(result)
			}
			
		})
	},	
	
}