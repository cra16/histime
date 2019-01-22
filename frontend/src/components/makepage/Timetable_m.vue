<template>
<!-- show page에서 시간표를 보여주는 부분 -->
<body>
    <div class="head">
        <h3>{{ this.$session.get('to_timetablem') }}</h3><!--글자 제한 두기-->
        <button class="btn" id="redo" v-on:click="redo()"></button>
        <button  class="btn" id="undo" v-on:click="undo()"></button>
    </div>
    <div class = "timetable">
        <table>
            <tr>
                <th></th>
                <th>월</th>
                <th>화</th>
                <th>수</th>
                <th>목</th>
                <th>금</th>
                <th>토</th>
            </tr>
            <tr>

                <td id="class_time">1</td>
      
                    <td v-for="j in 6" :key="j" rowspan="10">
                        <!-- 월요일에 대한 반복문-->
                        <!--1교시 to 10교시-->
                        
                        <div v-for="i in 10" :key="i">
                            <div v-if="courses[j] != undefined">
                                <div v-if="courses[j][i] != undefined">
                                    <div v-for="course of courses[j][i]" :key="course.code">
                                            <node :data="course" />
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </td>
             
               
            </tr>

             <tr>
                <td id="class_time">2</td>
                
                
            </tr>
             <tr>
               <td id="class_time">3</td>
            </tr>
             <tr>
              <td id="class_time">4</td>
            </tr>
             <tr>
                <td id="class_time">5</td>
            </tr>
             <tr>
              <td id="class_time">6</td>
            </tr>
             <tr>
                <td id="class_time">7</td>
            </tr>
             <tr>
                <td id="class_time">8</td>
               
            </tr>
             <tr>
                <td id="class_time">9</td>
                
            </tr>
             <tr>
                <td id="class_time">10</td>
            </tr>
            
            


        </table>
    </div><!--timetable ending tag-->
    <div class="foot">
        <button class="btn" id="save" v-on:click ="save()">저장하기</button> 
    </div>
</body>

</template>

<script >
    import subjects from '../timetable.json'
    import node from '../timetable/node'
    export default{
        components : {
            node
        },
          data(){
              return{
                  tt_name : "",
                  subjects: subjects,
                  subject : {
                       name : ""
                  },
                  filltedSub :{
                  },
                  courses : [[[]]],
                  raw_courses : [],
                  
              }
            
          },
          watch: {
            tt_name : {
                handler(){
                    console.log("changed")
                }
            },
            courses : {
                deep : true,
                handler(){
                    console.log("added")
                }
              },
              
          },
            methods : {
                save(){
                    this.$http.post('/api/make/make_tt', {
                        student_id :  this.$session.get('student_id'),
                        tt_name : this.tt_name,
                        total_credit : "3",
                        data_list : this.raw_courses

                    })
                    console.log("저장완료")
                    this.$router.replace({ name: "show" });
                },
                undo(){
                    alert("다음 업데이트를 기대해 주세요")
                },
                redo(){
                    alert("다음 업데이트를 기대해 주세요")
                },
                add_to(data){
                    
                    for(var i = 0; i < data.length; i++){
                        var day_index = 0;
                        var time_index = parseInt(data[i].start);
                        console.log(data[i]);
                        console.log(parseInt(data[i].start));
                        if(data[i].day === 'Mon') day_index = 1;
                        else if(data[i].day === 'Tue') day_index = 2;
                        else if(data[i].day === 'Wed') day_index = 3;
                        else if(data[i].day === 'Thu') day_index = 4;
                        else if(data[i].day === 'Fri') day_index = 5;
                        else if(data[i].day === 'Sat') day_index = 6;
                        if(this.courses[day_index] === undefined) this.courses[day_index] = [];
                        if(this.courses[day_index][time_index] === undefined)this.courses[day_index][time_index] = [];
                        this.courses[day_index][time_index].push(data[i]);
                        this.$forceUpdate();
                    }
                    console.log(this.courses);

                },
                set_name(text) {
                    this.tt_name = text;
                },
                add_to_database(data){
                    //duplicate 검사하기
                    this.raw_courses.push(data)
                }
            },
          
           
          
            created(){
                this.$EventBus.$on('to_timetablem',function(text){//show 에서 추가하기 했을때 오는 이름
                    this.tt_name = text;
                    this.tt_name = "aa";
                    console.log(this.tt_name);
                }),
                this.$EventBus.$on('add',function(text){//즐겨찾기에서 오는 버스
                    console.log(text);
                }),
                this.$EventBus.$on('courses',this.add_to);
                this.$EventBus.$on('raw_courses', this.add_to_database)
            }
        }
        
    
</script>


<style  src = '../../assets/Makepage/timetable_m.less' lang="scss" scoped>

</style>