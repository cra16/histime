<template>
<div class = 'header'>
    
    <div class = 'logo'>
        <h1>His Time</h1>
        <p>이번 학기를 채울 모든 경우의 수, His Time.</p>
    </div>
 <div class = 'line'></div>
    <div class = 'user'>
        <p><span id="name">{{ this.$session.get('name') }}</span>님, 안녕하세요!</p>
        
    </div>
    <button v-on:click="logout()">Logout</button>
    <div class='bottom'>
        <p>약관 개인정보처리방침    copyright  by  cra</p>
    </div>
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



