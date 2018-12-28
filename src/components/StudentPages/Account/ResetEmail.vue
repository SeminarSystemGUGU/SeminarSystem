<template>
  <div id="ResetEmail">
    <div class="top-bar">
      <div class="top-title">
        <i style="color: dodgerblue" class="el-icon-back" @click="linkBack"></i>&nbsp;
        <span>修改邮箱</span>
      </div>
    </div>
    <div class="main-content">
      <div class="form-panel">
        <div class="input-panel">
          <label>Email:</label>
          <input class="confirm-input"  v-model="email" />
        </div>
        <!--<span style="display: inline-block;margin-top: 5vh;font-size: 14px;">验证码将发送至邮箱：100000@qq.com</span>-->
        <!--<div class="input-panel">-->
          <!--<label>验证码：</label><span style="display: inline-block;color: dodgerblue;float: right;margin-top: 1.5vh;margin-left: 6vw">获取验证码</span>&nbsp;&nbsp;&nbsp;-->
          <!--<input class="confirm-input" style="width: 30%" />-->
        <!--</div>-->
        <mu-button color="primary" class="active" @click="changeEmail" >确认修改</mu-button>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ResetEmail",
    data(){
      return {
        email:'',
      }
    },
    methods:{
      linkBack(){
        this.$router.push('/StuMyAccount');
      },
      changeEmail(){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(this.$data.email)) {
          let _this=this;
          this.$axios({
            method: 'put',
            url: '/user/email',
            data: {
              email: this.$data.email,
            }
          }).then(function (response) {
            if(response.data===true)
              _this.$router.push('/StuMyAccount');
            // else
              // _this.$toast.error("该邮箱已被占用！");
            }, function (error) {
            // alert(error);
            _this.$toast.error("该邮箱已被占用！");
          });
        }
        else{
          this.$toast.error("邮箱格式错误！");
        }
      }
    }
  }
</script>

<style lang="less">
  #ResetEmail{
    width: 100vw;
    padding:1px;
    .active{
      width:100%;
      margin-top: 10vh;
      font-size: 17px;
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
  }
</style>
