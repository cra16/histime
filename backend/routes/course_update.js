var express = require('express');

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
                this.emit('dataread', './data/courses') ;
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
    
    spooky.on('decode', function (filename) {
        var fs = require('fs'); 
        const detectCharacterEncoding = require('detect-character-encoding'); //npm install detect-character-encoding 
        var buffer = fs.readFileSync('./data/' + filename); 
        var originalEncoding = detectCharacterEncoding(buffer); 
        var file = fs.readFileSync('./data/' + filename, originalEncoding.encoding); 
        fs.writeFileSync('./data/' + filename, file, 'UTF-8'); 
    });
    
    spooky.on('dataread', function (file) {
        var fs = require('fs');
        fs.readFile(file, 'utf8', function(err, data){
          console.log(data);
        });

        fs.writeFile('./data/check', description, 'utf8', function(err){
            response.writeHead(302, {Location: `/?id=${title}`});
            response.end('success');
          });
  
    });

    


});






module.exports = router;

