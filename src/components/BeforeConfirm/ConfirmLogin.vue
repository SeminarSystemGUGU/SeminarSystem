<template>
  <div class="ResetPassword">
    <div class="reset-card-bar">
      <div class="reset-app-bar">
        <!--<div class="icon"></div>-->
        <div class="app-bar-title">
          <span>密码设置</span>
        </div>
      </div>
    </div>
    <div class="reset-main-content">
      <div class="reset-form">
        <el-form :model="formReset" :rules="RulesFormReset" ref="formReset">
          <el-form-item prop="password">
            <el-input v-model="formReset.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input v-model="formReset.confirmPassword" placeholder="请确认密码"></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <span class="the-notice">发送验证码到邮箱{{email}}</span>
          </el-form-item>
        </el-form>
        <div class="identifyCOde">
          <div class="catch-button-input">
            <input class="button-input" placeholder="请输入验证码" v-model="formReset.identifyCode" />
            <button class="get-code-button">发送验证码</button>
          </div>
        </div>
        <div class="confirm-button">
          <mu-button @click="login()" class="another-button" style="">登录</mu-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "ResetPassword",
      data(){
          return{
            email:'24320162202917@xmu.edu.cn',
            RulesFormReset:{

            },
            formReset:{
              password:'',
              confirmPassword:'',
              email:'',
              identifyCode:''
            }
          }
      }
    }
</script>

<style lang="less">
  .ResetPassword{
    background-color: white;
    width: 100vw;
    height: 100vh;
    padding: 1px;
  }

  .the-notice{
    font-size: 16px;
    font-family: 微软雅黑;
  }

  @media screen and (max-width: 600px){
    .reset-main-content{
      margin-top: 23vw;
    }

    input::-webkit-input-placeholder {
      /* placeholder颜色  */
      color: gray;
      /* placeholder字体大小  */
      font-size: 15px;
    }

    .el-input__inner::-webkit-input-placeholder{
      color: gray;
      font-size: 15px;
    }


    .el-input__inner{
      border:none;
      background-color: whitesmoke;
      height: 12vw;
      width: 90vw;
      color: gray;
    }

    .confirm-button{
      margin-top: 30vw;
    }

    .another-button{
      width: 91%;
      height: 12vw;
      font-size:4.5vw;
      background-color: #5677fc;
      color: white;
    }

    .get-code-button{
      color: orangered;
      outline: none;
      border: 1.5px solid orangered;
      height: 10vw;
      width: 30vw;
      background-color: transparent;
    }

    .catch-button-input{
      width: 90%;
      margin-left: auto ;
      margin-right: auto;
      height: 12vw;
      background-color: whitesmoke;
    }

    .button-input{
      color: gray;
      outline: none;
      border: none;
      height: 11vw;
      width: 50vw;
      margin-top: 0.5vw;
      background-color: whitesmoke;
      /*color: 4vw;*/
    }

    .reset-app-bar{
      width: 100vw;
      height: 15vw;
      position: fixed;
      z-index: 1000;
      top:0;
      background-color: #5677fc;
      color: white;
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

</style>
