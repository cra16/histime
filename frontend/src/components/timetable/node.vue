<template>
<div>
    <div class ="box">
        <div v-bind:id="long" v-bind:class="classObject" class = "node" >
            <button v-on:click="this.delete_course" >x</button>

            <p id="course_name">{{ this.data.course_name }}<span>( {{ this.data.credit }} )</span></p>
            <p id = "code" >{{ this.data.code }}<p>
            <p id="prof">{{ this.data.professor}}</p>    
        </div>
        <span v-bind:class="classObject" class = "tooltip">룰루</span>
    </div>
</div>
    
</template>

<script>
export default {
   props : ['data'],//start, long, name, professor
   data(){
        return{
            time : [] ,
            long : 'long' + this.data.long , //연강
            mycolor: '#000000',
            

        };
    },
    methods : {
       delete_course(){//노드 courses[[[]]]배열에서 삭제
           console.log(this.$parent.courses)
           for(var i=1;i<=6;i++){
                if(this.$parent.courses[i] === undefined)  continue;//다른 요일로 건너뛰기
                for(var j=1;j<=10;j++){
                if(this.$parent.courses[i][j] === undefined)  continue;//다른 시간으로 건너뛰기
                for(var k=0; k<this.$parent.courses[i][j].length;k++){
                      if(this.$parent.courses[i][j][k].code == this.data.code){
                        this.$parent.courses[i][j].splice(k,1) 
                        this.$emit('update', 'hello!')
                      }
                  }                
               }
           }
       }
        
 
    },
     created(){
            // var div = document.querySelector('#node').style;
            //  this.mycolor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
            //  div.backgroundColor = this.mycolor;
     },
     watich:{
         tooltip :{
             handler(){
                console.log(this.tooltip)
             }
            
         }
     },
    computed: {
        classObject: function () {
                   for(var i=0; i<10; i++)
                        this.time[i] = false;
                   this.time[this.data.start-1] = true;
                    
            return {
                    t1: this.time[0],
                    t2: this.time[1],
                    t3: this.time[2],
                    t4: this.time[3],
                    t5: this.time[4],
                    t6: this.time[5],
                    t7: this.time[6],
                    t8: this.time[7],
                    t9: this.time[8],
                    t10: this.time[9],       
            }
        }
    }   
}
</script>

<style src = '../../assets/timetable/node.less' lang='scss' scoped>
   
</style>
