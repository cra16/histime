<!--시간표를 보여주는 웹 페이지-->
<template>
    <div id="show">
        <Header></Header>
        <div class="container">
            <!--시간표 리스트-->
            <!-- <List id = "list" :val="this.ttlist" /> -->
            <List id ="list" />
            <!--시간표  내용-->
            <timetable_s id ="timetable"/>
       </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Timetable_s from '../components/showpage/Timetable_s.vue'
import List from '../components/showpage/List.vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

    export default {
        // created () {
        //     this.$http.post('/api/show', {
        //         student_id : '21500670'//this.student.student_id
        //     }).then((response) => {
        //         if (response.status === 200 ) {
        //             this.ttlist = response.data;
        //             console.log(response.data[0].ttname); //ttname, ttrank, total_credit
        //         }
        //     });
        // },
        name: 'show',
        auth : false,
        components: {
           Timetable_s,
           List,
           Header,
           Footer
        },
        data() {
            return {
                ttlist : [],
                ttsubjects : [],
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
        }
    }
        
}

   
    
</script>



<style src = '../assets/Show.less' lang='scss' scoped>

</style>