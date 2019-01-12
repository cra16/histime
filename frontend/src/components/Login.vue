<template>
  <div class="login">
    <h1>{{ name }} </h1>
    <form @submit.prevent ="addSkill">
      <h3>Enter your email : </h3>
      <input type = "text" placeholder="username" v-model="input.username">
      <h3>Enter your password :</h3>
      <input type = "password" placeholder="password" v-model="input.password">
      <button type="button" class="btn blue" v-on:click="login()">Login</button>
    </form>
     
  </div>
</template>

<script>
export default {
  name: 'Login', 
  data() {
    return{
      name : '로그인을 해봐라',
      input :  {
          username : "",
          password : "",
      },
      student : {
          student_id : "",
          name : "",
      }
    }
  },
  methods: {
    login(){
      this.$http.post('/api/login', {
        id : this.input.username,
        password : this.input.password
      }).then((response) => {
        if(response.data.student_id != -1){
          this.student.student_id = response.data.student_id;
          this.student.name = response.data.name; 
          this.$emit("authenticated", true);
          this.$router.replace({ name: "show" });
        }
        else{
          console.log("The username and / or password is incorrect");//incorrect-error

        }
        
      });
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
    
  }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
@import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"; 

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

  p {
    text-align:center;
    padding: 30px 0;
    color: gray;
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
