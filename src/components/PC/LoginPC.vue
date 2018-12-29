<template>
  <div id="Test">
    <el-dialog :visible.sync="dialogVisible" width="30%" class="dialog-login" title="登录您的账号">
      <form class="input-panel" :action="baseURL+'/user/login'" method="post" >
        <div class="input-account">
          <el-input  class="login-input"  name="username" id="username" placeholder="请输入账号" v-model="account" ></el-input>
        </div>
        <div class="input-password">
          <!--<span>密码：</span>-->
          <el-input class="login-input" name="password" type="password"  id="password" placeholder="请输入密码" v-model="password" ></el-input>
        </div>

        <div class="button-panel">
          <!--<button class="login-button" ref="loginButton" @click="LogIn">登录</button>-->
          <button class="login-button" ref="loginButton" type="submit">登录</button>
        </div>
      </form>
    </el-dialog>
    <div class="navigator">
      <div class="left-menu">
        <div class="system-icon">
          <img class="icon" src="../../assets/系统.png" />
          <!--<span class="system-title">讨论课管理系统</span>-->
        </div>
      </div>
      <div class="right-menu">
        <div class="menu-title" @click="dialogVisible=true">
          <span>立即登录</span>
        </div>
      </div>
    </div>
    <div class="blank-space"></div>
    <div class="main-content">
      <div class="introduction animated slideInDown">
        <span>Welcome!</span><br/>
        <span>欢迎使用讨论课管理系统</span><br/>
        <span>体验更智能的翻转课堂</span><br/>
        <button class="login-button" @click="dialogVisible=true">立即登录</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components:{
    },
    name: "test",
    data() {
      return {
        dialogVisible:false,
        username:'',
        password:'',
        baseURL:''
      };
    },
    mounted(){
      this.$data.baseURL=this.$axios.defaults.baseURL;
    },
    methods: {

    }
  }
</script>

<style lang="less">
  #Test{
    width: 100vw;

    .dialog-login{
      min-width: 300px;
    }

    .button-panel{
      margin-top: 20px;
      .login-button{
        height: 40px;
        width: 120px;
      }
    }

    .input-password{
      /*font-size: 14px;*/
      margin-top: 30px;
      /*width: 150px;*/
    }

    .login-input{
      font-family: "微软雅黑 Light";
      font-size: 12px;
      outline: none;

      /*border-color: #dd5347;*/
      /*border: none;*/
      /*border: 1px solid #dd5347;*/
      /*border-bottom: 1.5px solid #dd5347;*/
    }
    .el-input__inner{
      border-radius: 0;
      border-width: 1.2px;
      width: 200px;
      border-color: #dd5347;
    }


    .login-button{
      width: 150px;
      height: 50px;
      /*background-color: dodgerblue;*/
      background-color: #dd5347;
      font-size: 18px;
      outline: none;
      border: none;
      color: white
    }

    /* Main styles */
    .navigator{
      padding: 0;
      width: 100%;
      height: 50px;
      left: 0;
      top:0;
      box-shadow: 0px 0px 3px #333333;
      border-bottom: 1px solid whitesmoke;
      position: fixed;
      background-color: white;
      z-index: 1000;

      .right-menu{
        position: fixed;
        padding: 0;
        margin: 0;
        top:0;
        float: right;
        width: 150px;
        background-color: #dd5347;
        /*background-color: dodgerblue;*/
        height: 51px;
        right: 0;
        line-height: 50px;

        .menu-title{
          text-align: center;
          margin-left: auto;
          margin-right: auto;
          color: white;
          font-weight: normal;
          font-size: 14px;
          /*display: inline-block;*/
        }
      }

      .left-menu{
        width: 60px;
        /*margin-top: 10px;*/
        margin-left: 20px;
        line-height: 50px;
        /*width: 100px;*/
        /*height: 50px;*/
        /*line-height: 7vh;*/
        /*.system-title{*/
        /*margin-left: 10px;*/
        /*line-height: 50px;*/
        /*color: #dd5347;*/
        /*font-weight: bold;*/
        /*}*/
        .icon{
          width: 30px;
          height: 30px;
        }
      }
    }

    .blank-space{
      width: 50px;
    }




    .main-content{
      left: 0;
      margin: 0;
      padding: 0;
      /*background: url("../../assets/12.jpg")0 0 no-repeat ;*/
      /*background-size: cover;*/
      width: 100%;
      height: 100vh;
      /*height: 100%;*/
      /*position: absolute;*/

      .introduction{
        /*position: fixed;*/
        /*float: left;*/
        color: white;
        margin-top: 200px;
        float: right;
        margin-right: 200px;
        /*margin-left: 120px;*/
        font-size: 50px;
        font-weight: lighter;
        font-family: "Roboto","Helvetica",arial,sans-serif;;
      }


    }
    /*height: 100vw;*/
  }


</style>
