//mysql module
var express = require('express');
var router = express.Router();
var mysql = require('mysql');



router.get('/', function(req, res, next) {
    // 비밀번호는 별도의 파일로 분리해서 버전관리에 포함시키지 않아야 합니다. 
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'tester',
        password : '1234',
        database : 'histime'
    });

    connection.connect(function(err) {
        if(err) console.log(err);
        console.log('You are now connected...');
    });
    connection.query('SELECT * FROM user', function (error, results, fields) {
        if (error) {
            console.log(error);
        }
    });
    connection.end();
});

module.exports = router;