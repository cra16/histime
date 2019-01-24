<template>
 <div>
       <h1 id="head">과목찾기</h1>
       <div class="search_field" > 
        <input v-model="course_name" type="text" placeholder="과목명" class='input_text' name="search"/>
        <input type="button" class='sch_filt' value="검색" v-on:click="search_by_name"/>
      
        <input type="button" class='sch_filt' value="필터" v-on:click="show"/>
       </div>

  <div class='contents'>
        <div v-show="!showbox" v-for="(course, key) in search" :key= "key">
       
            <div class="content" >
                        <div class="section1">
                            <p>{{course.name}}</p>
                            <p>{{`[${course.code}]`}}</p>
                        </div>

                        <div class="section2">
                            <p>{{course.time}}</p>
                            <p>{{course.credit}}학점</p>
                            <p>{{course.gubun}}</p>
                        </div>

                        <div class="section3">
                            <p>{{course.professor}}</p>
                            <p>영어 {{course.english}}</p>
                        </div>

                        <div class="section4">
                            <button id="delete" v-on:click="(event) => { add_to_fav(key) }"></button>
                            <br/>
                            <button id="add" v-on:click="(event) => { add_to_tt(key) }"></button>

                        </div>

                        <hr/>
             </div>
      </div>
    </div>
     
      
     
      <div v-show="showbox" class="placeholder-box" >
           <p></p>
            <p>학부&emsp;&ensp;&nbsp;
                <select v-model="filter.hakbu">
                    <option value="">전체</option>
                    <option v-for="course_name in course_names" :key="course_name" > 
                        {{course_name}}
                    </option>
                </select>
            </p>
        
            <p>이수구분 
                <select v-model="filter.gubun">
                    <option value="">전체</option>
                    <option  v-for=" gubun in gubuns " :key="gubun">
                        {{ gubun }}
                    </option>
                </select>
            
                &ensp;교양영역
                <select v-model="filter.gyoyang">
                        <option value="">전체</option>
                        <option v-for=" gyoyang in gyoyangs" :key="gyoyang">
                            {{gyoyang}}
                        </option>
                </select>
            </p>
        
            <p>교수님 &ensp;&nbsp;
            <input v-model="filter.professor" type="text" placeholder="교수님 이름"/>
            </p>     

            <p>학점&emsp;&ensp;&nbsp;
                    <input type="checkbox" id="credit" value="0.5" v-model="checkedCredits">
                    <label for="credit">&ensp;0.5</label>
                    <input type="checkbox" id="credit1" value="1" v-model="checkedCredits">
                    <label for="credit1">&emsp; 1</label>
                    <input type="checkbox" id="credit2" value="2" v-model="checkedCredits">
                    <label for="credit2">&emsp; 2</label>
                    <input type="checkbox" id="credit3" value="3" v-model="checkedCredits">
                    <label for="credit3">&emsp; 3</label>
                    <input type="checkbox" id="credit4" value="4" v-model="checkedCredits">
                    <label for="credit4">&emsp; 4</label>
            </p>

            
            <p>영어비율
            <select v-model="filter.english">
                        <option value="">전체</option>
                        <option v-for=" english in englishs" :key="english">
                            {{english}}
                        </option>
            </select>
            </p>

        
                <p>시간대 &nbsp;&ensp;
               
                <input type="button" class='openchoose' value="선택창 열기" v-on:click="show2"/>
                 
                </p>

         
           <center><input type="button"  class="search" value="검색하기" v-on:click="ssearch"></center>

            <div v-show="searchbox" class="placeholder-box2">
                <p>검색하고자 하는 시간대를 모두 클릭해주세요</p>
                         <table>
                            <thead>
                                <tr>
                                 <th></th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for ="i in 10" :key ="i">
                                    <td>{{ i }}</td>
                                        <td v-for ="j in 6" :key ="j" > 
                                        <input type="checkbox" id="checktime" value="" v-on:click="checkmethod(i,j)">
                                        <label id="checktime"></label>
                                        </td>
                                </tr>
                            </tbody>
                        </table>
                     
                
                <p> <input type="button" class="choosedone" value=" done "  v-on:click="chosen">
                    <input type="button" class="choosereset" value=" reset " v-on:click="reset(checkbox)" >
                </p>
            </div>
       </div>
       
     <h1 id="foot"> </h1>   

    </div>
  
