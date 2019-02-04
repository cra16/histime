<template>
    <div>
        <center><h1>코<span>드</span> 복<span>사</span></h1>
        <p>코드복사 버튼을 누르면 클립보드에 자동으로 과목코드가 저장됩니다</p>
        <table class="tbl-body">
             <tr>  
                 <th></th>
                <!-- <th>번호</th> -->
                <th>코드복사</th>
                <th>분반복사</th>
                <th>과목코드-분반</th>
                <th>과목명</th>
                <th>교수님</th>
            </tr>
            
                <tr v-for="(course, key) in this.list" :key="key">
                    <!-- <td id="num">{{ key + 1 }}</td> -->
                    <td id="drag"></td>
                    <td id="btn"><button @click="copy_code(key)">코드 복사</button></td>
                    <td id="btn"><button @click="copy_bunban(key)">분반 복사</button></td>
                    <td id="code">{{course.code}}</td>
                    <td id="name">{{course.course_name}}</td>
                    <td id="prof">{{course.professor}}</td>
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
        parsing_code(code, option) {
            var parsing_array = code.split("-");

            return parsing_array[option];
        },
        copy_code(key) {
            var parsed_code = this.parsing_code(this.list[key].code, 0);

            this.$copyText(parsed_code);
        },
        copy_bunban(key) {
            var parsed_code = this.parsing_code(this.list[key].code, 1);

            this.$copyText(parsed_code);
        }
    }
}
</script>

<style  src = '../../assets/Showpage/copy.scss' lang ="scss" scoped>


</style>