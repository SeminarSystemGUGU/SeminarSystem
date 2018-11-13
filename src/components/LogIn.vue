<template>
  <div class="LogIn">
    <div class="login-card-bar">
      <div class="login-app-bar">
        <!--<div class="icon"></div>-->
        <div class="app-bar-title">
          <span>讨论课管理系统登录</span>
        </div>
      </div>
    </div>
    <div class="login-main-content">
      <div class="login-form">
        <div :class="className1">
          <input class="form-input" v-model="account" placeholder="请输入学号/学工号"  />
        </div>
        <div class="validator" v-show="!accountError">
          <!--<span>账号输入有误！</span>-->
        </div>
        <div class="validator" v-show="accountError">
          <span>请输入账号！</span>
        </div>
        <div :class="className" v-show="!showPassword" >
          <input class="form-input" type="password" v-model="password" placeholder="请输入登录密码"  />
          <i class="el-icon-view" @click="changeStatus" ></i>
        </div>
        <div class="login-input-show-pass" v-show="showPassword">
          <input class="form-input" v-model="password"  placeholder="请输入登录密码"  />
          <i class="el-icon-view" @click="changeStatus" style="color: cornflowerblue" ></i>
        </div>
        <div class="validator" v-show="passwordError">
          请输入密码！
        </div>
        <div class="validator" v-show="!passwordError">
          <!--<span>请输入密码！</span>-->
        </div>
      </div>
      <div class="button-panel">
        <mu-button @click="login()" class="another-button" style="">登录</mu-button>
        <!--<button class="login-button"  @click="login()">登录</button>-->
      </div>
      <div class="reset-password">
        <span>忘记密码</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      className:'login-input',
      className1:'login-input',
      showPassword:false,
      radio:'',
      password:'',
      account:'',
      accountError:false,
      passwordError:false
    }
  },
  methods:{
    login(){
      if(this.$data.account===''){
        this.$data.className1='login-input-validator-error';
        this.$data.accountError=true;
      }else{
        this.$data.className1='login-input';
        this.$data.accountError=false;
      }
      if(this.$data.password===''){
        this.$data.passwordError=true;
        this.$data.className='login-input-validator-error'
      }else{
        this.$data.className='login-input';
        this.$data.passwordError=false;
      }

    },
    changeStatus(){
      setTimeout(()=>{
        this.$data.showPassword=!this.$data.showPassword;
      },1000);
      this.$data.showPassword=!this.$data.showPassword;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

@media screen and (max-width: 600px) {
  .LogIn{
    padding: 1px;
  }

  .button-panel{
    margin-top: 3vw;

  }

  .another-button{
    width: 91%;
    height: 12vw;
    font-size:4.5vw;
    background-color: #5677fc;
    color: white;
  }

  .reset-password{
    float: right;
    margin-top: 10px;
    margin-right: 5vw;
    color: black;
    font-size: 4vw;
  }

  .login-button{
    width: 90vw;
    height: 11vw;
    font-size: 4vw;
    outline: none;
    background-color: cornflowerblue;
    color: whitesmoke;
    border: none;
    border-radius: 1.5vw;
  }

  /*验证器*/
  .validator{
    transition: all 1s;
    text-align: left;
    margin-left: 10vw;
    color: orangered;
    font-size: 3.7vw;
    height: 6vw;
    padding-top: 0.5vw;
    font-family: "Microsoft YaHei";
  }
  /*封装的输入框*/
  .form-input{
    margin-left: 5vw;
    outline: none;
    width: 82%;
    background-color: whitesmoke;
    height: 11vw;
    /*margin-bottom: 1vw;*/
    color: gray;
    border: none;
  }
  .el-icon-view{
    /*margin-top: 2vw;*/
    font-size: 6vw;
    float: right;
    margin-top: 3vw;
    margin-right: 3vw;
  }

  .login-input{
    text-align: left;
    font-size: 4.3vw;
    width: 90vw;
    color: gray;
    margin-left: auto;
    margin-right: auto;
    height: 12.5vw;
    line-height: 12.5vw;
    background-color: whitesmoke;
  }
  /*表单验证不通过时*/
  .login-input-validator-error{
    transition: all 0.5s;
    border: 1px solid orangered;
    text-align: left;
    font-size: 4.3vw;
    width: 90vw;
    color: orangered;
    /*color: gray;*/
    margin-left: auto;
    margin-right: auto;
    height: 12.5vw;
    line-height: 12.5vw;
    background-color: whitesmoke;
  }

  .account-input{
    text-align: left;
    font-size: 4.3vw;
    width: 90vw;
    color: gray;
    margin-left: auto;
    margin-right: auto;
    height: 12.5vw;
    line-height: 12.5vw;
    background-color: whitesmoke;

  }

  .login-input-show-pass{
    text-align: left;
    font-size: 4.3vw;
    width: 90vw;
    color: gray;
    margin-left: auto;
    margin-right: auto;
    height: 12.5vw;
    line-height: 12.5vw;
    background-color: whitesmoke;

  }



  .login-main-content{
    margin-top: 23vw;
  }
  .login-app-bar{
    width: 100vw;
    height: 15vw;
    position: fixed;
    top:0;
    background-color: #5677fc;
    box-shadow: 0 1px 0.2px 0 rgba(0, 0, 0, 0.2), 0 2px 20px 0 rgba(0, 0, 0, 0.19);

  }
  .app-bar-title{
    margin-top: 3.5vw;
    font-size: 5.2vw;
    color: white;
    font-family: "PingFang SC";
    /*font-weight: bold;*/
  }

}

@media screen and (min-width: 600px){
  .login-card-bar{
    display: none;
  }
  .login-main-content{
    float: right;
    margin-top: 100px;
    margin-right: 100px;
    background-color: white;
    width: 400px;
    height: 300px;
    border: 1px solid whitesmoke;
    /*box-shadow: ;*/
    box-shadow: 0 1px 0.2px 0 rgba(0, 0, 0, 0.2), 0 2px 20px 0 rgba(0, 0, 0, 0.19);
  }
}


</style>
