<template>
<!-- show page에서 시간표를 보여주는 부분 -->
<body>
    <div class="head">
        <button title="리스트" class="btn" id="list" v-on:click="show()" value='timetable'></button>
        <h3>{{ this.$session.get('to_timetablem') }}</h3><!--글자 제한 두기-->
        <!-- <button class="btn" id="redo" v-on:click="user_add()"></button> -->
        <button title="새로고침" class="btn" id="reset" v-on:click="reset()"></button>
    </div>
    <listM v-if="listShow==true" :data='courses_for_conv'></listM>
    <div v-show="ttShow==true" class = "timetable">
        <table>
            <tr>
                <th></th>
                <th>월</th>
                <th>화</th>
                <th>수</th>
                <th>목</th>
                <th>금</th>
                <th>토</th>
            </tr>
            <tr>

                <td id="class_time">1</td>
                    <td v-for="i in 6" :key="i" rowspan="11"><!--요일에 대한 반복문-->
                        <div v-for="j in 11" :key="j"><!--1교시 to 10교시 반복문-->
                            <div v-if="courses[i] != undefined">
                                <div v-if="courses[i][j] != undefined">
                                    <div v-for="course of courses[i][j]" :key="course.code">
                                            <node  :data="course"/>
                                        
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </td>
            </tr>
             <tr>
                <td id="class_time">2</td>
            </tr>
             <tr>
               <td id="class_time">3</td>
            </tr>
             <tr>
              <td id="class_time">4</td>
            </tr>
             <tr>
                <td id="class_time">5</td>
            </tr>
             <tr>
              <td id="class_time">6</td>
            </tr>
             <tr>
                <td id="class_time">7</td>
            </tr>
             <tr>
                <td id="class_time">8</td>
               
            </tr>
             <tr>
                <td id="class_time">9</td>
                
            </tr>
             <tr>
                <td id="class_time">10</td>
            </tr>
            <tr>
                <td id="class_time">11</td>
            </tr>
        </table>
    </div><!--timetable ending tag-->
    <div class="foot">
        <button class="btn" id="save" v-on:click ="save()">저장하기</button> 
        <button class="btn" id="cancel" v-on:click="goHome()">돌아가기</button> 
        <span id="credit">학점 : <span id="num">{{ this.total_credit }}</span>학점</span>
    </div>
</body>

</template>

