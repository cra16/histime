var mysql = require('mysql');
var database;

function connectDatabase() {
    if (!database) {
        database = mysql.createConnection({
            host     : 'localhost',
            user     : 'tester',
            password : '1234',
            database : 'histime'
        });

        database.connect(function(err) {
            if(err) console.log(err);
            console.log('You are now connected...');
        });
    }
    return database;
}

module.exports = connectDatabase();