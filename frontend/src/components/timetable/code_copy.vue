<template>
    <div class ="box">
        <div class = "header">
            <span>과목코드 복사하기</span>
            <button v-on:click="close()" class="btn" id="cancel">취소</button>
        </div>
        <table>
            <tr>
                <td>과목이름</td>
                <td>과목코드(누르면 자동 복사)</td>
            </tr>
            <!-- <tr v-for="i in courses" :key="i" rowspan="10">
                <td>{{this.$parent.courses.}}</td>
                <td>과목코드(누르면 자동 복사)</td>
            </tr> -->
        </table>

            
        
    </div>
</template>

<script>
export default {
    data(){
        return{
        
        }
    },
    methods :{
        close(){//창닫기
            this.$EventBus.$emit('close_code_copy');
        },
    }
    
}
</script>

<style src = '../../assets/timetable/add.less' lang='scss' scoped>
 
</style>

