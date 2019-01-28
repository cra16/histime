<template>
<div class = 'footer'>
    
   <div class='bottom'>
        <div>
        <hr width="70%"/>
        </div>
       <!-- <button id="feedback" v-on:click="feedback">피드백</button> -->
       <a href="mailto:21500582@handong.edu">피드백</a>
       <a href="http://github.com/dlwlgus53/histime" title="github page" id=git>github page</a>
       <a href="http://naver.com" title="이용약관">이용약관</a>
       <a v-on:click="individual()">개인정보처리방침</a>
      
       <p>copyright by cra &emsp;&emsp; designed by Chung YuJin</p>
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