<script >
    import subjects from '../timetable.json'
    import node from '../timetable/node'
    import listM from '../timetable/List_m'
    // import add from "../timetable/add"

    export default{ 
        components : {
            node,listM
        },
          data(){
              return{
                  tt_name : "",
                  subjects: subjects,
                  subject : {
                       name : ""
                  },
                  filltedSub :{
                  },
                  courses : [[[]]],//시간표에 띄워줄 용도
                  courses_store : [[[]]],
                  courses_parsed : [],
                  courses_for_conv : [],//쉽게 저장하기 위해서
                  user_add_clicked : false, //user 
                  color : '#000000',
                  total_credit : 0.0,
                  ttShow : true,
                  listShow : false,
                  backHome : false
              }
          },
          watch: {
            tt_name : {
                handler(){
                    //console.log("changed")
                }
            },
          },
            methods : {
                //시간표 수정 후 make page 입장을 위한 것으로 매 입장 마다 호출
                //this.$session.get('to_modify')에 있는 과목을 add_to 함
                modify(){
                    this.courses_parsed= [];
                    var data = this.$session.get('to_modify');
                    // console.log(data);
                    if(data === undefined) return;
                    //console.log('into')
                    this.$http.post('/api/make/modify_list', {
                            code :  data,
                    }).then((response) => {
                        // console.log(response.data);
                        for(var i = 0; i < response.data.length; i++){
                            // console.log(response.data[i]);
                            this.add_to(response.data[i]);
                            //console.log('running');
                        }
                        this.$session.set('to_modify', undefined);
                        // console.log(this.courses_parsed);

                    });
                    
                },
                
                //과목 지울 때 호출
                //remove_courses로 과목을 삭제하고 courses_store과 for_back을 비우고 courses_for_conv로 re_add
                remove(code){
                    // console.log('remove')

                    this.$notify({
                        group: 'foo',
                        text: '과목이 삭제 되었습니다.',
                        duration: 400,
                        // type: 'success',
                    });
                    this.remove_course(code);
                    this.courses_store = [[[]]];
                    this.courses_parsed = [];
                    this.re_add();
                    // console.log('re_add 끝!');
                    this.update_table();
                },
                //courses_for_conv에서 해당 과목을 지움
                remove_course(code){
                    for(var i = 0; i < this.courses_for_conv.length; i++){
                        if(code === this.courses_for_conv[i].code) {
                            this.courses_for_conv.splice(i,1);
                            i -= 1;
                        }   
                    }
                },
                //삭제하고 남은 과목으로 repaint함
                //courses_for_conv를 파싱해서 course_update에 넣어줌
                re_add() {
                    for(var i = 0 ; i < this.courses_for_conv.length; i++) {
                        //console.log('not duplication!! : ' + data[i]);
                        var parsed_data = this.parsingTime(this.courses_for_conv[i]);
                        // console.log(parsed_data);
                        this.course_update(parsed_data);
                    }
                },

                //저장버튼 클릭시 호출
                //시간표 정보 /api/show/del_tt로 전달 data_list는 courses_parsed로 해서 보내줌
                save(){
                    if(!(this.courses_for_conv.length)) {
                        this.$confirm({
                            title : '시간표가 비었습니다.\n홈 화면으로 돌아가시겠습니까?',
                            message : '홈 화면으로 돌아갈 경우 현재 시간표는 저장되지 않습니다.'
                        }).then((backHome) => {
                            if(backHome) {
                                this.courses_for_conv = [];
                                this.courses_parsed = [];
                                this.courses_store = [[[]]];
                                this.backHome = true;
                                let routeData = this.$router.resolve({name: 'show'});
                                window.location.href = routeData.href;
                            }
                        });
                    } else {
                        this.$confirm('시간표를 완성하시겠습니까?')
                        .then((complete) => {
                            if(complete) {
                                this.backHome = true;
                                // console.log(this.ttname);
                                // console.log(this.$session.get('to_timetablem'));
                                // console.log(this.courses_store);
                                // console.log(this.courses_for_conv);
                                this.$http.post('/api/show/del_tt', {
                                    student_id :  this.$session.get('student_id'),
                                    ttname :  this.$session.get('to_timetablem')
                                }).then((response) => {
                                    // console.log('after remove');
                                    this.$http.post('/api/make/make_tt', {
                                        student_id :  this.$session.get('student_id'),
                                        ttname : this.$session.get('to_timetablem'),
                                        total_credit : this.total_credit,
                                        data_list : this.courses_parsed
                                    }).then((response) => {
                                        // console.log('after save');
                                        if (response.status === 200 ) {   
                                            this.courses_for_conv = [];
                                            this.courses_parsed = [];
                                            this.courses_store = [[[]]];
                                            
                                            let routeData = this.$router.resolve({name: 'show'});
                                            window.location.href = routeData.href;
                                            // this.$router.replace({name: 'show'});
                                        }
                                    });
                                });
                            }
                        });
                    }
                },
                goHome(){//돌아가기
                    this.$confirm('홈으로 돌아가면 변동사항이 저장되지 않습니다.')
                    .then((backHome) => {
                        if(backHome) {
                            this.backHome = true;
                            this.courses_for_conv = [];
                            this.courses_parsed = [];
                            this.courses_store = [[[]]];
                            let routeData = this.$router.resolve({name: 'show'});
                            window.location.href = routeData.href;
                            // this.$router.replace({name: 'show'});
                        }
                    });
                },

                //즐겨찾기 전체 추가 버튼 클릭시 호출
                //전체 추가 시에 사용함
                add_a_to(data) {
                    for(var i in data) {
                        var duplication = this.duplication(data[i]);

                        if(!duplication) {
                            //console.log('not duplication!! : ' + data[i]);
                            var parsed_data = this.parsingTime(data[i]);
                            this.courses_for_conv.push(data[i]);
                            this.course_update(parsed_data);
                            this.update_table();
                        } else {
                            //console.log('duplication!');
                        }
                    }
                    this.$notify({
                        group: 'foo',
                        text: '모두 추가되었습니다!',
                        duration: 400,
                        // type: 'success',
                    });
                },
                
                //과목 하나씩 추가할 때 호출
                //duplication을 확인하고 파씽을 진행하고 update_table하기
                add_to(raw_data){
                    // console.log('add_to');
                    var duplication = this.duplication(raw_data);
                    // //console.log("rc_length: " + this.courses_parsed.length);

                    if(duplication) {
                        //popup
                        this.$notify({
                            group: 'foo',
                            title: '경고!',
                            text: '이미 추가한 과목입니다.',
                            duration: 400,
                            type: 'error',
                        });
                    } else {
                        var parsed_data = this.parsingTime(raw_data);
                        if(this.overflow(parsed_data)){
                            this.$notify({
                                group: 'foo',
                                title: '경고!',
                                text: '더 이상 추가할 수 없습니다.',
                                duration: 400,
                                type: 'warn',
                            });
                        }else{
                            this.courses_for_conv.push(raw_data);
                            this.course_update(parsed_data);
                            this.update_table();
                        }
                        // this.courses_parsed.push(raw_data)
                        

                        //console.log(this.courses);
                    }
                },

                //날짜 숫자로 바꿔주는 곳!
                alterDay(day){
                    var day_index = 0;
                    if(day === '월') day_index = 1;
                    else if(day === '화') day_index = 2;
                    else if(day === '수') day_index = 3;
                    else if(day === '목') day_index = 4;
                    else if(day === '금') day_index = 5;
                    else if(day === '토') day_index = 6;
                    return day_index;
                }, 

                //월3,목3의 object를 월3, 목3의 두개의 object로 만들어줌
                parsingTime(course) {
                    // console.log('parsingTime')

                    var course_temp = JSON.parse(JSON.stringify(course));
                    var data_array = [];
                    var parsed_data = {
                        code : course_temp.code,
                        course_name : course_temp.name,
                        professor : course_temp.professor,
                        time : course.time,
                        credit : course_temp.credit,
                        gubun : course_temp.gubun,
                        english : course_temp.english,
                        day : -1,
                        start : -1,
                        height : 1,
                        k_start : -1,
                        size : -1,
                    }

                    var previous_day = 0;
                    var previous_start = 0;

                    //시간이 없는 과목은 그냥 시간 파씽 안하고 data_array에 넣고 리턴
                    if(course_temp.time === '') {
                        // console.log(course_temp.name);
                        data_array.push(parsed_data);
                        return data_array;
                    }

                    //시간 파씽
                    var sep_time = course_temp.time.split( ',');
                    var data_copy = JSON.parse(JSON.stringify(parsed_data));
                    //첫번째 시간에 해당하는 object 넣어주고
                    data_copy.day = this.alterDay(sep_time[0].substr(0, 1));
                    data_copy.start = parseInt(sep_time[0].match(/\d+/)[0]);
                    data_array.push(data_copy);
                    previous_day = data_copy.day;
                    previous_start = data_copy.start;
                    
                    var data_copy = JSON.parse(JSON.stringify(parsed_data));
                    //두번째부터는 앞에 object랑 비교해서 연강원소이면 앞에 object height ++ 아니면 새로운 원소로 추가
                    for(var i = 1; i < sep_time.length; i++){
                        //parsing data copy만들어서 거기의 day, start만 바꿔줌
                        data_copy = JSON.parse(JSON.stringify(parsed_data));
                        var current_day = this.alterDay(sep_time[i].substr(0, 1));
                        var current_start = parseInt(sep_time[i].match(/\d+/)[0]);

                        // console.log(previous_day);
                        // console.log(previous_start);
                        // console.log(current_day);
                        // console.log(current_start);
                        
                        //연강원소일때
                        if(previous_day === current_day && previous_start + 1 === current_start){
                            // console.log('연강원소');
                            var temp = data_array.pop();
                            temp.height ++;
                            data_array.push(temp);
                        //연강원소가 아닐때
                        } else {
                            // console.log('연강원소 아님');
                            data_copy.day = current_day;
                            data_copy.start = current_start;
                            data_array.push(data_copy);
                        }
                        previous_day = current_day;
                        previous_start = current_start;
                    }
                    // console.log(data_array);
                    return data_array;
                },

                //중복확인용 courses_conv에서 확인
                duplication(raw_data) {
                    var duplication =   this.courses_for_conv.some(function(item, index, array) {
                                            return (item.code === raw_data.code);
                                        });
                    return duplication;
                },

                //overflow 확인
                //overflow 됐을 시에는 courses_for_conv에서 뺴고 return false
                overflow(parsed_data){
                    var overflow = false;
                    for(var i = 0; i < parsed_data.length; i++){
                        var day_index = parsed_data[i].day;
                        var time_index = parsed_data[i].start;
                        
                        //과목에 시간이 없으면 그냥 다 넣어
                        if(day_index === -1) return false;
                        
                        if(this.courses_store[day_index] === undefined)continue;

                        if(this.courses_store[day_index][time_index] === undefined)continue;

                        //시작해봅시다
                        var dest = this.courses_store[day_index][time_index];
                        //꽉 차있으면 return
                        if(dest.length === 3) overflow = true;
                        //연강 똥값 들어갈 곳이 사이즈가 꽉차있다면 return
                        else if(parsed_data[i].height > 1){
                            for(var j = 1 ; j < parsed_data[i].height; j++){
                                if(this.courses_store[day_index][time_index + j] != undefined && this.courses_store[day_index][time_index + j].length > 2) {
                                    overflow = true;
                                }
                            }
                        }
                    }
                    if(overflow)this.remove_course(parsed_data[0].code);
                    return overflow;
                },

                //recursive하게 다 업데이트하기 
                cont_update(day, time, size){
                    var k_start = -1;
                    var cont_index = -1;
                    var height = 0;
                    for(var i = 0; i < this.courses_store[day][time].length; i++){
                        if(this.courses_store[day][time][i].height != 1){
                            //console.log('연강인 친구나 똥값이 있어요 위치 :' + i);
                            cont_index = i;
                            break;

                        }
                    }
                    //연강 원소가 존재하면 
                    if(cont_index != -1){

                        //원소가 새로 들어오면 연강 원소의 사이즈보다 커진다면
                        //(여기가 연강 원소들을 모두 size update 해줘야 하는 곳입니다.)
                        if(size > this.courses_store[day][time][cont_index].size){
                            //console.log('똥값의 사이즈가 현재 어레이 사이즈 보다 크다면 업뎃');
                            this.prop_update_specific(this.courses_store[day][time][cont_index].code, size, 'size', day);   
                        }
                        
                        //연강의 사이즈가 더 크다면 그 사이즈에 맞춰줘야 합니다.
                        else{
                            //console.log('똥값의 사이즈가 현재 어레이 사이즈 보다 작으면 똥값으로 업뎃')
                            size = this.courses_store[day][time][cont_index].size;
                        }
                    }

                    //빈칸 찾습니다.
                    for(var i = 0; i < this.courses_store[day][time].length; i++){
                        //console.log('빈칸 위치를 찾아서 넣어줍니다')
                        //빈칸에 해당하는 k_start를 찾아주기
                        if(k_start === -1 && this.courses_store[day][time][i].k_start != i)k_start = i;
                        //나머지 사이즈 업데이트
                        this.$set(this.courses_store[day][time][i], 'size', size); 
                    }
                    //빈칸이 없으면 그냥 끝에 넣으시면 됩니다.
                    if(k_start === -1) k_start = this.courses_store[day][time].length;

                    if(this.courses_store[day][time][cont_index] != undefined){
                        if(this.courses_store[day][time][cont_index].height == -1){
                            this.cont_update(day, time-1, size);
                        }   
                    } 
                    
                    
                },

                //course 
                course_update(parsed_data) {
                    // console.log('course_update')
                    this.color = this.set_color();
                    //console.log('color : ' + this.color);
                    for(var t = 0; t < parsed_data.length; t++){
                            var day_index = parseInt(parsed_data[t].day);
                            var time_index = parseInt(parsed_data[t].start);
                            //console.log('into course_update' + parsed_data[t]);
                            //console.log(parseInt(parsed_data[t].start));
                            
                            if(this.courses_store[day_index] === undefined) this.courses_store[day_index] = [];
                            if(this.courses_store[day_index][time_index] === undefined)this.courses_store[day_index][time_index] = [];

                            //시작해봅시다
                            var dest = this.courses_store[day_index][time_index];
                            var size = -1; //새로 들어온 원소가 전달할 사이즈값
                            var k_start = -1;
                            if(parsed_data[t].time === -1){
                                parsed_data[t].size = size;
                                parsed_data[t].k_start = k_start;
                                this.courses_store[day_index][time_index].push(parsed_data[t]);
                                this.courses_parsed.push(parsed_data[t]);
                                return;
                            }

                            //만약에 이게 들어가는 첫 원소라면 그냥 넣어주세요(만약에 this.course[day_index][time_index]이 없다면)
                            else if(dest.length === 0 || dest === undefined){
                                //console.log('첫원소에요 그냥 넣어주세요');
                                dest = [];
                                size = 1;
                                k_start = 0;
                            }

                            //만약에 원소가 존재한다면 해당 원소가 들어갈 위치를 찾아서 알려주세요.
                            else if(dest.length != 0){
                                var count = 0;
                                for(var i = 0; i < dest.length; i++){
                                    if(dest[i] != undefined){
                                        count += 1;
                                        size = dest[i].size;
                                    }
                                }
                                //console.log('원소가 있어요');
                                if(count + 1 > size) size = count + 1;
                                this.cont_update(day_index, time_index, size);
                                
                                
                            }
                            //console.log(`${day_index}.${time_index}`)
                            for(var u = 0; u < 3; u++){
                                var i = 0;
                                //빈칸 찾습니다.
                                for(i = 0; i < this.courses_store[day_index][time_index].length; i++){
                                    //console.log('빈칸 위치를 찾아서 넣어줍니다')
                                    //빈칸에 해당하는 k_start를 찾아주기
                                    //console.log(this.courses_store[day_index][time_index][i].k_start );
                                    if(this.courses_store[day_index][time_index][i].k_start === u)break;
                                }
                                if(i === this.courses_store[day_index][time_index].length) {
                                    //console.log("잡았다요놈");
                                    //console.log(u);
                                    k_start = u;
                                    break;
                                }
                                //빈칸이 없으면 그냥 끝에 넣으시면 됩니다.
                            }
                            if(k_start === -1) k_start = this.courses_store[day_index][time_index].length;

                            
                            //원소가 연강이면
                            if(parsed_data[t].height != 1){
                                //똥값
                                var poop = {
                                            code : parsed_data[t].code,
                                            height : -1,
                                            k_start : k_start,
                                            size : size,
                                        }
                                //똥값 넣기 프로세스
                                for(var z = 1; z < parsed_data[t].height; z++){
                                    //dest_cont는 똥값 들어갈 곳
                                    var dest_cont = this.courses_store[day_index][time_index+z];

                                    if(this.courses_store[day_index] === undefined) this.courses_store[day_index] = [];
                                    //연강인데 원소 위치가 정의가 안되있을경우
                                    if(dest_cont === undefined || dest_cont.length === 0){
                                        //console.log("똥값 들어갔음");
                                        this.courses_store[day_index][time_index+z] = [];
                                        this.courses_store[day_index][time_index+z].push(poop);
                                        //console.log(this.courses);
                                    }

                                    //원소 위치가 정의 되어있다면
                                    else{
                                        var dest_index = 0;
                                        for(var p = 0 ; p < dest_cont.length; p++){
                                            if(dest_cont[p]!=undefined) dest_index = p;
                                        }
                                        //console.log(`dest_index = ${dest_index}`);
                                        //console.log(`size : ${size}, dest_con[0].size = ${dest_cont[dest_index].size}`);
                                        //어레이 길이랑 size가 같은경우(연강이 없어)
                                        if(dest_cont[dest_index].size === dest_cont.length){
                                            //근데 위치가보니까 내 위치 사이즈가 더 크면 업데이트해줘
                                            if(dest_cont[dest_index].size + 1 < size) {
                                                //size로 연강원소 속해있는 열만 최신화
                                                for(var j = 0 ; j < dest_cont.length; j++) this.$set(dest_cont[j], 'size', size); 

                                            }
                                            //내 위치 사이즈가 작으면 해당 위치 사이즈로 바꿔주면 됨
                                            else {
                                                size = dest_cont[dest_index].size + 1;
                                                //console.log('내 위치 사이즈가 작으면 해당 위치 사이즈로 바꿔줘라')
                                                for(var j = 0 ; j < dest_cont.length; j++) this.$set(dest_cont[j], 'size', size); 
                                                for(var j = 0 ; j < this.courses_store[day_index][time_index].length; j++) this.$set(this.courses_store[day_index][time_index][j], 'size', size);                                             
                                                
                                                this.prop_update(parsed_data[t].code, size, 'size');
                                                
                                            }
                                            
                                        }
                                        

                                        //어레이 길이랑 원소 size가 다른경우(연강이 들어 있어서 그래)
                                        else{
                                            //원소 size로 업데이트해줘
                                            if(dest_cont[dest_index].size > size) size = dest_cont[dest_index].size;
                                            
                                        }
                                        //k_start 이상할까봐 한번 확인해주는 거임
                                            for(var j = 0 ; j < dest_cont.length; j++){
                                                if(dest_cont[j].k_start === k_start){
                                                    k_start += 1;
                                                    if(k_start === 3) {
                                                       //alert("같은 시간대에 더이상 추가할 수 없습니다.");--알람이 두번씩 뜨는..문제가..(지현)
                                                        this.remove(parsed_data[t].code);
                                                        return;
                                                        //console.log('사이즈 밖으로 나가서 그려야되서 안됌');
                                                    }
                                                    // this.prop_update(parsed_data[t].code, k_start, 'k_start');
                                                    poop.k_start = k_start;
                                                }
                                            }
                                            poop.size = size;
                                            this.courses_store[day_index][time_index+z].push(poop);
                                            //console.log(this.courses);
                                    }
                                }
                            }

                            //console.log('size : ' + size + ' k_start : ' + k_start);
                            parsed_data[t].size = size;
                            parsed_data[t].k_start = k_start;
                          

                            //courses에 푸쉬
                            //console.log('제대로된 친구 넣기');
                            // console.log(this.courses_parsed);

                            parsed_data[t].color = this.color;
                            this.courses_store[day_index][time_index].push(parsed_data[t]);
                            // console.log('푸쉬');
                            // console.log(parsed_data[t]);
                            this.courses_parsed.push(parsed_data[t]);
                            // console.log(this.courses_parsed);
                        }
                },
                prop_update(code, data, prop){
                    //courses_store[[[]]]에서 찾아봐
                    for(var i=1;i<=6;i++){
                            if(this.courses_store[i] === undefined)  continue;//다른 요일로 건너뛰기
                            for(var j=1;j<=11;j++){
                            if(this.courses_store[i][j] === undefined)  continue;//다른 시간으로 건너뛰기
                            for(var k=0; k<this.courses_store[i][j].length;k++){
                                if(this.courses_store[i][j][k].code === code){
                                    for(var m = 0; m < this.courses_store[i][j].length; m++){
                                        this.$set(this.courses_store[i][j][m], prop, data); 
                                    }
                                    continue;
                                }
                            }                
                        }
                    }
                },
                prop_update_specific(code, data, prop, day){
                    //console.log('prop_update_in');
                    //console.log(day);
                    for(var j=1;j<=11;j++){
                        if(this.courses_store[day][j] === undefined)  continue;//다른 시간으로 건너뛰기
                        for(var k=0; k<this.courses_store[day][j].length;k++){
                            if(this.courses_store[day][j][k].code === code){
                                for(var m = 0; m < this.courses_store[day][j].length; m++){
                                    this.$set(this.courses_store[day][j][m], prop, data); 
                                    //console.log('specific update');
                                    //console.log(data);
                                }
                                continue;
                            }
                        }                
                    }
                },
                set_total_credit(){
                    var credit = 0;
                    for(var i = 0; i < this.courses_for_conv.length; i++){
                        credit += parseFloat(this.courses_for_conv[i].credit);
                    }
                    this.total_credit = credit;
                },
                reset() {
                    this.$confirm('시간표를 비우시겠습니까?')
                    .then((empty) => {
                        if(empty) {
                            this.courses_store = [[[]]];
                            this.courses_parsed = [];
                            this.courses_for_conv = [];
                            this.update_table();
                        }
                    });
                },
                update_table(){
                    // console.log('update_table')
                    this.courses = [[[]]];                    
                    this.courses = this.courses_store ;
                    this.$forceUpdate();
                    this.set_total_credit();
                },
                set_color() {
                    // hsl color
                    var color = 'hsl(';
                    color += Math.floor(Math.random() * 360);
                    color = color + ', 40%, 60%)';
                    return color;
                },
                show(){
                    // var list = document.getElementById('list');

                    this.ttShow = !(this.ttShow);
                    this.listShow = !(this.listShow);

                    // if(list.value === 'timetable') {
                    //     list.style.background = "url('../../image/timetable.png')";
                    //     list.value = 'list';
                    // } else if(list.value === 'list') {
                    //     list.style.background = "url('../../image/list.png')";
                    //     list.value = 'timetable';
                    // }
                },
                before_reload(event) {
                    if(!this.backHome) {
                        // Cancel the event
                        event.preventDefault();
                        // Chrome requires returnValue to be set
                        event.returnValue = '';
                    } else {
                        this.backHome = false;
                    }
                }
            },
            created(){
                // console.log(this.courses_store);
                // console.log(this.courses_for_conv);
                // console.log(this.courses_parsed);
                this.courses_store = [[[]]];
                this.courses_parsed = [];
                this.courses_for_conv = [];
                this.courses = [[[]]];
                this.modify();
                this.$EventBus.$on('add_a', this.add_a_to);
                this.$EventBus.$on('courses', this.add_to);
                this.$EventBus.$on('close_user_custom', this.user_add);//user custom 창 종료
                window.addEventListener('beforeunload', this.before_reload);
                // this.$EventBus.$on('to_modify', this.modify)
            }
        }
        
    
</script>

<style  src = '../../assets/Makepage/timetable_m.scss' lang="scss" scoped>

</style>