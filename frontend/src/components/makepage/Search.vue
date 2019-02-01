<template>
 <div class="main">
       <h1 id="head">과목찾기</h1>
       <div>
       <div class="search_field" > 

        <input v-model="course_name" type="text" placeholder="   과목명 혹은 교수님명" class='input_text' name="search" v-on:keydown.enter="search_by_name" />
        <input type="button" class='sch_filt' value="검색" v-on:click="search_by_name"/>
        <input type="button" class='sch_filt' value="필터" v-on:click="show"/>

       </div>
       </div>

  <div class='contents'>
      <p id="noResult" v-if='no_result === true'>검색결과가 없습니다.</p><!--검색결과가 없을때만 표시-->
        <p id="loading" v-if='loading=== true'>검색중...</p><!--검색결과가 없을때만 표시-->
        <div v-show="!showbox" v-for="(course, key) in search" :key= "key">
            <div class="content" >
                
                        <div class="section1">
                            <p>{{`[${course.code}]`}} {{course.name}}</p>
                        </div>

                        <span class="section2">
                            <p>{{course.gubun}}</p>
                            <p>{{course.time}}</p>
                            <p>{{course.credit}}학점</p>
                        </span>

                        <span class="section3">
                            <p>{{course.professor}}</p>
                            <p>영어 {{course.english}}</p>
                        </span>
                        <span class="section4">
                            <button id="fav" v-on:click="(event) => { add_to_fav(key) }"><img src="../../image/starF.png" width="19" height="20"></button>
                            <br/>
                            <button id="add" v-on:click="(event) => { add_to_tt(key) }"></button>
                        </span>
                        <hr />
                       
             </div>
               
      </div>
        
    </div>
    
      <div v-show="showbox" class="placeholder-box" >
           
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
            </p>
            <p>교양영역
                <select v-model="filter.gyoyang">
                        <option value="">전체</option>
                        <option v-for=" gyoyang in gyoyangs" :key="gyoyang">
                            {{gyoyang}}
                        </option>
                </select>
            </p>
            <p>교수님 &ensp;&nbsp;
            <input v-model="filter.professor" type="text" class="pfname" placeholder=" 교수님 이름"/>
            </p>     

            <p>학점&emsp;&ensp;&nbsp;
                    <input type="checkbox" id="credit" value="0.5" checked="false" v-model="filter.credit[0]">
                    <label for="credit">&nbsp;0.5</label>
                    <input type="checkbox" id="credit1" value="1" checked="false" v-model="filter.credit[1]">
                    <label for="credit1">&ensp;&nbsp;1</label>
                    <input type="checkbox" id="credit2" value="2" checked="false" v-model="filter.credit[2]">
                    <label for="credit2">&ensp;&nbsp;2</label>
                    <input type="checkbox" id="credit3" value="3" checked="false" v-model="filter.credit[3]">
                    <label for="credit3">&ensp;&nbsp;3</label>
                    <input type="checkbox" id="credit4" value="4" checked="false" v-model="filter.credit[4]">
                    <label for="credit4">&ensp;&nbsp;4</label>
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

         
           <center><input type="button"  class="search" value="검색하기" v-on:click="search_by_Filter"></center>

            <div v-show="searchbox" class="placeholder-box2">
                <p>검색하고자 하는 시간대를 모두 클릭해주세요</p>
                         <table>
                            <thead>
                                <tr>
                                 <th></th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for ="i in 11" :key ="i">
                                    <td>{{ i }}</td>
                                        <td v-bind:class="{checked : checktime[(i+j*11)]}" v-for ="j in 6" :key ="j" > 
                                        <input type="checkbox" id="checktime" value="" checked="false" v-model="checktime[(i + j * 11)]" v-on:click="checktime[(i + j * 11)] != checktime[(i + j * 11)]">
                                        <label for="checktime"></label>
                                        
                                        </td>
                                </tr>
                            </tbody>
                        </table>
                     
                
                <p> <input type="button" class="choosedone" value=" done "  v-on:click="timebox_chosen">
                    <input type="button" class="choosereset" value=" reset " v-on:click="timebox_reset" >

                </p>
            </div>
       </div>
       <div id="foot">
            <span id="update">시간표 정보 업데이트 일시 : {{this.update}}</span>
       </div>
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
            search:[], 
            checktime:[],
            filter:{
                hakbu:'',
                gubun:'',
                gyoyang:'',
                professor:'',
                english:'',
                time:[],
                credit:[]
            },
            no_result : true,//검색결과가 없음을 나타내는 변수
            loading : false,//검색결과를 기다리는 중을 나타내는 변수
            update : ''
        
            
        }
    },
    created(){
        this.get_update_time();
    },

    
    methods:{
        show: function(){
            this.course_name = '';//검색창 기록을 지움
            this.showbox=!this.showbox;
            this.filter.credit.splice(false, this.filter.credit.length);        


        },
        show2: function(){
           
            this.searchbox=!this.searchbox;
           
            
        },
        timebox_chosen: function(){
            this.searchbox=false;
               for(var i=1;i<67; i++) {
                    if(this.checktime[i] === undefined)continue;
                 if(this.checktime[i]===true) {
                    
                    console.log('j는' + j);
                    var day = '';
                    var time = i % 11;
                    var j = (i - time)/11;
                    if(j === 1) day +=  '월';
                    else if(j === 2) day += '화';
                    else if(j === 3) day += '수';
                    else if(j === 4) day += '목';
                    else if(j === 5) day += '금';
                    else if(j === 6) day += '토';
                    console.log(`${day}${time}`);

                    this.filter.time.push(`${day}${time}`);
                    
                         //this.checktime[i][j]===false 체크 후 done 하고 초기화
                }

            }
          
        },
        timebox_reset:function(){
            console.log('into timebox reset');
            this.checktime.splice(0, this.checktime.length);        
        },
        creditslt:function(){
           this.style.background='powderblue';

        },
        search_by_name: function(){//과목명, 또는 교수님 이름으로 검색버튼
            if(this.course_name.length==''){
                return;
            } else{
                this.no_result = false;//'결과가 없습니다' 글씨를 잠시 지워줌
                this.search=''//검색창 초기화
                this.loading = true;//'검색중..'글자 띄워줌
                this.$http.post('/api/make/search/name', {
                course_name : this.course_name,
                }).then((response) => {
                    this.loading = false //'로딩중'글자를 지움
                    if(response.data.length==0){//데이터 값이 들어오지 않았을때
                        this.no_result = true;//결과가 없음을 표시
                    }else{
                        this.no_result = false;
                        this.search = response.data;//결과값을 저장함
                    }
                },function (err) {//서버가 이상한 경우
                    
                    alert("서버가 이상합니다. histime206@gmail.com 으로 메일을 보내주세요 :) ")
                });
            // this.course_name = '';이게 없는게 일반적인것 같은데..
            }
        },
        search_by_Filter: function(){
           
            this.no_result = false;//'결과가 없습니다' 글씨를 잠시 지워줌
            this.search=''//검색창 초기화
            this.loading = true;//'검색중..'글자 띄워줌
            
            this.$http.post('/api/make/search/filter', {
                hakbu : this.filter.hakbu,
                gubun : this.filter.gubun,
                gyoyang : this.filter.gyoyang,
                credit : this.filter.credit,
                english : this.filter.english,
                professor : this.filter.professor,
                time : this.filter.time,
                 }).then((response) => {
                    this.loading = false //'로딩중'글자를 지움
                    if(response.data.length==0){//데이터 값이 들어오지 않았을때
                        this.no_result = true;//결과가 없음을 표시
                    }else{
                        this.no_result = false;
                        this.search = response.data;//결과값을 저장함
                    }
                },function (err) {//서버가 이상한 경우
                    alert("서버가 이상합니다. histime206@gmail.com 으로 메일을 보내주세요 :) ")
                });

            //초기화 작업
            this.filter.hakbu = '';
            this.filter.gubun = '';
            this.filter.gyoyang = '';
            this.filter.credit = [];
            this.filter.english = '';
            this.filter.professor = '';
            this.filter.time = [];

            //체크박스 초기화
            this.checktime = [];
            this.filter.credit = [];
            this.showbox  = !this.showbox;
        },
         add_to_fav: function(key){
            // console.log(key);
            console.log(this.search[key].name);
            this.$EventBus.$emit('add_to_fav',this.search[key]);
        },
        add_to_tt: function(key){
            // console.log(key);

            this.$EventBus.$emit('courses', this.search[key]);
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
        get_update_time(){
            this.$http.get('/api/make/update_time').then((response) => {
                this.update = response.data[0].time;
        })}
    }
}

</script>
<style   src = '../../assets/Makepage/search.scss' lang = "scss" scoped>
</style>


