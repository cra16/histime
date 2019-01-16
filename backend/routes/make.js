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

//이름으로 검색시
//input : course_name
//output : list of object(name, code, time, credit, gubun, professor, english)
router.get('/search/name', function(req, res) {
    // console.log(req.body.course_name);
    var course_name = '철학';
    var search_by_name = `SELECT name, code, time, credit, gubun, professor, english FROM courses WHERE name like '%${course_name}%';`;
    connection.query(search_by_name, function(err, courseList, fields) {
        if(err) console.log(err);
        console.log(courseList);
        res.send(courseList);
    });
});

//이름으로 검색시
//input : course_name
//output : list of object(hakbu, gubun, gyoyang, credit, english, professor, time)
router.get('/search/filter', function(req, res) {
    var hakbu = '';
    var gubun = '';
    var gyoyang = '';
    var credit = '';
    var english = '';
    var professor = '';
    var time = '';
    //debugging용
    var search =`SELECT name, code, time, credit, gubun, professor, english FROM courses WHERE hakbu like '%${hakbu}%' and gubun like '%${gubun}%' and gyoyang like '%${gyoyang}%' and credit like '%${credit}%' and english like '%${english}%' and professor like '%${professor}%' and time like '%${time}%'`;
    // var search =`SELECT name, code, time, credit, gubun, professor, english FROM courses WHERE hakbu like '%${req.body.hakbu}%' and gubun like '%${req.body.gubun}%' and gyoyang like '%${req.body.gyoyang}%' and credit like '%${req.body.credit}%' and english like '%${req.body.english}%' and professor like '%${req.body.professor}% and time like '%${req.body.time}%'`;
 

    connection.query(search, function(err, courseList, fields) {
        if(err) console.log(err);
        console.log(courseList);
        res.send(courseList);
    });
});

router




module.exports = router;
