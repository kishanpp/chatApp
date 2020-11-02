var app = require ('../config/framework.js')
var {server} = require('../config/server.js')
const ensureToken = require('../middleware/ensureToken');
const token = require ('../config/jwt');
const users = require('../model/users/usersAction');

let http = require('http').Server(app);
let io = require('socket.io')(http);
io.listen(server, 
	{ 
		cookie: false ,
		path : '/ws'
	}
)



// secute sockets
io.use(function(socket, next){
	if (socket.handshake.query && socket.handshake.query.token){
		
		token.jwt.verify(socket.handshake.query.token, token.jwtkey, function(err, decoded) {
			if(err){
				//console.log(err)
				return next(new Error('Socket token expired || login to continue'))
			}
			socket.decoded = decoded;
			next();
		})	
	} else {
		next(new Error('Authentication error'));
	}
})



// rest client events on successfull connection
io.on('connection', function(socket) {
	// console.log(Object.keys(io.sockets.connected))	
    console.log(socket.id + ' joined')
	
	socket.use((packet, next) => {
		// if (packet.doge === true) return next();
		// next(new Error('Not a doge error'));
		// console.log(packet)
		next();
	});

	// save this token in database
	users.saveUserToken(socket.id, socket.decoded).then((res) => {
		// on successfull save of token
		socket.emit('joined', {message: 'socket id saved ', res});
	}).catch((err) => {
		// on unsuccessfull save of token 
		socket.emit('joined', {message: ' socket id save error ', err});
	})
	
	// on successfull user connection with client
	socket.on('user_connected', (data) => {
        socket.join(socket.decoded.useremail)
		socket.join(socket.decoded.user_id)
		
		console.log(socket.decoded.useremail + ' join in room')
		// sending to all connected clients
		// create method and get list of friends with socket id and emit emailid and status
		// emit all online friends about online = true
		getLinkedFriendsConnected().then(res => {
			res.data.forEach(function(ele, index){
				// sending to individual socketid (private message)
				io.to(ele.USER_TOKEN).emit('getFriendOnlineStatus', {online : true, friendEmail : socket.decoded.useremail});
			})
		}).catch(err => {
			console.log(err)
		})
		
    });
	//console.log(socket.broadcast)
	//console.log(process)
	
	// inbuild - on disconnect
	socket.on('disconnect', (data) => {
		console.log(data + " " + socket.id + " disconnected...")
		
		logoutCurrentUser(socket.id, new Date(socket.handshake.time).toJSON()).then( result =>{
			// on disconnect inform client
			getLinkedFriendsConnected().then(res => {
				res.data.forEach(function(ele, index){
					// sending to individual socketid (private message)
					io.to(ele.USER_TOKEN).emit('friendLeft', {friendemail : socket.decoded.useremail, last_login : new Date(socket.handshake.time)});
				})
			}).catch(err => {
				console.log(err)
			})
		}).catch(err => {
			console.log(err)
		})
		
		// socket.emit('leave', {message: ' disconnected...'});
    });
	
	// inbuild - when user emit leave event
	socket.on('leave', (data) => {
		// console.log(data.date)
		console.log(socket.decoded.useremail + ' left...')

		logoutCurrentUser(socket.id, data.date).then(result => {
			getLinkedFriendsConnected().then(res => {
				res.data.forEach(function(ele, index){
					// sending to individual socketid (private message)
					io.to(ele.USER_TOKEN).emit('friendLeft', { friendemail : socket.decoded.useremail, last_login : data.date});
				})
			}).catch(err => {
				console.log(err)
			})
		}).catch(err => {
			console.log(err)
		})

		// io.emit('friendLeft', socket.decoded.useremail)
	});
	
	// inbuild - This will send a message letting users know the server is
	// being sutdown.
	process.on('SIGINT', (data) => {
		console.log(data)
		logoutCurrentUser(socket.id, new Date(socket.handshake.time).toJSON())
		// io.emit('oops', {message: 'Server Shut Down'});
		process.exit();
	});

	// inbuild - socket error
	socket.on('error', (error) => {
		console.log('error-> ' + error)
	});
	
	// get user details
	socket.on('get_user_details', function(data){
		users.getUserDetails(socket.decoded.user_id).then((res) =>{
			io.sockets.in(socket.decoded.user_id).emit('user-details', res);
		}).catch((err) =>{
			io.sockets.in(socket.decoded.user_id).emit('user-details', err);
		})
	})
	// save user details
	socket.on('save-user-details',  function(data){
		users.saveUserDetails(socket.decoded.user_id, data.username).then((res) =>{
			//console.log(res)
			//io.sockets.in(socket.decoded.user_id).emit('user-details', res);
		}).catch((err) =>{
			//console.log(err)
			//io.sockets.in(socket.decoded.user_id).emit('user-details', err);
		})
	})

	// update user profile pic
	socket.on('save-user-image',  function(data){
		// console.log(data)
		users.updateUserPic(socket.decoded.user_id, data.email, data.imageData).then((res) =>{
			// emit image to all the onlinefriends
			getLinkedFriendsConnected().then(result => {
				result.data.forEach(function(ele, index){
					// sending to individual socketid (private message)
					io.to(ele.USER_TOKEN).emit('getUpdatedFriendPic', {imageData : res.data, friendEmail : socket.decoded.useremail});
				})
				// send to itself to update the profile pic
				console.log(socket.id)
				io.sockets.in(socket.id).emit('getUpdatedPic', {imageData : res.data});
			}).catch(err => {
				console.log(err)
			})
			
			//io.sockets.in(socket.decoded.user_id).emit('user-details', res);
		}).catch((err) =>{
			//console.log(err)
			//io.sockets.in(socket.decoded.user_id).emit('user-details', err);
		})
	})

	// for adding new user
	socket.on('addNewUser', function(data){
		//console.log(data) //new user id
		const myemail = socket.decoded.useremail //data.my_user_name
		//const myId = data.my_user_id
		const friend_email = data.friend_email
		socket.join(friend_email)
		
		if(myemail == friend_email) io.sockets.in(friend_email).emit('added_new_user_error', {msg: "you cannot add yourself"});
		else{
			// store the added friend to database
			users.linkNewFriend(socket.decoded.user_id, friend_email).then((res) => {
				//console.log('then ')
				//console.log(res)
				
				io.sockets.in(friend_email).emit('added_new_user', {msg: 'hello this is ' + myemail, result : res});
			}).catch((err) => {
				//console.log('err ')
				//console.log(err)
				io.sockets.in(friend_email).emit('added_new_user_error', {msg: err.message});
			})
		}		
		
	})
  
	// get list of friends of current user id
	socket.on('get_friends', function(data){

		// number of connections
		//console.log(socket.client.conn.server.clientsCount)
		
		let fetchOnlyOnline = false
		// get all user names
		users.getLinkedUsers(socket.id, fetchOnlyOnline).then((res) => {
			io.sockets.in(socket.id).emit('list_of_friends', res);
		}).catch((err) => {//console.log(err)
			io.sockets.in(socket.id).emit('list_of_friends', err);
		})
	})
	
	// get messages of friends of current user id
	socket.on('get-chat-messages', function(data){
		//console.log(socket.decoded)
		
		//socket.join(data.myId)
		//socket.join(socket.decoded.username)
		users.getMessages(socket.decoded.user_id, data.friendName).then((res) => {
			//console.log(res)
			io.sockets.in(socket.id).emit('message_list', res);
		}).catch((err) => {
			//console.log(err)
			io.sockets.in(socket.id).emit('message_list', err);
		})
		io.sockets.in(socket.decoded.user_id).emit('connections', {res : io.engine.clientsCount});
	})
	//console.log(new Date().toLocaleString())
	// receive msg of particular person and broadcast to him
	socket.on('chat-message', (room) => {
		if(room.friendRoom){
			socket.join(room.friendRoom) 
			// console.log(room)
			//save message
			users.saveMessage(socket.decoded.user_id, room.friendRoom, room.message, room.date, room.time, room.type)
			
			//io.sockets.in(room).broadcast.emit('MESSAGE', data)
			io.sockets.to(room.friendRoom).to(socket.id).emit('MESSAGE', {'userid' : room.me, 'msg': room.message, date : room.date, time : room.time, 'type': room.type, 'original_file_name' : room.original_file_name || ''})
		}		
	});
    // type
	socket.on('typing', (data) => {
		// on disconnect inform client
		//socket.join(data.friendRoom) 
		socket.to(data.friendRoom).emit('typing-status', {friend_name : data.friendRoom, me : socket.decoded.useremail, status: data.status});
	});

	function getLinkedFriendsConnected () {
		// get all socket id's which are connected to server
		// console.log(Object.keys(io.sockets.connected))
		// let allSocketIds= Object.keys(io.sockets.connected)
		// get all user names
		let fetchOnlyOnline = true
		return new Promise((resolve, reject) => {
			users.getLinkedUsers(socket.id, fetchOnlyOnline).then((res) => {
				
				if(res.isDone){
					resolve(res)
					// io.to(socket.id).emit('getFriendsOnlineStatus', {online : true, data : res.data});
					

					// sending to individual socketid (private message)
					// io.to(socketId).emit('hey', 'I just met you');
				}
				// io.sockets.in(socket.id).emit('list_of_friends', res);
			}).catch((err) => {
				reject(err)
				//console.log(err)
				// io.sockets.in(socket.id).emit('list_of_friends', err);
			})
		});
		// let result = await promise; // wait until the promise resolves (*)

  		// return result; // "done!"
	}
	
	// set IS_ONLINE = false and update lastlogin date/time
	function logoutCurrentUser(socketId, logOutDateTime) {
		// console.log(socketId)
		return new Promise((resolve, reject) => {
			users.updateUserLogInStatus(socketId, logOutDateTime).then((res)=>{
				resolve(res)
			}).catch((err)=>{
				reject(err)
			})
		})
	}
});
// io.clients((error, clients) => {
// 	if (error) throw error;
// 	console.log(clients); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
//   });
//console.log(io)
module.exports = io ;