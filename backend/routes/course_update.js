var express = require('express');
var router = express.Router();
// var iconv = require('iconv').Iconv;
var fs = require('fs');
// var mysql = require('mysql');
var tabletojson = require('tabletojson');
var jschardet   = require('jschardet');
var html; 
var connection = require('./myMysql');



router.get('/', function (req, res, next) {
    var time = '';

    var newDate = new Date(); 

    //String.slice(-2) : 문자열을 뒤에서 2자리만 출력한다. (문자열 자르기) 
    time += newDate.getFullYear() + "/"; 
    time += ("0" + (newDate.getMonth() + 1)).slice(-2) + "/"; //월은 0부터 시작하므로 +1을 해줘야 한다. 
    time += ("0" + newDate.getDate()).slice(-2) + " "; 
    time += ("0" + newDate.getHours()).slice(-2) + ":"; 
    time += ("0" + newDate.getMinutes()).slice(-2) + ":"; 
    time += ("0" + newDate.getSeconds()).slice(-2);
    // console.log(time);
    var time_query = `UPDATE user set time = '${time}' WHERE student_id is NULL and ttname = 'update_time';`;
    // console.log(time_query);
    connection.query(time_query, function(err, results, fields) {
        if(err) console.log(err);
        // console.log(results);
    });

    try {
        var Spooky = require('spooky');
    } catch (e) {
        var Spooky = require('../lib/spooky');
    }
    
    var spooky = new Spooky({
            child: {
                transport: 'http'
            },
            casper: {
                logLevel: 'debug',
                verbose: true
            }
        }, function (err) {
            if (err) {
                e = new Error('Failed to initialize SpookyJS');
                e.details = err;
                throw e;
            }
    
            spooky.start();
            spooky.open('https://hisnet.handong.edu/login/_login.php', {
                method: 'post',
                data:   {
                    'id': 'gur5381',
                    'password':  'h010638847'
                }
            });

            spooky.thenOpen('https://hisnet.handong.edu/for_student/course/PLES330M.php?hak_year=2019&hakbu=%C0%FC%C3%BC&hak_term=1&isugbn=%C0%FC%C3%BC&injung=%C0%FC%C3%BC&eng=%C0%FC%C3%BC&prof_name=&gwamok=&gwamok_code=&ksearch=search'); 
            spooky.then(function () {
                this.download('https://hisnet.handong.edu/for_student/course/PLES333X.php?hak_year=2019&hakbu=%C0%FC%C3%BC&hak_term=1&isugbn=%C0%FC%C3%BC&injung=%C0%FC%C3%BC&eng=%C0%FC%C3%BC&prof_name=&gwamok=&gwamok_code=&ksearch=search', './data/courses'); 
            }); 
            spooky.then(function () {
                this.emit('sendtoDB', '');
            });    

            spooky.then(function () {
                this.exit();
            }); 
            spooky.run();
            
        });
    
    spooky.on('error', function (e, stack) {
        console.error(e);
    
        if (stack) {
            // console.log(stack);
        }
        return;
    });
    
    /*
    // Uncomment this block to see all of the things Casper has to say.
    // There are a lot.
    // He has opinions.
    spooky.on('console', function (line) {
        console.log(line);
    });
    */
    spooky.on('hello', function (greeting) {
        console.log(greeting);
    });
    
    spooky.on('sendtoDB', function (input) {
        'use strict';
        // console.log('into sendtoDB');

        
        
        //html변수에 encoding 변환 html 저장        
        conv_encoding();
    });



});

//html변수에 encoding 변환 html 저장
function conv_encoding(){
    var iconv = require('iconv-lite');

    
    // Convert encoding streaming example
    fs.createReadStream('./data/courses')
        .pipe(iconv.decodeStream('ks_c_5601-1987'))
        .pipe(iconv.encodeStream('utf-8')).collect(function(err, body){
            // console.log(body.toString('utf-8'));
            html = body.toString('utf-8');
            // console.log(html);
            //자동으로 파씽된 데이터를 json형식으로 저장        
            var converted = tabletojson.convert(html);

            // console.log('after json');

            // console.log(converted);

            //디비 넣기 
            addtoDB(converted);

    });

    
}


// create table courses(
//     idx INT PRIMARY KEY AUTO_INCREMENT,
//     gubun VARCHAR(5),
//     code VARCHAR(40),
//     name VARCHAR(40),
//     credit INT,
//     professor VARCHAR(40),
//     time VARCHAR(40),
//     room VARCHAR(40),
//     max_num INT,
//     cur_num INT,
//     english VARCHAR(10),
//     gyoyang VARCHAR(10),
//     grade_type VARCHAR(10),
//     pf_avail VARCHAR(10)
//     );


//   '0': '구      분',
//   '1': '과목코드',
//   '2': '분      반',
//   '3': '과목명\n      (CourseName)',
//   '4': '학점',
//   '5': '교수',
//   '6': '시간\n      (Period)',
//   '7': '강의실',
//   '8': '정원',
//   '9': '인원',
//   '10': '영어',
//   '11': '교양\n      실무',
//   '12': '성적유형',
//   '13': 'PF병행',
//   '14': '강의\n\t  계획서',
//   '15': '비고' 



