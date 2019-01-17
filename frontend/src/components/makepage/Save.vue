<template>

<div class="save">
    <h1>즐겨찾기</h1>

    <div class='contents'>
        <!-- <div v-for="subject in subjects" :key ="subject.code" > -->
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
            <div class="section4">
                <button>삭제</button>
                <button>시간표에 추가</button>
            </div>
            <hr />
        
            
        <!-- </div> -->
    </div>
</div>
   
</template>

<script>
import subjects from '../timetable.json'
   
export default{
    data(){
        return{
            subjects: subjects,
            subject : {
                name : "",
                code : "",
                },
              }
            
          },
          
    }
 
    
</script>


<style  src = '../../assets/Makepage/save.less' scoped>

</style>
