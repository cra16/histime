<template>
<!-- show page에서 시간표를 보여주는 부분 -->
<body>
    <div class="head">
        <h3>{{ tt_name }}</h3><!--글자 제한 두기-->
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
                <td rowspan="10" class="mon">
                    <!-- <node v-for="n in 3" :key="n" data="node">
                    </node> -->
                    <node :data='node'>
                    </node>
                    <node :data='node'>
                    </node>
                </td>
                 <td rowspan="10">
                     
                 </td>
                 <td rowspan="10">
                    <node></node>
                    <node></node>
                 </td>
                 <td rowspan="10">
                     
                 </td>
                 <td rowspan="10">
                 <node></node>
                      <node></node></td>
                <td rowspan="10" id="last">
                    <node></node>
                    <node></node>
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
    import node from '../timetable/node'
    export default{
        components : {
            node
        },
          data(){
              return{
                  tt_name : "",
                  subject : {
                       name : ""
                  },
                  nodes : {
                     
                  },
                  node : {
                      start : "1" ,
                      end : "2",
                      name : "녹차아이스",
                  }
              }
            
          },
        created() {
    	    this.$EventBus.$on('ttname', this.onReceive);
        },
         methods: {
    	    onReceive(text) {
                this.tt_name = text;
            }
       }   
    }
    

</script>


<style  src = '../../assets/Showpage/timetable_s.less' lang="scss" scoped>

</style>
