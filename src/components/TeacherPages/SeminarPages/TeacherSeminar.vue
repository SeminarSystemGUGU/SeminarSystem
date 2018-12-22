<template>
  <div id="TeacherSeminar">
    <div class="app-bar">
      <div :class="iconClass" ref="iconUse">
        <i class="el-icon-back" @click="linkBack"></i>
        <!--<span class="">轮次设置</span>-->
        <transition name="slide-fade" class="transition-box">
          <span class="title">讨论课详情</span>
        </transition>
        <span>&nbsp;&nbsp;</span>
      </div>
    </div>
    <div class="app-bar-blank"></div>
    <!--<app-bar :show-messages="true" title-name="讨论课详情" backPath="/TeacherCourseRounds"></app-bar>-->
    <div class="main-content">
      <div class="course-title">
        <span>{{seminarName}}<i v-if="seminarStatus==='2'" class="el-icon-loading"></i>
                             <i v-if="seminarStatus==='3'" class="el-icon-circle-check-outline"></i> </span>
        <div class="divider"></div>
      </div>
      <div class="course-grade-requirments">
        <el-row>
          <el-col class="row-col">
            <span>轮次：</span>
          </el-col>
          <el-col class="row-col">
            <span>{{seminarRound}}</span><br/>
          </el-col>
        </el-row>
      </div>
      <div class="course-team-requirments">
        <el-row>
          <el-col class="row-col">
            <span>主题：</span>
          </el-col>
          <el-col class="row-col">
            <span>{{seminarTopic}}</span>
          </el-col>
        </el-row>
      </div>
      <div class="course-team-requirments">
        <el-row>
          <el-col class="row-col">
            <span>要求：</span>
          </el-col>
          <el-col class="row-col">
            <span>{{seminarRequirments}}</span>
          </el-col>
        </el-row>
      </div>
      <div class="course-team-requirments">
        <el-row>
          <el-col class="row-col">
            <span>课程状态：</span>
          </el-col>
          <el-col class="row-col">
            <span class="not-start-status" v-if="seminarStatus==='1'">未开始</span>&nbsp;
            <span class="see-seminar-info" v-if="seminarStatus==='1'" @click="linkToApply">报名信息</span>
            <span class="doing-status" v-else-if="seminarStatus==='2'"><i class="el-icon-loading"></i>正在进行</span>
            <span class="end-status" v-else="seminarStatus==='3'">已结束<i class="el-icon-circle-check-outline"></i> </span>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="button-panel">
      <el-button type="danger" class="start-button" v-if="seminarStatus==='1'" @click="GotoSeminar">开始讨论课</el-button>
      <el-button type="primary" class="doing-button" v-else-if="seminarStatus==='2'">进入讨论课</el-button>
      <el-button type="success" class="end-button" v-if="seminarStatus==='3'" @click="linkToReport">报告打分</el-button><br/>
      <el-button type="success" class="end-button" v-if="seminarStatus==='3'" @click="linkToGrades">查看成绩</el-button>
    </div>
  </div>
</template>

<script>
  import AppBar from '../../ReuseComponents/AppBar'
  import App from "../../../App";
  export default {
    name: "TeacherCourseDetails",
    components:{
      AppBar
    },
    data(){
      return {
        iconClass:'back-icon',
        iconClassUse:'back-icon-use',
        seminarName:'对象模型分析',
        seminarRound:'第一轮',
        seminarTopic:'对象模型',
        seminarNumber:'1',
        seminarRequirments:'每个组15分钟，要求为展示所做的对象模型和数据库设计',
        seminarStatus:'1',
      }
    },
    methods:{
      GotoSeminar(){
        this.$router.push('/TeacherSeminarIng');
      },
      //加载课程详情
      loadCourseDetails(){

      },
      linkToReport(){
        this.$router.push('/TeacherAfterSeminar');
      },
      linkToGrades(){
        this.$router.push('/TeacherSeminarGrades');
      },
      linkToApply(){
        this.$router.push('/TeacherApplyInfo');
      }
    },

    created(){
      this.$data.courseId=this.$route.query.courseId;
      this.$data.roundId=this.$route.query.roundId;
      // this.loadCourseDetails();
    }

  }
</script>

<style scoped lang="less">
  #TeacherSeminar{
    width: 100vw;

    .app-bar-blank{
      height: 10vh;
      max-height: 60px;
    }

    .transition-box{
      transition: all 0.8s;
    }

    .row-col{
      width: 40%;
    }

    .app-bar {
      padding: 0.1px;
      height: 10vh;
      max-height: 60px;
      position: fixed;
      z-index: 1000;
      .back-icon-use{
        border-bottom-right-radius: 20px;
        -moz-box-shadow:0px 0px 2px whitesmoke;
        -webkit-box-shadow:0px 0px 2px whitesmoke;
        box-shadow:0px 0px 2px whitesmoke;
        z-index: 1000;
        /*width: 40vw;*/
        /*height: 10vh;*/
        /*max-height: 60px;*/
        background-color: white;
        color: dodgerblue;
        padding-left: 4vw;
        font-size: 25px;
        padding-top: 1vh;
        line-height: 25px;
        padding-bottom:5px;
        .title{
          color: black;
          font-size: 20px;
          font-weight: bold;
          /*line-height: 25px;*/
        }
      }

      .back-icon {
        z-index: 1000;
        /*width: 40vw;*/
        /*height: 10vh;*/
        /*max-height: 60px;*/
        background-color: white;
        color: dodgerblue;
        padding-left: 4vw;
        font-size: 25px;
        padding-top: 1vh;
        line-height: 25px;
        padding-bottom:5px;


        .title{
          color: black;
          font-size: 20px;
          font-weight: bold;
          /*line-height: 25px;*/
        }
      }
    }

    .see-seminar-info{
      color: dodgerblue;
      font-weight: normal;
      font-size: 15px;
      text-decoration: underline;
    }


    .button-panel{
      margin-top: 8vh;
      .el-button{
        font-size: 17px;
      }

      .start-button{
        width: 80vw;
      }

      .doing-button{
        width: 80vw;
      }

      .end-button{
        margin-top: 1vh;
        width: 80vw;
        background-color: #5daf34;
      }
    }

    .main-content{
      width: 80%;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;

      .not-start-status{
        color: orangered;
      }
      .doing-status{
        color: dodgerblue;
      }
      .end-status{
        color: #5daf34;
      }




      .row-col{
        width: 50%;
      }

      .course-title{
        margin-top: 3vh;
        text-align: left;
        font-size: 24px;
        font-weight: bold;
      }

      .course-grade-requirments{
        margin-top: 2vh;
        text-align: left;
        font-size: 18px;
        font-weight: bold;
      }

      .course-team-requirments{
        margin-top: 4vh;
        text-align: left;
        font-size: 18px;
        font-weight: bold;
      }


      .divider{
        margin-top: 1vh;
        width: 100%;
        height: 2px;
        background-color: dodgerblue;
      }
    }
  }
</style>
