var express = require('express');
var puppeteer = require('puppeteer');

var router = express.Router();


router.post('/', function (req, res) {
    

    (async () => {
    
        const browser = await puppeteer.launch({headless: true, args:['--no-sandbox']});
        const page = await browser.newPage();
        const hisnet_id = req.body.id
        const hisnet_pw = req.body.password;
        var student_id = '';
        var name = '';
        var year = '';
        var major = '';
        //페이지로 가라
        await page.goto('https://hisnet.handong.edu/login/login.php');
    
        //아이디랑 비밀번호 란에 값을 넣어라
        await page.evaluate((id, pw) => {
        document.querySelector('input[name="id"]').value = id;
        document.querySelector('input[name="password"]').value = pw;
        }, hisnet_id, hisnet_pw);
    
        //로그인 버튼을 클릭해라
        await page.click('input[src="/2012_images/intro/btn_login.gif"]');
    
        //로그인 화면이 전환될 때까지 .5초만 기다려라
        await page.waitFor(500);
    
        //로그인 실패시(화면 전환 실패시)
        if(page.url() === 'https://hisnet.handong.edu/login/_login.php'){
            student_id = 'nope';
            name = 'nope';
        }
        //로그인 성공시
        else{
            try{
                //학사 페이지로 가서
                await page.goto('https://hisnet.handong.edu/haksa/hakjuk/HHAK110M.php');
                //학번을 가져오고
                const element1 = await page.$('input[name="hakbun"]');
                student_id = await page.evaluate(element1 => element1.value, element1);
                //이름을 가져와라
                const element2 = await page.$('td[width="240"]');
                name = await page.evaluate(element2 => element2.textContent, element2);
                //학년을 가져오고
                const element3 = await page.$('td[style="padding-left:5px;"]');
                year = await page.evaluate(element3 => element3.textContent, element3);
                //젼공 가져와라
                const element4 = await page.$$('td[colspan="2"]');
                major = await page.evaluate(element4 => element4.textContent, element4[5]);
                
            }catch(e){
                student_id = '00000000';
                name = '교직원';
                major = '교직원';
                year = 0;
                major = '교직원';

            }
            console.log(`${name}(${student_id})님이 로그인하셨습니다.`);
        }
        console.log(student_id);
        console.log(name);
        console.log(year);
        console.log(major);
        
        res.send({ student_id : student_id, name : name, year : year[0], major : major });
        //브라우저 꺼라
        await browser.close();        
    })();
});

module.exports = router;