<template>
    <section>
    <!--for demo wrap-->
    <h1>시간표 리스트</h1>
    <div class="tbl-header">
        <table cellpadding="0" cellspacing="0" border="0">
        <thead>
            <tr>
            <th>순위</th>
            <th>시간표 이름</th>
            <th>학점</th>
            <th colspan="2">변경</th>
            </tr>
        </thead>
        </table>
    </div>
    <div class="tbl-content">
        <table cellpadding="0" cellspacing="0" border="0">
        <tbody>
            <tr>
            <td>1</td>
            <td>플랜A</td>
            <td>18</td>
            <td><button>수정</button></td>
            <td><button v-on:click="ttdelete()">삭제</button></td>
            </tr>
        </tbody>
        </table>
    </div>
    <button v-on:click="go()">추가하기</button>
    </section>
</template>

<script>
    export default {
        name: 'ttlist',
        data() {
            return {};
        },
        methods: {
            go() { //시간표를 추가하는 웹 페이지로 전환
                this.$router.replace({ name: "make" });
            },
            ttdelete(){
                if(confirm("시간표를 삭제하시겠습니까?")){
                    alert("삭제");
                }else{
                    alert("취소");
                }
                }
            }
        }
    
</script>



<style  src = '../../assets/ttlist.css' scoped>

</style>