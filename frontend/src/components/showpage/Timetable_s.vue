<template>
<!-- show page에서 시간표를 보여주는 부분 -->
<div class = "Timtable">
    <h2 class = "ttname">2학기 예비 1</h2>

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
                  },
                  filltedSub :{

                  }
              }
            
          },
          computed : {
                // filter:function(day){
                //     for (var i in subjects) 
                    
                //     return this.subject.filter((mon)=>{
                //         return ;
                //     })
                // }
                // 만들다가 실패.. 나중에 다시하기(지현)
              },
        created(){
            this.$http.post('/api/show/tt', {
                id : '21500670', //this.student.student_id
                ttname : 'A'
            }).then((response) => {
                if (response.status === 200) {
                this.ttsubjects = response.data; //course_name, professor, time, credit
                console.log(response.data[0].course_name);                    }
            });
        }

      }
    
</script>

<style src = '../../assets/showpage/timetable.less' lang = "scss" scoped>

</style>
