<template>
    <section>
    <!--for demo wrap-->
    <h1>시간표 리스트</h1>
    <div class="tbl-header">
       
        <table cellpadding="0" cellspacing="0" border="0">
        <thead>
                <tr>  
                <th>번호</th>
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
            <div v-for="(ttlist,key) in this.ttlists" :key="key">
                <tr>
                    <td>{{ key+1 }}</td>
                    <td v-on:click = " $EventBus.$emit('to_timetable',ttlist.ttname)" id = "ttname"><p >{{ttlist.ttname}}</p><button id="modify_name" v-on:click="modify_name(key)"></button></td>
                    <td>{{ttlist.total_credit}}</td>
                    <td><button v-on:click="ttedit()">수정</button></td>
                    <td><button v-on:click="ttdelete()">삭제</button></td>
                </tr>
            </div>
           
        </tbody>
        </table>
    </div>
    <td></td>
    <button class ="add" v-on:click="go()">추가하기</button>
    </section>
</template>

<script>
    export default {
        name: 'ttlist',
        //props :['ttlists'],
        data() {
            return {
                ttlists:[],
                ttlist:{
                    ttname :"",
                    ttrank:"",
                    total_credit:""
                },
                ttnames:[]
            };
        },
        created () {
            this.$http.post('/api/show', {
                student_id : this.$session.get('student_id')
            }).then((response) => {
                if (response.status === 200 ) {
                    this.ttlists = response.data; //ttname, ttrank, total_credit
                     this.$EventBus.$emit('ttname',this.ttlists[0].ttname);//처음 show페이지 열었을때 이벤트 버스 default로 첫번째 시간표의 이름을 보냄
                     for(var i = 0; i < this.ttlists.length; i++) {
                       this.ttnames.push(this.ttlists[i].ttname);
                    }
                }
            });
          
        },
        methods: {
            go() { //시간표를 추가하는 웹 페이지로 전환
                var userInput=prompt(" 시간표 이름을 입력하세요");
                if(userInput==""){
                    alert("최소 한글자 이상 입력해주세요");
                    return false;
                } else if(userInput==null){
                    alert("취소되었습니다");
                    return false;
                } else {
                alert("시간표 생성페이지로 이동합니다");
                }
                this.$router.replace({ name: "make" });  
            },

            modify_name(key) {
                var modified_name = prompt("수정할 시간표 이름을 입력하세요");
                if(modified_name === "") {
                    alert("최소 한 글자 이상 입력해주세요");
                    return false;
                } else if(modified_name === null) {
                    console.log(ttname);
                    alert("취소되었습니다");
                    return false;
                } else if(this.duplication(modified_name)){
                    alert("시간표의 이름이 동일합니다");
                    return false;
                } else {
                    console.log("hvjbk");
                    this.$http.post('/api/show/modify_ttname', {
                        student_id :  this.$session.get('student_id'),
                        original_ttname :  this.ttlists[key].ttname,
                        modified_ttname : modified_name 
                    })



                }
            },
            duplication(new_name){//새로 이름만들기, 이름 수정할 때 중복검사
                if(this.ttnames.includes(new_name)){
                    return true;
                }
                return false;

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
            },
           
            
        }
    
</script>



<style  src = '../../assets/Showpage/list.css' scoped>
</style>