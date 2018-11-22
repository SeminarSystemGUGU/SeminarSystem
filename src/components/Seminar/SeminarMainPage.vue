<template>
  <div id="SeminarMainPage">
    <div class="bar">
      <AppBar title="讨论课"></AppBar>
    </div>
    <div class="main-content">
      <el-card class="el-course-card" :body-style="{padding:'0'}">
        <el-row style="height: 9vh">
          <el-col style="width: 80%">
            <div style="font-size: 20px;font-weight: bold;">面向对象分析与设计</div>
          </el-col>
          <el-col style="width: 18%;float: right">
            <div style="font-size: 20px;"><i class="el-icon-arrow-right"></i></div>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
  import AppBar from '../ReuseComponents/AppBar'
    export default {
        name: "SeminarMainPage",
      components:{
          AppBar
      }
    }
</script>

<style scoped lang="less">
#SeminarMainPage{
  .main-content{
    margin-top: 18vw;
    margin-left: auto;
    margin-right: auto;
    width: 100vw;
    /*height: 20vh;*/
    max-width: 540px;
    /*background-color: orangered;*/

    .el-course-card{
      margin-top: 2vw;
      width: 90%;
      /*height: 15vh;*/
      margin-left: auto;
      margin-right: auto;
      text-align: left;
    }


  }
}
</style>
