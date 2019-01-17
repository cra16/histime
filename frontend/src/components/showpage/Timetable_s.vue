<template>
<!-- show page에서 시간표를 보여주는 부분 -->
<body>
    <div class="head">
        <h3>첫번째 예상시간표</h3><!--글자 제한 두기-->
    </div>
    <div class = "timetable">
        <table>
            <tr>
                <th>List</th>
                <th>월</th>
                <th>화</th>
                <th>수</th>
                <th>목</th>
                <th>금</th>
                <th>토</th>
            </tr>
            <tr>
                <td id="class">1</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td id="last"></td>
             
            </tr>
             <tr>
                <td id="class">2</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td id="last"></td>
                
            </tr>
             <tr>
                <td id="class">3</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td id="last"></td>
            </tr>
             <tr>
                <td id="class">4</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td id="last"></td>
            </tr>
             <tr>
                <td id="class">5</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td id="last"></td>
            </tr>
             <tr>
                <td id="class">6</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td id="last"></td>
            </tr>
             <tr>
                <td id="class">7</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td id="last"></td>
            </tr>
             <tr>
                <td id="class">8</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td id="last"></td>
            </tr>
             <tr>
                <td id="class">9</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td id="last"></td>
            </tr>
             <tr>
                <td id="class">10</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td id="last"></td>
            </tr>

        </table>
    </div>
</body>

</template>

<script >
  import subjects from '../timetable.json'
    export default{
          data(){
              return{
                  tt_name : "aa",
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
                student_id : this.$session.get('student_id'),
                ttname : this.$session.get('ttlists[0].ttname') //this.$session.get('ttlists[i].ttname')
            }).then((response) => {
                if (response.status === 200) {
                this.ttsubjects = response.data; //course_name, professor, time, credit
                console.log('1번 tt의 Subjects : ' + this.ttsubjects.length + '개');
                for(var i = 0; i < this.ttsubjects.length; i++) {
                    console.log('Subject ' + (i+1) + '번 이름: ' + this.ttsubjects[i].course_name);
                }
                }
            });
        }

      }
    
</script>


<style  src = '../../assets/Showpage/timetable_s.less' lang="scss" scoped>

</style>
