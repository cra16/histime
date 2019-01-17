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

//과목명말고 다른 정보는 어떻게 가져올건가요?
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
//input : course_name
//output : list of object(hakbu, gubun, gyoyang, credit, english, professor, time)

//타임은 어떻게할지 고민해봐야함
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

//즐겨찾기추가
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

//즐겨찾기삭제
//input : code, student_id
//output : 
router.get('/del_fav', function(req, res) {
    var code = 'ECE20016-01';
    var student_id = 21500670;
    var _delete = `DELETE FROM user WHERE code = '${code}' and student_id = '${student_id}' and favorited = TRUE;`;
    // var _delete = `DELETE FROM user WHERE code = '%${req.body.code}%' and student_id = '${req.body.user}' and favorited = TRUE;`;
    connection.query(_delete, function(err, courseList, fields) {
        if(err) console.log(err);
        console.log(courseList);
        // res.send(courseList);
    });
});

//즐겨찾기전체삭제
//input : student_id
//output : 
router.get('/del_all_fav', function(req, res) {
    var student_id = 21500670;
    var delete_all = `DELETE FROM user WHERE student_id = '${student_id}' and favorited = TRUE;`;
    // var delete_all = `DELETE FROM user WHERE student_id = '${req.body.student_id}' and favorited = TRUE;`;
    connection.query(delete_all, function(err, courseList, fields) {
        if(err) console.log(err);
        console.log(courseList);
        // res.send(courseList);
    });
});

//시간표생성
//input : array of data(student_id, ttname, total_credit, code, course_name, professor, time, credit)
router.get('/make_tt', function(req, res) {
    //디버깅용
    var body = [
        {
            student_id : 21500670,
            ttname : '실험용 시간표',
            total_credit : 9,
            code : 'ITP40001-01',
            course_name : 'Database System(Database System)',
            professor : '남재창',
            time : '월5,목5',
            credit : 3
        },
        {
            student_id : 21500670,
            ttname : '실험용 시간표',
            total_credit : 9,
            code : 'ITP20003-01',
            course_name : 'Java Programming(Java Programming)',
            professor : '남재창',
            time : '화1,화2,금1,금2',
            credit : 3
        },
        {
            student_id : 21500670,
            ttname : '실험용 시간표',
            total_credit : 9,
            code : 'ECE20016-01',
            course_name : '자바프로그래밍언어(Introduction to JAVA Programming)',
            professor : '남재창',
            time : '월6,월7,목6,목7',
            credit : 3
        },
    ]

    for(var i = 0 ; i < body.length; i++){
        var make_tt = `INSERT INTO user values(NULL, ${body[i].student_id}, '${body[i].ttname}', NULL, '${body[i].total_credit}', '${body[i].code}', '${body[i].course_name}', '${body[i].professor}', '${body[i].time}', ${body[i].credit}, false);`
        connection.query(make_tt, function(err, courseList, fields) {
            if(err) console.log(err);
            console.log(courseList);
            // res.send(courseList);
        });
    }

    // //실제용
    // for(var i = 0 ; i < req.body.length; i++){
    //     var make_tt = `INSERT INTO user values(NULL, ${req.body[i].student_id}, '${req.body[i].ttname}', NULL, '${req.body[i].total_credit}', '${req.body[i].code}', '${req.body[i].course_name}', '${req.body[i].professor}', '${req.body[i].time}', ${req.body[i].credit}, false);`
    //     connection.query(make_tt, function(err, courseList, fields) {
    //         if(err) console.log(err);
    //         console.log(courseList);
    //         // res.send(courseList);
    //     });
    // }



});

//다른시간표보기리스트생성(초기)
//input : student_id
//output : array of ttname 
router.get('/tt_list', function(req, res) {
    var student_id = 21500670;
    var search_tt = `select distinct ttname from user where student_id = ${student_id} and favorited = false;`;
    // var delete_all = `DELETE FROM user WHERE student_id = '${req.body.student_id}' and favorited = TRUE;`;
    connection.query(search_tt, function(err, courseList, fields) {
        if(err) console.log(err);
        console.log(courseList);
        // res.send(courseList);
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
