//mysql module
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

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

router.post('/', function(req, res, next) {
    console.log(req.body.id);
    var student_id = req.body.id;

    connection.query(`SELECT DISTINCT ttname, ttrank, total_credit FROM user WHERE student_id=${student_id} AND ttrank IS NOT NULL ORDER BY ttrank ASC`, function(err, results, fields) {
        if (err) console.log(err);
        res.send(results);
    });

    // connection.end();
});

router.post('/tt', function(req, res, next) {
    console.log(req.body.ttname);
    var student_id = req.body.id;
    var ttname = req.body.ttname;

    connection.query(`SELECT course_name, professor, time, credit FROM user WHERE student_id=${student_id} and ttname='${ttname}';`, function(err, results, fields) {
        if(err) console.log(err);
        console.log(results);
        res.send(results);
    });
});

module.exports = router;