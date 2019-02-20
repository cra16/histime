var express = require('express');
var puppeteer = require('puppeteer');

var router = express.Router();


router.post('/', function (req, res) {
    

    (async () => {
    
        const browser = await puppeteer.launch({headless: true, args:['--no-sandbox']});
        const page = await browser.newPage();
        const hisnet_id = req.body.id
        const hisnet_pw = req.body.password;
    
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
            //학사 페이지로 가서
            await page.goto('https://hisnet.handong.edu/haksa/hakjuk/HHAK110M.php');
            //학번을 가져오고
            const element1 = await page.$('input[name="hakbun"]');
            student_id = await page.evaluate(element1 => element1.value, element1);
            //이름을 가져와라
            const element2 = await page.$('td[width="240"]');
            name = await page.evaluate(element2 => element2.textContent, element2);
        }
        if(student_id != 'nope') console.log(`${name}님이 로그인하셨습니다.`);
        res.send({ student_id : student_id, name : name });
        //브라우저 꺼라
        await browser.close();        
    })();
});

module.exports = router;