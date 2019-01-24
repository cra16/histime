<template>
<!-- show page에서 시간표를 보여주는 부분 -->
<body>
  <div class="head">
    
    <h3>{{ tt_name }}</h3>
    <!--글자 제한 두기-->
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
                    <td v-for="j in 6" :key="j" rowspan="10"> <!--요일 반복문-->         
                        <div v-for="i in 10" :key="i"><!--시간반복-->
                            <div v-if="courses[j] != undefined">
                                <div v-if="courses[j][i] != undefined">
                                    <div v-for="course of courses[1][i]" :key="course.code">
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
</body>
</template>

<script >
import node from "../timetable/node";

export default {
  components: {
    node
  },
  data() {
    return {
      tt_name: "",
      nodes: {},
      node: {
        start: "1",
        leng: "2",
        name: "녹차아이스"
      },
      courses : [[[]]],
    };
  },
  watch: {
    
  },

  created() {
    this.$EventBus.$on("to_timetables", this.get_data);//중간중간 시간표 클릭시
    // this.check = new Array(6); // 매개변수는 배열의 크기
    // for (var i = 0; i < 5; i++) {
    //      arr[i] = new Array(10); // 매개변수는 배열의 크기
    // }
  },
  methods: {
    get_data(text) {
        this.tt_name = text;
        console.log(this.tt_name);
        this.$http.post("/api/show/tt", {
            student_id: this.$session.get("student_id"),
            ttname: this.tt_name}).then(
                response => {
                    if (response.status === 200) {
                    console.log(response.data);
                       
                }
            },
        );
    },
    timetable_s() {
      this.$http.post("/api/show/timetable", {
          student_id: this.$session.get("student_id"),
          tt_name: this.tt_name
        })
        .then(response => {
          if (response.status === 200) {
            console.log(response.data);
          }
        });
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
  }
};
</script>


<style  src = '../../assets/Showpage/timetable_s.less' lang="scss" scoped>
</style>
