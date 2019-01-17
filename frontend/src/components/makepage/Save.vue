<template>

<div class="save">
    <h1>즐겨찾기</h1>

    <div class='contents'>
        <!-- <div v-for="subject in subjects" :key ="subject.code" > -->
            <div class="content" >
                <div class="section1">
                    <p>데이터 구조</p>
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
                    <button id="delete"></button>
                    <br/>
                    <button id="add"></button>
                </div>
                <hr />
            </div>
        
            
        <!-- </div> -->
    </div>
</div>
   
</template>

<script>
import subjects from '../timetable.json'
   
export default{
    data(){
        return{
       
            active: false,
            subject : {
                name : "",
                code : "",
                },
              }
            
          },
    methods :{
       
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
