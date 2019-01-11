<template>
    <div id="Make">
        <h1>TimeTable Make</h1>
        <div id='container'>
            <div id='search'></div>
            <div id='timetable'></div>
            <div id='save'>
                <button v-on:click="go()">저장하기</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'make',
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