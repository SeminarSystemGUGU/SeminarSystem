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
          <!--<form class="input-panel" action="http://kfh4u9.natappfree.cc/security/login" method="post" >-->
            <div class="input-account">
              <label>账号</label><br/>
              <input  class="login-input"  name="username" id="username" placeholder="请输入账号" v-model="account" />
            </div>
            <div class="input-password">
              <label>密码</label><br/>
              <input class="login-input" name="password" type="password"  id="password" placeholder="请输入密码" v-model="password" />
            </div>
            <div class="radio-select">
              <mu-radio v-model="value1" style="margin-right: 16px;colro:white" value="1" label="教师">
              </mu-radio>
              <mu-radio v-model="value1" style="margin-right: 16px;" value="2" label="学生"></mu-radio>
          </div>
          <div class="button-panel">
            <button class="login-button" ref="loginButton" @click="linkTo">登录</button>
          </div>
          <!--</form>-->
          <div class="button-panel">
            <span @click="forgetPassword" >忘记密码</span>
            <span style="float: right">初始密码为123456</span>
          </div>

        </div>
      </div>
      <!--<div class="fixed-notice">-->
        <!--<span>初始密码为123456</span>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
    export default {
        name: "NewLogIn",
      data(){
          return{
           account:'',
           password:'',
           value1:'1',
            success:'',
          firstLogin:'',
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
      },
      methods:{
        linkTo(){
          if(this.$data.value1==='1'){
            this.$router.push('/ConfirmAccount');
          }else{
            this.$router.push('/StuMainPage');
          }
        },

        LogIn(){
          // let _this=this;
          // this.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
          // this.$axios({
          //   method:'post',
          //   url:'/security/login',
          //   headers:{
          //     // "Content-Type":"application/x-www-form-urlencoded"
          //   },
          //   // headers:{
          //   //   "Access-Control-Expose-Headers:token":"ROLE"
          //   //   // "Access-Control-Expose-Headers ":"ROLE"
          //   // },
          //   // validateStatus: function (status) {
          //   //   return status > 200 && status < 300; // 默认的
          //   // },
          //   data:_this.$qs.stringify({
          //     username:'123',
          //     password:'123456'
          //   })
          // }).then(function (response) {
          //   console.log(response.data)
          // }).catch(function (error) {
          //   console.log(JSON.stringify(error.response));
          //   console.log(error.data);
          //   // console.log(error.response.data);
          //   console.log(error);
          //   console.log(error.request);
          //   console.log(error.config);
          //   console.log(error.message);
          //   console.log(error.response);
          // })
          $.ajax({
            url: 'http://kfh4u9.natappfree.cc/security/login',
            type: 'post',
            dataType: 'form-data',
            contentType: 'application/x-www-form-urlencoded',
            data: {
              username:'aaaa',
              password:'aaaa'
            },
          })
            .done(function(data) {
              console.log(data);
            })
            .fail(function() {
              console.log("error");
            })
            .always(function() {
              console.log("complete");
            });
        },


        forgetPassword(){
          this.$router.push('/forgetPassword');
        }
    },

    }
</script>

<style lang="less">
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

  .radio-select{
    margin-top:3vh;
  }
  .mu-radio-wrapper{
  .mu-radio-label{
    font-size:17px;
    color:white;
    /* background-color:white; */
  }
}


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
    /*position: absolute;*/
    margin-top: 5vh;
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
