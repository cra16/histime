<template>
    <div class ="box">
        <div class = "header">
            <span>시간표에 추가하기</span>
            <button v-on:click="close()" class="btn" id="cancel">취소</button>
        </div>
        
        <div class = "user_custom">
            <form>
                <div id="course_name">
                    <span>과목이름</span><input id="text" type = "text" placeholder="과목 이름을 입력해 주세요" v-model= 'user_custom.course_name' required>
                </div>
                <br>
                <div class ="prof">
                    <span>교수님</span><input id="text" type = "text"   placeholder="교수님 성함을 입력해 주세요" v-model= 'user_custom.professor' required>
                </div>
                <br>
                <div id="start">
                    <span>시간</span>
                    <select  v-model= 'user_custom.time' >
                        <option v-for="time in times" :key = "time">{{ time }}</option>
                    </select>
                </div>

    

                <div id="credit">
                    <span>학점</span>
                    <input id="radio" type="radio" name="1학점"  value="1" v-model= 'user_custom.credit'> 1학점
                    <input id="radio" type="radio" name="2학점"  value="2" v-model= 'user_custom.credit'> 2학점
                    <input id="radio" type="radio" name="3학점"  value="3" v-model= 'user_custom.credit'> 3학점
                    <input id="radio" type="radio" name="4학점"  value="4" v-model= 'user_custom.credit'> 4학점
                </div>
                <br>
                
                <input class ="btn" id = "submit" type="submit" value="추가" v-on:click ="add">
            </form>
        </div> <!--user custom ending tag-->
        
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            times : ['Mon1','Mon2','Mon3','Mon4','Mon5','Mon6','Mon7','Mon8','Mon9','Mon10'],
            
            user_custom : {
                code : 'NULL',
                course_name : '',
                professor : '',
                time : 'Mon1',
                credit : '3',  
            }
        }
    },
    methods :{
        close(){//창닫기
            this.$EventBus.$emit('close_user_custom');
        },
        add(){//시간표에 추가
            
        }
    }
    
}
</script>

<style src = '../../assets/timetable/add.less' lang='scss' scoped>
 
</style>

