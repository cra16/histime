<template>
<!-- show page에서 시간표를 보여주는 부분 -->
<body>
    <div class="head">
        <h3>첫번째 예상시간표</h3><!--글자 제한 두기-->
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
      
                    <td rowspan="10">
                        <!-- 월요일에 대한 반복문-->
                        <!--1교시 to 10교시-->
                        
                        <div v-for="i in 10" :key="i">
                            <div v-if="courses[1] != undefined">
                                <div v-if="courses[1][i] != undefined">
                                    <div v-for="course of courses[1][i]" :key="course.code">
                                            <node :data="course" />
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </td>
             
                 <td rowspan="10">
                   <div v-for="i in 10" :key="i">
                            <div v-if="courses[2] != undefined">
                                <div v-if="courses[2][i] != undefined">
                                    <div v-for="course of courses[2][i]" :key="course.code">
                                            <node :data="course" />
                                    </div>
                                </div>
                            </div>
                        </div> 
                 </td>

                 <td rowspan="10">
                      <div v-for="i in 10" :key="i">
                            <div v-if="courses[3] != undefined">
                                <div v-if="courses[3][i] != undefined">
                                    <div v-for="course of courses[3][i]" :key="course.code">
                                            <node :data="course" />
                                    </div>
                                </div>
                            </div>
                        </div> 
                 </td>
                 <td rowspan="10">
                      <div v-for="i in 10" :key="i">
                            <div v-if="courses[4] != undefined">
                                <div v-if="courses[4][i] != undefined">
                                    <div v-for="course of courses[4][i]" :key="course.code">
                                            <node :data="course" />
                                    </div>
                                </div>
                            </div>
                        </div> 
                 </td>
                 <td rowspan="10">
                      <div v-for="i in 10" :key="i">
                            <div v-if="courses[5] != undefined">
                                <div v-if="courses[5][i] != undefined">
                                    <div v-for="course of courses[5][i]" :key="course.code">
                                            <node :data="course" />
                                    </div>
                                </div>
                            </div>
                        </div> 
                </td>
                <td rowspan="10" id="last">
                     <div v-for="i in 10" :key="i">
                            <div v-if="courses[6] != undefined">
                                <div v-if="courses[6][i] != undefined">
                                    <div v-for="course of courses[6][i]" :key="course.code">
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
                  
              }
            
          },
          watch: {
            courses : {
                deep : true,
                handler(){
                    console.log("added")
                }
              },
              
          },
            methods : {
                save(){
                    this.$router.replace({ name: "show" });
                },
                undo(){
                    alert("undo")
                },
                redo(){
                    alert("redo")
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
                        else if(data[i].day === 'Thi') day_index = 4;
                        else if(data[i].day === 'Fri') day_index = 5;
                        else if(data[i].day === 'Sat') day_index = 6;
                        if(this.courses[day_index] === undefined) this.courses[day_index] = [];
                        if(this.courses[day_index][time_index] === undefined)this.courses[day_index][time_index] = [];
                        this.courses[day_index][time_index].push(data[i]);
                        this.$forceUpdate();
                    }
                    console.log(this.courses);

                }
            },
          
            created(){
                this.$EventBus.$on('add',function(text){
                    console.log(text);
                }),
                this.$EventBus.$on('courses',this.add_to);
            }
        }
        
    
</script>


<style  src = '../../assets/Makepage/timetable_m.less' lang="scss" scoped>

</style>
