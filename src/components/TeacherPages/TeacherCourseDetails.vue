<template>
  <div id="TeacherCourseDetails">
    <app-bar :show-messages="true" title-name="OOAD-课程详情" backPath="TeacherMyCourses"></app-bar>
    <div class="main-content">
      <div class="course-title">
        <span>课程要求</span>
        <div class="divider"></div>
      </div>
      <div class="course-grade-requirments">
        <el-row>
          <el-col class="row-col">
            <span>成绩计算规则：</span>
          </el-col>
          <el-col class="row-col">
            <span>课堂展示：50%</span><br/>
            <span>课堂提问：10%</span><br/>
            <span>课后报告：10%</span>
          </el-col>
        </el-row>
      </div>
      <div class="course-team-requirments">
        <el-row>
          <el-col class="row-col">
            <span>小组人数：</span>
          </el-col>
          <el-col class="row-col">
            <span>6-8人</span>
          </el-col>
        </el-row>
      </div>
      <div class="course-team-requirments">
        <el-row>
          <el-col class="row-col">
            <span>组队开始时间：</span>
          </el-col>
          <el-col class="row-col">
            <span>2018.10.11</span>
          </el-col>
        </el-row>
      </div>
      <div class="course-team-requirments">
        <el-row>
          <el-col class="row-col">
            <span>组队结束时间：</span>
          </el-col>
          <el-col class="row-col">
            <span>2018.10.18</span>
          </el-col>
        </el-row>
      </div>
      <div class="delete-button">
        <mu-button class="the-button" color="error">删除该课程</mu-button>
      </div>


    </div>
  </div>
</template>

<script>
  import AppBar from '../../components/ReuseComponents/AppBar'
  import App from "../../App";
    export default {
        name: "TeacherCourseDetails",
      components:{
        App,
          AppBar
      }
    }
</script>

<style scoped lang="less">
#TeacherCourseDetails{
  width: 100vw;

  .main-content{
    width: 80%;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;

    .delete-button{
      margin-top: 5vh;
      text-align: right;

      .the-button{
        width: 120px;
      }

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
