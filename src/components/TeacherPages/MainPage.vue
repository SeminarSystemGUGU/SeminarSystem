<template>
  <div id="MainPage">
    <div class="app-bar" style="margin-top: 10px;border-bottom: 1px solid lightgray">
      <div class="title" style="width: 35px;height: 35px;">我</div>
      <div class="icon-button1" style="display: inline-block;float: right;margin-right: 20px;">
        <img style="width: 35px;height: 35px;margin-right: 20px;" src="../../assets/消息.png"/>
        <img style="width: 35px;height: 35px;margin-right: 20px;" src="../../assets/头像.png"/>
        <img style="width: 35px;height: 35px;margin-right: 20px;" src="../../assets/讨论课.png"/>
      </div>
    </div>
    <div class="background">

    </div>
    <div style="height: 1vw;background-color: whitesmoke;width: 100vw"></div>
    <div class="main-content">
      <div class="my-course-card">
        <el-row :gutter="10" style="height: 100%">
          <el-col style="width: 3%">
            <span>&nbsp;</span>
          </el-col>
          <el-col style="width: 10%;text-align: right;">
            <div style="margin-top: 3.7vw;">
              <img src="../../assets/课程.png" class="menu-image"/>
            </div>
          </el-col>
          <el-col style="width: 50%;">
            <div style="margin-top: 3vw"  @click="linkToCourses">
              <span>我的课程</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="height: 1.5px;background-color: whitesmoke;width: 100vw"></div>
      <div class="my-course-card">
        <el-row :gutter="10">
          <el-col style="width: 3%">
            <span>&nbsp;</span>
          </el-col>
          <el-col style="width: 10%;text-align: right;">
            <div style="margin-top: 3.7vw;">
              <img src="../../assets/设置.png" class="menu-image"/>
            </div>
          </el-col>
          <el-col style="width: 50%;">
            <div style="margin-top: 3vw" @click="linkTo">
              <span>账户与设置</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="height: 1.5px;background-color: whitesmoke;width: 100vw"></div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "MainPage",
      methods:{
          linkTo(){
            this.$router.push('/MyAccount');
          },
          linkToCourses(){
            this.$router.push('/TeacherMyCourses');
          }

      }
    }
</script>

<style scoped lang="less">
#MainPage{
  padding:1px;
  width: 100vw;
  /*height: 100vh;*/

  .app-bar{
    padding:1px;
    width: 100vw;
    height: 7vh;
    max-height: 50px;
    /*background-color: gray;*/
    text-align: left;

    .title{
      display: inline-block;
      /*margin-top: 0vw;*/
      font-size: 20px;
      text-align: left;
      margin-left: 5vw;
      font-family: "等线 Light";
      font-weight: bold;
    }
  }

  .background{
    margin-top: 18vw;
    width: 100vw;
    /*background-color: lightgray;*/
    margin-right: auto;
    margin-left: auto;
    height: 12vh;
    text-align: left;
    font-size: 25px;
    /*background-image: url("../assets/背景1.jpg");*/
    /*background-size: cover;*/
    /*background-repeat: no-repeat;*/

  }

  .main-content{
    .my-course-card{
      font-family: "PingFang SC";
      width: 100vw;
      height: 12vw;
      max-height: 49.15px;
      /*background-color: gray;*/
      text-align: left;
      font-size: 18px;
      font-weight: bold;
      /*font-weight: bold;*/
      /*line-height: 15vw;*/

      .menu-image{
        width: 5vw;
        height: 5vw;
        max-height: 25px;
        max-width: 25px;
      }
    }
  }


}

  .app-bar{
    position: fixed;
    top:0;
  }
</style>
