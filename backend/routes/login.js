var express = require('express');
var casper_nodejs = require('../../index.js');

var router = express.Router();

router.post('/', function (req, res) {
    
    var id = req.body.id;
    var password = req.body.password;
    var student_id = 0;
    login_check(id, password);
    // res.send(student_id);
    

});



function login_check(id, password){
//     var student_id = 0;
    
//     casper.start();
//     console.log("entered");
    
//     casper.open('https://hisnet.handong.edu/login/_login.php', {
//         method: 'post',
//         data:   {
//             'id': 'gur5381',
//             'password':  'h010638847'
//         }
//     });
    
//     casper.then(function(){
//         this.open('https://hisnet.handong.edu/haksa/hakjuk/HHAK110M.php');
        
//     });
    
//     casper.then(function(){
//         console.log("1초 후에 AfterLogin.png 으로 저장됩니다.");
//         this.wait(1000, function(){
//           // After 1 seconds, this callback will be called, and then we will capture:
//           this.capture('AfterLogin.png');
//         });
//     });
    
//     casper.then(function() {
//         // console.log(this.getHTML('input[name="hakbun"]'));
//         student_id = this.getElementAttribute('input[name="hakbun"]', 'value');
//         return student_id;
//     });
    
//     casper.run();

    var url = "http://google.com";
    // load the page refered with 'url' with casper
    var casper = casper_nodejs.create(url, {});

    // once the page is loaded, execute that in our current nodejs context
    casper.then(function executed_in_this_context() {
    console.log("page loaded");
    });

    // then, execute that in casperjs, and the second callback in the current nodejs context
    casper.then(function executed_in_casperjs_context() {
    return 42;
    }, function executed_in_this_context(ret) {
    console.log("it works: " + ret);
    
    // casper.exit() can be placed here too, instead of in the bottom :)
    // casper.exit();
    });

    // exit casper after executing the 2 previous 'then'
    casper.exit();

}



module.exports = router;
