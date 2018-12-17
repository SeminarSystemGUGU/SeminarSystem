<template>
  <div id="MainPage">

    <back-bar titleName=" " :showMessages="true" backUrl="/StuMyTeam"></back-bar>
    <div class="me" >我</div>
    <div class="main-content">
      <div class="my-course-card" style="margin-top: 16vh" @click="linkToMyCourses">
        <el-row :gutter="10" style="height: 100%"  >
          <el-col style="width: 3%">
            <span>&nbsp;</span>
          </el-col>
          <el-col style="width: 10%;text-align: right;">
            <div style="margin-top: 3vw;">
              <img src="../../assets/课程.png" class="menu-image"/>
            </div>
          </el-col>
          <el-col style="width: 50%;">
            <div style="margin-top: 3vw"  @click="linkToMyCourses">
              <span>我的课程</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="height: 1.5px;background-color: whitesmoke;width: 100vw"></div>
      <div class="my-course-card" @click="linkToMyAccount">
        <el-row :gutter="10" >
          <el-col style="width: 3%">
            <span>&nbsp;</span>
          </el-col>
          <el-col style="width: 10%;text-align: right;">
            <div style="margin-top: 3vw;">
              <img src="../../assets/设置.png" class="menu-image"/>
            </div>
          </el-col>
          <el-col style="width: 50%;">
            <div style="margin-top: 3vw" @click="linkToMyAccount">
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
  import BackBar from '../ReuseComponents/BackBar'
  export default {
    name: "StuMainPage",
    components:{
      BackBar
    },
    methods:{
      linkToMyCourses(){
        this.$router.push('/StuMyCourses');
      },
      linkToMyAccount(){
        this.$router.push('/StuMyAccount');
      },
    }
  }
</script>

<style scoped lang="less">
  .me{
    position: fixed;
    font-weight:bold;
    z-index: 1000;
    top:2vh;
    left:4vw;
    font-size: 20px;
    @media screen and(min-width: 481px){
        top:2vh;
        left:4vw;
        font-size: 30px;
    }
  }
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



    .main-content{
      margin-top: 20vw;

      @media screen and(min-width: 700px){
        margin-top: 80px;

      }

      .func-card{
        width: 93%;
        height: 14vh;
        margin-left: auto;
        margin-right: auto;
        .func-card-title{
          text-align: left;

          .func-card-title-content{
            margin-top: 1vh;
            margin-left: 3vw;
            font-size: 20px;
            font-weight: bold
          }
        }

        .func-card-contents{
          margin-top: 1vh;
          margin-left: 4vw;
          font-size: 16px;
        }

        .card-background{
          width: 100%;
          height: 14vh;
          background-image: url("../../assets/timg1.jpg");
          background-size: cover;
          background-repeat: no-repeat;
        }


      }


      .my-course-card{
        font-family: "Hiragino Sans GB";
        width: 100vw;
        height: 12vw;
        max-height: 68px;
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
