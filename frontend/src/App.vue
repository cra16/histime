<template>
  <div id="app">
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
      authenticated: false,
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
