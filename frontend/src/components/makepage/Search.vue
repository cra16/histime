<template>
    <div>
       <h1>과목찾기</h1>
       <h2>
      <span class='blue_window'>
        <input id=text type="text" placeholder="과목명" class='input_text' name="search" onkeydown="enterSearch()"/></span>  
        <input type="button" class='sch_filt' value="검색" onclick="Search()"/>
      
        <input type="button" class='sch_filt' value="필터" onclick="filter()"/>
       </h2>
      <div class="placeholder-box" >
      <tr>
      <p>학부<p>
       <td align ="center">
       <select name="keyField">
       <option value="management">경영경제학부</option>
       <option value="news">언론정보문화학부</option>
       <option value="legal-law">법학부</option>
       <option value="life-science">생명공학부</option>
       <option value="csee">전산전자공학부</option>
       </select>
       </td>
       </tr>
      <tr>
      <p>이수구분</p>
       <td align ="center">
       <select name="crs">
       <option value="mustchoose">전공필수</option>
       <option value="selectchoose">전공선택</option>
       </select>
       </td>
       </tr>
       <tr>
      <p>교양영역</p>
       <td align ="center">
       <select name="liberalarts">
       <option value="whole">전체</option>
       <option value="gospel">신앙</option>
       <option value="naturalscience">자연과학</option>
       <option value="entertainment">예체능</option>
       </select>
       </td>
      </tr>
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

      <tr>
      <p>영어비율</p>
       <td align ="center">
       <select name="englishrate">
       <option value="100">100%</option>
       <option value="70">70%</option>
       <option value="30">30%</option>
       <option value="0">0%</option>
       </select>
       </td>
      </tr>
      <p>시간대</p>
      <input type="button" value="선택창 열기">
    
       <button type="button">검색하기</button>
</div>
    </div>
  
</template>

<script type="text/javascript">
function enterSearch() {
    if(event.keyCode == 13){
        Search();  // 실행할 이벤트
    }
}
function Search() {
    var x = document.getElementById("text").value;
    window.location.href = "http://hisnet.handong.edu/for_student/course/PLES330M.php/search"+x;
}

function filter(){
    



}
 
</script>
<style  src = '../../assets/Makepage/search.css' scoped>

</style>


