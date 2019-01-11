<template>
<!-- show page에서 시간표를 보여주는 부분 -->
<div class = "Ttshow">
    <div class="days">
        <div class="day time">
            <div class="day_title">Time</div>
            <div class="hour">1교시</div>
            <div class="hour">2교시</div>
            <div class="hour">3교시</div>
            <div class="hour">4교시</div>
            <div class="hour">5교시</div>
            <div class="hour">6교시</div>
            <div class="hour">7교시</div>
            <div class="hour">8교시</div>
            <div class="hour">9교시</div>
            <div class="hour">10교시</div>
        </div>

        <div class="day monday">
            <div class="day_title">Monday</div>
            <div v-for="subject in subjects" :key ="subject.name" class ="class b15 blue">{{ subject.name }}</div>
        </div>

        <div class="day tuesday">
            <div class="day_title">Tuesday</div>
             <div class="class b15 blue" data-tooltip="Advanced Integral Calculus">2MIC1 [K2]</div>
        </div>

        <div class="day wednesday">
            <div class="day_title">Wednesday</div>
             <div v-for="subject in subjects" :key ="subject.name" class ="class b15 blue">{{ subject.name }}</div>
        </div>

        <div class="day thursday">
            <div class="day_title">Thursday</div>
             <div v-for="subject in subjects" :key ="subject.name" class ="class b15 blue">{{ subject.name }}</div>
        </div>

        <div class="day friday">
            <div class="day_title">Friday</div>
        </div>

        <div class="day saturday">
            <div class="day_title">Saturday</div>	
        </div>
    </div>
</div>
</template>

<script >
  import subjects from '../timetable.json'
    export default{
          data(){
              return{
                  subjects: subjects,
                  subject : {
                       name : ""
                  }
                     
                  

              }
          }
      }
    
</script>

<style src = '../../assets/ttshow.css' scoped>

</style>
