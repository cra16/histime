<template>
    <div>
      <div class = "logo">
      <h1>{{ name }} </h1>
      </div>
      <div class="message">
   <hr width="70%"/>
        <h4>Histime은 한동대학교 재학생들이 보다 나은 시간표를 짤 수 있도록 환경을 제공하는 웹 사이트입니다.<br>
        처음 사용하시는 분들은 다음 진행절차를 따라 주세요:)</h4>
        <p>1. 로그인을 합니다. (별도의 회원가입 없이 기존의 Hisnet ID/PW를 통해 로그인이 가능합니다.) </p>
        <p><img src="../image/login.png" width="550" height="300"></p>
        <p>2. 기본화면에서 시간표 목록의 하단에 있는 시간표 추가하기 버튼을 누릅니다.(시간표를 먼저 생성해야 합니다.)</p>
        <p><img src="../image/basicview.png" width="550" height="250"></p>
        <p>3. 시간표 추가하기 버튼을 통해 메인 메뉴로 이동합니다.</p>
        <p>&emsp;먼저 과목을 검색합니다. 필터기능을 이용하면 여러 조건들을 반영하여 조금 더 편리한 검색이 가능합니다.</p>
        <p><img src="../image/mainmenu-1.png" width="350" height="250"><img src="../image/search2.png" width="350" height="250"></p>
        <p>4. 검색된 목록에 마우스를 가져가면 즐겨찾기(*)와 시간표추가 아이콘(+)이 나타납니다.</p>
        <li>&emsp;즐겨찾기 버튼을 누르면 즐겨찾기 탭으로 지정과목이 복사됩니다.<br> &emsp;즐겨찾기 탭에 복사된 과목들은 다른 시간표 생성시에도 남아있기 때문에, 언제든지 시간표로 추가할 수 있습니다.  <br>
         &emsp;(꼭 듣고싶은 과목이나, 들어야 할 과목 같은것들을 저장해 두면 편리합니다.) </li>
        <p><img src="../image/save1.png" width="700" height="250"></p>
        <li>&emsp;시간표 추가버튼을 누르면 과목이 즐겨찾기 탭으로 가지 않고 바로 시간표로 복사됩니다.</li>
        <p><img src="../image/save2.png" width="700" height="250"></p>
        <li> &emsp;겹치는 과목은 세로로 분할되어 표시되며, 각 과목들은 사용자 기호에 맞게 색 조정이 가능합니다.</li>
        <p><img src="../image/save3.png" width="700" height="250"></p>
        <p>5. 저장하기를 누르면 다시 기본화면으로 돌아가고, 만들어진 시간표 리스트들과 각각의 총 학점을 확인할 수 있습니다.</p>
        <p>6. 자, 이제 여러분들만의 시간표를 마음껏 짜보세요! </p>
        </div>
    <hr width="70%"/>
    <center><h5>본 웹사이트의 저작권은 CRA에게 있습니다.</h5></center>
    <center><h6>Related Sites</h6></center>
    <center>
    
    <a href="http://itaxi.handong.edu" target="_blank">i-taxi</a>
    <a href="http://i7.handong.edu" target="_blank">i7</a>
    <a href="http://seal.handong.edu" target="_blank">SEAL</a>
    </center>
    </div>
</template>

<script>
export default {
     data() {
     return {
      name : 'HisTime',
     }
    }
}
</script>

<style src = '../assets/Aboutus.scss' lang='scss' scoped>

</style>