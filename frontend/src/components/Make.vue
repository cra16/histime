<template>
    <div id="Make">
        <Header></Header>
        <div id='container'>
            <Search id='search'></Search>
            <Timetable id='timetable'></Timetable>
            <Save id='save'>
                <button v-on:click="go()">저장하기</button>
            </Save>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Search from '../components/makepage/Search.vue'
import Timetable from '../components/makepage/Timetable_m.vue'
import Save from '../components/makepage/Save.vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'


    export default {
        name: 'make',
        components: {
            Search,Timetable,Save,Header,Footer
        },
        data() {
            return {};
        },

        methods : {
             go() {
                this.$router.replace({ name: "show" });
            },
            
        },
   

          
    

 
  }
    
</script>





<style src = '../assets/Make.less' lang='scss' scoped>

</style>