<template>
<div>
    <div v-if="data.height!=-1">
        <div class ="box">
            <div v-bind:id="height" v-bind:class="classObject()" v-bind:style="{ 'background-color': `${mycolor}`}" class = "node" >
                <!-- <input type = "color" v-model="mycolor" /> -->
                <button id = "del" v-on:click="this.delete_course" >x</button>

                <p id = "code" >{{`[${this.data.code}]`}}</p>
                <p id="course_name">{{ this.data.course_name }}</p>
                <p id="credit">{{ this.data.credit }}학점</p>
                <p id="prof">{{ this.data.professor}}</p>   
                <div ></div> 

            </div>
            <!-- <span v-bind:class="classObject" class = "tooltip">
                <p>상세정보</p>
                <p>{{ this.data.code }}  
                <p>{{ this.data.course_name }}</p>
                <p>{{ this.data.professor }}</p>
                <p>{{ this.data.time }}</p>
            </span> -->
        </div>
    </div>
</div>
    
</template>

<script>
export default {
   props : ['data'],//start, height, name, professor
   data(){
        return{
            time : [] , case : [], 
            height : 'height' + this.data.height , //연강
            mycolor : "",
        };
    },
    
    methods : {
        delete_course(){
            console.log(this.$parent.courses_store);
            this.$forceUpdate();
            //노드 courses_store[[[]]]배열에서 삭제
            for(var i=1;i<=6;i++){
                    if(this.$parent.courses_store[i] === undefined)  continue;//다른 요일로 건너뛰기
                    for(var j=1;j<=10;j++){
                    if(this.$parent.courses_store[i][j] === undefined)  continue;//다른 시간으로 건너뛰기
                    for(var k=0; k<this.$parent.courses_store[i][j].length;k++){
                        if(this.$parent.courses_store[i][j][k].code == this.data.code){
                            this.$parent.courses_store[i][j].splice(k,1) 
                            this.$emit('update', 'remove');
                        }
                    }                
                }
            }

            for(var i in this.$parent.raw_courses) {
                if(this.$parent.raw_courses[i].code === this.data.code) {
                    this.$parent.raw_courses.splice(i, 1);
                }
            }
        },
        classObject() { //
            var start = this.data.k_start;
            var size =this.data.size;
             for(var i=0; i<6; i++)
                        this.case[i] = false;
            if(start == 0&& size ==1) this.case[0] = true;
            else if(start == 0&& size ==2)   this.case[1] = true;
            else if(start == 0&& size ==3)   this.case[2] = true;
            else if(start == 1&& size ==2)   this.case[3] = true;
            else if(start == 1&& size ==3)   this.case[4] = true;
            else if(start == 2&& size ==3)   this.case[5] = true;
           

            for(var i=0; i<10; i++)
                this.time[i] = false;
            this.time[this.data.start-1] = true;
            this.$emit('update', 'add');                    
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
                    case0 : this.case[0],
                    case1 : this.case[1],
                    case2 : this.case[2],
                    case3 : this.case[3],
                    case4 : this.case[4],
                    case5 : this.case[5]   
            }
        }
        
 
    },
     created(){
        this.mycolor = this.data.color;

        // console.log(color);

        // $(this).css('background-color', 'red');

        //     var div = document.querySelector('#node').style;
        //      this.mycolor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        //      div.backgroundColor = this.mycolor;
     },
     watch:{
         tooltip :{
             handler(){
                console.log(this.tooltip)
             }
            
         }
     },
    computed: {
        
    }
}

       

</script>

<style src = '../../assets/timetable/node.less' lang='scss' scoped>
   
</style>