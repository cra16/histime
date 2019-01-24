<template>

    <!-- <div v-if="data.long == 1"> -->
        <div v-bind:id="ID" v-bind:class="classObject">{{ this.data.course_name }}</div>
    <!-- </div> -->


</template>

<script>
export default {
   props : ['data'],//start, long, name
   data(){
        return{
            time : [] ,
            ID : '',
            mycolor: '#000000'
          

               

        };
    },
    method : {
 
    },
     created(){
            // var div = document.querySelector('#node').style;
            //  this.mycolor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
            //  div.backgroundColor = this.mycolor;
            console.log(this.data.course_name)
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
