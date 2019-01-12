<template>

<div>
    <h1>즐겨찾기</h1>
    <hr />
    <div class='contents'>
        <div v-for="subject in subjects" :key ="subject.code" >
            <p>과목명 : {{subject.name}}</p>
            <p>과목명 : {{subject.day}}</p>
            <p>과목명 : {{subject.time}}</p>
            <button>삭제</button>
            <button>시간표에 추가</button>
            <hr />
        </div>
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


<style  src = '../../assets/Makepage/save.css' scoped>

</style>
