<!--시간표를 보여주는 웹 페이지-->
<template>
    <div id="show">
        <div class=user>안녕하세요 {{ this.$session.get('name') }} 학우님⁽⁽◝( ˙ ꒳ ˙ )◜⁾⁾ </div>
        <h1>TimeTable show</h1>
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
        name: 'show',
        auth : false,
        components: {
            Ttshow,
            Ttlist
        },
        data() {
            return {
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
                this.$router.push('/')
            }
        },
    beforeCreate: function () {
            if (!this.$session.exists()) {
                alert("로그인이 필요합니다 :?")
                this.$router.replace('/login')
            }
        },
  
}
   
    
</script>



<style src = '../assets/Show.less' lang='scss' scoped>

</style>