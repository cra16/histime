<template>
<div class = 'footer'>
    
   <div class='bottom'>
        <div>
        <hr width="70%"/>
        </div>
        <router-link to="/aboutus" title="about us">Aboutus</router-link>
        <router-link to="/manual" title="how to use">Manual</router-link>
        <a href="mailto:21500582@handong.edu" title="email">피드백 보내기</a>
        <a href="http://github.com/dlwlgus53/histime" title="github page" id=git>github page</a>
        <router-link to="/individual" title="law">개인정보처리방침</router-link>
      
       <p>copyright by CRA &emsp;&emsp; Designed by Chung YuJin</p>
       <router-view></router-view>
       </div> 
    </div>

 
</template>

<script>
export default {
 
 methods: { //methods 안에 주석처리된 함수들은 지워도 됩니다!
 
 }

}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src = '../assets/Footer.scss' lang='scss' scoped>

</style>



