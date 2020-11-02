const sql = require ('../../config/sql');

module.exports = {
	isRegisteredUser: function(useremail, userpassword){
		var result = {};
		result.message = 'database error';
		result.data = {};
		result.isDone = -1;
		
		return new Promise((resolve, reject) => {
			// connect to your database
			sql.sql.connect(sql.config, function (err) {

				if (err) console.log(err);

				// create Request object
				const request = new sql.sql.Request();
				request.multiple =  true;
				//request.input('username', sql.sql.varchar, username);
				const query = "SELECT * FROM USER_DETAILS WHERE USER_EMAIl = '" + useremail + "' AND USER_PASSWORD = '" + userpassword + "'";

				// query to the database and get the records
				request.query(query , function (err, res) {

					if (err) console.log(err)
					// send records as a response
					if(res.rowsAffected[0]){
						if( !res.recordset[0].USER_ACTIVE ){
							result.isDone = 2;
							result.message = 'Please verify your registration';
							resolve(result)
						}
						else{
							result.isDone = 1;
							result.data = res.recordset[0].USER_ID
							result.message = 'Login Sucessfull';
							resolve(result)
						}						
					}
					else{
						result.message = 'Invalid user';
						result.isDone = 0;
						reject(result)
					}
				});
			});
		})
	},
	// check user is already registered 
	checkUserRegstered: function(useremail){
		var result = {};
		result.message = 'database error';
		result.data = {};
		result.isDone = -1;
		
		return new Promise((resolve, reject) => {
			// connect to your database
			sql.sql.connect(sql.config, function (err) {

				if (err) console.log(err);

				// create Request object
				const request = new sql.sql.Request();
				request.multiple =  true;
				//request.input('username', sql.sql.varchar, username);
				const query = "SELECT * FROM USER_DETAILS WHERE USER_EMAIL = '" + useremail + "'";

				// query to the database and get the records
				request.query(query , function (err, res) {

					if (err) console.log(err)
					// send records as a response
					if(res.rowsAffected[0]){
						result.isDone = 0;
						result.message = 'User eamil already registered';
						resolve(result)
					}
					else{
						result.message = 'Invalid user name';
						result.isDone = 1;
						reject(result)
					}
				});
			});
		})
	},
	// register new user if not present
	userRegistration : function(username, useremail, userpassword, verificationToken){
		var result = {};
		result.message = 'database error';
		result.data = {};
		result.isDone = -1;
		
		return new Promise((resolve, reject) => {
			// connect to your database
			this.checkUserRegstered(useremail).then(function(res){
				//console.log(res)
				// user name already exists.
				result.isDone = res.isDone
				result.message = res.message
				reject(result)
			}).catch(function(err){
				// user name not taken. can be registered
				//console.log(err)
				
				sql.sql.connect(sql.config, function (err) {

					if (err) console.log(err);

					// create Request object
					const request = new sql.sql.Request();
					request.multiple =  true;
					//request.input('username', sql.sql.varchar, username);
					
					const query = "INSERT INTO USER_DETAILS (USER_NAME, USER_EMAIL, USER_PASSWORD, USER_VERIFICATION_TOKEN) VALUES ('" + username + "', '" + useremail + "','" + userpassword + "', '"+ verificationToken +"')";

					// query to the database and get the records
					request.query(query , function (err, res) {

						if (err) console.log(err)

						// send records as a response
						if(res.rowsAffected[0]){
							result.isDone = 1;
							result.message = 'registration successfull. Please check your mail for account verification';
							resolve(result)
						}
						else{
							result.message = 'database error';
							result.isDone = 0;
							reject(result)
						}
					})				
				});
			});
		})
	},
	// get user verification token to verify
	getRegistrationToken: function(useremail){
		var result = {};
		result.message = 'database error';
		result.data = {};
		result.isDone = -1;
		
		return new Promise((resolve, reject) => {
			// connect to your database
			sql.sql.connect(sql.config, function (err) {

				if (err) console.log(err);

				// create Request object
				const request = new sql.sql.Request();
				request.multiple =  true;
				//request.input('username', sql.sql.varchar, username);
				const query = "SELECT USER_VERIFICATION_TOKEN FROM USER_DETAILS WHERE USER_EMAIL = '" + useremail + "'";

				// query to the database and get the records
				request.query(query , function (err, res) {
					
					if (err) console.log(err)
					// send records as a response
					if(res.rowsAffected[0]){
						result.isDone = 1;
						result.data = res.recordset[0];
						result.message = 'registered user found';
						resolve(result)
					}
					else{
						result.message = 'registered user not found';
						result.isDone = 0;
						reject(result)
					}
				});
			});
		})
	},
	// update user active status
	updateUserActive: function(userMailId, active){
		var result = {};
		result.message = 'database error';
		result.data = {};
		result.isDone = -1;
				
		// connect to your database
		sql.sql.connect(sql.config, function (err) {

			if (err) console.log(err);

			// create Request object
			const request = new sql.sql.Request();
			request.multiple = true;
			//request.input('username', sql.sql.varchar, username);
			const query = "UPDATE USER_DETAILS SET USER_ACTIVE = '" + active + "' WHERE USER_EMAIL = '" + userMailId + "'";

			// query to the database and get the records
			request.query(query , function (err, res) {
				
				if (err) console.log(err)
				// send records as a response
				if(res.rowsAffected[0] === 1){
					result.isDone = 1;
					result.message = 'User made active';
					//resolve(result)
				}
				else{
					result.message = 'some databse error on making user active';
					result.isDone = 0;
					console.log(result)
					//reject(result)
				}
			});
		});
	},
	// get user active status
	getUserActiveStatus : function(userMailId){
		var result = {};
		result.message = 'database error';
		result.data = {};
		result.isDone = -1;
		
		return new Promise((resolve, reject) => {
			// connect to your database
			sql.sql.connect(sql.config, function (err) {

				if (err) console.log(err);

				// create Request object
				const request = new sql.sql.Request();
				request.multiple = true;
				//request.input('username', sql.sql.varchar, username);
				const query = "SELECT USER_ACTIVE FROM USER_DETAILS WHERE USER_EMAIL = '" + userMailId + "'";

				// query to the database and get the records
				request.query(query , function (err, res) {
					
					if (err) console.log(err)
					// send records as a response
					if(res.rowsAffected[0] === 1){
						result.isDone = 1;
						result.data = res.recordset[0]
						result.message = 'User registration status';
						resolve(result)
					}
					else{
						result.message = 'databse error';
						result.isDone = 0;
						//console.log(result)
						reject(result)
					}
				});
			});
		})
	},
	// update the token for user registration
	updateUserRegistrationVerificationToken : function(userMailId, verificationToken){
		var result = {};
		result.message = 'database error';
		result.data = {};
		result.isDone = -1;
		
		// connect to your database
		sql.sql.connect(sql.config, function (err) {

			if (err) console.log(err);

			// create Request object
			const request = new sql.sql.Request();
			request.multiple = true;
			//request.input('username', sql.sql.varchar, username);
			const query = "UPDATE USER_DETAILS SET USER_VERIFICATION_TOKEN = '" + verificationToken + "' WHERE USER_EMAIL = '" + userMailId + "'";

			// query to the database and get the records
			request.query(query , function (err, res) {
				
				if (err) console.log(err)
				// send records as a response
				if(res.rowsAffected[0] === 1){
					result.isDone = 1;
					
					result.message = 'User registration status updated succesfully';
					//console.log(result)
					//resolve(result)
				}
				else{
					result.message = 'databse error';
					result.isDone = 0;
					//console.log(result)
					//reject(result)
				}
			});
		});
	},
	// get user password
	getUserPassword : function(userMailId){
		var result = {};
		result.message = 'database error';
		result.data = {};
		result.isDone = -1;
		
		return new Promise((resolve, reject) => {
			// connect to your database
			sql.sql.connect(sql.config, function (err) {

				if (err) console.log(err);

				// create Request object
				const request = new sql.sql.Request();
				request.multiple = true;
				//request.input('username', sql.sql.varchar, username);
				const query = "SELECT USER_PASSWORD FROM USER_DETAILS WHERE USER_NAME = '" + userMailId + "'";

				// query to the database and get the records
				request.query(query , function (err, res) {
					
					if (err) console.log(err)
					// send records as a response
					if(res.rowsAffected[0] === 1){
						result.isDone = 1;
						result.data = res.recordset[0]
						result.message = 'user password found';
						//console.log(result)
						resolve(result)
					}
					else{
						result.message = 'user not found';
						result.isDone = 0;
						//console.log(result)
						reject(result)
					}
				});
			});
		});
	},
}