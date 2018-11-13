<template>
  <div id="FindPassword">
    <app-bar icon="el-icon-arrow-left" title="找回密码"></app-bar>
    <div class="find-main-content">
      <div class="find-notice">
        <span>发送验证码到邮箱：{{email}}</span>
      </div>
      <div class="catch-button-input">
        <input class="button-input" placeholder="请输入验证码" v-model="identifyCode" />
        <button class="get-code-button">发送验证码</button>
      </div>
      <div class="button-panel">
        <mu-button color="primary" class="another-button">确认</mu-button>
      </div>
    </div>
  </div>
</template>

<script>
  import AppBar from '../AppBar'
    export default {
        name: "FindPassword",
      components:{
          AppBar
      },
      data(){
          return{
            email:'jdawifwa@fjwiad.com',
            identifyCode:'',
          }
      }
    }
</script>

<style scoped>
  @media screen and (max-width: 600px) {
    #FindPassword{
      padding: 1px;
    }

    .another-button{
      background-color: #5677fc;
      height: 10vw;
      font-size: 17px;
      width: 100%;
    }
    .button-panel{
      width: 90vw;
      margin-top: 15vw;
      margin-left: auto;
      margin-right: auto;
    }

    .find-main-content{
      padding: 1px;
      margin-top: 20vw;
      font-size: 18px;
      font-family: 微软雅黑;
    }


    .catch-button-input{
      width: 90%;
      margin-top: 3vw;
      margin-left: auto ;
      margin-right: auto;
      height: 12vw;
      background-color: whitesmoke;
    }

    .get-code-button{
      color: orangered;
      outline: none;
      border: 1.5px solid orangered;
      height: 10vw;
      width: 30vw;
      background-color: transparent;
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

  }
</style>
