<template>
  <div id="Test">
    <div class="navigator">
      <div class="left-menu">
        <div class="system-icon">
          <img class="icon" src="../../assets/系统.png" />
          <!--<span class="system-title">讨论课管理系统</span>-->
        </div>
      </div>
      <div class="right-menu">
        <div class="menu-title">
          <span>立即登录</span>
        </div>
      </div>
    </div>
    <div class="blank-space"></div>
    <div class="main-content">
      <div class="introduction">
        <span>Welcome!</span><br/>
        <span>欢迎使用讨论课管理系统</span><br/>
        <span>体验更智能的翻转课堂</span><br/>
        <button class="login-button">立即登录</button>
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

      };
    },
    mounted(){
    },
    methods: {

    }
  }
</script>

<style lang="less">
  #Test{
    width: 100vw;
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
      background: url("../../assets/12.jpg")0 0 no-repeat ;
      background-size: cover;
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
