<!--시간표를 보여주는 웹 페이지-->
<template>
    <div id="show">
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
import Ttshow from '../components/showpage/Ttshow.vue'
import Ttlist from '../components/showpage/Ttlist.vue'

    export default {
        name: 'show',
        components: {
            Ttshow,
            Ttlist
        },
        data() {
            return {};
        },
        methods: {
            go() { //시간표를 추가하는 웹 페이지로 전환
                this.$router.replace({ name: "make" });
            }
        }
    }
</script>



<style src = '../assets/Show.less' lang='scss' scoped>

</style>