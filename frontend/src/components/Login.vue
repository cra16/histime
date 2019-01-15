  <template>
  <div class="login">
    <h1>{{ name }} </h1>
    <form @submit.prevent ="addSkill">
      <h3>Enter your email : </h3>
      <input type = "text" placeholder="hisent id" v-model="input.id">
      <h3>Enter your password :</h3>
      <input type = "password" placeholder="hisnet password" v-model="input.password">
      <p><input class="check_box" type="checkbox" v-model="isSave"> <label for="a">로그인 상태 30일 유지</label></p>
      <button type="button" class="btn blue" v-on:click="login()">Login</button>
    </form>
    
    <div v-show="isLoad" id="loading"><img id="loading-image" src="/images/loading.gif" alt="Loading..." /></div>

     
  </div>
</template>

<script>



export default {
  name: 'Login', 
  data() {
    return{
      name : 'login page',
      input :  {
          id : "",
          password : "",
      },
      isLoad: false,
      isSave: false,
      _response : {}
    }

  },
  methods: {
    //로그인 함수
    //로그인 성공 => 히즈넷에서 크롤링한 사용자 정보를(이름, 학번) localStorage에 저장, 사용자가 검증되었다고 저장.
    //로그인 실패 =>  에러가 발생함 : 백엔드에서 문제가 생김 , 고쳐야함
    login(){
      this.$cookies.config('30d')
      this.isLoad = true;
      this.$http.post('/api/login', {
        id : this.input.id,
        password : this.input.password
      }).then((response) => {
        if (response.status === 200 ) {
              this._response = response;
              this.$session.start()
              this.setSession()
              if(this.isSave){this.setCookies(response)}
              else{
                this.$cookies.set('auth_save', false)
                }
              
              console.log(this.$cookies.get('auth_save'))
              this.$router.replace({ name: "show"}) 
            }
          }, function (err) {
            alert("틀렸따!")
          })
    },
    setCookies(){
      
      this.$cookies.set('auth_save', true)
      this.$cookies.set('name', this._response.data.name)
      this.$cookies.set('student_id', this._response.data.student_id)
      this.$cookies.set('auth', true)
      console.log("set cookie")
    },
    setSession(){
      this.$session.start()
      this.$session.set('name', this._response.data.name)
      this.$session.set('student_id', this._response.data.student_id)
      this.$session.set('auth', true)
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
<style scoped>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
@import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"; 

#loading {
 width: 100%;  
 height: 100%;  
 top: 0px;
 left: 0px;
 position: fixed;  
 display: block;  
 opacity: 0.7;  
 background-color: #fff;  
 z-index: 99;  
 text-align: center; } 
  
#loading-image {  
 position: absolute;  
 top: 50%;  
 left: 50%; 
 z-index: 100; }




  .holder {
    background: #fff;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  
  ul li {
    padding: 20px;
    font-size: 1.3em;
    background-color: #E0EDF4;
    border-left: 5px solid #3EB3F6;
    margin-bottom: 2px;
    color: #3E5252;
  }

  

  .container {
    box-shadow: 0px 0px 40px lightgray;
  }

  input {
    width: calc(100% - 40px);
    border: 0;
    padding: 20px;
    font-size: 1.3em;
    background-color: #323333;
    color: #687F7F;
  }
  input.check_box{
    width: auto
  }

    .alert {
    background: #fdf2ce;
    font-weight: bold;
    display: inline-block;
    padding: 5px;
    margin-top: -20px;
  }

  i {
    float : right;
    cursor : pointer;
  }

  
  .btn {
  border-radius: 5px;
  padding: 15px 25px;
  font-size: 22px;
  text-decoration: none;
  margin: 20px;
  color: #fff;
  position: relative;
  display: inline-block;
  cursor : pointer;
}
.blue {
  background-color: #55acee;
  box-shadow: 0px 5px 0px 0px #3C93D5;
}

.blue:hover {
  background-color: #6FC6FF;
}

</style>



