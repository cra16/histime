//mysql module
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var db_config = {
    host: 'localhost',
    user: 'root',
    password: 'h010638847',
    database: 'histime'
};

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();

//show list
router.post('/', function(req, res, next) {
    var student_id = req.body.student_id;
    var show_query = `SELECT DISTINCT ttname, ttrank, total_credit FROM user WHERE student_id=${student_id} AND total_credit IS NOT NULL`;
    // console.log(show_query);
    connection.query(show_query, function(err, results, fields) {
        if (err) console.log(err);
        // console.log(results);
        res.send(results);
    });

    // connection.end();
});

//show timetable
router.post('/tt', function(req, res, next) {
    // console.log(req.body.ttname);
    var student_id = req.body.student_id;
    var ttname = req.body.ttname;
    var ttshow_query = `SELECT code, color, course_name, credit, day, k_start, height, professor, size, start, time FROM user WHERE student_id=${student_id} and ttname='${ttname}';`
    // console.log(ttshow_query);
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
        // console.log(results);
    });
});

//시간표 삭제
//input : student_id, ttname
//output : NULL
router.post('/del_tt', function(req, res, next) {
    var student_id = req.body.student_id;
    var ttname = req.body.ttname;
    var delete_query = `DELETE FROM user WHERE student_id = ${student_id} AND ttname = '${ttname}';`;
    // console.log(delete_query);
    connection.query(delete_query, function(err, results, fields) {
        if(err) console.log(err);
        // console.log(results);
        res.send('');
    });
});

//copy_code
router.post('/copy', function(req, res, next) {
    var student_id = req.body.student_id;
    var ttname = req.body.ttname;

    // console.log('id : ' + student_id);
    // console.log('ttname : ' + ttname);

    connection.query(`SELECT DISTINCT code, course_name, professor FROM user WHERE student_id=${student_id} and ttname='${ttname}';`, function(err, results, fields) {
        if(err) console.log(err);
        res.send(results);
    })
});

//시간표 수정
router.post('/modify_tt', function(req, res, next) {
    var student_id = req.body.student_id;
    var ttname = req.body.ttname;
    var ttshow_query = `SELECT code FROM user WHERE student_id=${student_id} and ttname='${ttname}';`
    console.log(ttshow_query);
    connection.query(ttshow_query, function(err, results, fields) {
        res.send(results);
    });
    
});


module.exports = router;


//시간표순위바꾸기
