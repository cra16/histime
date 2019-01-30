<template>
<!-- show page에서 시간표를 보여주는 부분 -->
<div>
  <div class="head">
    
    <h3>{{ tt_name }}</h3>
    <!--글자 제한 두기-->
    <button  v-on:click="code_copy_toggle()">과목코드복사</button>
    <codeCopy v-if="codeCopyShow==true" ></codeCopy>

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

        </table>
    </div><!--timetable ending tag-->
</div>
</template>

<script >
import nodeShow from "../timetable/node_show";
import codeCopy from "../timetable/code_copy";

export default {
  components: {
    nodeShow, codeCopy
  },
  data() {
    return {
        codeCopyShow:false,
                tt_name: "",
        courses : [[[]]],
    };
  },
  watch: {
    
  },

  created() {
    this.$EventBus.$on('close_code_copy',this.code_copy_toggle)
   
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
    code_copy_toggle(){
                this.codeCopyShow = !this.codeCopyShow
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
  }
};
</script>


<style  src = '../../assets/Showpage/timetable_s.less' lang="scss" scoped>
</style>
