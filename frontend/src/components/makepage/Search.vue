<template>
 <div>
       <h1 id="head">과목찾기</h1>
       <h2 > 
      <span class='blue_window'>
        <input v-model="course_name" type="text" placeholder="과목명" class='input_text' name="search"/></span> 
        <input type="button" class='sch_filt' value="검색" v-on:click="search_by_name"/>
      
        <input type="button" class='sch_filt' value="필터" v-on:click="show"/>
       </h2>

  <div class='contents'>
        <div v-show="!showbox" v-for="(course, key) in search" >
       
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
            <p>학부 &emsp;&ensp;&nbsp;
                <select v-model="filter.hakbu">
                    <option v-for="course_name in course_names" :key="course_name"> 
                        {{course_name}}
                    </option>
                </select>
            </p>
        
            <p>이수구분  
                <select v-model="filter.gubun"> 
                    <option  v-for=" gubun in gubuns " :key="gubun">
                        {{ gubun }}
                    </option>
                </select>
            
                &ensp;교양영역
                <select v-model="filter.gyoyang">
                        <option v-for=" gyoyang in gyoyangs" :key="gyoyang">
                        {{gyoyang}}
                        </option>
            </select>
            </p>
        
            <p>교수님 &ensp;&nbsp;
            <input v-model="filter.professor" type="text" placeholder="교수님 이름"/>
            </p>     

            <p>학점&emsp;&ensp;&nbsp;
                    <input type="button" class="credit" value="0.5">
                    <input type="button" class="credit" value="1">
                    <input type="button" class="credit" value="2">
                    <input type="button" class="credit" value="3">
                    <input type="button" class="credit" value="4">
            </p>

            
            <p>영어비율
            <select v-model="filter.english">
                        <option v-for=" english in englishs" :key="english">
                            {{english}}
                        </option>
            </select>
            </p>

        
                <p>시간대 &nbsp;&ensp;
               
                <input type="button" class='openchoose' value="선택창 열기" v-on:click="show2"/>
                 
                </p>

         
           <center><input type="button"  class="search" value="검색하기"></center>

            <div v-show="searchbox" class="placeholder-box2">
                <p>검색하고자 하는 시간대를 모두 클릭해주세요</p>
                         <table>
                            <thead>
                                <tr>
                                 <th></th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                    <td>1</td><td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                    </tr>
                                    <tr>
                                    <td>2</td><td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                    </tr>
                                    <tr>
                                    <td>3</td><td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                    </tr>
                                    <tr>
                                    <td>4</td><td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                    </tr>
                                    <tr>
                                    <td>5</td><td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                    </tr>
                                    <tr>
                                    <td>6</td><td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                    </tr>
                                    <tr>
                                    <td>7</td><td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                    </tr>
                                    <tr>
                                    <td>8</td><td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                    </tr>
                                    <tr>
                                    <td>9</td><td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                    </tr>
                                    <tr>
                                    <td>10</td><td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                              <td onclick="this.style.backgroundColor = 'yellow';"></td>
                                    </tr>
                            </tbody>
                        </table>
                     
                
                <p> <input type="button" class="choosedone" value=" done "  v-on:click="chosen">
                    <input type="button" class="choosereset" value=" reset " v-on:click="reset" >
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
            course_names:['전체','글로벌','기계제어','경영경제','공간환경','국제어문','법학부','상담복지','생명과학','언론정보','전산전자',
            '창의융합(인문사회)','창의융합(자연과학)','창의융합(공학)','콘텐츠융합디자인','ICT창업'],
            gubuns: ['전체','전선','전필','자선','교선','교선필','교필','공선'],
            gyoyangs:['전체','신앙1','신앙3','영어1','영어2','한국어','제2외국어','세계관1','세계관2',
            '인성1','인문학','사회과학','자연과학','기독교신앙기초1','기독교신앙기초2','소통','융복합','리더십및문제해결',
            'ICT입문','프로그래밍기초','소프트웨어활용','특론및개별연구','전공기초','예술','스포츠'],
            englishs:['100%','0%'],
            course_name: '',
            showbox:false,
            searchbox:false,
            search:[

            ],
            filter:{
                hakbu:'',
                gubun:'',
                gyoyang:'',
                professor:'',
                english:'',
                time:'',
                credit:''
            }
            
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
        },
        reset:function(){
            this.style.backgroundColor=white;
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

            this.$EventBus.$emit('add_to_fav',this.search[key]);
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


