<template>
    <div id="ForgetPasswordSet">
      <div class="top-bar">
        <div class="bar-icon">
          <span><i style="font-size: 30px;" class="el-icon-back" @click="linkBack"></i></span>
        </div>
      </div>
      <div class="main-content animated bounceInRight">
        <div class="fonts-panel">
          <span>找回密码:</span><br/>
          <span>请重置密码</span>
        </div>

        <div class="form-panel">
          <div class="input-panel">
            <label>新密码</label><br/>
            <input class="confirm-input" />
          </div>
          <div class="input-panel">
            <label>确认新密码</label><br/>
            <input class="confirm-input" />
          </div>
          <div class="button-panel">
            <button @click="linkTo">确认修改</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "ForgetPasswordSet",
      methods:{
          linkTo(){
            this.$router.push('/');
          }
      }
    }
</script>

<style scoped lang="less">
#ForgetPasswordSet{
  width: 100vw;
  height: 100vh;
  padding: 1px;
  .top-bar{
    width: 100%;
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
          max-width: 300px;
          max-height: 50px;
          width: 100%;
          height: 10vw;
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
      button{
        width: 180px;
        height: 50px;
      }
    }

  }

}
</style>
