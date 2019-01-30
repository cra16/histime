<template>
<div class = 'header'>
    <div v-on:click ="goHome()" class = "logo">
        <h1>HisTime</h1>
        <span>이번 학기를 채울 모든 경우의 수, HisTime</span>
    </div>
    <div class = 'line'></div>
    <div class = 'user'>
        <span><span id="name">{{ this.$session.get('name') }}</span>님, 안녕하세요!</span>
        <button v-on:click="logout()">Logout</button>
        <br />
        <span id="update">Update : {{ year }}-{{ month }}-{{ date }}</span>
    </div>
</div>

 
</template>

<script>
export default {
    data() {
        return{
            year : '2019',
            month : '09',
            date : '17'

        }
    },
    methods: {
        logout: function() {
        this.$session.destroy()
        this.$cookies.set('auth_save', false)
        this.$cookies.remove('name')
        this.$cookies.remove('student_id',)
        this.$cookies.remove('auth')
        this.$router.replace('/login')
        },
     goHome(){//취소하기
        var currentUrl = window.location.pathname;
        if(currentUrl=="/make"){
            if(confirm("홈으로 돌아가면 변동사항이 저장되지 않습니다.")){
                this.$router.replace({name: 'show'});
            }else{
                return;
            }
        }
    
    },
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src = '../assets/Header.scss' lang='scss' scoped>

</style>



