<!--시간표를 보여주는 웹 페이지-->
<template>
    <div id="show">
        <div class=user>안녕하세요 {{ this.$session.get('name') }} 학우님⁽⁽◝( ˙ ꒳ ˙ )◜⁾⁾ </div>
        <h1>TimeTable show</h1>
        <button v-on:click="logout()">로그아웃</button>
        <div class="container">
            <!--시간표 리스트-->
            <Ttlist id = "list" />
            <!--시간표  내용-->
            <Ttshow id ="timetable"/>
       </div>
    </div>
</template>

<script>
import Ttshow from '../components/showpage/Show.vue'
import Ttlist from '../components/showpage/List.vue'
import { bus } from '../main.js'

    export default {
        created () {
            this.$http.get('/api/show/ttlist')
            .then((response) => {
                this.ttlist = response.data
            })
        },
        name: 'show',
        auth : false,
        components: {
            Ttshow,
            Ttlist
        },
        data() {
            return {
                ttlist : [], 
                auth : false,
                authenticated : false,
                student : {
                    name : "",
                    student_id : ""
                }
               
            };
        },

    methods: {
        go() { //시간표를 추가하는 웹 페이지로 전환
            this.$router.replace({ name: "make" });
        },
        logout: function () {
                this.$session.destroy()
                this.$cookies.set('auth_save',false)
                this.$cookies.remove('name')
                this.$cookies.remove('student_id',)
                this.$cookies.remove('auth')
                this.$router.replace('/login')
                console.log(this.$cookies.get('auth_save'))
            },
        

        },
    beforeCreate: function () {
            console.log('auth_save : ' + this.$cookies.get('auth_save'))
            console.log('session: ' + this.$session.exists)
           if (!this.$session.exists()&&(this.$cookies.get('auth_save')=='false')) {
                alert("로그인이 필요합니다 :?")
                this.$router.push('/login')
            }
             else{
                this.$session.start()
                this.$session.set('name', this.$cookies.get('name') )
                this.$session.set('student_id', this.$cookies.get('student_id'))
                this.$session.set('auth', true)
                }
        },
  
}
   
    
</script>



<style src = '../assets/Show.less' lang='scss' scoped>

</style>