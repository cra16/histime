
<template>
    <div>
    <!--for demo wrap-->
    <h1>시간표 리스트</h1>
    <div class="tbl-header">
       
        <table cellpadding="0" cellspacing="0" border="0">
        <thead>
                <tr>  
                    <th id="h_index">번호</th>
                    <th id="h_ttname">시간표 이름</th>
                    <th id="h_credit">학점</th>
                    <th id="h_change">변경</th>
                </tr>
                
        </thead>
        </table>
    </div>
    <div class="tbl-content">
        <table cellpadding="0" cellspacing="0" border="0">
            <tbody>
                <div v-for="(ttlist,key) in this.ttlists" :key="key">
                    <tr>
                        <td id="index">{{ key+1 }}</td>
                        <td  v-on:click = " $EventBus.$emit('to_timetables',ttlist)" id = "ttname">{{ttlist.ttname}}<button id="modify_name" v-on:click="modify_name(key)"></button></td>
                        <td id="credit">{{ttlist.total_credit}}</td>
                        <td id="edit"><button class ="change" v-on:click="ttedit(key)">수정</button></td>
                        <td id="del"><button class ="change" v-on:click="ttdelete(key)">삭제</button></td>
                    </tr>

                    <hr />
                </div> 
            </tbody>
        </table>
    </div><!--tbl-content ending tag-->
    <div class="add">
            <button id="add" v-on:click="go_make()">시간표 추가하기</button>
    </div>
  
    </div>
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
                    this.$EventBus.$emit('to_timetables',this.ttlists[0].ttname);//처음 show페이지 열었을때 이벤트 버스 default로 첫번째 시간표의 이름을 보냄
                }
            });
        },
        methods: {
            go_make() { //시간표를 추가하는 웹 페이지로 전환
                var userInput=prompt(" 시간표 이름을 입력하세요");
                if(userInput==""){
                    alert("최소 한글자 이상 입력해주세요");
                    return false;
                } else if(userInput==null){
                    alert("취소되었습니다");
                    return false;
                } else if(this.duplication(userInput)){
                    alert("시간표의 이름이 동일합니다");
                    return false;
                } else {
                 this.$session.set('to_timetablem', userInput)//시간표 이름을 세션으로 보냄
                }
                // this.$router.replace({name: 'make'});
                window.location = 'http://localhost:8080/make'
            },
            modify_name(key) {//시간표 이름 수정(연필모양)-이름수정
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
                } else {//수정가능
                    this.$http.post('/api/show/modify_ttname', {
                        student_id :  this.$session.get('student_id'),
                        original_ttname :  this.ttlists[key].ttname,
                        modified_ttname : modified_name 
                    })
                    this.ttlists[key].ttname = modified_name 
                }
            },
            duplication(new_name){//새로 이름만들기, 이름 수정할 때 중복검사
            var duplication =   this.ttlists.some(function(item, index, array) {
                                    return (item.ttname === new_name);
                                });
                return duplication;
            },
            ttdelete(key){//시간표 삭제
                if(confirm("시간표를 삭제하시겠습니까?")){
                    console.log(this.ttlists[key].ttname);

                        this.$http.post('/api/show/del_tt', {
                            student_id :  this.$session.get('student_id'),
                            ttname :  this.ttlists[key].ttname
                    })
                    this.ttlists.splice(key,1);
                }
            },
            ttedit(key){//시간표 수정하기
                if(confirm("시간표를 수정하시겠습니까?")){        
                    this.$session.set('to_timetablem', this.ttlists[key].ttname)//시간표 이름을 세션으로 보냄
                    window.location = 'http://localhost:8080/make'
                }  
            },
            ttselect(key){
                console.log(this.ttlists[key].ttname);
                this.$EventBus.$emit('to_timetables',this.ttlists[key].ttname);
            }
        },
    }
    
</script>



<style  src = '../../assets/Showpage/list.less' lang ="scss" scoped>
</style>