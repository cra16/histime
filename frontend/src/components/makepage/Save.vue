<template>
<!-- 시간표 만드는 페이지에서 즐겨찾기 부분 -->
<div class="save">
    <h1 id="head">즐겨찾기</h1>
<!-- 여기에 이렇게 많은 정보가 필요한가? -->
    <div class='contents'>
        
        <div v-for="course in this.courses" :key="course.code" class="content">
            
            <div class="section1">
                <p>{{ course.name }}</p>
                <p>{{`[${course.code}]`}}</p>
            </div>

            <div class="section2">
                <p>{{course.time}}</p>
                <p>{{course.credit}}학점</p>
                <p>{{course.gubun}}</p>
            </div>

            <div class="section3">
                <p>{{course.professor}}</p>
                <p>영어 {{course.english}}</p>
            </div>

            <div  class="section4">
                <button id="delete" v-on:click="del(key)"></button>
                <br/>
                <button id="add" v-on:click="add()"></button>
            </div>

            <hr />
        </div>
    </div>
    <h1 id="foot">
        <button class="all" v-on:click="add_a()">전체추가</button>
        <button class="all" v-on:click="del_a()">전체삭제</button>
    </h1>    
</div>
   
</template>

<script>
import subjects from '../timetable.json'
   
export default{
    data(){
        return{
       
            active: false,
            courses : [],
            // course : {
            //     name : "",
            //     code : "",
            //     time : "",
            //     credit : "",
            //     gubun : "",
            //     professor : "",
            //     english : ""
            // },
        }
            
    },
    methods :{
        //즐겨찾기 항목 하나만 삭제
        del(key) {
            console.log(key.toString());

            alert("delete");
             this.$http.post('/api/login', {
            }).then((response) => {
                if (response.status === 200 ) {
                }
            }, function (err) {
                alert("로그인을 틀렸거나 서버가 이상하거나..")
            })
        },

        add(){
           // alert("add");
           //send message to timetable component
            this.$EventBus.$emit('add','add subject');
        },
        del_a(){
            alert("del_a");
        },
        add_a(){
            alert("add_a");
            this.$EventBus.$emit('add_a','add all subject');
        },
       
    },
    created(){
        this.$http.post('/api/make/fav_list', {
            student_id : this.$session.get('student_id')
        }).then((response) => {
            if (response.status === 200) {
                this.courses = response.data; //name, code, time, credit, gubun, professor, english
                console.log('즐겨찾기 List : ' + this.courses.length + '개');
                for(var i = 0; i < this.courses.length; i++) {
                    console.log('즐겨찾기 ' + (i+1) + '번 과목: ' + this.courses[i].name);
                }
            }
        });
    }
}
 
    
</script>


<style  lang ="scss" src = '../../assets/Makepage/save.less' scoped>

</style>