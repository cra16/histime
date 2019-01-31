<template>
<!-- 시간표 만드는 페이지에서 즐겨찾기 부분 -->
<div class="save">
    <h1 id="head">즐겨찾는 과목</h1>
    <div class='contents'>

        <div v-if="noResult==true" class="noResult">
            <br />
            <p>즐겨찾는 과목이 없습니다.</p><p> 과목 검색결과에서 별 모양을 통해 추가해 주세요</p>
        </div>

        <div v-for="(course, key) in this.courses" :key="key" class="content">
            
             <div class="section1">
                <p>{{`[${course.code}]`}} {{course.name}}</p>
            </div>


            <span class="section2">
                <p>{{course.gubun}}</p>
                <p>{{course.time}}</p>
                <p>{{course.credit}}학점</p>
            </span>

            <span class="section3">
                <p>{{course.professor}}</p>
                <p>영어 {{course.english}}</p>
            </span>

            <span  class="section4">
                <button id="delete" v-on:click="del(key)"></button>
                <br/>
                <button id="add" v-on:click="add(key)"></button>
            </span>

            <hr />
        </div>
    </div>
    <h1 id="foot">
        <button class="all" v-on:click="add_a()">전체추가</button>
        <button class="all" v-on:click="del_a()">비우기</button>
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
            noResult : true
            
        }
            
    },
    methods : {
        //즐겨찾기 항목 하나만 삭제
        del(key) {
            this.$http.post('/api/make/del_fav', {
                student_id : this.$session.get('student_id'),
                code : this.courses[key].code
            })

            this.courses.splice(key, 1);
        },
        add(key){
            this.$EventBus.$emit('courses',this.courses[key]);
        },
        del_a(){
            if(confirm("즐겨찾기에 있는 모든 과목을 삭제하시겠습니까?")) {
                this.$http.post('/api/make/del_all_fav', {
                    student_id : this.$session.get('student_id'),
                })

                this.courses.splice(0, (this.courses.length));
            }
        },
        add_a(){
            this.$EventBus.$emit('add_a',this.courses);
        },
        add_to_fav(course) {
            var duplication = this.duplication(course);
            this.noResult = false;
            console.log("created: " + course);
            
            if(duplication === true) {
                this.$toasted.show('Already', { 
                    theme: "bubble", 
                    position: "top-center", 
                    duration : 500,
                    // fullWidth: false,
                    // fitToScreen: true
                });
            } else {
                this.$http.post('/api/make/add_fav', {
                    student_id : this.$session.get('student_id'),
                    code : course.code,
                    course_name : course.name,
                    professor : course.professor,
                    time : course.time,
                    credit : course.credit
                });

                this.courses.push({
                    name: course.name,
                    code: course.code,
                    time: course.time,
                    credit: course.credit,
                    gubun: course.gubun,
                    professor: course.professor,
                    english: course.english
                });
            }
        },
        duplication(course) {
            var duplication = false;

            for(var i in this.courses) {
                if(course.code === this.courses[i].code) {
                    duplication = true;
                    break;
                }
            }

            return duplication;
        }
    },
    created(){
        this.$http.post('/api/make/fav_list', {
            student_id : this.$session.get('student_id')
        }).then((response) => {
            if (response.status === 200) {
                if(response.data.length == 0){
                    this.noResult = true;
                }else{
                    this.noResult = false;
                    this.courses = response.data; //name, code, time, credit, gubun, professor, english
                }
               
            }
        },function(err){
            alert("서버가 이상합니다. 21500582@handong.edu 로 메일을 보내주세요 :) ")
        });
        this.$EventBus.$on('add_to_fav', this.add_to_fav);
    }
}
 
    
</script>


<style  lang ="scss" src = '../../assets/Makepage/save.scss' scoped>

</style>