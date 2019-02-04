
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
        <p v-if="noResult==true" class="noResult">생성된 시간표가 없습니다.<br /> 시간표 추가히기 버튼을 통해 시간표를 생성해 주세요</p>
        <table cellpadding="0" cellspacing="0" border="0">
        <tbody>
            <div v-for="(ttlist,key) in this.ttlists" :key="key">
                <tr>
                    <td id="index">{{ key+1 }}</td>
                    <td  v-on:click = " $EventBus.$emit('to_timetables',ttlist)" id = "ttname">{{ttlist.ttname}}
                        <button id="modify_name" v-on:click="modify_name(key)"></button>
                    </td>
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
import copy from './copy.vue'

    export default {
        name: 'ttlist',
        //props :['ttlists'],
        components : {
            copy
        },
        data() {
            return {
                ttlists:[],
                ttlist:{
                    ttname :"",
                    ttrank:"",
                    total_credit:""
                },
                ttnames:[],
                noResult : true,
                
            };
        },
        
        created () {
            this.$http.post('/api/show', {
                student_id : this.$session.get('student_id')
            }).then((response) => {
                if (response.status === 200 ) {
                    if(response.data.length === 0){
                        this.noResult = true;
                        return;
                    } 
                    this.noResult =false;
                    this.ttlists = response.data; //ttname, ttrank, total_credit
                    console.log(this.ttlists);
                    this.$EventBus.$emit('to_timetables',this.ttlists[0].ttname);//처음 show페이지 열었을때 이벤트 버스 default로 첫번째 시간표의 이름을 보냄
                }
            });
        },
        methods: {
        
            go_make() { //시간표를 추가하는 웹 페이지로 전환
                this.$prompt('새로운 시간표의 이름을 입력하세요')
                .then((new_ttname) => {
                    if(new_ttname === '') {
                        this.$alert({
                            title: '경고!',
                            message: '한 글자 이상 입력해주세요.',
                            duration: 1000,
                            rbHide: true
                        });
                        this.go_make();
                    } else if(new_ttname === null) {
                        ;
                    } else if(this.duplication(new_ttname)){
                        this.$alert({
                            title: '경고!',
                            message: '동일한 이름의 시간표가 존재합니다.',
                            duration: 1000,
                            rbHide: true
                        });
                        this.go_make();
                    } else {
                        this.$session.set('to_timetablem', new_ttname);//시간표 이름을 세션으로 보냄
                        this.$router.replace({ name: "make" });
                    }
                });
            },
            modify_name(key) {//시간표 이름 수정(연필모양)-이름수정
                var original_ttname = this.ttlists[key].ttname;

                this.$prompt('수정할 시간표 이름을 입력하세요')
                .then((new_ttname) => {
                    if(new_ttname === "") {
                        this.$alert({
                            title: '경고!',
                            message: '한 글자 이상 입력해주세요.',
                            duration: 1000,
                            rbHide: true
                        });
                        this.modify_name(key);
                    } else if(new_ttname === null) {
                        ;
                    } else if(original_ttname === new_ttname) {
                        this.$alert({
                            title: '경고!',
                            message: '현재 시간표의 이름과 동일합니다.',
                            duration: 1000,
                            rbHide: true
                        });
                        this.modify_name(key);
                    } else if(this.duplication(new_ttname)){
                        this.$alert({
                            title: '경고!',
                            message: '동일한 시간표의 이름이 존재합니다.',
                            duration: 1000,
                            rbHide: true
                        });
                        this.modify_name(key);
                    } else {//수정가능
                        this.$http.post('/api/show/modify_ttname', {
                            student_id :  this.$session.get('student_id'),
                            original_ttname :  original_ttname,
                            modified_ttname : new_ttname
                        });
                        this.ttlists[key].ttname = new_ttname;
                        this.$notify({
                            group: 'foo',
                            text: '시간표의 이름이 수정되었습니다.',
                            duration: 400,
                            type: 'success',
                        });
                    }
                });                
            },
            duplication(new_name){//새로 이름만들기, 이름 수정할 때 중복검사
            var duplication =   this.ttlists.some(function(item, index, array) {
                                    return (item.ttname === new_name);
                                });
                return duplication;
            },
            ttdelete(key){//시간표 삭제
                var del = this.$confirm('선택한 시간표를 삭제하시겠습니까?')
                .then((del) => {
                    if(del) {
                        this.$http.post('/api/show/del_tt', {
                        student_id :  this.$session.get('student_id'),
                        ttname :  this.ttlists[key].ttname
                        });
                        this.ttlists.splice(key,1);
                    }
                });                
            },
            ttedit(key){//시간표 수정하기
                var edit = this.$confirm('시간표를 수정하시겠습니까?')
                .then((edit) => {
                    if(edit) {
                        this.$session.set('to_timetablem', this.ttlists[key].ttname);//시간표 이름을 세션으로 보냄
                        this.$http.post('/api/show/modify_tt', {
                                student_id :  this.$session.get('student_id'),
                                ttname :  this.ttlists[key].ttname
                        }).then((response) => {
                            var code = [];
                            if (response.status === 200 ) {
                                console.log(response.data);
                                for(var i = 0; i < response.data.length; i++){
                                    var j = 0;
                                    for(j = 0; j < i; j++){
                                        if(response.data[i].code === response.data[j].code) break;
                                    }
                                    console.log(response.data[i].code);
                                    if(i === j) code.push(response.data[i].code);
                                }
                                this.$session.set('to_modify', code)
                                this.$router.replace({ name: "make" });
                            }
                        });
                    }
                });
            },
            ttselect(key){
                cur_ttname = this.ttlists[key].ttname;
                console.log(cur_ttname);
                this.$EventBus.$emit('to_timetables',this.ttlists[key].ttname);
            }
        },
    }
    
</script>



<style  src = '../../assets/Showpage/list.scss' lang ="scss" scoped>
</style>