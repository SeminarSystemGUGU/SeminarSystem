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
          <input type="password" v-model="password" class="confirm-input"/>
        </div>
        <div class="input-panel">
          <label>确认新密码</label><br/>
          <input type="password" v-model="confirmPassword" class="confirm-input"/>
        </div>
        <div class="input-panel">
          <label>邮箱</label><br/>
          <input type="text" v-model="email" class="confirm-input" />
        </div>
        <mu-button color="primary" class="active" @click="linkTo" >激活账号</mu-button>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
        name: "ConfrimAccount",
      data(){
          return{
            password: '',
            confirmPassword: '',
            email:'',
          }
      },
      methods:{
          linkBack(){
            this.$router.push('/');
          },
          linkTo() {
            if (this.$data.password != this.$data.confirmPassword)
              this.$toast.error('请确认输入密码一致！');
            else {
              var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              if (re.test(this.$data.email)) {
                let _this = this;
                this.$axios({
                  method: 'put',
                  url: '/student/active',
                  data: {
                    password: this.$data.password,
                    email: this.$data.email,
                  }
                }).then(function (response) {
                  if (response.data === true)
                    _this.$router.push('/StuMainPage');
                },function (error) {
                  _this.$toast.error("该邮箱已被占用！");
                });
              }
              else {
                this.$toast.error('邮箱格式错误！');
              }
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
