<template>
  <div class="login">
    <!--<div class="page"> -->
    <div class="onlylogin">
      <div class = "logo">
        <!-- <h1>{{ name }} </h1> -->
        <img src="../image/logo_large.png" width="700" class="mainlogo1">
        <p>이번 학기를 채울 모든 경우의 수, HisTime</p>
      </div>

      <form>
        <div class ="login_box">
          <button type="button" class="btn yellow" v-on:click="login()">LOGIN</button>
          <div class="text_box">
            <input type = "text" class="t1" placeholder="HISNET ID" v-model="input.id" v-on:keyup.enter="login()">
            <br />
            <input type = "password" class="t1" placeholder="HISNET PASSWORD" v-on:keyup.enter="login()" v-model="input.password">
          </div>
        
        </div>
        <br /><br /><br />
        <div class="check_box"><input type="checkbox" v-model="isSave" /> <p>로그인 상태 30일 유지</p> </div>
      </form>
      
      <!--</div> -->
     </div>
      <div  v-show="isLoad" id="loading">
        <div class="container">
          <div class="item item-1"></div>
          <div class="item item-2"></div>
          <div class="item item-3"></div>
          <div class="item item-4"></div>
      </div>
      
      </div>
      <input type="button" class='help' v-on:click="show" />
         <div v-show="showbox" class="placeholder-box" >
           <center><p class="p1"><u><br> N O T I C E </u></p></center>
           <p class="p2">His Time은<br>한동대학교 학생들의<br>신학기 시간표 작성을 도와주는<br>프로그램입니다.<br>
           HISNET 아이디로 로그인<br>가능하며,작성된 시간표는<br> 예비수강신청에 도움을 줄 뿐<br>
           <u>실제로 장바구니에 적용되지는<br>않음을</u> 알려드립니다. 
           </p>
          </div>
  <div class = "footer">
  <center><Footer></Footer></center>
  </div>
  </div>
</template>


<script type="text/javascript">
import Footer from '../components/Footer.vue'


export default {
  name: 'Login', 
  components: {
    Footer
  },
  data() {
    return{
      name : 'HisTime',
      input :  {
          id : "",
          password : "",
      },
      isLoad: false,
      isSave: false,
      showbox:false,
      _response : {}
    }

  },
  methods: {
    login(){
      this.$cookies.config('30d')
      this.isLoad = true;
      this.$http.post('/api/login', {
        id : this.input.id,
        password : this.input.password
      }).then((response) => {
        if (response.status === 200 ) {
              this._response = response;
              if(response.data.student_id === 'nope'){//로그인이 틀린 경우
                alert("로그인 정보가 일치하지 않습니다.");
                this.input.id = '';
                this.input.password = '';
                this.isLoad = false;
                return;
              }
              else{//로그인이 틀리지 않은 경우
                this.setSession()//세션에 정보 저장
                  if(this.isSave){this.setCookies(response)}//30일 저장한다고 했을 때 =>쿠키에 정보 저장
                  else{this.$cookies.set('auth_save', false)}//그렇지 않은 경우 -> 쿠키에 저장된 정보 없에기
              }
              this.$router.replace({ name: "show"});
            }
          }, function (err) {//서버가 이상한 경우
            alert("서버가 이상합니다. histime206@gmail.com 로 메일을 보내주세요 :) ")
          });
          
    },
    show: function(){
        this.showbox=!this.showbox;

    },
    setCookies(){
      
      this.$cookies.set('auth_save', true)
      this.$cookies.set('name', this._response.data.name)
      this.$cookies.set('student_id', this._response.data.student_id)
      this.$cookies.set('auth', true)
    },
    setSession(){
      this.$session.start()
      this.$session.set('name', this._response.data.name)
      this.$session.set('student_id', this._response.data.student_id)
      console.log("login name : " + this._response.data.name)
      console.log("login studentid : " +this._response.data.student_id )
      this.$session.set('auth', true)
      console.log("set session")

    }

  },

}


    // login(){
    //   this.$http.get('/api/login').then((response) => {
    //     console.log(response.data);
    // })}
    

    // login() {
    //     if(this.input.username != "" && this.input.password != "") {//no space
    //         if(this.input.username == this.$parent.mockAccount.username && this.input.password == this.$parent.mockAccount.password) {//correct
    //             this.$emit("authenticated", true);
    //             this.$router.replace({ name: "show" });
    //         } else {
    //             console.log("The username and / or password is incorrect");//incorrect-error
    //         }
    //     } else {
    //         console.log("A username and password must be present");//space-error
            
    //     }
    // }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src = '../assets/Login.scss' lang='scss' scoped>

</style>