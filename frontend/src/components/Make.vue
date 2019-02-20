<template>
    <div id="Make"> 
        <!-- v-on:keyup.f5="refresh" -->
        <div class="outer">
            <div class="inner">
                <Header></Header>
                <div class="centered"> 
                    <div id='container'>
                        <Search id='search'></Search>
                        <Timetable id='timetable'></Timetable>
                        <Save id='save'></Save>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        </div>
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
            return {
                
            };
        },

        methods : {
             go() {
                this.$router.replace({ name: "show" });
            },
            // refresh:function(){
            //      if(event.keyCode== 116) {
            //         event.keyCode = 0;
            //         event.returnValue = false;
            //         event.preventDefault();
            //         alert("새로고침은 불가능합니다!")
                    
            //     }
            // }
        },
   

          
    

 
  }
    
</script>





<style src = '../assets/Make.scss' lang='scss' scoped>

</style>