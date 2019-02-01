<template>
<!-- show page에서 시간표를 보여주는 부분 -->
<body>
    <div class="head">
        <h3>{{ this.$session.get('to_timetablem') }}</h3><!--글자 제한 두기-->
        <!-- <button class="btn" id="redo" v-on:click="user_add()"></button> -->
        <button title="새로고침" class="btn" id="reset" v-on:click="reset()"></button>
    </div>
    <add v-if="user_add_clicked" ></add>
    <div class = "timetable">
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
                                            <node @update="update" :data="course"/>
                                        
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
    import add from "../timetable/add"

    export default{
        components : {
            node, add
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
                  courses_for_back : [],
                  courses_for_conv : [],//쉽게 저장하기 위해서
                  user_add_clicked : false, //user 
                  color : '#000000',
                  total_credit : 0,
              }
            
          },
          watch: {
            tt_name : {
                handler(){
                    console.log("changed")
                }
            },
          },
            methods : {
                modify(){
                    var data = this.$session.get('to_modify');
                    if(data === undefined) return;
                    console.log('into')
                    this.$http.post('/api/make/modify_list', {
                            code :  data,
                    }).then((response) => {
                        for(var i = 0; i < response.data.length; i++){
                            this.add_to(response.data[i]);
                            console.log('running');
                        }

                    });
                    this.$session.set('to_modify', undefined);
                },
                update(data){
                    console.log(data);
                    console.log('update function');
                    if(data == 'remove'){
                        console.log('remove');
                        this.update_table();
                    }
                
                },
                update_table(){
                    console.log("yes");
                    this.courses = [[[]]];                    
                    this.courses = this.courses_store ;
                    this.$forceUpdate();
                    for(var i=1;i<=6;i++){
                            if(this.courses_store[i] === undefined)  continue;//다른 요일로 건너뛰기
                            for(var j=1;j<=11;j++){
                            if(this.courses_store[i][j] === undefined)  continue;//다른 시간으로 건너뛰기
                            for(var k=0; k<this.courses_store[i][j].length;k++){
                                this.courses.push(this.courses_store[i][j][k]);
                            }                
                        }
                    }
                    this.set_total_credit();
                },
                remove(code){
                    this.remove_course(code);
                    this.courses_store = [[[]]];
                    this.update_table();
                    this.add_a_to(this.courses_for_conv);
                },
                remove_course(code){
                    for(var i = 0 ; i < this.courses_for_conv.length; i++){
                        if(code === this.courses_for_conv[i].code) {
                            this.courses_for_conv.splice(i,1);
                            i-=1;
                        }   
                    }
                },
                save(){//저장하기,
                    if(confirm("시간표를 완성하시겠습니까?")){
                        console.log(this.ttname);
                        console.log(this.$session.get('to_timetablem'));
                        this.$http.post('/api/show/del_tt', {
                            student_id :  this.$session.get('student_id'),
                            ttname :  this.$session.get('to_timetablem')
                        }).then((response) => {
                            console.log('after remove');
                            this.$http.post('/api/make/make_tt', {
                            student_id :  this.$session.get('student_id'),
                            ttname : this.$session.get('to_timetablem'),
                            total_credit : this.total_credit,
                            data_list : this.courses_for_back,

                            }).then((response) => {
                            console.log('after save');
                            if (response.status === 200 ) {                       
                                this.$router.replace({name: 'show'});
                        }
                        });

                        
                    });
                    }
                },
                goHome(){//돌아가기
                    if(confirm("취소하면 변동사항이 저장되지 않습니다.")){
                        this.$router.replace({name: 'show'});
                    }else{
                        return;
                    }
                },
                add_a_to(data) {
                    for(var i in data) {
                        var duplication = this.duplication(data[i]);

                        if(!duplication) {
                            console.log('not duplication!! : ' + data[i]);
                            var parsed_data = this.parsingTime(data[i]);

                            this.color = this.set_color();
                            // this.courses_for_back.push(data[i]);
                            this.course_update(parsed_data);
                            this.update_table();

                            
                        } else {
                            console.log('duplication!');
                        }
                    }

                    
                    // data.forEach(function(item, data_index, data_array) {
                    //     var duplication = this.duplication(item);

                    //     if(!duplication) {
                    //         var parsed_data = this.parsingTime(item);

                    //         this.courses_for_back.push(item);
                    //         this.course_update(parsed_data);
                    //     }
                    // });
                },
                add_to(raw_data){
                    var duplication = this.duplication(raw_data);
                    // console.log("rc_length: " + this.courses_for_back.length);

                    if(duplication) {
                        //popup
                        this.$notify({
                            group: 'foo',
                            title: '경고!',
                            text: '이미 추가한 과목입니다.',
                            duration: 400,
                            type: 'warn',
                        });
                    } else {
                        var parsed_data = this.parsingTime(raw_data);

                        // this.courses_for_back.push(raw_data);
                        this.course_update(parsed_data);
                        this.update_table();

                        console.log(this.courses);
                    }
                    this.$forceUpdate();
                },
                parsingTime(course) {
                    var course_temp = JSON.parse(JSON.stringify(course));
                    var course_for_use = JSON.parse(JSON.stringify(course));
                    var _exist = false;
                    for(var i = 0; i < this.courses_for_conv.length; i++){
                        if(course.code === this.courses_for_conv[i].code) _exist =true;
                    }
                    if(!_exist)this.courses_for_conv.push(course);
                    var prepared_data = [];

                    if(course_temp.time = '') return prepared_data;

                    var sep_time = course_for_use.time.split( ',');
                    // for(var i = 0; i< sep_time.length; i++){
                    //     console.log(sep_time[i]);
                    // }
                    console.log(course.time + '코스타임');
                    console.log(course_temp.time + '타임');

                    prepared_data.push({
                        code : course_temp.code,
                        course_name : course_temp.name,
                        professor : course_temp.professor,
                        time : course.time,
                        credit : course_temp.credit,
                        gubun : course_temp.gubun,
                        english : course_temp.english,
                        
                        day : sep_time[0].substr(0, 1),
                        start : sep_time[0].match(/\d+/)[0],
                        height : 1,

                        k_start : -1,
                        size : -1,
                    });
            
                    for(var i = 1; i < sep_time.length; i++){
                        if(parseInt(sep_time[i-1].match(/\d+/)[0]) + 1 === parseInt(sep_time[i].match(/\d+/)[0])){
                            console.log("into comparison");
                            var temp = prepared_data.pop();
                            console.log(temp.height);
                            temp.height ++;

                            prepared_data.push(temp);
                        } else {
                            prepared_data.push({
                                code : course_temp.code,
                                course_name : course_temp.name,
                                professor : course_temp.professor,
                                time : course.time,
                                credit : course_temp.credit,
                                gubun : course_temp.gubun,
                                english : course_temp.english,
                                
                                day : sep_time[i].substr(0, 1),
                                start : sep_time[i].match(/\d+/)[0],
                                height : 1,

                                k_start : -1,
                                size : -1,
                            });
                        }
                    }

                    for(var i = 0 ; i < prepared_data.length; i++){
                        console.log( "day :" + prepared_data[i].day);
                        console.log( "start :" + prepared_data[i].start);
                        console.log( "length :" + prepared_data[i].height);
                    }

                    return prepared_data;
                },
                duplication(raw_data) {
                    // var duplication =   this.courses_for_back.some(function(item, index, array) {
                    //                         return (item.code === raw_data.code);
                    //                     });
                    // return duplication;
                    for(var i=1;i<=6;i++){
                            if(this.courses_store[i] === undefined)  continue;//다른 요일로 건너뛰기
                            for(var j=1;j<=11;j++){
                            if(this.courses_store[i][j] === undefined)  continue;//다른 시간으로 건너뛰기
                            for(var k=0; k<this.courses_store[i][j].length;k++){
                                if(this.courses_store[i][j][k].code === raw_data.code){
                                    return true;
                                }
                            }                
                        }
                    }
                    return false;
                },
                cont_update(day, time, size){
                    var k_start = -1;
                    var cont_index = -1;
                    var height = 0;
                    for(var i = 0; i < this.courses_store[day][time].length; i++){
                        console.log('현재 원소갯수는 ' + this.courses_store[day][time].length);

                        //연강 시작친구(height = 2)이거나 똥값(height = -1)이거나
                        if(this.courses_store[day][time][i].height != 1){
                            console.log('연강인 친구나 똥값이 있어요 위치 :' + i);
                            cont_index = i;
                            break;

                        }
                    }
                    //연강 원소가 존재하면 
                    if(cont_index != -1){

                        //원소가 새로 들어오면 연강 원소의 사이즈보다 커진다면
                        //(여기가 연강 원소들을 모두 size update 해줘야 하는 곳입니다.)
                        if(size > this.courses_store[day][time][cont_index].size){
                            console.log('똥값의 사이즈가 현재 어레이 사이즈 보다 크다면 업뎃');
                            this.prop_update_specific(this.courses_store[day][time][cont_index].code, size, 'size', day);   
                        }
                        
                        //연강의 사이즈가 더 크다면 그 사이즈에 맞춰줘야 합니다.
                        else{
                            console.log('똥값의 사이즈가 현재 어레이 사이즈 보다 작으면 똥값으로 업뎃')
                            size = this.courses_store[day][time][cont_index].size;
                        }
                    }

                    //빈칸 찾습니다.
                    for(var i = 0; i < this.courses_store[day][time].length; i++){
                        console.log('빈칸 위치를 찾아서 넣어줍니다')
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
                course_update(parsed_data) {
                    this.color = this.set_color();
                    console.log('color : ' + this.color);
                    for(var t = 0; t < parsed_data.length; t++){
                            var day_index = 0;
                            var time_index = parseInt(parsed_data[t].start);
                            console.log('into course_update' + parsed_data[t]);
                            console.log(parseInt(parsed_data[t].start));
                            if(parsed_data[t].day === '월') day_index = 1;
                            else if(parsed_data[t].day === '화') day_index = 2;
                            else if(parsed_data[t].day === '수') day_index = 3;
                            else if(parsed_data[t].day === '목') day_index = 4;
                            else if(parsed_data[t].day === '금') day_index = 5;
                            else if(parsed_data[t].day === '토') day_index = 6;

                            parsed_data[t].day = day_index;
                            if(this.courses_store[day_index] === undefined) this.courses_store[day_index] = [];
                            if(this.courses_store[day_index][time_index] === undefined)this.courses_store[day_index][time_index] = [];

                            //시작해봅시다
                            var dest = this.courses_store[day_index][time_index];
                            var size = -1; //새로 들어온 원소가 전달할 사이즈값
                            var k_start = -1;

                            //꽉 차있으면 return
                            if(dest.length === 3){
                                console.log("full!!");
                                alert("어림없다.");
                                this.remove_course(parsed_data[t].code);
                                return;
                            }
                            console.log('dest의 길이는 '+ dest.length);
                            //연강 똥값 들어갈 곳이 사이즈가 꽉차있다면 return
                            if(parsed_data[t].height > 1){
                                for(var i = 1 ; i < parsed_data[t].height; i++){
                                    if(this.courses_store[day_index][time_index + i] != undefined && this.courses_store[day_index][time_index + i].length > 2) {
                                        console.log("full");
                                        alert("어림없다.");
                                        this.remove_course(parsed_data[t].code);
                                        return;
                                    }

                                }
                            }

                            //일단 다 차있으면 더 못들어간다고 말해주자
                            if(dest.length === 3)console.log("full!!");

                            //만약에 이게 들어가는 첫 원소라면 그냥 넣어주세요(만약에 this.course[day_index][time_index]이 없다면)
                            else if(dest.length === 0 || dest === undefined){
                                console.log('첫원소에요 그냥 넣어주세요');
                                dest = [];
                                size = 1;
                                k_start = 0;
                            }

                            //만약에 원소가 존재한다면 해당 원소가 들어갈 위치를 찾아서 알려주세요.
                            else if(dest.length != 0){
                                console.log('원소가 있어요');
                                //사이즈는 length+1
                                size = dest.length + 1;

                                this.cont_update(day_index, time_index, size);
                                
                                
                            }
                            console.log(`${day_index}.${time_index}`)
                            for(var u = 0; u < 3; u++){
                                var i = 0;
                                //빈칸 찾습니다.
                                for(i = 0; i < this.courses_store[day_index][time_index].length; i++){
                                    console.log('빈칸 위치를 찾아서 넣어줍니다')
                                    //빈칸에 해당하는 k_start를 찾아주기
                                    console.log(this.courses_store[day_index][time_index][i].k_start );
                                    if(this.courses_store[day_index][time_index][i].k_start === u)break;
                                }
                                if(i === this.courses_store[day_index][time_index].length) {
                                    console.log("잡았다요놈");
                                    console.log(u);
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
                                        console.log("똥값 들어갔음");
                                        this.courses_store[day_index][time_index+z] = [];
                                        this.courses_store[day_index][time_index+z].push(poop);
                                        console.log(this.courses);
                                    }

                                    //원소 위치가 정의 되어있다면
                                    else{
                                        var dest_index = 0;
                                        for(var p = 0 ; p < dest_cont.length; p++){
                                            if(dest_cont[p]!=undefined) dest_index = p;
                                        }
                                        console.log(`dest_index = ${dest_index}`);
                                        console.log(`size : ${size}, dest_con[0].size = ${dest_cont[dest_index].size}`);
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
                                                console.log('내 위치 사이즈가 작으면 해당 위치 사이즈로 바꿔줘라')
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
                                                        alert("어림없다.");
                                                        this.remove(parsed_data[t].code);
                                                        return;
                                                        console.log('사이즈 밖으로 나가서 그려야되서 안됌');
                                                    }
                                                    // this.prop_update(parsed_data[t].code, k_start, 'k_start');
                                                    poop.k_start = k_start;
                                                }
                                            }
                                            this.courses_store[day_index][time_index+z].push(poop);
                                            console.log(this.courses);


                                        

                                    }
                                }
                            }

                            console.log('size : ' + size + ' k_start : ' + k_start);
                            parsed_data[t].size = size;
                            parsed_data[t].k_start = k_start;
                          

                            //courses에 푸쉬
                            console.log('제대로된 친구 넣기');
                            parsed_data[t].color = this.color;
                            this.courses_store[day_index][time_index].push(parsed_data[t]);
                            this.courses_for_back.push(parsed_data[t]);
                            this.$forceUpdate();
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
                    console.log('prop_update_in');
                    console.log(day);
                    for(var j=1;j<=11;j++){
                        if(this.courses_store[day][j] === undefined)  continue;//다른 시간으로 건너뛰기
                        for(var k=0; k<this.courses_store[day][j].length;k++){
                            if(this.courses_store[day][j][k].code === code){
                                for(var m = 0; m < this.courses_store[day][j].length; m++){
                                    this.$set(this.courses_store[day][j][m], prop, data); 
                                    console.log('specific update');
                                    console.log(data);
                                }
                                continue;
                            }
                        }                
                    }
                },
                set_name(text) {
                    this.tt_name = text;
                },
                set_total_credit(){
                    console.log('into set_total_credit');
                    var credit = 0;
                    for(var i = 0; i < this.courses_for_conv.length; i++){
                        console.log(`${this.courses_for_conv[i].name} ${this.courses_for_conv[i].credit}`);
                        credit += parseInt(this.courses_for_conv[i].credit);
                    }
                    this.total_credit = credit;
                },
                reset() {
                    if(confirm("시간표를 비우시겠습니까?")){
                        this.courses_store = [[[]]];
                        this.course_for_back = [];
                        this.courses_for_conv = [];
                        this.courses = [[[]]];
                        this.update_table();
                    }
                },
                set_color() {
                    // hsl color
                    var color = 'hsl(';
                    color += Math.floor(Math.random() * 360);
                    color = color + ', 40%, 60%)';
                    // hex
                    // var letters = '0123456789ABCDEF';
                    // var color = '#';

                    // for (var i = 0; i < 6; i++) {
                    //     color += letters[Math.floor(Math.random() * 16)];
                    // }

                    // console.log('color' + color);

                    return color;
                },
            },
            created(){
                this.modify();
                this.$EventBus.$on('add_a', this.add_a_to),
                this.$EventBus.$on('courses', this.add_to),
                this.$EventBus.$on('close_user_custom', this.user_add),//user custom 창 종료
                this.$EventBus.$on('to_modify', this.modify)

            }
            
        }
        
    
</script>

<style  src = '../../assets/Makepage/timetable_m.scss' lang="scss" scoped>

</style>