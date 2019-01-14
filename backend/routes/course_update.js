var express = require('express');
var Iconv = require('iconv').Iconv;
var router = express.Router();

var student_id = 0;
var name = '';

router.get('/', function (req, res, next) {
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

            spooky.then(function () {
                this.emit('hello', 'in') ;
            }); 

            spooky.thenOpen('https://hisnet.handong.edu/for_student/course/PLES330M.php?hak_year=2019&hak_term=1&hakbu=%C0%FC%C3%BC&isugbn=2&injung=%C0%FC%C3%BC&eng=%C0%FC%C3%BC&prof_name=&gwamok=&gwamok_code=&ksearch=search');
                
            
            spooky.then(function () {
                this.emit('hello', 'out') ;
            }); 

            spooky.then(function () {
                this.download('https://hisnet.handong.edu/for_student/course/PLES333X.php?hak_year=2019&hak_term=1&gwamok=&gwamok_code=&hakbu=%C0%FC%C3%BC&isugbn=2&injung=%C0%FC%C3%BC&prof_name=', './data/courses'); 
            }); 

            spooky.then(function () {
                this.emit('hello', 'downloaded') ;
            }); 

            spooky.then(function () {
                this.emit('conv_encoding', './data/courses') ;
            }); 

            spooky.then(function () {
                this.exit();
            }); 
            spooky.run();
            
        });
    
    spooky.on('error', function (e, stack) {
        console.error(e);
    
        if (stack) {
            console.log(stack);
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
    
    spooky.on('conv_encoding', function (file) {

        var fs = require('fs');
        //euc-kr 파일을 utf-8 파일로 변환하는 설정
        var encode = new Iconv('euc-kr', 'utf-8');

        //버퍼형식으로 나옴 content = '<Buffer 0d 0a 0d 0a 0d 0a ... >'
        var content = fs.readFileSync(file);
        
        //enconding 형식을 content에 적용하기
        var content2 = encode.convert(content);

        console.log('yes');
        
        //버퍼를 문자열로 변환하기
        var utf8Text =content2.toString('utf-8');
        
        console.log(utf8Text);
        
        //파일 입출력 변환해주기 
        fs.writeFileSync('./data/check', utf8Text, 'utf-8');
  
    });

    


});






module.exports = router;

