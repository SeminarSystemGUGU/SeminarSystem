<template>
  <div id="LogIn">
    <div class="login-metal">
      <div class="main-content">
        <div class="animated fadeIn">
          <div class="fonts-panel">
            <span>厦门大学讨论课管理系统</span><br/>
            <span>欢迎您！</span>
          </div>
        </div>
        <div class="login-panel animated fadeInUp">
          <div class="input-panel">
            <div class="input-account">
              <label>账号</label><br/>
              <input  class="login-input"  placeholder="请输入账号" v-model="account" />
            </div>
            <div class="input-password">
              <label>密码</label><br/>
              <input class="login-input" type="password" placeholder="请输入密码" v-model="password" />
            </div>
          </div>
          <div class="button-panel">
            <button class="login-button" ref="loginButton">登录</button>
          </div>
          <div class="button-panel">
            <span>忘记密码</span>
          </div>

        </div>
      </div>
      <div class="fixed-notice">
        <span>初始密码为123456</span>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "NewLogIn",
      data(){
          return{
           account:'',
           password:''
          }
      },
      watch:{
          password(curValue,oldValue){
            if(curValue!==''){
              this.$refs.loginButton.style.backgroundColor='DodgerBlue'
              this.$refs.loginButton.style.color='white';
            }else{
              this.$refs.loginButton.style.backgroundColor='rgba(190,190,190,0.35)'
              this.$refs.loginButton.style.color='color: rgba(255,255,255,0.6)';
            }
          }
      }
    }
</script>

<style scoped lang="less">
  @base-input-color:rgba(255,255,255,0.75);
  @base-input-size:18px;
  @base-placeholder-size:17px;

#LogIn{
  /*width: 100vw;*/
  height:100vh;
  font-family: "PingFang SC";
  background-image: url("../assets/loginBack.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 1px;
  color: whitesmoke;

  .login-metal{
    padding: 0.1px;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.45);
  }

  .fixed-notice{
    width: 100%;
    color: rgba(255,255,255,0.7);
    text-align: center;
    position: fixed;
    bottom: 3vh;
  }

  .main-content{
    /*background-color: orangered;*/
    margin-left: auto;
    margin-right: auto;
    width: 80%;




    .fonts-panel{
      width: 100%;
      margin-top: 10vw;
      text-align: left;
      font-size: 25px;
      color: white;
      /*font-weight: bold;*/
    }

    label{

    }
    input::-webkit-input-placeholder {
      font-family: "等线 Light";
      letter-spacing: 0.6px;
      color:@base-input-color;
      font-size: @base-placeholder-size;
      margin-bottom: 1vw;
    }
    input:-moz-placeholder {
      font-family: "微软雅黑 Light";
      color: @base-input-color;
      font-size: @base-input-size;
    }
    input:-ms-input-placeholder {
      font-family: "微软雅黑 Light";
      color: @base-input-color;
      font-size: @base-input-size;
    }


    .login-panel{
      width: 100%;
      margin-top: 5vw;
      text-align: left;
      /*background-color: orange;*/


      .input-account{
        margin-top: 3vw;
      }
      .input-password{
        margin-top: 5vw;
      }


      .login-input{
        margin-top: 2vw;
        padding-bottom: 2.5vw;
        padding-top: 2vw;
        font-size: @base-input-size;
        color: rgba(255,255,255);
        width: 100%;
        max-width: 500px;
        background-color: transparent;
        border: none;
        outline: none;
        border-bottom: 0.5px solid rgba(255,255,255,0.8);
        /*transition: all 0.8s;*/
      }

      /*.login-input:focus{*/
        /*transition: all 0.8s;*/
        /*transform: scale(1.03);*/
      /*}*/
      /*.login-input:*/
      .button-panel{
        margin-top: 4vw;
        width: 95%;
        margin-right: auto;
        margin-left: auto;

        .login-button{
          width: 100%;
          max-width: 480px;
          font-size: 16px;
          height: 10vw;
          max-height: 50px;
          outline: none;
          border: none;
          border-radius: 5px;
          color: rgba(255,255,255,0.6);
          /*color: white;*/
          background-color: rgba(190,190,190,0.35);
          transition: all 0.5s;
        }
      }
    }


  }



}
</style>
