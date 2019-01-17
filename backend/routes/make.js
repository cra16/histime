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

//make page 초기에 즐겨찾기 리스트 생성
//input : student_id
//output : list of course_names
router.get('/fav_list', function(req, res) {
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

//필터로 검색시
//input : courses' information except name
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

//즐겨찾기 추가
//input : student_id, code, course_name, professor, time, credit
//output : NULL
router.get('/add_fav', function(req, res) {
    var student_id = ''; //req.body.student_id
    var code = ''; //req.body.code
    var course_name = ''; //req.body.course_name
    var professor = ''; //req.body.professor
    var time = ''; //req.body.time
    var credit = 0; //req.body.credit
    //debugging용
    var add_fav = `INSERT INTO user values(NULL, ${student_id}, NULL, NULL, NULL, '${code}', '${course_name}', '${professor}', '${time}', ${credit}, true);`
    
    connection.query(add_fav, function(err, result, fields) {
        if(err) console.log(err);
    });
});

//다른 시간표 보기
//input : student_id, ttname
//output : list of object(course_name, professor, time, credit)
router.get('/show_tt', function(req, res) {
    var student_id = 21500670; //req.body.id
    var ttname = ''; //req.body.ttname

    connection.query(`SELECT course_name, professor, time, credit FROM user WHERE student_id=${student_id} and ttname='${ttname}';`, function(err, results, fields) {
        if(err) console.log(err);
        console.log(results);
        res.send(results);
    });
});

module.exports = router;
