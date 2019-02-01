<!--시간표를 보여주는 웹 페이지-->
<template>

    <div id="show">
        <div v-if="this.$session.get('student_id') === '21500670'">
            <!-- <Header></Header> -->
            <h1>관리자 모드</h1>
            <input v-model="interval" type="text" placeholder="업데이트 주기 입력" class='input_text' name="interval"/>
            <button v-on:click="auto_update_course()">수업 업데이트 시작</button>
            <button v-on:click="cancel_auto_update()">수업 업데이트 중지</button>
            <div v-if="this.auto_update === true">{{this.interval}}분 주기로 자동 업데이트중...</div>
            <div v-if="this.time === ''">업데이트 없음...</div>
            <div v-else>최근 수업 업데이트 시간 {{this.time}}</div>

            <button v-on:click="update_course()">수업 업데이트</button>
            <button v-on:click="update_user()">유저 테이블 업데이트</button>
            <button v-on:click="showpage = !showpage">showpage on/off</button>
            
        </div>
        <div v-if="this.showpage === true">
            <div class="outer">
                <div class="inner">
                
                <Header></Header>
                <div class="centered">
                    <div class="container">
                            <!--시간표 리스트-->
                            <!-- <List id = "list" :val="this.ttlist" /> -->
                            
                                <List id ="list" /> 
                            <!--시간표  내용-->
                                <timetable_s id ="timetable"/>
                            
                    </div>
                    </div>
                <Footer></Footer>

                </div>
            </div>
        </div>
        
      
    </div>
</template>

<script>
import Timetable_s from '../components/showpage/Timetable_s.vue'
import List from '../components/showpage/List.vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

    export default {
        // created () {
        //     this.$http.post('/api/show', {
        //         student_id : '21500670'//this.student.student_id
        //     }).then((response) => {
        //         if (response.status === 200 ) {
        //             this.ttlist = response.data;
        //             console.log(response.data[0].ttname); //ttname, ttrank, total_credit
        //         }
        //     });
        // },
        name: 'show',
        auth : false,
        components: {
           Timetable_s,
           List,
           Header,
           Footer
        },
        data() {
            return {
                ttlist : [],
                ttsubjects : [],
                auth : false,
                authenticated : false,
                student : {
                    name : "",
                    student_id : ""
                },
                timer: "",
                interval : 0,
                auto_update: false,
                showpage: false,
                time: "",
               
            };
        },

    methods: {
        go() { //시간표를 추가하는 웹 페이지로 전환
            this.$router.replace({ name: "make" });
        },
        auto_update_course(){
            
            if(this.interval < 5) {
                alert("주기를 5분 이상으로 하세요!");
                return;
            }
            this.update_course();
            this.timer = setInterval(this.update_course, this.interval*60000);
            this.auto_update = true;
            console.log('auto update start');
        },
        update_course(){

                var newDate = new Date(); 
                this.time = '';
                //String.slice(-2) : 문자열을 뒤에서 2자리만 출력한다. (문자열 자르기) 
                this.time += newDate.getFullYear() + "/"; 
                this.time += ("0" + (newDate.getMonth() + 1)).slice(-2) + "/"; //월은 0부터 시작하므로 +1을 해줘야 한다. 
                this.time += ("0" + newDate.getDate()).slice(-2) + " "; 
                this.time += ("0" + newDate.getHours()).slice(-2) + ":"; 
                this.time += ("0" + newDate.getMinutes()).slice(-2) + ":"; 
                this.time += ("0" + newDate.getSeconds()).slice(-2);
                console.log(this.time);
                console.log('course update in');
                this.$http.get('api/course_update');
        },
        cancel_auto_update(){
            clearInterval(this.timer);
            this.auto_update = false;
            this.interval = 0;

            console.log('auto update stop');

        },
        update_user(){
            console.log('course update in');
            this.$http.get('api/course_update/user');
        },
    }
        
}

   
    
</script>



<style src = '../assets/Show.scss' lang='scss' scoped>

</style>