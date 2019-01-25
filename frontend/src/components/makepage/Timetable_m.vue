<template>
<!-- show page에서 시간표를 보여주는 부분 -->
<body>
    <div class="head">
        <h3>{{ this.$session.get('to_timetablem') }}</h3><!--글자 제한 두기-->
        <button class="btn" id="redo" v-on:click="user_add()"></button>
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
                    <td v-for="i in 6" :key="i" rowspan="10"><!--요일에 대한 반복문-->
                        <div v-for="j in 10" :key="j"><!--1교시 to 10교시 반복문-->
                            <div v-if="courses[i] != undefined">
                                <div v-if="courses[i][j] != undefined">
                                    <div v-for="course of courses[i][j]" :key="course.code">
                                            <node @update="update" :data="course" />
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
            
            


        </table>
    </div><!--timetable ending tag-->
    <div class="foot">
        <button class="btn" id="save" v-on:click ="save()">저장하기</button> 
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
                  raw_courses : [],//백엔드에 넘겨줄 용도
                  user_add_clicked : false//user 
              }
            
          },
          watch: {
            tt_name : {
                handler(){
                    console.log("changed")
                }
            },
            courses : {
                deep : true,
                handler(){
                    console.log("changed")
                    this.$forceUpdate();
                }
              },
              
          },
            methods : {
                update(){
                    this.$forceUpdate();
                },
                save(){//저장하기, 
                    this.$http.post('/api/make/make_tt', {
                        student_id :  this.$session.get('student_id'),
                        ttname : this.$session.get('to_timetablem'),
                        total_credit : this.total_credit(),
                        data_list : this.raw_courses
                    });

                    this.$router.replace({name: 'show'});
                },
                user_add(){
                    this.user_add_clicked = !(this.user_add_clicked)
                },
                add_a_to(data) {
                    for(var i in data) {
                        var duplication = this.duplication(data[i]);

                        if(!duplication) {
                            var parsed_data = this.parsingTime(data[i]);

                            this.raw_courses.push(data[i]);
                            this.display(parsed_data);
                        }
                    }
                    // data.forEach(function(item, data_index, data_array) {
                    //     var duplication = this.duplication(item);

                    //     if(!duplication) {
                    //         var parsed_data = this.parsingTime(item);

                    //         this.raw_courses.push(item);
                    //         this.display(parsed_data);
                    //     }
                    // });
                },
                add_to(raw_data){
                    var duplication = this.duplication(raw_data);
                    // console.log("rc_length: " + this.raw_courses.length);

                    if(duplication) {
                            alert("이미 시간표에 추가한 과목입니다!");
                    } else {
                        var parsed_data = this.parsingTime(raw_data);

                        this.raw_courses.push(raw_data);
                        this.display(parsed_data);

                        console.log(this.courses);
                    }
                },
                parsingTime(course) {
                    var course_temp = JSON.parse(JSON.stringify(course));
                    var course_for_use = JSON.parse(JSON.stringify(course));
                    
                    var prepared_data = [];

                    if(course_temp.time = '')return prepared_data;

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
                        
                        day : sep_time[0].substr(0, 1),
                        start : sep_time[0][1],
                        long : 1,

                        k_start : -1,
                        size : -1,
                    });
            
                    for(var i = 1; i < sep_time.length; i++){
                        if(parseInt(sep_time[i-1][1]) + 1 === parseInt(sep_time[i][1])){
                            console.log("into comparison");
                            var temp = prepared_data.pop();
                            console.log(temp.long);
                            temp.long ++;

                            prepared_data.push(temp);
                        } else {
                            prepared_data.push({
                                code : course_temp.code,
                                course_name : course_temp.name,
                                professor : course_temp.professor,
                                time : course.time,
                                credit : course_temp.credit,
                                
                                day : sep_time[i].substr(0, 1),
                                start : sep_time[i][1],
                                long : 1,

                                k_start : -1,
                                size : -1,
                            });
                        }
                    }

                    for(var i = 0 ; i < prepared_data.length; i++){
                        console.log( "day :" + prepared_data[i].day);
                        console.log( "start :" + prepared_data[i].start);
                        console.log( "length :" + prepared_data[i].long);
                    }

                    return prepared_data;
                },
                duplication(raw_data) {
                    var duplication =   this.raw_courses.some(function(item, index, array) {
                                            return (item.code === raw_data.code);
                                        });
                    return duplication;
                },

                display(parsed_data) {
                    for(var t = 0; t < parsed_data.length; t++){
                            var day_index = 0;
                            var time_index = parseInt(parsed_data[t].start);
                            console.log('into display' + parsed_data[t]);
                            console.log(parseInt(parsed_data[t].start));
                            if(parsed_data[t].day === '월') day_index = 1;
                            else if(parsed_data[t].day === '화') day_index = 2;
                            else if(parsed_data[t].day === '수') day_index = 3;
                            else if(parsed_data[t].day === '목') day_index = 4;
                            else if(parsed_data[t].day === '금') day_index = 5;
                            else if(parsed_data[t].day === '토') day_index = 6;

                            if(this.courses[day_index] === undefined) this.courses[day_index] = [];
                            if(this.courses[day_index][time_index] === undefined)this.courses[day_index][time_index] = [];

                            //시작해봅시다
                            var dest = this.courses[day_index][time_index];
                            var size = -1; //새로 들어온 원소가 전달할 사이즈값
                            var k_start = -1;
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
                                

                                //원소 중에 있나 연강 친구가 있나 확인해주세요.
                                var cont_index = -1; //연강 친구의 index
                                
                                for(var i = 0; i < dest.length; i++){
                                    console.log('현재 원소갯수는 ' + dest.length);

                                    //연강 시작친구(long = 2)이거나 똥값(long = -1)이거나
                                    if(dest[i].long === 2 || dest[i].long === -1){
                                        console.log('연강인 친구나 똥값이 있어요 위치 :' + i);
                                        cont_index = i;
                                        break;
                                    }
                                }
                                //연강 원소가 존재하면 
                                if(cont_index != -1){

                                    //원소가 새로 들어오면 연강 원소의 사이즈보다 커진다면
                                    //(여기가 연강 원소들을 모두 size update 해줘야 하는 곳입니다.)
                                    if(dest.length + 1 > dest[cont_index].size){
                                        console.log('똥값의 사이즈가 현재 어레이 사이즈 보다 크다면 업뎃');
                                    
                                        size = dest.length + 1;
                                        //courses[[[]]]에서 찾아봐
                                        for(var i=1;i<=6;i++){
                                                if(this.courses[i] === undefined)  continue;//다른 요일로 건너뛰기
                                                for(var j=1;j<=10;j++){
                                                if(this.courses[i][j] === undefined)  continue;//다른 시간으로 건너뛰기
                                                for(var k=0; k<this.courses[i][j].length;k++){
                                                    if(this.courses[i][j][k].code === dest[cont_index].code){
                                                        for(var m = 0; m < this.courses[i][j].length; m++){
                                                            this.courses[i][j][m].size = size; 
                                                        }
                                                        continue;
                                                    }
                                                }                
                                            }
                                        }
                                    }
                                    
                                    //연강의 사이즈가 더 크다면 그 사이즈에 맞춰줘야 합니다.
                                    else{
                                        console.log('똥값의 사이즈가 현재 어레이 사이즈 보다 작으면 똥값으로 업뎃')
                                        size = dest[cont_index].size;
                                    }
                                }
                                
                                //연강 원소가 없으면 
                                else{
                                    console.log('연강원소가 없으면 사이즈는 그냥 dest의 size + 1')
                                    size = dest[0].size + 1;
                                }


                                //빈칸 찾습니다.
                                for(var i = 0; i < dest.length; i++){
                                    console.log('빈칸 위치를 찾아서 넣어줍니다')
                                    //빈칸에 해당하는 k_start를 찾아주기
                                    if(k_start === -1 && dest[i].k_start != i)k_start = i;
                                    //나머지 사이즈 업데이트
                                    dest[i].size = size;
                                }
                                if(k_start === -1) k_start = dest.length;

                                
                            }

                            //원소가 연강이면
                            if(parsed_data[t].long != 1){
                                var poop = {
                                            code : parsed_data[t].code,
                                            course_name : 'null',
                                            professor : '',
                                            time : '',
                                            credit : '',
                                            day : '',
                                            start : '',
                                            long : -1,
                                            k_start : k_start,
                                            size : size,
                                        }
                                console.log('연강입니까?')
                                for(var j = 1; j < parsed_data[t].long; j++){
                                    var dest_cont = this.courses[day_index][time_index+j];
                                    //courses에 푸쉬
                                    if(this.courses[day_index] === undefined) this.courses[day_index] = [];
                                    //연강인데 원소 위치가 정의가 안되있을경우
                                    if(dest_cont === undefined){
                                        console.log("똥값 들어갔음");
                                        this.courses[day_index][time_index+j] = [];
                                        this.courses[day_index][time_index+j].push(poop);
                                        console.log(this.courses);

                                    }

                                    //원소 위치가 정의 되어있다면
                                    else{
                                        //근데 위치가보니까 내 위치 사이즈가 더 크면 업데이트해줘
                                        if(dest_cont[0].size < size) {
                                            for(var i=1;i<=6;i++){
                                                if(this.courses[i] === undefined)  continue;//다른 요일로 건너뛰기
                                                for(var j=1;j<=10;j++){
                                                    if(this.courses[i][j] === undefined)  continue;//다른 시간으로 건너뛰기
                                                    for(var k=0; k<this.courses[i][j].length;k++){
                                                        if(this.courses[i][j][k].code === parsed_data[t].code){
                                                            for(var m = 0; m < this.courses[i][j].length; m++){
                                                                this.courses[i][j][m].size = size; 
                                                            }
                                                            continue;
                                                        }
                                                    }                
                                                }
                                            }
                                        }
                                        //내 위치 사이즈가 작으면 해당 위치 사이즈로 바꿔주면 됨
                                        else {
                                            size = dest_cont[0].size;
                                            for(var j = 0 ; j < dest_cont.length; j++){
                                                dest_cont[j].size = size;
                                            }
                                            //k_start 이상할까봐 한번 확인해주는 거임
                                            for(var j = 0 ; j < dest_cont.length; j++){
                                                if(dest_cont[j].k_start === k_start){
                                                    if(k_start === 3) console.log('사이즈 밖으로 나가서 그려야되서 안됌 지금부터 에러');
                                                    k_start += 1;
                                                    for(var i=1;i<=6;i++){
                                                        if(this.courses[i] === undefined)  continue;//다른 요일로 건너뛰기
                                                        for(var j=1;j<=10;j++){
                                                            if(this.courses[i][j] === undefined)  continue;//다른 시간으로 건너뛰기
                                                            for(var k=0; k<this.courses[i][j].length;k++){
                                                                if(this.courses[i][j][k].code === parsed_data[t].code){
                                                                    this.courses[i][j][k].k_start = k_start;
                                                                    continue;
                                                                }
                                                            }                
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        console.log("똥값넣기1");
                                        this.courses[day_index][time_index+j].push(poop);
                                        console.log(this.courses);

                                    }
                                }
                            }

                            console.log('size : ' + size + ' k_start : ' + k_start);
                            parsed_data[t].size = size;
                            parsed_data[t].k_start = k_start;

                            //courses에 푸쉬
                            console.log('제대로된 친구 넣기');
                            this.courses[day_index][time_index].push(parsed_data[t]);
                            // this.$forceUpdate();
                        }
                },
                
                // display(parsed_data) {
                //     for(var i = 0; i < parsed_data.length; i++){
                //             var day_index = 0;
                //             var time_index = parseInt(parsed_data[i].start);
                //             console.log(parsed_data[i]);
                //             console.log(parseInt(parsed_data[i].start));
                //             if(parsed_data[i].day === '월') day_index = 1;
                //             else if(parsed_data[i].day === '화') day_index = 2;
                //             else if(parsed_data[i].day === '수') day_index = 3;
                //             else if(parsed_data[i].day === '목') day_index = 4;
                //             else if(parsed_data[i].day === '금') day_index = 5;
                //             else if(parsed_data[i].day === '토') day_index = 6;
                //             if(this.courses[day_index] === undefined) this.courses[day_index] = [];
                //             if(this.courses[day_index][time_index] === undefined)this.courses[day_index][time_index] = [];
                //             this.courses[day_index][time_index].push(parsed_data[i]);
                //             this.$forceUpdate();
                //         }
                // },
                set_name(text) {
                    this.tt_name = text;
                },
                total_credit(){
                    var sum = 0;
                    for (var i in this.raw_courses){
                        sum += this.raw_courses[i].credit*1;
                    }
                    return sum;
                },
                
            },
            created(){
                this.$EventBus.$on('to_timetablem', function(text){//show 에서 추가하기 했을때 오는 이름
                    this.tt_name = text;
                    this.tt_name = "aa";
                    console.log(this.tt_name);
                }),
                this.$EventBus.$on('add_a', this.add_a_to),
                this.$EventBus.$on('courses', this.add_to),
                this.$EventBus.$on('close_user_custom', this.user_add)//user custom 창 종료
            }
        }
        
    
</script>


<style  src = '../../assets/Makepage/timetable_m.less' lang="scss" scoped>

</style>