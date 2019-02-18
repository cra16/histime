<template>
  <div id="app">
    <!--웹이 처음 시작될 때, 사용자가 검증되지 않았다고 초기화 해 줍니다.-->
      <notifications group="foo" position="top center" style="top: 40px;"/>  
    <router-view/>
  </div>
</template>

<script>

import login from './components/Login.vue'
import make from './components/Make.vue'
import show from './components/Show.vue'
import individual from './components/Individual.vue'
import manual from'./components/Manual.vue'
import aboutus from'./components/Aboutus.vue'
export default {

  name: 'app',
  components: {

  },
  data() {
    return {
    }
  },
  mounted() {
  
  },
  methods: {

    
  },
  // beforeCreate: function () {
  //           if (!this.$session.exists()&&(this.$cookies.get('auth_save')=='false')) {
  //             console.log("쿠키나 세션이 없음")
  //               this.$router.push('/login')
  //           }
  //            else if(!this.$session.exists()&&(this.$cookies.get('auth_save')=='true')){
  //               console.log("세션이 없음, 쿠키있음")
  //               this.$session.start()
  //               this.$session.set('name', this.$cookies.get('name') )
  //               this.$session.set('student_id', this.$cookies.get('student_id'))
  //               this.$session.set('auth', true)
  //               }
                
  //           }
}
</script>

<style>
@import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR');
::-webkit-scrollbar {width: 5px; height: 3px; border: 0px solid #fff; }
::-webkit-scrollbar-thumb {height: 3px; width: 5px; background: #FFCA55 }

div{
     margin: 0;
  
    font-family: 'Noto Sans KR', sans-serif;
    width : 100%;
 
    }
</style>
