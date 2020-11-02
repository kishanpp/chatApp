var app = require ('./config/framework.js')
var server = require('./config/server.js')

const server_config = server.server

// request to domain routes
const route = require('./route/route.js')
app.use('/', route)

// request to all user routes
var users_routes = require('./route/user_route.js');
app.use('/user', users_routes);

// request to all admin path

// request to sockets
var socket_routes = require('./route/socket_route.js');
//app.use(socket_routes);

//If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
	res.status(404);
	res.json({status:404,title:"Not Found",msg:"Route not found"});
	//next()
});
 
// create error reported file on a daily basis and send mail too.
//var notifier = require('node-notifier')
var errorhandler = require('errorhandler')
app.use(errorhandler({ log: errorNotification }))
function errorNotification (err, str, req, res, next) {
  var title = 'Error in ' + req.method + ' ' + req.url
console.log(err + '---')

  /*notifier.notify({
    title: title,
    message: str
  })*/
}
//console.log(app.get('env'))
/*app.use(function (err, req, res, next) {
  console.log(err + '---')
  next(err)
  //console.log(req)
  //console.log(res)
  //console.log(next)
})*/