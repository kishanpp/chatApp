const token = require ('../../config/jwt');
const user_model = require('./usersModel');

module.exports = {
	
	// save user token when login/ page refresh
	saveUserToken: function (socketId, userData){
		
		var result = {};
		result.message = 'server error';
		result.data = {};
		result.isDone = 0;
		
		return new Promise((resolve, reject) => {
			user_model.saveToken(socketId, userData).then(function(res){
				result.isDone = res.isDone;
				result.message = res.message;
				result.data = res.data;
				resolve(result);
			}).catch(function(err) {
				console.log(err)
				reject(err);
			})
		})
	},
	// set logout = false
	updateUserLogInStatus : function (socketId, logOutDateTime) {
		var result = {};
		result.message = 'server error';
		result.data = {};
		result.isDone = 0;

		return new Promise((resolve, reject) => {
			user_model.updateUserLogInStatus(socketId, logOutDateTime).then(function(res){
				result.isDone = res.isDone;
				result.message = res.message;
				result.data = res.data;
				resolve(result);
			}).catch(function(err) {
				console.log(err)
				reject(err);
			})
		})
	},
	// insert linked friend id for the current user
	linkNewFriend: function (myId, friend_email){
		
		var result = {};
		result.message = 'server error';
		result.data = {};
		result.isDone = 0;
		
		return new Promise((resolve, reject) => {
			
			user_model.getUserIdFromName(friend_email).then(function(res){
				result.isDone = res.isDone;
				result.message = res.message;
				result.data = res.data;
				user_model.attachNewFriend(myId, result.data.USER_ID).then(function(res){
					result.isDone = res.isDone;
					result.message = res.message;
					resolve(result);
					
					// add same link for frined -> myid
					user_model.attachNewFriend(result.data.USER_ID, myId).then(function(res){
						
					}).catch(function(err){
						
					})
				}).catch(function(err) {
					//console.log(err)
					reject(err);
				})
			}).catch(function(err){
				//console.log(err)
				reject(err);
			})
		})
	},
	// get all connected users
	getLinkedUsers: function (current_user_socket_id, fetchOnlyOnline){
		var result = {};
		result.message = 'server error';
		result.data = {};
		result.isDone = 0;
		
		return new Promise((resolve, reject) => {
			
			user_model.getUsersList(current_user_socket_id, fetchOnlyOnline).then(function(res){
				result.isDone = res.isDone;
				result.data = res.data;	
				result.message = res.message
				resolve(result)
			}).catch(function(err){
				//console.log(err)
				reject(err);
			})
		})
	},
	// save message
	saveMessage: function (myId, friendName, message, date, time, type ){
		
		var result = {};
		result.message = 'server error';
		result.data = {};
		result.isDone = 0;
		
		//get friend Id
		user_model.getUserIdFromName(friendName).then(function(res){
			result.isDone = res.isDone;
			result.message = res.message;
			result.data = res.data;
			user_model.saveNewMessage(myId, result.data, message, date, time, type).then(function(res){
				result.isDone = res.isDone;
				result.message = res.message;
				//console.log(result)
				//resolve(result);
			}).catch(function(err) {
				//console.log(err)
				//reject(err);
			})
		}).catch(function(err){
			//console.log(err)
			//reject(err);
		})
	},
	// save message
	getMessages : function (myId, friendName){
		
		var result = {};
		result.message = 'server error';
		result.data = {};
		result.isDone = 0;
		
		return new Promise((resolve, reject) => {
			//get friend Id
			user_model.getUserIdFromName(friendName).then(function(res){
				result.isDone = res.isDone;
				result.message = res.message;
				result.data = res.data;
				user_model.getMessages(myId, result.data).then(function(res){
					result.isDone = res.isDone;
					result.message = res.message;
					result.data = res.data;
					resolve(result);
				}).catch(function(err) {
					//console.log(err)
					reject(err);
				})
			}).catch(function(err){
				//console.log(err)
				reject(err);
			})
		})
	},
	// get user details 
	getUserDetails : function(myId){
		var result = {};
		result.message = 'server error';
		result.data = {};
		result.isDone = 0;
		
		return new Promise((resolve, reject) => {
			//get friend Id
			user_model.getUserDetails(myId).then(function(res){
				result.isDone = res.isDone;
				result.message = res.message;
				result.data = res.data;
				resolve(result)
			}).catch(function(err){
				result.isDone = err.isDone
				result.message = err.message
				//console.log(err)
				reject(err);
			})
		})
	},
	// update user details 
	saveUserDetails : function(myId, username){
		var result = {};
		result.message = 'server error';
		result.data = {};
		result.isDone = 0;
		
		
		return new Promise((resolve, reject) => {
			//get friend Id
			if(username.length > 49){
				result.message = 'username limit 49';
				reject(result)
			}
			else{
				user_model.saveUserDetails(myId, username).then(function(res){
					result.isDone = res.isDone;
					result.message = res.message;
					result.data = res.data;
					resolve(result)
				}).catch(function(err){
					result.isDone = err.isDone
					result.message = err.message
					//console.log(err)
					reject(err);
				})
			}
		})
	},
	// update user profile picture 
	updateUserPic : function(userId, email, imageData){
		var result = {};
		result.message = 'server error';
		result.data = {};
		result.isDone = 0;
		
		
		return new Promise((resolve, reject) => {
			//
			// if(username.length > 49){
			// 	result.message = 'username limit 49';
			// 	reject(result)
			// }
			// else{
				user_model.updateUserPic(userId, email, imageData).then(function(res){
					result.isDone = res.isDone;
					result.message = res.message;
					result.data = res.data;
					resolve(result)
				}).catch(function(err){
					result.isDone = err.isDone
					result.message = err.message
					//console.log(err)
					reject(err);
				})
			// }
		})
	},
}