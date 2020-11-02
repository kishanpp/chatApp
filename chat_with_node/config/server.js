var app = require('./framework.js')
const cookieParser = require('cookie-parser')
var path = require('path');
const cons = require('consolidate')
var favicon = require('serve-favicon')
const multer = require('multer');


app.use(favicon(path.join(__dirname, '../public/Image/icons', 'favicon.ico')))

var bodyParser = require("body-parser");

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

var server = app.listen(5000, function () {
    console.log('Node server is running on port 5000...');
});

//console.log(new (app.get('view')))
//console.log(process.cwd())
//app.engine('html', cons.swig)
//app.set('views', path.join(__dirname + '/../views'));
app.set('view engine','ejs')

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const file_primary_name = path.basename(file.originalname, path.extname(file.originalname))
        const file_ext = path.extname(file.originalname)
        // const file_name = file.originalname
        const file_name = file_primary_name + '_' + Date.now() + file_ext
        cb(null, file_name)
    }
})

var upload = multer({ storage: storage }).single('file')

// module.exports = upload; 
// module.exports =  server;
module.exports = {
    server,
    upload
}