</template>

<script type="text/javascript">
export default {
    data(){
        return{
            course_names:['글로벌','기계제어','경영경제','공간환경','국제어문','법학부','상담복지','생명과학','언론정보','전산전자',
            '창의융합(인문사회)','창의융합(자연과학)','창의융합(공학)','콘텐츠융합디자인','ICT창업'],
            gubuns: ['전선','전필','자선','교선','교선필','교필','공선'],
            gyoyangs:['신앙1','신앙3','영어1','영어2','한국어','제2외국어','세계관1','세계관2',
            '인성1','인문학','사회과학','자연과학','기독교신앙기초1','기독교신앙기초2','소통','융복합','리더십및문제해결',
            'ICT입문','프로그래밍기초','소프트웨어활용','특론및개별연구','전공기초','예술','스포츠'],
            englishs:['100%','0%'],
            course_name: '',
            showbox:false,
            searchbox:false,
            checkflag:false,
            search:[

            ],
            checktime:[[]],
            backendchecktime:[],
            // checktime1:[
            //     { '월,1', value:'false'},{ key: '월,2', value:'false'}, { key: '월,3', value:'false'},{key: '월,4', value:'false'},
            //     { key: '월,5', value:'false'},{ key: '월,6', value:'false'},{ key: '월,7', value:'false'},{ key: '월,8', value:'false'},
            //     { key: '월,9', value:'false'},{ key: '월,10', value:'false'}
            // ], 
            checkedCredits: [],
            filter:{
                hakbu:'',
                gubun:'',
                gyoyang:'',
                professor:'',
                english:'',
                time:'',
                credit:''
            },
        
            
        }
    },
  
    methods:{
        show: function(){
            this.showbox=!this.showbox;
        },
        show2: function(){
            this.searchbox=!this.searchbox;
        },
        chosen: function(){
            this.searchbox=false;
            
               for(var i=1;i<11; i++) {
                for(var j=1;j<7;j++) {
                  if(this.checktime[i] === undefined){
                      continue;
                } if(this.checktime[i][j]===true) {
                        {    if(i==1) {
                                if(j==1){
                                    this.backendchecktime.push('Mon1');
                                    console.log(this.backendchecktime);
                                }
                                if(j==2){
                                    this.backendchecktime.push('Tue1');
                                    console.log(this.backendchecktime);
                                }
                                if(j==3){
                                    this.backendchecktime.push('Wed1');
                                    console.log(this.backendchecktime);
                                }
                                if(j==4){
                                    this.backendchecktime.push('Thu1');
                                    console.log(this.backendchecktime);
                                }
                                if(j==5){
                                    this.backendchecktime.push('Fri1');
                                    console.log(this.backendchecktime);
                                }
                             
                                if(j==6){
                                    this.backendchecktime.push('Sat1');
                                    console.log(this.backendchecktime);
                                }
                            }

                            if(i==2) {
                                if(j==1){
                                    this.backendchecktime.push('Mon2');
                                    console.log(this.backendchecktime);
                                }
                                if(j==2){
                                    this.backendchecktime.push('Tue2');
                                    console.log(this.backendchecktime);
                                }
                                if(j==3){
                                    this.backendchecktime.push('Wed2');
                                    console.log(this.backendchecktime);
                                }
                                if(j==4){
                                    this.backendchecktime.push('Thu2');
                                    console.log(this.backendchecktime);
                                }
                                if(j==5){
                                    this.backendchecktime.push('Fri2');
                                    console.log(this.backendchecktime);
                                }
                             
                                if(j==6){
                                    this.backendchecktime.push('Sat2');
                                    console.log(this.backendchecktime);
                                }
                            }
                            if(i==3) {
                                if(j==1){
                                    this.backendchecktime.push('Mon3');
                                    console.log(this.backendchecktime);
                                }
                                if(j==2){
                                    this.backendchecktime.push('Tue3');
                                    console.log(this.backendchecktime);
                                }
                                if(j==3){
                                    this.backendchecktime.push('Wed3');
                                    console.log(this.backendchecktime);
                                }
                                if(j==4){
                                    this.backendchecktime.push('Thu3');
                                    console.log(this.backendchecktime);
                                }
                                if(j==5){
                                    this.backendchecktime.push('Fri3');
                                    console.log(this.backendchecktime);
                                }
                             
                                if(j==6){
                                    this.backendchecktime.push('Sat3');
                                    console.log(this.backendchecktime);
                                }
                            }
                            if(i==4) {
                                if(j==1){
                                    this.backendchecktime.push('Mon4');
                                    console.log(this.backendchecktime);
                                }
                                if(j==2){
                                    this.backendchecktime.push('Tue4');
                                    console.log(this.backendchecktime);
                                }
                                if(j==3){
                                    this.backendchecktime.push('Wed4');
                                    console.log(this.backendchecktime);
                                }
                                if(j==4){
                                    this.backendchecktime.push('Thu4');
                                    console.log(this.backendchecktime);
                                }
                                if(j==5){
                                    this.backendchecktime.push('Fri4');
                                    console.log(this.backendchecktime);
                                }
                             
                                if(j==6){
                                    this.backendchecktime.push('Sat4');
                                    console.log(this.backendchecktime);
                                }
                            }
                            if(i==5) {
                                if(j==1){
                                    this.backendchecktime.push('Mon5');
                                    console.log(this.backendchecktime);
                                }
                                if(j==2){
                                    this.backendchecktime.push('Tue5');
                                    console.log(this.backendchecktime);
                                }
                                if(j==3){
                                    this.backendchecktime.push('Wed5');
                                    console.log(this.backendchecktime);
                                }
                                if(j==4){
                                    this.backendchecktime.push('Thu5');
                                    console.log(this.backendchecktime);
                                }
                                if(j==5){
                                    this.backendchecktime.push('Fri5');
                                    console.log(this.backendchecktime);
                                }
                             
                                if(j==6){
                                    this.backendchecktime.push('Sat5');
                                    console.log(this.backendchecktime);
                                }
                            }
                             if(i==6) {
                                if(j==1){
                                    this.backendchecktime.push('Mon6');
                                }
                                if(j==2){
                                    this.backendchecktime.push('Tue6');                        
                                }
                                if(j==3){
                                    this.backendchecktime.push('Wed6');
                                }
                                if(j==4){
                                    this.backendchecktime.push('Thu6');
                                }
                                if(j==5){
                                    this.backendchecktime.push('Fri6');
                                }
                                if(j==6){
                                    this.backendchecktime.push('Sat6');
                                }
                            }
                            if(i==7) {
                                if(j==1){
                                    this.backendchecktime.push('Mon7');
                                }
                                if(j==2){
                                    this.backendchecktime.push('Tue7');                        
                                }
                                if(j==3){
                                    this.backendchecktime.push('Wed7');
                                }
                                if(j==4){
                                    this.backendchecktime.push('Thu7');
                                }
                                if(j==5){
                                    this.backendchecktime.push('Fri7');
                                }
                                if(j==6){
                                    this.backendchecktime.push('Sat7');
                                }
                            }
                            if(i==8) {
                                if(j==1){
                                    this.backendchecktime.push('Mon8');
                                }
                                if(j==2){
                                    this.backendchecktime.push('Tue8');                        
                                }
                                if(j==3){
                                    this.backendchecktime.push('Wed8');
                                }
                                if(j==4){
                                    this.backendchecktime.push('Thu8');
                                }
                                if(j==5){
                                    this.backendchecktime.push('Fri8');
                                }
                                if(j==6){
                                    this.backendchecktime.push('Sat8');
                                }
                            }
                            if(i==9) {
                                if(j==1){
                                    this.backendchecktime.push('Mon9');
                                }
                                if(j==2){
                                    this.backendchecktime.push('Tue9');                        
                                }
                                if(j==3){
                                    this.backendchecktime.push('Wed9');
                                }
                                if(j==4){
                                    this.backendchecktime.push('Thu9');
                                }
                                if(j==5){
                                    this.backendchecktime.push('Fri9');
                                }
                                if(j==6){
                                    this.backendchecktime.push('Sat9');
                                }
                            }
                             if(i==10) {
                                if(j==1){
                                    this.backendchecktime.push('Mon10');
                                    console.log(this.backendchecktime);
                                }
                                if(j==2){
                                    this.backendchecktime.push('Tue10');
                                    console.log(this.backendchecktime);
                                }
                                if(j==3){
                                    this.backendchecktime.push('Wed10');
                                    console.log(this.backendchecktime);
                                }
                                if(j==4){
                                    this.backendchecktime.push('Thu10');
                                    console.log(this.backendchecktime);
                                }
                                if(j==5){
                                    this.backendchecktime.push('Fri10');
                                    console.log(this.backendchecktime);
                                }
                             
                                if(j==6){
                                    this.backendchecktime.push('Sat10');
                                    console.log(this.backendchecktime);
                                }
                            }
                       }  //this.checktime[i][j]===false 체크 후 done 하고 초기화
                       





                }

            }
          }
        },
        reset:function(checkbox){
         
            document.getElementById("checktime").checked = false;
        },
        creditslt:function(){
           this.style.background='powderblue';

        },
        ssearch:function(){
            this.showbox=!this.showbox;
         
        },
        checkmethod:function(i,j){
            if(this.checktime[i] === undefined) {
                this.checktime[i] = [];
            }
            this.checktime[i][j]=true;
            console.log(this.checktime);
        },
        search_by_name: function(){
            console.log(this.$session.get('student_id'));
            this.$http.post('/api/make/search/name', {
                course_name : this.course_name,
                }).then((response) => {
                    console.log(response.data);
                    this.search = response.data;
            });
            this.course_name = '';
        },
        search_by_Filter: function(){
            this.$http.post('/api/make/search/filter', {
                course_name : this.search.course_name,
                }).then((response) => {
                    console.log(response.data);
                    search = response.data;
            });
            this.filter.hakbu = '';
            this.filter.gubun = '';
            this.filter.gyoyang = '';
            this.filter.credit = '';
            this.filter.english = '';
            this.filter.professor = '';
            this.filter.time = '';
            this.showbox  = !this.showbox;
        },
         add_to_fav: function(key){
            // console.log(key);
            console.log(this.search[key].name);
            
            this.$http.post('/api/make/add_fav', {
                student_id : this.$session.get('student_id'),
                code : this.search[key].code,
                course_name : this.search[key].name,
                professor : this.search[key].professor,
                time : this.search[key].time,
                credit : this.search[key].credit
                }).then((response) => {
                    console.log(response.data);
                    search = response.data;
            });
        },
        add_to_tt: function(key){
            // console.log(key);
            console.log(this.search[key].name);
            var data = this.parsingTime(this.search[key]);

            for(var i = 0 ; i < data.length; i++){
                console.log( "day :" + data[i].day);
                console.log( "start :" + data[i].start);
                console.log( "length :" + data[i].long);
                
            }

            this.$EventBus.$emit('courses', data);

            // this.$http.post('/api/make/add_fav', {
            //     student_id : this.$session.get('student_id'),
            //     code : this.search[key].code,
            //     course_name : this.search[key].name,
            //     professor : this.search[key].professor,
            //     time : this.search[key].time,
            //     credit : this.search[key].credit
            //     }).then((response) => {
            //         console.log(response.data);
            //         search = response.data;
            // });
        },    
        parsingTime: function(course){
            var sep_time = course.time.split( ',');
            // for(var i = 0; i< sep_time.length; i++){
            //     console.log(sep_time[i]);
            // }
            var prepared_data = [];
            if(course.time = '')return prepared_data;

            prepared_data.push({
                        code : course.code,
                        course_name : course.name,
                        professor : course.professor,
                        time : course.time,
                        credit : course.credit,
                        
                        day : sep_time[0].substr(0, 3),
                        start : sep_time[0][3],
                        long : 1,
                    });
            
            for(var i = 1; i < sep_time.length; i++){
                if(parseInt(sep_time[i-1][3]) + 1 === parseInt(sep_time[i][3])){
                    console.log("into comparison");
                    var temp = prepared_data.pop();
                    console.log(temp.long);
                    temp.long ++;
                    prepared_data.push(temp);
                }
                else{
                    prepared_data.push({
                        code : course.code,
                        course_name : course.name,
                        professor : course.professor,
                        time : course.time,
                        credit : course.credit,
                        
                        day : sep_time[i].substr(0, 3),
                        start : sep_time[i][3],
                        long : 1,
                    });
                }
            }
            return prepared_data;
        }
    
    }
}

</script>
<style   src = '../../assets/Makepage/search.less' lang = "scss" scoped>
</style>


