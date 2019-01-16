<template>
    <div id="Make">
        <h1>TimeTable Make</h1>
        <button v-on:click="logout()">로그아웃</button>
        <div id='container'>
            <Search id='search'></Search>
            <Timetable id='timetable'></Timetable>
            <Save id='save'>
                <button v-on:click="go()">저장하기</button>
            </Save>
        </div>
    </div>
</template>

<script>
import Search from '../components/makepage/Search.vue'
import Timetable from '../components/makepage/Timetable_m.vue'
import Save from '../components/makepage/Save.vue'
    export default {
        name: 'make',
        components: {
            Search,Timetable,Save
        },
        data() {
            return {};
        },

        methods : {
             go() {
                this.$router.replace({ name: "show" });
            },
            logout: function () {
                this.$session.destroy()
                this.$cookies.set('auth_save', false)
                this.$cookies.remove('name')
                this.$cookies.remove('student_id',)
                this.$cookies.remove('auth')
                this.$router.replace('/login')
            }
        },

        /* beforeCreate: function () {
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
                
            }
  */
  }
    
</script>





<style src = '../assets/Make.less' lang='scss' scoped>

</style>