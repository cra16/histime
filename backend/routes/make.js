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

router.post('/', function(req, res, next) {
    console.log(req.body.id);
    var student_id = req.body.id;

    connection.query(`SELECT DISTINCT ttname, ttrank, total_credit FROM user WHERE student_id=${student_id} AND ttrank IS NOT NULL ORDER BY ttrank ASC`, function(err, results, fields) {
        if (err) console.log(err);
        res.send(results);
    });

    // connection.end();
});

//나중에 포스트형식으로 바꿧 req 사용할 예정
//make page 초기에 즐겨찾기 리스트 생성해주는 친구
//input : student_id
//output : list of course_names
router.get('/favorite', function(req, res) {
    // console.log(req.body.id);
    var student_id = 21500670;
    connection.query(`SELECT course_name FROM user WHERE student_id=${student_id} and favorited= TRUE;`, function(err, results, fields) {
        if(err) console.log(err);
        console.log(results);
        res.send(results);
    });
});

//나중에 포스트형식으로 바꿧 req 사용할 예정
//이름으로 검색시
//input : course_name
//output : list of object(name, code, time, credit, gubun, professor, english)
router.get('/search/name', function(req, res) {
    // console.log(req.body.course_name);
    var course_name = '철학';
    connection.query(`SELECT name, code, time, credit, gubun, professor, english FROM courses WHERE name like '%${course_name}%';`, function(err, courseList, fields) {
        if(err) console.log(err);
        console.log(courseList);
        res.send(courseList);
    });
});





module.exports = router;
