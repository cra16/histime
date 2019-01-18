<template>
<!-- 시간표 만드는 페이지에서 즐겨찾기 부분 -->
<div class="save">
    <h1 id="head">즐겨찾기</h1>
<!-- 여기에 이렇게 많은 정보가 필요한가? -->
    <div class='contents'>
        <!-- <div v-for="subject in subjects" :key ="subject.code" > -->
            <!-- <div v-for="content in this.contents" :key="content.course_name" class="content" > -->
                 <div v-for="n in 10" :key ='n' class="content" >
                <div class="section1">
                    <p>{{ content.course_name }}</p>
                    <p>[IDH20457]</p>
                </div>
                <div class="section2">
                    <p>월,목 3교시</p>
                    <p>3학점</p>
                    <p>전공필수</p>
                </div>
                <div class="section3">
                    <p>최희열</p>
                    <p>영어 100%</p>
                </div>
                <div  class="section4">
                    <button id="delete" v-on:click="del()"></button>
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
            contents : [],
            content :{
                course_name:"",
            },
            subject : {
                name : "",
                code : "",
                },
              }
            
          },
    methods :{
        //즐겨찾기 항목 하나만 삭제
        del(){
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
            alert("add");
        },
        del_a(){
            alert("del_a");
        },
        add_a(){
            alert("add_a");
        },
       
    },
    created(){
        this.$http.post('/api/make/fav_list', {
            student_id : this.$session.get('student_id')
        }).then((response) => {
            if (response.status === 200) {
                var subjects = response.data; //name, code, time, credit, gubun, professor, english
                console.log('즐겨찾기 List : ' + subjects.length + '개');
                // for(var i = 0; i < subjects.length; i++) {
                //     console.log('즐겨찾기 ' + (i+1) + '번 과목: ' + subjects[i].name);
                // }
            }
        });
    }
}
 
    
</script>


<style  lang ="scss" src = '../../assets/Makepage/save.less' scoped>

</style>
