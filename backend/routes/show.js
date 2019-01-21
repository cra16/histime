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
    var student_id = '21500670';//req.body.student_id;

    connection.query(`SELECT DISTINCT ttname, ttrank, total_credit FROM user WHERE student_id=${student_id} AND ttrank IS NOT NULL ORDER BY ttrank ASC`, function(err, results, fields) {
        if (err) console.log(err);
        res.send(results);
    });

    // connection.end();
});

router.post('/tt', function(req, res, next) {
    console.log(req.body.ttname);
    var student_id = '21500670';//req.body.student_id;
    var ttname = '실험용 시간표';//req.body.ttname;

    connection.query(`SELECT course_name, professor, time, credit FROM user WHERE student_id=${student_id} and ttname='${ttname}';`, function(err, results, fields) {
        if(err) console.log(err);
        res.send(results);
    });
});

//시간표 이름 수정
//input : student_id, original_ttname, modified_ttname
//output : NULL
router.get('/modify_ttname', function(req, res, next) {
    var student_id = 21500670; //req.body.id;
    var original_ttname = ''; //req.body.original_ttname;
    var modified_ttname = ''; //req.body.modified_ttname;

    connection.query(`UPDATE user set ttname = '${modified_ttname}' WHERE student_id = ${student_id} and ttname = '${original_ttname}';`, function(err, results, fields) {
        if(err) console.log(err);
        console.log(results);
    });
});



module.exports = router;


//시간표순위바꾸기
