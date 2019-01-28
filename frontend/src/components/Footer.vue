<template>
<div class = 'footer'>
    
   <div class='bottom'>
        <div>
        <hr width="70%"/>
        </div>
    
        <a left:10px href="http://naver.com" title="cra">About us</a>
        <a href="mailto:21500582@handong.edu" title="email">피드백 보내기</a>
        <a href="http://github.com/dlwlgus53/histime" title="github page" id=git>github page</a>
      
        <a v-on:click="individual()">개인정보처리방침</a>
      
       <p>copyright by CRA &emsp;&emsp; Designed by Chung YuJin</p>
       <router-view></router-view>
       </div> 
    </div>

 
</template>

<script>
export default {
 
 methods: {
    individual() {
         window.location = 'http://localhost:8080/individual'
    },
    feedback:function(){
        alert("문의 사항 및 피드백은 @@@@@handong.edu로 보내주세요!");
    }
 }

}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src = '../assets/Footer.less' lang='scss' scoped>

</style>



