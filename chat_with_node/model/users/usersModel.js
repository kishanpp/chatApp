const sql = require ('../../config/sql');

module.exports = {
	
	// save the user token
	saveToken: function(socketId, userData){
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
				
				let query = "UPDATE USER_DETAILS ";
					query += "SET USER_TOKEN = '" + socketId + "' ";
					query += ", IS_ONLINE = 1 "
					query += "WHERE USER_ID = '" + userData.user_id + "'";

				// query to the database and get the records
				request.query(query , function (err, res) {

					if (err) console.log(err)
					// send records as a response
					if(res.rowsAffected[0]){
						result.isDone = 1;
						result.data = socketId
						result.message = 'Socket id Updated successfully';
						resolve(result)
					}
					else{
						result.message = 'socket id not updated';
						result.isDone = 0;
						reject(result)
					}
				});
			})
		})
	},
	// update the user log out status
	updateUserLogInStatus: function(socketId, logOutDateTime){
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
				
				let query = "UPDATE USER_DETAILS ";
					query += "SET IS_ONLINE = 0 "
					query += ",LAST_LOGIN = convert(datetime2, '" + logOutDateTime + "') "
					query += "WHERE USER_TOKEN = '" + socketId + "'";

				// query to the database and get the records
				request.query(query , function (err, res) {

					if (err) console.log(err)
					// send records as a response
					if(res.rowsAffected[0]){
						result.isDone = 1;
						result.data = socketId
						result.message = 'logged out successfully';
						resolve(result)
					}
					else{
						result.message = 'user not logged out';
						result.isDone = 0;
						reject(result)
					}
				});
			})
		})
	},
	// return userId from given user name
	getUserIdFromName: function(friend_email){
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
				
				const query = "SELECT USER_ID FROM USER_DETAILS WHERE USER_EMAIL = '" + friend_email + "'";

				// query to the database and get the records
				request.query(query , function (err, res) {
					
					if (err) console.log(err)
					
					// send records as a response
					if(res.rowsAffected[0]){
						result.isDone = 1;
						result.data = res.recordset[0]
						result.message = 'User id found from name';
						resolve(result)
					}
					else{
						result.message = 'User id not found from name';
						result.isDone = 0;
						reject(result)
					}
				});
			})
		})
	},
	
	// add new friend Id for the current user id
	attachNewFriend: function(myId, friend_id){
		
		var result = {};
		result.message = 'database error';
		result.data = {};
		result.isDone = -1;
		
		return new Promise((resolve, reject) => {

			const friendUserId = friend_id
			// connect to your database
			sql.sql.connect(sql.config, function (err) {

				if (err) console.log(err);
				
				// create Request object
				const request = new sql.sql.Request();
				
				const query = "INSERT INTO USER_LINKED (USER_ID, FRIEND_USER_ID) VALUES ('"+ myId +"', '"+ friendUserId +"')";

				// query to the database and get the records
				request.query(query , function (err, res) {
					if (err) {
						//console.log(err.message)
						result.message = 'User already linked';
						result.isDone = 0;
						reject(result)
					}
					else {	
						if(res.rowsAffected[0] === 1){
							result.isDone = 1;
							//result.data = res.recordset[0]
							result.message = 'User linked successfully';
							resolve(result)
						}
						else{
							result.message = 'User not linked due to some reason';
							result.isDone = 0;
							reject(result)
						}
					}
				});
			})
		})		
	},
	// get friend list
	getUsersList: function (current_user_socket_id, fetchOnlyOnline){
		var result = {};
		result.message = 'database error';
		result.data = {};
		result.isDone = -1;
		// console.log(fetchOnlyOnline)
		return new Promise((resolve, reject) => {

			// connect to your database
			sql.sql.connect(sql.config, function (err) {

				if (err) console.log(err);
				
				// create Request object
				const request = new sql.sql.Request();
				
				//const query = "SELECT UD.USER_NAME AS FRIENDS FROM USER_DETAILS UD INNER JOIN USER_LINKED UL ON UD.USER_ID = UL.FRIEND_USER_ID WHERE UL.USER_ID = " + user_id;
				var query = "	   SELECT DISTINCT UD.USER_EMAIL "
					  query+= "		 ,UD.USER_TOKEN "
					  query+= "		 ,UD.IS_ONLINE "
					  query+= "		 ,UD.USER_PIC"
					  query+= "      ,UD.LAST_LOGIN"
					  query+= "		 FROM USER_DETAILS UD "
					  query+= "INNER JOIN USER_LINKED UL "
					  query+= "		   ON UD.USER_ID = UL.USER_ID "
					  query+= "		WHERE UD.USER_ID IN ( "
					  query+= "								SELECT UL.FRIEND_USER_ID "
					  query+= "								  FROM USER_DETAILS UD "
					  query+= "							INNER JOIN USER_LINKED UL "
					  query+= "									ON UD.USER_ID = UL.USER_ID "
					  query+= "								 WHERE UD.USER_TOKEN = '"+ current_user_socket_id +"' "
					  query+= "		) "
					  if(fetchOnlyOnline)
					  query+= "								 AND UD.IS_ONLINE = 1"

				// query to the database and get the records
				request.query(query , function (err, res) {
					if (err) console.log(err.message)
						// console.log(query)
					if(res && res.rowsAffected[0] > 0){
						result.isDone = 1;
						result.data = res.recordset
						result.message = 'list of friends';
						resolve(result)
					}
					else{
						result.message = 'no friends';
						result.isDone = 0;
						reject(result)
					}
				});
			})
		})
	},
	//  save message
	saveNewMessage: function (myId, friend_id, message, date, time, type){
		var result = {};
		result.message = 'database error';
		result.data = {};
		result.isDone = -1;
		console.log(message)
		return new Promise((resolve, reject) => {

			// connect to your database
			sql.sql.connect(sql.config, function (err) {

				if (err) console.log(err);
				
				const friendUserId = friend_id.USER_ID

				// create Request object
				const request = new sql.sql.Request();
				let query = ""
				if(type == 'text'){
					query = "INSERT INTO USER_MESSAGES (USER_ID, FRIEND_ID, MESSAGE, DATE, TIME, TYPE) VALUES ('" + myId + "', '" + friendUserId + "', N'"+ message +"', '"+ date + "', '"+ time +"', '"+ type +"')";
				}
				else if(type == 'document'){
					query = "INSERT INTO USER_MESSAGES (USER_ID, FRIEND_ID, DOCUMENT_NAME, DATE, TIME, TYPE) VALUES ('" + myId + "', '" + friendUserId + "', '"+ message +"', '"+ date + "', '"+ time +"', '"+ type +"')";
				}

				// query to the database and get the records
				request.query(query , function (err, res) {
					if (err) console.log(err.message)

					if(res && res.rowsAffected[0]){
						result.isDone = 1;
						result.data = res.recordset
						result.message = 'save message successfull';
						resolve(result)
					}
					else{
						result.message = 'no message saved';
						result.isDone = 0;
						reject(result)
					}
				});
			})
		})
	},
	//  retrieve message
	getMessages: function (myId, friend_id){
		var result = {};
		result.message = 'database error';
		result.data = {};
		result.isDone = -1;
		
		return new Promise((resolve, reject) => {

			// connect to your database
			sql.sql.connect(sql.config, function (err) {

				if (err) console.log(err);
				
				const friendUserId = friend_id.USER_ID

				// create Request object
				const request = new sql.sql.Request();
				
				const query = "SELECT USER_ID, FRIEND_ID, MESSAGE, DOCUMENT_NAME, DATE, TIME, TYPE FROM USER_MESSAGES WHERE ((USER_ID = '"+ myId +"' AND FRIEND_ID = '"+ friendUserId +"') OR (USER_ID = '"+ friendUserId +"' AND FRIEND_ID = '"+ myId +"'))";

				// query to the database and get the records
				request.query(query , function (err, res) {
					if (err) console.log(err.message)
					//console.log(res)
					if(res && res.rowsAffected[0]){
						result.isDone = 1;
						result.data = res.recordset
						result.message = 'My friend messages';
						resolve(result)
					}
					else{
						result.message = 'No messages yet';
						result.isDone = 0;
						reject(result)
					}
				});
			})
		})
	},
	//  get user details
	getUserDetails: function (myId){
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
				
				const query = "SELECT USER_NAME, USER_EMAIL, USER_PIC FROM USER_DETAILS WHERE USER_ID = '"+ myId +"' ";

				// query to the database and get the records
				request.query(query , function (err, res) {
					if (err) console.log(err)
					if(res && res.rowsAffected[0] === 1){
						result.isDone = 1;
						result.data = res.recordset[0]
						result.message = 'user details';
						resolve(result)
					}
					else{
						result.message = 'no user details';
						result.isDone = 0;
						reject(result)
					}
				});
			})
		})
	},
	//  update user details
	saveUserDetails: function (myId, username){
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
				
				const query = "UPDATE USER_DETAILS SET USER_NAME = '" + username + "' WHERE USER_ID = '"+ myId +"' ";

				// query to the database and get the records
				request.query(query , function (err, res) {
					if (err) console.log(err)
					if(res && res.rowsAffected[0] === 1){
						result.isDone = 1;
						result.data = username
						result.message = 'user details updated successfully';
						resolve(result)
					}
					else{
						result.message = 'no user details updated';
						result.isDone = 0;
						reject(result)
					}
				});
			})
		})
	},
	//  update user profile pics
	updateUserPic: function (userId, email, imageData){
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
				
				const query = "UPDATE USER_DETAILS SET USER_PIC = '" + imageData + "' WHERE USER_ID = '"+ userId +"' ";

				// query to the database and get the records
				request.query(query , function (err, res) {
					// console.log(query)
					if (err) console.log(err)
					if(res && res.rowsAffected[0] === 1){
						result.isDone = 1;
						result.data = imageData
						result.message = 'user profile photo updated successfully';
						resolve(result)
					}
					else{
						result.message = 'no user profile photo updated';
						result.isDone = 0;
						reject(result)
					}
				});
			})
		})
	},
}