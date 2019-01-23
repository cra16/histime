<template>
<!-- show page에서 시간표를 보여주는 부분 -->
<body>
    <div class="head">
        <h3>{{ this.$session.get('to_timetablem') }}</h3><!--글자 제한 두기-->
        <button class="btn" id="redo" v-on:click="user_add()"></button>
    </div>

    <add v-if="user_add_clicked" ></add>
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
                    <td v-for="i in 6" :key="i" rowspan="10"><!--요일에 대한 반복문-->
                        <div v-for="j in 10" :key="j"><!--1교시 to 10교시 반복문-->
                            <div v-if="courses[i] != undefined">
                                <div v-if="courses[i][j] != undefined">
                                    <div v-for="course of courses[i][j]" :key="course.code">
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
    import add from "../timetable/add"

    export default{
        components : {
            node, add
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
                  courses : [[[]]],//시간표에 띄워줄 용도
                  raw_courses : [],//백엔드에 넘겨줄 용도
                  user_add_clicked : false//user 
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
                        ttname : this.$session.get('to_timetablem'),
                        total_credit : this.total_credit(),
                        data_list : this.raw_courses
                    }).then((response) => {
                        window.location = 'http://localhost:8000';
                    });
                },
                user_add(){
                    this.user_add_clicked = !(this.user_add_clicked)
                },
                add_to(course){
                    var data = course.parsed;
                    var raw_data = course.raw;
                    var duplication = false;

                    console.log("rc_length: " + this.raw_courses.length);

                    for(var i in this.raw_courses) {
                        if(this.raw_courses[i].code === raw_data.code) {
                            duplication = true;
                            break;
                        }
                    }

                    if(duplication === true) {
                            alert("이미 시간표에 추가한 과목입니다!");
                    } else {
                        this.raw_courses.push(raw_data);

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
                    }
                },
                set_name(text) {
                    this.tt_name = text;
                },
                total_credit(){
                    var sum = 0;
                    for (var i in this.raw_courses){
                        sum += this.raw_courses[i].credit*1;
                    }
                    return sum;
                },
                
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
                this.$EventBus.$on('close_user_custom',this.user_add)//user custom 창 종료
            }
        }
        
    
</script>


<style  src = '../../assets/Makepage/timetable_m.less' lang="scss" scoped>

</style>