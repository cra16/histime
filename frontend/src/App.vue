<template>
  <div id="app">
    <router-view/>
  </div>
</template>



<script>


export default {
  name: 'app',
  components: {
    //login import 하기
  },
  data() {
    return {
      authenticated: false,
      mockAccount: {
      username: "cra",
      password: "cra"
      //여기에 로그인 정보 불러오기 from backend
      }
    }
  },
  mounted() {
    if(!this.authenticated) {
    this.$router.replace({ name: "login" });
            }
        },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
      },
    logout() {
      this.authenticated = false;
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
