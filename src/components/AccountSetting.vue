<template>
    <div id="AccountSetting">
      <app-bar title="账户与安全" icon="el-icon-arrow-left">
      </app-bar>
      <div class="account-main-content">
        <div class="card">
         <div class="text-panel">
           <span class="text-left">姓名：</span>
           <span class="text-middle">{{teacherInformation.name}}</span>
         </div>
        </div>
        <div class="card">
          <div class="text-panel">
            <span class="text-left">教工号：</span>
            <span class="text-middle">{{teacherInformation.id}}</span>
          </div>
        </div>
        <div class="card">
          <div class="text-panel">
            <span class="text-left">联系方式：</span>
            <span class="text-middle">{{teacherInformation.contact}}</span>
          </div>
        </div>
        <div class="card">
          <div class="text-panel">
            <span class="text-left">账户密码</span>
            <div class="logout">
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="logout-panel">
        <mu-button color="error" class="logout-button">退出登录</mu-button>
      </div>
    </div>
</template>

<script>
  import AppBar from '../components/AppBar'
    export default {
        name: "AccountSetting",
      components:{
          AppBar
      },
      data(){
          return{
            teacherInformation:{
              name:'王老师',
              id:'24320162202917',
              contact:'1005709383@qq.comdnwudhauwdhuwadwaduhwau'
            }

          }
      }
    }
</script>

<style lang="less">
  #AccountSetting{
    width: 100vw;
    height: 100vh;
    background-color: whitesmoke;
    padding: 1px;

    .logout{
      display: inline-block;
      float: right;
      font-size: 30px;
      /*margin-top: 3vw;*/
      /*margin-right: 5vw;*/
      .el-icon-arrow-right{
        margin-right: 5vw;
      }
    }
  }
  @media screen and (max-width: 600px){
    #AccountSetting{
      .logout-panel{
        position: fixed;
        bottom: 0;
        width: 100vw;
      }
      .logout-button{
        width: 100%;
        height: 12vw;
        font-size: 5vw;
      }
      .text-left{
        display: inline-block;
        width: 23vw;
        text-align: left;
        float: left;
        margin-left: 5vw;
        /*background-color: cornflowerblue;*/
      }
      .text-middle{
        /*background-color: cornflowerblue;*/
        display: inline-block;
        width: 50vw;
        text-align: left;
        overflow: scroll;
      }

      .account-main-content{
        margin-top: 20vw;


      }
      .card{
        font-size: 25px;
        line-height: 14vw;
        margin-top: 0.5px;
        width: 100vw;
        height: 15vw;
        border-radius: 10px;
        background-color: white;
        border: 1px solid lightgray;
      }
      .text-panel{
        /*width: 100%;*/
        font-size: 18px;
        font-weight: bold;
        /*text-align: center;*/
      }
    }

  }
</style>
