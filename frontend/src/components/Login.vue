<template>
  <div class="login">
    <!--<div class="page"> -->
    <div class = "logo">
      <h1>{{ name }} </h1>
      <p>이번 학기를 채울 모든 경우의 수, His Time</p>
    </div>

    <form>
      <div class ="login_box">
         <button type="button" class="btn yellow" v-on:click="login()">LOGIN</button>
        <div class="text_box">
          <input type = "text" placeholder="hisent id" v-model="input.id" v-on:keyup.enter="login()">
          <br />
          <input type = "password" placeholder="hisnet password" v-on:keyup.enter="login()" v-model="input.password">
        </div>
       
      </div>
      <br /><br /><br />
      <div class="check_box"><input type="checkbox" v-model="isSave" /> <p>로그인 상태 30일 유지</p> </div>
    </form>
    
    <!--</div> -->

    <div  v-show="isLoad" id="loading">
       <div class="container">
        <div class="item item-1"></div>
        <div class="item item-2"></div>
        <div class="item item-3"></div>
        <div class="item item-4"></div>
    </div>
     
  </div>
  </div>
</template>

<script>


export default {
  name: 'Login', 
  data() {
    return{
      name : 'His Time',
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
            alert("로그인을 틀렸거나 서버가 이상하거나..")
          })
          
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
<style src = '../assets/Login.less' lang='scss' scoped>

</style>




