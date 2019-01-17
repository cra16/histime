<template>
    <div>
       <h1>과목찾기</h1>
       <h2>
      <span class='blue_window'>
        <input v-model="search.course_name" id=text type="text" placeholder="과목명" class='input_text' name="search"/></span> 
        <input type="button" class='sch_filt' value="검색" v-on:click="search_byname"/>
      
        <input type="button" class='sch_filt' value="필터" v-on:click="show"/>
       </h2>
      <div v-show="showbox" class="placeholder-box" >
      
      
     
      <p>학부<p>
          <select v-model="학부">
              <option v-for="course_name in course_names" :key="course_name"> 
                  {{course_name}}
              </option>
         </select>

      
      <p>이수구분</p>
          <select v-model="이수구분"> 
              <option  v-for=" gubun in gubuns " :key="gubun">
                {{ gubun }}
              </option>
          </select>
    
      <p>교양영역</p>
          <select v-model="교양영역">
                <option v-for=" gyoyang in gyoyangs" :key="gyoyang">
                {{gyoyang}}
                </option>
       </select>
       

      <tr>
      <p>교수님</p>
       <span class='blue_window2'>
       <input id=text type="text" placeholder="교수님 이름" class='input_text' name="search" onkeydown="enterSearch()"/></span> 
      </tr>     

      <tr>
          
      <p>학점</p>
            <input type="button" value="0.5">
            <input type="button" value="1">
            <input type="button" value="2">
            <input type="button" value="3">
            <input type="button" value="4">
      </tr>

      
      <p>영어비율</p>
      <select v-model="영어비율">
                <option v-for=" english in englishs" :key="english">
                    {{english}}
                </option>
       </select>

      <p>시간대</p>
      <input type="button" value="선택창 열기">
    
       <button type="button">검색하기</button>
</div>
    </div>
  
</template>

<script type="text/javascript">


/*<tr>
      <p>이수구분</p>
       <td align ="center">
       <select name="crs">
       <option value="blank">전체</option>    
       <option value="전선">전선</option>
       <option value="전필">전필</option>
       <option value="자선">자선</option>
       <option value="교선">교선</option>
       <option value="교선필">교선필</option>
       <option value="교필">교필</option>
       <option value="공선">공선</option>
       </select>
       </td>
       </tr>
*/

/*<tr>
      <p>학부<p>
       <td align ="center">
       <select name="keyField">
       <option value="blank">전체</option>/
       <option value="gls">글로벌</option>  
       <option value="mechanical">기계제어</option>   
       <option value="management">경영경제</option>
       <option value="space">공간환경</option>
       <option value="international">국제어문</option>
       <option value="legal-law">법학부</option>
       <option value="counsel">상담복지</option>  
       <option value="life-science">생명과학</option>
       <option value="news">언론정보</option>
       <option value="csee">전산전자</option>
       <option value="idea-society">창의융합(인문사회)</option>
       <option value="idea-nature">창의융합(자연과학)</option>
       <option value="idea-mechanic">창의융합(공학)</option>
       <option value="contents">콘텐츠융합디자인</option>
       <option value="ictbusiness">ICT창업</option>
       </select>
       </td>
       </tr>
       */
      /*
       <tr>
      <p>교양영역</p>
       <td align ="center">
       <select name="liberalarts">
        <option value="blank">전체</option>
       <option value="신앙">신앙3</option>
       <option value="naturalscience">자연과학</option>
       <option value="예체능">예술</option>
       <option value="">ICT입문</option>
       <option value="">프로그래밍기초</option>
       <option value="">소통</option>
       <option value="">융복합</option>
       <option value="">제2외국어</option>
       <option value="">영어1</option>
       <option value="">한국어</option>
       <option value="">영어2</option>
       <option value="">신앙1</option>
       <option value="">인성1</option>
       <option value="">세계관1</option>
       <option value="">세계관2</option>
       <option value="">인문학</option>
       <option value="">스포츠</option>
       <option value="">리더십및문제해결</option>
       <option value="">사회과학</option>
       <option value="">자연과학</option>
       <option value="">전공기초</option>
       <option value="">기독교신앙기초1</option>
       <option value="">기독교신앙기초2</option>
       <option value="">특론및개별연구</option>
       <option value="">소프트웨어활용</option>
       </select>
       </td>
      </tr>*/
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
           
            showbox:false,
            search : {
                course_name : '',
                gubun : '',
                gyoyang : '',
                professor : '',
                credit : 0,
                english : '',
                time : '',
            },
            result : {

            }
        }
    },
    methods:{
        show: function(){
            this.showbox=!this.showbox;
        },
        search_byname: function(){
            console.log(this.$session.get('student_id'));
            
            this.search.course_name = '';
        }
            
    }
}


</script>
<style  src = '../../assets/Makepage/search.css' scoped>

</style>


