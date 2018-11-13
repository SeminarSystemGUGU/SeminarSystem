<template>
    <div id="MainPage">
      <app-bar title="我" icon="el-icon-menu"></app-bar>
      <div class="main-content">
        <div class="card">
          <div class="text-panel">
            <i class="el-icon-document"></i>
            <span class="go-text">课程管理</span>
          </div>
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="card" @click="linkToAccountSetting">
          <div class="text-panel" style="float: left">
            <i class="el-icon-edit"></i>
            <span class="go-text">账号与安全</span>
          </div>
          <i class="el-icon-arrow-right"></i>

        </div>
        <div class="card" style="margin-top: 20vw" @click="linkToSetting">
          <div class="text-panel">
            <i class="el-icon-setting"></i>
            <span class="go-text">设置</span>
          </div>
          <i class="el-icon-arrow-right"></i>

        </div>
      </div>
    </div>
</template>

<script>
  import AppBar from '../components/AppBar'
    export default {
        name: "MainPage",
      components:{
          AppBar
      },
      methods:{
        linkToAccountSetting(){
          this.$router.push('/AccountSetting')
        },
        linkToSetting(){
          this.$router.push('/Setting');
        }
      }
    }
</script>

<style lang="less">
  #MainPage{
    padding: 1px;
    background-color: #f7f7f7;
    height: 100vh;

    .el-icon-arrow-right{
      float: right;
      margin-top: 4vw;
      margin-right: 3vw;
      color: cornflowerblue;
    }
  }
  @media screen and (max-width: 600px){
    #MainPage{
      .text-panel{
        float: left;
        height: 12vw;
        margin-left: 5vw;
        display: inline-block;
      }
      .go-text{
        font-size: 20px;
      }
      .main-content{
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

    }


  }

</style>
