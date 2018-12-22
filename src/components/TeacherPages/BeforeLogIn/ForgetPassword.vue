<template>
    <div id="ForgetPassword">
      <div class="top-bar">
        <div class="bar-icon">
          <span><i style="font-size: 30px;" class="el-icon-back" @click="linkBack"></i></span>
        </div>
      </div>
      <div class="main-content animated bounceInRight">
        <div class="fonts-panel">
          <span>找回密码:</span><br/>
          <span>请输入您的学工号</span>
        </div>

        <div class="form-panel">
          <div class="input-panel">
            <label>学工号</label><br/>
            <input v-model="account" class="confirm-input" />
          </div>
          <span style="display: inline-block;margin-top: 5vh;font-size: 14px;">密码将发送至您的邮箱</span>
          <!--<div class="input-panel">-->
            <!--<label>验证码</label><span style="display: inline-block;color: dodgerblue;float: right;margin-top: 1.5vh;margin-left: 6vw">获取验证码</span>&nbsp;&nbsp;&nbsp;-->
            <!--<input class="confirm-input" style="width: 30%" />-->
          <!--</div>-->
          <div class="button-panel">
            <button @click="linkTo">获取密码</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "ForgetPassword",
      data(){
        return{
          account:''
        }
      },
      methods:{
          linkBack(){
            this.$router.push('/');
          },
          linkTo(){
            let _this=this;
            this.$axios({
              method:'get',
              url:'/user/password/'+this.$data.account
            }).then(function (response) {
              if(response.data===true){
                _this.$message({
                  type:'success',
                  message:'邮件已发送！'
                })
                _this.$router.push('/');
              }else{
                _this.$message({
                  type:'error',
                  message:'发送失败！请查看账号是否激活'
                })
              }
            }).catch(function (error) {
              _this.$message({
                type:'error',
                message:'发送失败！请查看账号是否激活'
              })
            })
            // this.$router.push('/ForgetPasswordSet');
          }
      }
    }
</script>

<style scoped lang="less">
#ForgetPassword{
  width: 100vw;
  height: 100vh;
  padding: 1px;
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