function addtoDB(json){
    // console.log('into addtoDB');
    var create = 'create table courses( gubun VARCHAR(5), code VARCHAR(40) PRIMARY KEY, hakbu VARCHAR(100), name VARCHAR(150), credit VARCHAR(5), professor VARCHAR(40), time VARCHAR(40), room VARCHAR(40), max_num VARCHAR(10), cur_num VARCHAR(10), english VARCHAR(10), gyoyang VARCHAR(10), grade_type VARCHAR(10), pf_avail VARCHAR(10) );';
    var remove = 'DROP TABLE courses;';
    connection.query(remove , function (error, results, fields) {
        if (error) {
            console.log('no table exist');
        }
    });
    connection.query(create);
    for(var i = 1; i < json[0].length; i++) {
        var obj = json[0][i];
        var gubun = obj[0];
        var code = obj[1] + "-" + obj[2];
        
        var name = obj[3].substr(0, obj[3].lastIndexOf('('));
        var credit = obj[4];
        var professor;
        var hakbu = '';
        if(obj[5].includes('주간')){

            var str_start = obj[5].indexOf('주') + 2;
            professor = obj[5].substr(str_start);
            hakbu = obj[5].substr(0, str_start-3)
        }
        else{
            professor = obj[5];
        }
        var time;
        if(obj[6].includes('\n')){
            
            var str_end = obj[6].indexOf('\n');
            time = obj[6].substr(0, str_end);
        }
        else{
            time = obj[6];
        }
        var room = obj[7];
        var max_num = obj[8];
        var cur_num = obj[9];
        var english = obj[10];
        var gyoyang = obj[11];
        var grade_type = obj[12];
        var pf_avail = obj[13];
        var insert = `INSERT INTO courses VALUES ('${gubun}', '${code}', '${hakbu}', '${name}', '${credit}', '${professor}', '${time}', '${room}', '${max_num}', '${cur_num}', '${english}', '${gyoyang}', '${grade_type}', '${pf_avail}');`;
        connection.query(insert , function (error, results, fields) {
            if (error) {
                console.log('insert Error here');
                console.log(error);
                console.log('query문은 다음과 같다.' + insert);
            }
        });
        //     1, 교필, GEE10001-01, English Chapel 1(English Chapel 1), 0, 글로벌 주간Gregory T. Brown, 수7
        // Wed7, ANH Auditorium, 999, , 100%, 신앙1, PF, N);
    }

    
}

router.get('/user', function (req, res, next) {
    var remove = 'DROP TABLE user;';
    connection.query(remove , function (error, results, fields) {
        if (error) {
            console.log('no table exist');
        }
    });
    var create = `CREATE TABLE user(
        idx INT PRIMARY KEY AUTO_INCREMENT,
        student_id INT,
        ttname VARCHAR(45),
        ttrank INT,
        total_credit DOUBLE,
        code VARCHAR(20),
        course_name VARCHAR(150),
        professor VARCHAR(20),
        time VARCHAR(20),
        credit DOUBLE,
        favorited BOOL,
        height INT,
        start INT,
        size INT,
        k_start INT,
        color VARCHAR(20),
        day INT
        );`;
    connection.query(create , function (error, results, fields) {
        if (error) {
            console.log('create error');
            console.log(error);
            console.log('query문은 다음과 같다.' + insert);
        }
    });
    connection.query(`insert user(ttname, student_id, time) values('update_time', NULL, 'Not yet');`);
    
});

router.post('/yebi', function(req, res, next) {
    var filename = req.body.filename;
    console.log(ttshow_query);
    fs.readFile(filename, function(err, data){
        console.log(data); 
    })
    
});
router.post('/add_userlist', function(req, res, next) {
    var student_id = parseInt(req.body.user_data.student_id);
    var name = req.body.user_data.name;
    var year = parseInt(req.body.user_data.year);
    var major = req.body.user_data.major;

    connection.query(`select * from userlist where student_id = ${student_id}`, function(err, result, fields){
        if(err){
            console.log(err);
        }
        if(result.length === 0){
            var userlist_add = `insert userlist(student_id, name, year, major) values(${student_id}, '${name}', '${year}', '${major}');`
            console.log(userlist_add);
            connection.query(userlist_add, function(err){
                if(err){
                    console.log(err);
                }
            });
        }
    })
    res.send('yes'); 
});

router.get('/make_userlist', function(req, res, next){
    var create = `CREATE TABLE userlist(idx INT PRIMARY KEY AUTO_INCREMENT, student_id INT, name VARCHAR(20), year INT, major VARCHAR(30));`;
     connection.query(create, function(err, result, feild){
        if(err){
            console.log(err);
            console.log('userlist table 존재')
        }
    });
})

module.exports = router;