//mysql module
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

// 비밀번호는 별도의 파일로 분리해서 버전관리에 포함시키지 않아야 합니다. 
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'h010638847',
    database : 'histime'
});


connection.connect(function(err) {
    if(err) console.log(err);
    console.log('You are now connected...');
});

//show list
router.post('/', function(req, res, next) {
    var student_id = req.body.student_id;

    connection.query(`SELECT DISTINCT ttname, ttrank, total_credit FROM user WHERE student_id=${student_id} AND total_credit IS NOT NULL`, function(err, results, fields) {
        if (err) console.log(err);
        res.send(results);
    });

    // connection.end();
});

//show timetable
router.post('/tt', function(req, res, next) {
    console.log(req.body.ttname);
    var student_id = req.body.student_id;
    var ttname = req.body.ttname;
    var ttshow_query = `SELECT code, color, course_name, credit, day, k_start, height, professor, size, start, time FROM user WHERE student_id=${student_id} and ttname='${ttname}';`
    console.log(ttshow_query);
    connection.query(ttshow_query, function(err, results, fields) {
        if(err) console.log(err);
        res.send(results);
    });
});

//시간표 이름 수정
//input : student_id, original_ttname, modified_ttname
//output : NULL
router.post('/modify_ttname', function(req, res, next) {
    var student_id = req.body.student_id;
    var original_ttname = req.body.original_ttname;
    var modified_ttname = req.body.modified_ttname;

    connection.query(`UPDATE user set ttname = '${modified_ttname}' WHERE student_id = ${student_id} and ttname = '${original_ttname}';`, function(err, results, fields) {
        if(err) console.log(err);
        console.log(results);
    });
});

//시간표 삭제
//input : student_id, ttname
//output : NULL
router.post('/del_tt', function(req, res, next) {
    var student_id = req.body.student_id;
    var ttname = req.body.ttname;

    connection.query(`DELETE FROM user WHERE student_id = ${student_id} AND ttname = '${ttname}';`, function(err, results, fields) {
        if(err) console.log(err);
        console.log(results);
    });
});

//시간표 수정
router.get('/modify_tt', function(req, res, next) {

});


module.exports = router;


//시간표순위바꾸기
