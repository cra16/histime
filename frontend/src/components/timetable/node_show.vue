<template>
<div>
    <div v-if="data.height!=-1">
        <div class ="box">
            <div v-bind:id="height" v-bind:class="classObject()" v-bind:style="{ 'background-color': `${mycolor}`}" class = "node" >
                <p id="course_name">{{ this.data.course_name }}</p>
                <p id="prof">{{ this.data.professor}}</p>   
                <div ></div> 
            </div>
            <span v-bind:style="{ 'background-color': `${mycolor}`}" v-bind:class="classObjectTip()" class = "tooltip">
            <p id="title">상세정보</p>
            <p>{{ this.data.code }}</p> 
            <p>{{ this.data.course_name }}</p>
            <p>{{ this.data.professor }}</p>
            <p>{{ this.data.time }}</p>
            <p>{{ this.data.credit }}학점</p>
            <p>영어 : {{ this.data.english }} &nbsp; {{ this.data.gubun }}</p>
        </span>
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
       
        classObject() { //여러개의 class를 한번에 만들 수 있음,case를 구분하여 위치와 길이를 만듬
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
        },
            classObjectTip() { //툴팁용 class bind

           

            for(var i=0; i<10; i++)//몇고시인지
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
                    t11: this.time[10],
            }
        }
        
 
    },
     created(){
        this.mycolor = this.data.color;

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

<style src = '../../assets/timetable/node_show.scss' lang='scss' scoped>
   
</style>