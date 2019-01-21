<template>
<div v-bind:class="classObject">{{ this.data.course_name }}</div>
</template>

<script>
export default {
   props : ['data'],//start, end, name
   data(){
        return{
           time : [] 
               

        };
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
