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
                                            <node @update="update" :data="course" />
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
                    console.log("changed")
                    this.$forceUpdate();
                }
              },
              
          },
            methods : {
                update(){
                    this.$forceUpdate();
                },
                save(){//저장하기, 
                    this.$http.post('/api/make/make_tt', {
                        student_id :  this.$session.get('student_id'),
                        ttname : this.$session.get('to_timetablem'),
                        total_credit : this.total_credit(),
                        data_list : this.raw_courses
                    });

                    this.$router.replace({name: 'show'});
                },
                user_add(){
                    this.user_add_clicked = !(this.user_add_clicked)
                },
                add_a_to(data) {
                    for(var i in data) {
                        var duplication = this.duplication(data[i]);

                        if(!duplication) {
                            var parsed_data = this.parsingTime(data[i]);

                            this.raw_courses.push(data[i]);
                            this.display(parsed_data);
                        }
                    }
                    // data.forEach(function(item, data_index, data_array) {
                    //     var duplication = this.duplication(item);

                    //     if(!duplication) {
                    //         var parsed_data = this.parsingTime(item);

                    //         this.raw_courses.push(item);
                    //         this.display(parsed_data);
                    //     }
                    // });
                },
                add_to(raw_data){
                    var duplication = this.duplication(raw_data);
                    // console.log("rc_length: " + this.raw_courses.length);

                    if(duplication) {
                            alert("이미 시간표에 추가한 과목입니다!");
                    } else {
                        var parsed_data = this.parsingTime(raw_data);

                        this.raw_courses.push(raw_data);
                        this.display(parsed_data);

                        console.log(this.courses);
                    }
                },
                parsingTime(course) {
                    var course_temp = JSON.parse(JSON.stringify(course));
                    var course_for_use = JSON.parse(JSON.stringify(course));
                    
                    var prepared_data = [];

                    if(course_temp.time = '')return prepared_data;

                    var sep_time = course_for_use.time.split( ',');
                    // for(var i = 0; i< sep_time.length; i++){
                    //     console.log(sep_time[i]);
                    // }
                    console.log(course.time + '코스타임');
                    console.log(course_temp.time + '타임');

                    prepared_data.push({
                        code : course_temp.code,
                        course_name : course_temp.name,
                        professor : course_temp.professor,
                        time : course.time,
                        credit : course_temp.credit,
                        
                        day : sep_time[0].substr(0, 1),
                        start : sep_time[0][1],
                        long : 1,
                    });
            
                    for(var i = 1; i < sep_time.length; i++){
                        if(parseInt(sep_time[i-1][1]) + 1 === parseInt(sep_time[i][1])){
                            console.log("into comparison");
                            var temp = prepared_data.pop();
                            console.log(temp.long);
                            temp.long ++;
                            prepared_data.push(temp);
                        } else {
                            prepared_data.push({
                                code : course_temp.code,
                                course_name : course_temp.name,
                                professor : course_temp.professor,
                                time : course.time,
                                credit : course_temp.credit,
                                
                                day : sep_time[i].substr(0, 1),
                                start : sep_time[i][1],
                                long : 1,
                            });
                        }
                    }

                    for(var i = 0 ; i < prepared_data.length; i++){
                        console.log( "day :" + prepared_data[i].day);
                        console.log( "start :" + prepared_data[i].start);
                        console.log( "length :" + prepared_data[i].long);
                    }

                    return prepared_data;
                },
                duplication(raw_data) {
                    var duplication =   this.raw_courses.some(function(item, index, array) {
                                            return (item.code === raw_data.code);
                                        });
                    return duplication;
                },
                display(parsed_data) {
                    for(var i = 0; i < parsed_data.length; i++){
                            var day_index = 0;
                            var time_index = parseInt(parsed_data[i].start);
                            console.log(parsed_data[i]);
                            console.log(parseInt(parsed_data[i].start));
                            if(parsed_data[i].day === '월') day_index = 1;
                            else if(parsed_data[i].day === '화') day_index = 2;
                            else if(parsed_data[i].day === '수') day_index = 3;
                            else if(parsed_data[i].day === '목') day_index = 4;
                            else if(parsed_data[i].day === '금') day_index = 5;
                            else if(parsed_data[i].day === '토') day_index = 6;
                            if(this.courses[day_index] === undefined) this.courses[day_index] = [];
                            if(this.courses[day_index][time_index] === undefined)this.courses[day_index][time_index] = [];
                            this.courses[day_index][time_index].push(parsed_data[i]);
                            this.$forceUpdate();
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
                }
            },
            created(){
                this.$EventBus.$on('to_timetablem', function(text){//show 에서 추가하기 했을때 오는 이름
                    this.tt_name = text;
                    this.tt_name = "aa";
                    console.log(this.tt_name);
                }),
                this.$EventBus.$on('add_a', this.add_a_to),
                this.$EventBus.$on('courses', this.add_to),
                this.$EventBus.$on('close_user_custom', this.user_add)//user custom 창 종료
            }
        }
        
    
</script>


<style  src = '../../assets/Makepage/timetable_m.less' lang="scss" scoped>

</style>