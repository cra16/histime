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
    tt_name: function(data) {//시간표 이름이 바뀔 때 마다 시간표 내용이 달라짐
      this.get_data();
    }
  },

  created() {
    this.$EventBus.$on("to_timetables", this.change_name);//중간중간 시간표 클릭시
    // this.check = new Array(6); // 매개변수는 배열의 크기
    // for (var i = 0; i < 5; i++) {
    //      arr[i] = new Array(10); // 매개변수는 배열의 크기
    // }
  },
  methods: {
    get_data() {
      this.$http
        .post("/api/show/tt", {
          student_id: this.$session.get("student_id"),
          ttname: this.tt_name
        })
        .then(
          response => {
            if (response.status === 200) {
              console.log(response)    
            }
          },
          function(err) {}
        );
    },
    change_name(text) {
      this.tt_name = text;
    },

    timetable_s() {
      this.$http
        .post("/api/show/timetable", {
          student_id: this.$session.get("student_id"),
          tt_name: this.tt_name
        })
        .then(response => {
          if (response.status === 200) {
            nodes: response.data;
          }
        });
    }
  }
};
</script>


<style  src = '../../assets/Showpage/timetable_s.less' lang="scss" scoped>
</style>
