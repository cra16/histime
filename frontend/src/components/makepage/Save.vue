<template>
<!-- 시간표 만드는 페이지에서 즐겨찾기 부분 -->
<div class="save">
    <h1 id="head">즐겨찾는 과목</h1>
<!-- 여기에 이렇게 많은 정보가 필요한가? -->
    <div class='contents'>
        
        <div v-for="(course, key) in this.courses" :key="key" class="content">
            
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
                <button id="add" v-on:click="add(key)"></button>
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
            var duplication = false;

            console.log("created: " + course);

            for(var i in this.courses) {
                if(course.code === this.courses[i].code) {
                    duplication = true;
                    break;
                }
            }

            if(duplication === true) {
                alert("이미 즐겨찾기에 추가된 과목 입니다!");
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
        }
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
        this.$EventBus.$on('add_to_fav', this.add_to_fav);
    }
}
 
    
</script>


<style  lang ="scss" src = '../../assets/Makepage/save.less' scoped>

</style>