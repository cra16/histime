<template>
      <div class ="box">
        <div class = "header">
            <span>예비 수강신청 현황</span>
        </div>
        <div class ="list">
        <table>
            <tr>
                <th >과목이름<span>[과목코드]</span></th>
                <th id="prof">교수님</th>
                <th class="tbl">수강인원</th>
                <th class="tbl">1학년</th>
                <th class="tbl">2학년</th>
                <th class="tbl">3학년</th>
                <th class="tbl">4학년</th>
                <th class="tbl">재이수</th>
            </tr>
             <tr v-for="(course, key) in this.data" :key="key">
                <td id="name" >{{course.name}}<span>[{{course.code}}]</span></td>
                <td id="prof">{{course.professor}}</td>
                <td id="all">41</td>
                <td id="fresh">11</td>
                <td id="sopho">31</td>
                <td id="junior">11</td>
                <td id="senior">1</td>                
                <td id="again">5</td>


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
        // console.log(this.data)
    }
}
</script>

<style src = '../../assets/timetable/pre.scss' lang="scss" scoped>

</style>

