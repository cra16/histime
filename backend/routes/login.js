var express = require('express');

var router = express.Router();

var student_id = '';
var name = '';

router.post('/', function (req, res) {
    
    var id = req.body.id;
    var password = req.body.password;

    console.log(id + ' ' + password);
    try {
        var Spooky = require('spooky');
    } catch (e) {
        var Spooky = require('../lib/spooky');
    }
    console.log('in');
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
                    'id': id,
                    'password':  password
                }
            });
            spooky.thenOpen('https://hisnet.handong.edu/haksa/hakjuk/HHAK110M.php');
            spooky.then(function () {
                this.emit('hello', 'Hello, from ' + this.evaluate(function () {
                    return document.URL;
                }));
            });
            spooky.then(function () {
                try { // statements to try
                    this.emit('name', {name : this.getElementInfo('td[width="240"]').text, student_id : this.getElementAttribute('input[name="hakbun"]', 'value')});                  }
                  catch (e) {
                    this.emit('name', {name : 'nope', student_id : 'nope'});
                  }
                
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
    
    spooky.on('id', function (input) {

        if(input.length() > 10) student_id = -1;
        student_id = input;
    });
    spooky.on('name', function (input) {
        console.log(input.student_id + input.name);
        res.send({ student_id : input.student_id, name : input.name });

    });


});

module.exports = router;