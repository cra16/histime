<template>
    <div id="Make">
        <h1>TimeTable Make</h1>
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
import Timetable from '../components/makepage/Timetable.vue'
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
            }
        }
  }
    
</script>





<style src = '../assets/Make.less' lang='scss' scoped>

</style>