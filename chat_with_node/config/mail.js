var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
	service: 'gmail',
    port: 465,
	secure: true, // use SSL
	auth: {
		user: "chatapp.123.noreply@gmail.com",
		pass: "chatapp@123"
    }
});

module.exports = transporter