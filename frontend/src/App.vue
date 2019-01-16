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
  
  },
  methods: {

    
  },
  beforeCreate: function () {
            if (!this.$session.exists()&&(this.$cookies.get('auth_save')=='false')) {
                this.$router.push('/login')
            }
             else if(!this.$session.exists()){
                this.$session.start()
                this.$session.set('name', this.$cookies.get('name') )
                this.$session.set('student_id', this.$cookies.get('student_id'))
                this.$session.set('auth', true)
                }
                
            }
}
</script>

<style>
@import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR');
div{
     margin: 0;
    font-family: 'Noto Sans KR', sans-serif;
    }
</style>
