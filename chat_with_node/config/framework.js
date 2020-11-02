var express = require('express');

const app = express();



//setting public folder middleware
app.use(express.static('public')); //Serves resources from public folder

//Serves all the request which includes /images in the url from Images folder
app.use('/images', express.static(__dirname + '/../public/Images'));

//app.use(express.static('views'));

//enable cors
const cors = require('cors');
app.use(cors({origin:true}));



//console.log(process.env.NODE_ENV)
module.exports = app;