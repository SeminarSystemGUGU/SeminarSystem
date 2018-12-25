<template>
  <div id="MainPage">
    <app-bar :showMessages="true" titleName="我" :showBack="false"></app-bar>
    <div class="main-content">
      <el-card class="func-card animated " :body-style="{padding:'0px'}">
            <div class="func-card-title" style="">
              <div class="func-card-title-content">
                <span>正在进行的事务</span>
              </div>
              <div class="func-card-contents">
                <i class="el-icon-loading"></i>
                <span style="overflow: hidden;width: 80%">讨论课OOAD-对象模型</span>
                <span style="color: dodgerblue;float: right;margin-right: 3vw">点击进入</span>
              </div>
            </div>
      </el-card>
      <div class="my-course-card" style="margin-top: 10px;">
        <el-row :gutter="10" style="height: 100%">
          <el-col style="width: 3%">
            <span>&nbsp;</span>
          </el-col>
          <el-col style="width: 10%;text-align: right;">
            <div style="margin-top: 10px;">
              <img src="../../assets/课程.png" class="menu-image"/>
            </div>
          </el-col>
          <el-col style="width: 50%;">
            <div style="margin-top: 10px"  @click="linkToCourses">
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
            <div style="margin-top: 10px;">
              <img src="../../assets/设置.png" class="menu-image"/>
            </div>
          </el-col>
          <el-col style="width: 50%;">
            <div style="margin-top: 10px" @click="linkTo">
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
import AppBar from '../ReuseComponents/AppBar'
    export default {
        name: "MainPage",
        components:{
          AppBar
        },
      data(){
          return{
            baseURL:''
          }
      },
      watch:{

      },
      created(){

        document.cookie='name=ShengzheWang;';
        // $.ajax({
        //   type: "GET",
        //   url: "http://x3m3jt.natappfree.cc/course",
        //   dataType: 'jsonp',
        //   xhrFields: {withCredentials: true},
        //   // crossDomain: true,
        //   success:function (response) {
        //     console.log(response);
        //   }
        // })
      },
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



  .main-content{
    margin-top: 10vw;

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
