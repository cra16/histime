<template>
<div class = 'header'>
    <span class = 'logo'>HisTime</span>
    <span class = 'logo'>이번 학기를 채울 모든 경우의 수, HisTime</span>

<div class = 'line'></div>
    <div class = 'user'>
        <p><span id="name">{{ this.$session.get('name') }}</span>님, 안녕하세요!</p>
        
    </div>
    <button v-on:click="logout()">Logout</button>
</div>

 
</template>

<script>
export default {
 methods: {
    logout: function() {
      this.$session.destroy()
      this.$cookies.set('auth_save', false)
      this.$cookies.remove('name')
      this.$cookies.remove('student_id',)
      this.$cookies.remove('auth')
      this.$router.replace('/login')
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src = '../assets/Header.less' lang='scss' scoped>

</style>



