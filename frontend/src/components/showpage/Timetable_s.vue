<template>
<!-- show page에서 시간표를 보여주는 부분 -->
<div>
  <div class="head">
    
    <h3>{{ tt_name }}</h3>
    <button id="copy" v-on:click="display_copy()"></button>
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
                    <td v-for="i in 6" :key="i" rowspan="11"><!--요일에 대한 반복문-->
                        <div v-for="j in 11" :key="j"><!--1교시 to 10교시 반복문-->
                            <div v-if="courses[i] != undefined">
                                <div v-if="courses[i][j] != undefined">
                                    <div v-for="course of courses[i][j]" :key="course.code">
                                            <nodeShow @update="update" :data="course"/>
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
            <tr>
                <td id="class_time">11</td>
            </tr>

        </table>
    </div><!--timetable ending tag-->
</div>
</template>

<script >
import nodeShow from "../timetable/node_show";

export default {
  components: {
    nodeShow
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
    //   course
    get_data(data) {

        this.tt_name = data.ttname;
        console.log(this.tt_name);

        this.$http.post("/api/show/tt", {
            student_id: this.$session.get("student_id"),
            ttname: this.tt_name
        }).then(response => {
            if (response.status === 200) {
                this.courses = [[[]]]; 
                console.log(response.data);
                for(var i = 0; i < response.data.length; i ++){
                    var day_index = response.data[i].day;
                    var time_index = response.data[i].start;
                    
                   
                    if(this.courses[day_index] === undefined) this.courses[day_index] = [];
                    if(this.courses[day_index][time_index] === undefined) this.courses[day_index][time_index] = [];
                    this.courses[day_index][time_index].push(response.data[i]);
                }
                this.$forceUpdate();

                
            }
        });
    },
    update(data){
                    console.log(data);
                    console.log('update function');
                    if(data == 'remove'){
                        console.log('remove');
                        
                    }
                
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
    display_copy() {
        this.$session.set('ttname', this.tt_name);

        let routeData = this.$router.resolve({name: 'copy'});
        window.open(routeData.href, '', 'width=600, height=600, left='+ (window.screen.width - 600)/2 + ', top=' + (window.screen.height - 600)/2);      
    }
  }
};
</script>


<style  src = '../../assets/Showpage/timetable_s.scss' lang="scss" scoped>
</style>
