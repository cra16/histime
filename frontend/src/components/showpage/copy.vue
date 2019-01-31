<template>
    <div>
        <h1>코드 복사</h1>

        <div class="tbl-header">
        <table>
                <tr>  
                    <th>번호</th>
                    <th>과목코드-분반</th>
                    <th>과목명</th>
                    <th>교수님</th>
                </tr>
        </table>
        </div>

        <div>
        <table class="tbl-body">
        <tbody>
            <div v-for="(course, key) in this.list" :key="key">
                <tr>
                    <td>{{ key + 1 }}</td>
                    <td>{{course.code}}</td>
                    <td>{{course.course_name}}</td>
                    <td>{{course.professor}}</td>
                    <td><button @click="copy_code(key)">코드 복사</button> </td>
                    <!-- <td><button class ="change" v-on:click="ttedit(key)">수정</button></td>
                    <td><button class ="change" v-on:click="ttdelete(key)">삭제</button></td> -->
                </tr>
                <hr />
            </div>
        </tbody>
        </table>
            <!-- <input @click="del_data" type="button" value="삭제"> -->
            <!-- <input @click="$emit('close')" type="button" value="닫기"> -->
        </div>

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
        parsing_code(code) {
            var parsing_array = code.split("-");

            return parsing_array[0];
        },
        copy_code(key) {
            var parsed_code = this.parsing_code(this.list[key].code);

            this.$copyText(parsed_code);
        }
    }
}
// </script>

// <style src = '../../assets/timetable/add.less' lang='scss' scoped>
 
// </style>
