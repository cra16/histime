<template>
      <div class ="box">
        <div class = "header">
            <span>현재 시간표에 추가된 과목 리스트</span>
        </div>
        <div class ="list">
        <table>
            <tr>
                <th>과목코드</th>
                <th>과목이름</th>
                <th>교수님</th>
                <th>시간</th>
                <th>변경</th>
            </tr>
             <tr v-for="(course, key) in this.data" :key="key">
                <td id="code">{{course.code}}</td>
                <td id="name">{{course.name}}</td>
                <td id="prof">{{course.professor}}</td>
                <td id="prof">{{course.time}}</td>
                <td id="btn"><button  id = "del" v-on:click="(event) => { $parent.remove(course.code) }" >삭제</button></td>              
            </tr>
        </table>
        </div >
    </div>
</template>

<script>
export default {
    props : ['data'],
        /*code: (...)
        credit: (...)
        english: (...)
        gubun: (...)
        name: (...)
        professor: (...)
        time: (...)
        */
    created(){
        console.log(this.data)
    }
}
</script>

<style src = '../../assets/timetable/list_m.scss' lang="scss" scoped>

</style>

