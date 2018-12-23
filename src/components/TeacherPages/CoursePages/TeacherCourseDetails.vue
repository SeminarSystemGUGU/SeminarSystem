<template>
  <div id="TeacherCourseDetails">
    <app-bar :show-messages="true" title-name="课程详情" backPath="TeacherMyCourses"></app-bar>
    <div class="main-content" v-loading="isLoading">
      <div class="course-title">
        <span>{{courseName}}</span>
        <div class="divider"></div>
      </div>
      <div class="course-grade-requirments">
        <span>课程要求:</span><br/>
        <span>{{introduction}}</span>
      </div>
      <div class="course-grade-requirments">
        <el-row>
          <el-col class="row-col">
            <span>成绩计算规则：</span>
          </el-col>
          <el-col class="row-col">
            <span>课堂展示：{{preProportion}}%</span><br/>
            <span>课堂提问：{{questionProportion}}%</span><br/>
            <span>课后报告：{{reportProportion}}%</span>
          </el-col>
        </el-row>
      </div>
      <div class="course-team-requirments">
        <el-row>
          <el-col class="row-col">
            <span>小组人数：</span>
          </el-col>
          <el-col class="row-col">
            <span>{{teamMinNumber}} ~ {{teamMaxNumber}}人</span>
          </el-col>
        </el-row>
      </div>
      <div class="course-team-requirments">
        <el-row>
          <el-col class="row-col">
            <span>组队开始时间：</span>
          </el-col>
          <el-col class="row-col">
            <span>{{teamStartTime}}</span>
          </el-col>
        </el-row>
      </div>
      <div class="course-team-requirments">
        <el-row>
          <el-col class="row-col">
            <span>组队结束时间：</span>
          </el-col>
          <el-col class="row-col">
            <span>{{teamEndTime}}</span>
          </el-col>
        </el-row>
      </div>
      <div class="delete-button">
        <mu-button class="the-button" color="error" @click="">删除该课程</mu-button>
      </div>


    </div>
    <mu-dialog :open.sync="openDelCourse" title="确认删除课程" width="360">
      <span>确认删除课程{{courseName}}</span>
      <mu-button slot="actions" flat color="primary" @click="confirmModify">确定</mu-button>
      <mu-button slot="actions" flat color="primary" @click="openDelCourse=false">放弃</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
  import AppBar from '../../ReuseComponents/AppBar'
  import App from "../../../App";
    export default {
      name: "TeacherCourseDetails",
      components:{
        App,
        AppBar
      },
      data(){
        return {
          isLoading:true,
          openDelCourse:false,
          preProportion:'',
          questionProportion:'',
          reportProportion:'',
          teamMinNumber:0,
          teamMaxNumber:0,
          teamStartTime:'',
          teamEndTime:'',
          courseName:'',
          courseId:'',
          introduction:''
        }
      },
      methods:{
        //加载课程详情
        loadCourseDetails(){
          let _this=this;
          _this.$axios({
            method:'get',
            url:'/course/'+this.$data.courseId,
          }).then(function (response) {
            console.log(response.data);
            _this.$data.preProportion=response.data.presentationPercentage;
            _this.$data.questionProportion=response.data.questionPercentage;
            _this.$data.reportProportion=response.data.reportPercentage;
            _this.$data.teamMinNumber=response.data.minMember;
            _this.$data.teamMaxNumber=response.data.maxMember;
            _this.$data.teamStartTime=response.data.teamStartTime;
            _this.$data.teamEndTime=response.data.teamEndTime;
            _this.$data.introduction=response.data.introduction;
            _this.$data.courseName=response.data.courseName;
            _this.$data.isLoading=false;
          }).catch(function (error) {
            console.log(error.response.data);
          });
        }
      },

      created(){
        this.$data.courseId=this.$route.query.courseId;
        this.loadCourseDetails();
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
