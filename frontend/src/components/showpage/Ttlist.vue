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
            <td><button v-on:click="ttedit()">수정</button></td>
            <td><button v-on:click="ttdelete()">삭제</button></td>
            </tr>
            <tr>
            <td>2</td>
            <td>이대로만 되면 소원이 없겠다 1</td>
            <td>18</td>
            <td><button v-on:click="ttedit()">수정</button></td>
            <td><button v-on:click="ttdelete()">삭제</button></td>
            </tr>
            <tr>
            <td>3</td>
            <td>전공 4 교양 3(철개 페이퍼 받기)</td>
            <td>18</td>
            <td><button v-on:click="ttedit()">수정</button></td>
            <td><button v-on:click="ttdelete()">삭제</button></td>
            </tr>
        </tbody>
        </table>
    </div>
    <td></td>
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
                var userInput=prompt(" 시간표 이름을 입력하세요");
                if(userInput==null){
                    alert("취소되었습니다");
                    return false;
                } else {
                alert("시간표 생성페이지로 이동합니다");
                }
                this.$router.replace({ name: "make" });  
            },

            ttdelete(){
                if(confirm("시간표를 삭제하시겠습니까?")){
                    alert("삭제");
                }else{
                    alert("취소");
                }
                },
            ttedit(){
                if(confirm("시간표를 수정하시겠습니까?")){
                    alert("수정");
                }else{
                    alert("취소");
                }    
                }
            }    

            
        }
    
</script>



<style  src = '../../assets/showpage/ttlist.css' scoped>

</style>