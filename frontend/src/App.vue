<template>
  <div id="app">
    <!--웹이 처음 시작될 때, 사용자가 검증되지 않았다고 초기화 해 줍니다.-->
   
    <router-view/>
  </div>
</template>

<script>
import login from './components/Login.vue'
import make from './components/Make.vue'
import show from './components/Show.vue'

export default {

  name: 'app',
  components: {

  },
  data() {
    return {
    }
  },
  mounted() {
    //웹이 처음 시작될 때 사용자가 검증되지 않은것으로 초기화 해줍니다.
    this.setAuth(false)
  },
  methods: {
    setAuth(status) {
      localStorage.auth = status;
      },
    logout() {
      localStorage.auth = false;
    },
    
  }
}
</script>

<style>
@import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);
div{
     margin: 0;
    font-family: 'Noto Sans KR', sans-serif;
    }
</style>
