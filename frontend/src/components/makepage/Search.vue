<!--여기 정말 대충 수정했어요...-->
<template>
   <div>
       <h1>과목찾기</h1>
      <span class='blue_window'>
        <input id=text type="text" placeholder="과목명" class='input_text' name="search" onkeydown="enterSearch()"/></span>  
        <input type="button" class='sch_filt' value="검색" onclick="Search()"/>
        <div id="divlist">
        <input type="button" class='sch_filt' value="필터" onclick="filter()"/>
        <canvas width="200" height="200" id="filterRec"></canvas>
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
 var canvas=document.getElementById("filterRec");
 var ctx= canvas.getContext("2d");

 ctx.fillStyle="rgb(200,0,200)";
 ctx.fillRect(50,40,100,30);
 }
</script>
<style  src = '../../assets/Makepage/search.css' scoped>

</style>


