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
          <label>输入新邮箱</label><br/>
          <input v-model="newEmail" class="confirm-input"/>
          <span v-show="emailValid" class="validate-message">邮箱格式不正确哦~</span>
        </div>
        <div class="input-panel">
          <label>设置新密码</label><br/>
          <input type="password" v-model="newPassword" class="confirm-input"/>
        </div>
        <div class="input-panel">
          <label>确认新密码</label><br/>
          <input type="password" v-model="confirmPassword" class="confirm-input"/>
          <span v-show="passwordValid" class="validate-message">两次密码输入不一致哦~</span>
        </div>
        <!--<span style="display: inline-block;margin-top: 5vh;font-size: 14px;">验证码将发送至邮箱：100000@qq.com</span>-->
        <!--<div class="input-panel">-->
          <!--<label>验证码</label><span style="color: dodgerblue;float: right">获取验证码</span>&nbsp;&nbsp;-->
          <!--<input class="confirm-input" style="width: 30%" />-->
        <!--</div>-->
        <mu-button color="primary" class="active" @click="linkTo">激活账号</mu-button>
        <!--<div class="button-panel">-->
          <!--<button @click="linkTo">激活账号</button>-->
        <!--</div>-->
      </div>
    </div>

  </div>
</template>

<script>
  import {validateEmail} from "../../util/validate";

  export default {
        name: "ConfrimAccount",
      data(){
          return{
            newEmail:'',
            newPassword:'',
            confirmPassword:'',
            passwordValid:false,
            emailValid:false
          }
      },
      watch:{
        newEmail(oldVal,newVal){
          this.$data.emailValid=!validateEmail(this.$data.newEmail);
        },
        confirmPassword(oldVal,newVal){
          this.$data.passwordValid= this.$data.newPassword!==this.$data.confirmPassword;
        },
        newPassword(oldVal,newVal){
          this.$data.passwordValid= this.$data.newPassword!==this.$data.confirmPassword;
        }
      },
      methods:{
          linkBack(){
            this.$router.push('/');
          },
          linkTo() {
            if (this.$data.passwordValid||this.$data.emailValid) {
              this.$message({
                type:'error',
                message:'还有没填好的项哦'
              })
            } else {
              let _this = this;

              this.$axios({
                method:'put',
                url:'/teacher/active',
                data:{
                  password:this.$data.newPassword,
                  email:this.$data.newEmail,
                }
              }).then(function (response) {
                if(response.data===true){
                  _this.$message({
                    type:'success',
                    message:'激活成功！'
                  })
                  _this.$router.push('/TeacherMainPage');
                }else{
                  _this.$message({
                    type:'error',
                    message:'还有没填好的项哦'
                  })
                }
              }).catch(function (error) {
                _this.$message({
                  type:'error',
                  message:'还有没填好的项哦'
                })
              })


            }
          }
      }
    }
</script>

<style scoped lang="less">
#ConfirmAccount{
  padding: 1px;
  width: 100vw;
  height: 100vh;
  .active{
    width:100%;
    margin-top: 10vh;
    font-size: 17px;
  }
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

  .validate-message{
    color: red;
    display: inline-block;
    margin-top: 5px;
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
