<template>
  <div id="ResetEmail">
    <div class="top-bar">
      <div class="top-title">
        <i class="top-icon el-icon-back" @click="linkBack"></i>&nbsp;
        <span>修改邮箱</span>
      </div>
    </div>
    <div class="main-content animated bounceInRight">
      <div class="form-panel">
        <div class="input-panel">
          <label>Email:</label>
          <input class="confirm-input" v-model="email" />

          <div class="animate fadeIn" v-show="emailValid">
            <span class="validate-message">邮箱格式有错误！</span>
          </div>
        </div>
        <!--<span style="display: inline-block;margin-top: 5vh;font-size: 14px;">验证码将发送至邮箱：100000@qq.com</span>-->
        <!--<div class="input-panel">-->
          <!--<label>验证码：</label><span style="display: inline-block;color: dodgerblue;float: right;margin-top: 1.5vh;margin-left: 6vw">获取验证码</span>&nbsp;&nbsp;&nbsp;-->
          <!--<input class="confirm-input" style="width: 30%" />-->
        <!--</div>-->
        <div class="button-panel">
          <button class="the-button" @click="modifyEmail">确认修改</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {validateEmail} from '../../util/validate.js'
  export default {
    name: "ResetEmail",
    data(){
      return{
        emailValid:false,
        email:''
      }
    },
    watch:{
      email(oldVal,newVal){
        console.log('clearlove')
        this.$data.emailValid = !validateEmail(this.$data.email);
        console.log(this.$data.emailValid);
      }
    },
    methods:{
      linkBack(){
        this.$router.push('/MyAccount');
      },
      modifyEmail(){
        if(this.$data.emailValid){
          this.$message({
            type:'error',
            message:'有信息项还没改好哦！'
          })
        }else {
          let _this = this;
          this.$axios({
            method: 'put',
            url: '/user/email',
            data: {
              email: this.$data.email
            }
          }).then(function (response) {
            if (response.data === true) {
              _this.$message({
                type: 'success',
                message: '修改成功！'
              })
              _this.$router.push('/MyAccount');
            } else {
              _this.$message({
                type: 'error',
                message: '修改失败！'
              })
            }
          }).catch(function (error) {
            _this.$message({
              type: "error",
              message: '修改失败！'
            })
          })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  #ResetEmail{
    width: 100vw;
    padding:1px;

    .el-icon-back{
      color: dodgerblue;
    }

    .validate-message{
      color: red;
      display: block;
      margin-top: 4px;
      /*transition: all 1s;*/
    }

    .top-bar{
      margin-top: 2vw;
      text-align: left;
      width:100%;
      height:8vw;
      /*background-color: dodgerblue;*/

      .top-title{
        margin-left: 4vw;
        line-height: 8vw;
        font-size: 20px;
        font-weight: bold;

      }
    }
    .main-content{
      width: 80%;
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;


      .form-panel {
        text-align: left;
        margin-top: 7vh;

        .confirm-input{
          margin-top: 0.5vh;
          outline: none;
          border: none;
          border-bottom: 0.1px solid gray;
          width: 60%%;
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

          .the-button{
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
  }
</style>
