<template>
<!-- show page에서 시간표를 보여주는 부분 -->
<div>
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
                    <td v-for="i in 6" :key="i" rowspan="10"><!--요일에 대한 반복문-->
                        <div v-for="j in 10" :key="j"><!--1교시 to 10교시 반복문-->
                            <div v-if="courses[i] != undefined">
                                <div v-if="courses[i][j] != undefined">
                                    <div v-for="course of courses[i][j]" :key="course.code">
                                            <node @update="update" :data="course"/>
                                        
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
</div>
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
    get_data(data) {

        this.tt_name = data.ttname;
        console.log(this.tt_name);

        this.$http.post("/api/show/tt", {
            student_id: this.$session.get("student_id"),
            ttname: this.tt_name
        }).then(response => {
            if (response.status === 200) {
                console.log(response.data);
                for(var i = 0; i < response.data.length; i ++){
                    var time_index = response.data[i].start;
                    var day_index = 0;
                    if(response.data[i].day === '월') day_index = 1;
                    else if(response.data[i].day === '화') day_index = 2;
                    else if(response.data[i].day === '수') day_index = 3;
                    else if(response.data[i].day === '목') day_index = 4;
                    else if(response.data[i].day === '금') day_index = 5;
                    else if(response.data[i].day === '토') day_index = 6;

                    this.courses = [[[]]];
                    if(courses[day_index] === undefined) courses[day_index] = [];
                    if(courses[day_index][time_index] === undefined) courses[day_index][time_index] = [];
                    this.courses[day_index][time_index].push(response.data[i]);
                }
                
                
                this.$forceUpdate();

                
            }
        });
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
  }
};
</script>


<style  src = '../../assets/Showpage/timetable_s.less' lang="scss" scoped>
</style>
