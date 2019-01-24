<!--
<template>
        <div v-show="filterbox" class="placeholder-box" >
           <h1>뭘까</h1>
           <p></p>
            <p>학부&emsp;&ensp;&nbsp;
                <select v-model="filter.hakbu">
                    <option value="">전체</option>
                    <option v-for="course_name in course_names" :key="course_name" > 
                        {{course_name}}
                    </option>
                </select>
            </p>
        
            <p>이수구분 
                <select v-model="filter.gubun">
                    <option value="">전체</option>
                    <option  v-for=" gubun in gubuns " :key="gubun">
                        {{ gubun }}
                    </option>
                </select>
            
                &ensp;교양영역
                <select v-model="filter.gyoyang">
                        <option value="">전체</option>
                        <option v-for=" gyoyang in gyoyangs" :key="gyoyang">
                            {{gyoyang}}
                        </option>
                </select>
            </p>
        
            <p>교수님 &ensp;&nbsp;
            <input v-model="filter.professor" type="text" placeholder="교수님 이름"/>
            </p>     

            <p>학점&emsp;&ensp;&nbsp;
                    <input type="checkbox" id="credit" value="0.5" v-model="checkedCredits">
                    <label for="credit">&ensp;0.5</label>
                    <input type="checkbox" id="credit1" value="1" v-model="checkedCredits">
                    <label for="credit1">&emsp; 1</label>
                    <input type="checkbox" id="credit2" value="2" v-model="checkedCredits">
                    <label for="credit2">&emsp; 2</label>
                    <input type="checkbox" id="credit3" value="3" v-model="checkedCredits">
                    <label for="credit3">&emsp; 3</label>
                    <input type="checkbox" id="credit4" value="4" v-model="checkedCredits">
                    <label for="credit4">&emsp; 4</label>
            </p>

            
            <p>영어비율
            <select v-model="filter.english">
                        <option value="">전체</option>
                        <option v-for=" english in englishs" :key="english">
                            {{english}}
                        </option>
            </select>
            </p>

        
                <p>시간대 &nbsp;&ensp;
               
                <input type="button" class='openchoose' value="선택창 열기" v-on:click="show2"/>
                 
                </p>

         
           <center><input type="button"  class="search" value="검색하기" v-on:click="search_by_Filter"></center>

            <div v-show="searchbox" class="placeholder-box2">
                <p>검색하고자 하는 시간대를 모두 클릭해주세요</p>
                         <table>
                            <thead>
                                <tr>
                                 <th></th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for ="i in 10" :key ="i">
                                    <td>{{ i }}</td>
                                        <td v-for ="j in 6" :key ="j" >
                                        <input type="checkbox" id="checktime" value="" v-on:click="checkmethod(i,j)">
                                        <label id="checktime"></label>

                                        </td>
                                </tr>
                            </tbody>
                        </table>
                     
                
                <p> <input type="button" class="choosedone" value=" done "  v-on:click="chosen">
                    <input type="button" class="choosereset" value=" reset " v-on:click="reset(checkbox)" >
                </p>
        </div>
        
      
       
        <div>
            <h1>hello</h1>
       </div>
 </div>
</template>

<script type="text/javascript">

// export default {
//     data(){
//         return{
//             course_name: '',
           
//             searchbox:false,
//             checkflag:false,
          
//             checktime3:[[]],
//             backendchecktime:[],
//             checkedCredits: [],
//             filter:{
//                 hakbu:'',
//                 gubun:'',
//                 gyoyang:'',
//                 professor:'',
//                 english:'',
//                 time:'',
//                 credit:''
//             },

//         }
//     },

//     methods:{
     
//         show2: function(){
//             this.searchbox=!this.searchbox;
//         },
//         chosen: function(){
//             this.searchbox=false;
            
//                for(var i=1;i<11; i++) {
//                 for(var j=1;j<7;j++) {
//                   if(this.checktime3[i] === undefined){
//                       continue;
//                 } if(this.checktime3[i][j]===true) {
//                    if(i==1) {
//                        if(j==1){
//                         this.backendchecktime.push('Mon1');
//                        }
//                        if(j==2){
//                         this.backendchecktime.push('Tue1');
//                        }
                 
//                    }
//                 }

//             }
//           }
//         },
//         reset:function(checkbox){
//           if (checkflag == "true") {
//                 for (i = 0; i < field.length; i++) {
//                     field[i].checked = false; }
//                     checkflag = "false";
//                     return "Check All"; }
//         },
//         creditslt:function(){
//            this.style.background='powderblue';

//         },
//         checkmethod:function(i,j){

//             if(this.checktime3[i] === undefined) {
//                 this.checktime3[i] = [];
//             }
//             this.checktime3[i][j]=true;
//             console.log(this.checktime3);
//         },
//         search_by_Filter: function(){
//             this.showbox=!this.showbox;
//             this.$http.post('/api/make/search/filter', {
//                 course_name : this.search.course_name,
//                 }).then((response) => {
//                     console.log(response.data);
//                     search = response.data;
//             });
//             this.filter.hakbu = '';
//             this.filter.gubun = '';
//             this.filter.gyoyang = '';
//             this.filter.credit = '';
//             this.filter.english = '';
//             this.filter.professor = '';
//             this.filter.time = '';
//             this.showbox  = !this.showbox;
//         }

//     }


// }
// </script>

// <style   src = '../../assets/Makepage/filter.less' lang = "scss" scoped>
// div{
//     width : 100px;
//     height : 100px;
//     color:red;
// }
// </style>
-->