var sql = require("mssql");

    // config for your database
    var config = {
        user: 'sa',
        password: 'mindfire',
        server: 'KISHAN-PC', 
        database: 'chatApp' ,
		port: 1433,
		options: {
			enableArithAbort: true,
			//encrypt: true
		}
    };
module.exports = {sql, config}