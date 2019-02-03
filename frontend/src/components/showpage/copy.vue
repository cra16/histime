<template>
    <div>
        <center><h1>코<span>드</span> 복<span>사</span></h1>
        <p>코드복사 버튼을 누르면 클립보드에 자동으로 과목코드가 저장됩니다</p>
        <table class="tbl-body">
             <tr>  
                <th>코드복사</th>
                <th>과목명</th>
                <th>교수님</th>
                <th>과목코드-분반</th>
            </tr>
            
                <tr v-for="(course, key) in this.list" :key="key">
                    <td id="btn"><button @click="copy_code(key)">코드 복사</button> </td>
                    <td id="name">{{course.course_name}}</td>
                    <td id="prof">{{course.professor}}</td>
                    <td id="code">{{course.code}}</td>
                   
                </tr>

        </table>
        </center>
    </div>
</template>

<script>
export default {
    data(){
        return{
            list : []
        }
    },
    created() {
        this.get_data();
    },
    methods :{
        get_data() {
            this.$http.post("/api/show/copy", {
            student_id: this.$session.get("student_id"),
            ttname: this.$session.get("ttname")
            }).then(response => {
                if (response.status === 200) {
                    this.list = response.data;
                }
            });
        },
         parsing_code(code) {//과목코드-분반 의 형태로 되어있는 데이터를 분리, 과목코드만 보여줌
            var parsing_array = code.split("-");
            return parsing_array[0];
        },
       
        copy_code(key) {//과목 코드 클립보드에 복사
            var parsed_code = this.parsing_code(this.list[key].code);
            this.$copyText(parsed_code);
        }
    }
}
</script>

<style  src = '../../assets/Showpage/copy.scss' lang ="scss" scoped>


</style>