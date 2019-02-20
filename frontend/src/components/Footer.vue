<template>
<div class = 'footer'>
    
   <div class='bottom'>
        <div>
        <hr width="70%"/>
        </div>
        <!-- router 링크를 통해 사이트 이동 -->
        <router-link to="/aboutus" title="about us">Aboutus</router-link>
        <!-- <router-link to="/manual" title="how to use">Manual</router-link> -->
        <a href="mailto:histime206@gmail.com" title="email">피드백 보내기</a>
        <router-link to="/individual" title="law">개인정보처리방침</router-link>
      
       <p>copyright by CRA &emsp;&emsp; Designed by Chung Eugene</p>
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



