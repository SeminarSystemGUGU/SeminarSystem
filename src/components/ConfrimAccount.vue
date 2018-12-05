<template>
  <div id="ConfirmAccount">
    <div class="top-bar">
      <div class="bar-icon">
        <span><i style="font-size: 30px;" class="el-icon-back" @click="linkBack"></i></span>
      </div>
    </div>
    <div class="main-content animated bounceInRight">
      <div class="fonts-panel">
        <span>请激活您的账号</span>
      </div>

      <div class="form-panel">
        <div class="input-panel">
          <label>设置新密码</label><br/>
          <input type="password" class="confirm-input"/>
        </div>
        <div class="input-panel">
          <label>确认新密码</label><br/>
          <input type="password" class="confirm-input"/>
        </div>
        <span style="display: inline-block;margin-top: 5vh;font-size: 14px;">验证码将发送至邮箱：100000@qq.com</span>
        <div class="input-panel">
          <label>验证码</label><span style="color: dodgerblue;float: right">获取验证码</span>&nbsp;&nbsp;
          <input class="confirm-input" style="width: 30%" />
        </div>
        <div class="button-panel">
          <button @click="linkTo">激活账号</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
        name: "ConfrimAccount",
      methods:{
          linkBack(){
            this.$router.push('/');
          },
          linkTo(){
            this.$router.push('/TeacherMainPage');
          }
      }
    }
</script>

<style scoped lang="less">
#ConfirmAccount{
  padding: 1px;
  width: 100vw;
  height: 100vh;
  .top-bar{
    width: 100vw;
    height: 12vw;
    text-align: left;

    .bar-icon{
      margin-left: 5vw;
      margin-top: 2vw;
      color: dodgerblue;
      font-weight: bold;
    }
  }
  .main-content {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    .fonts-panel {
      margin-top: 5vh;
      /*margin-left: auto;*/
      /*margin-right: auto;*/
      text-align: left;
      font-size: 30px;
      /*background-color: orange;*/
    }

    .form-panel {
      text-align: left;
      margin-top: 7vh;

      .confirm-input{
        margin-top: 0.5vh;
        outline: none;
        border: none;
        border-bottom: 0.1px solid gray;
        width: 100%;
        padding-bottom: 1.2vh;
        font-size: 20px;
      }

      .input-panel{
        margin-top: 5vh;
      }
      .button-panel{
        margin-top: 5vh;
        width: 80%;
        margin-right: auto;
        margin-left: auto;

        button{
          width: 100%;
          max-width: 200px;
          height: 10vw;
          max-height: 50px;
          outline: none;
          border: none;
          background-color: dodgerblue;
          color: white;
          border-radius: 5px;
          font-size: 16px;
        }
      }
    }
  }
  @media screen and (min-width: 700px){
    .main-content{
      width: 60%;
    }
    .input-panel{
      /*width: 55%;*/
      text-align: left;
    }
    .button-panel{
      text-align: left;
      /*width: 50%;*/
      margin-left: 0;

    }

  }

}
</style>
