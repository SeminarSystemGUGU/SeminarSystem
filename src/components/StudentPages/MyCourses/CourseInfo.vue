<template>
  <div>
    <back-bar :titleName="courseInfo.courseName" :showMessages="true" :showBackBar="true" backUrl="/StuMyCourses"></back-bar>

    <div class="content animated fadeInRight">
      <div class="intro" align="left">
        <span class="tit">课程简介</span>
        <p class="con" style=" border-bottom: 0.5px solid lightgrey;">
          {{courseInfo.introduction}}
        </p>
        <span class="tit">成绩计算规则</span>
        <table class="table table-bordered">
          <thead>
          <tr>
            <th>课堂展示</th>
            <th>课堂提问</th>
            <th>书面报告</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{{courseInfo.presentationPercentage}}</td>
            <td>{{courseInfo.questionPercentage}}</td>
            <td>{{courseInfo.reportPercentage}}</td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="lastCon" align="left">
        <div class="card">
          <span class="subTit">组队开始时间：</span>
          <div class="subc">{{courseInfo.teamStartTime}}</div>
        </div>
        <div class="card">
          <span class="subTit">组队结束时间：</span>
          <div class="subc">{{courseInfo.teamEndTime}}</div>
        </div>
        <mu-button  class="require" color="success"  @click="showRequirement">
          组队要求
        </mu-button>
      </div>
    </div>
  </div>
</template>

<script>
  import BackBar from '../../ReuseComponents/BackBar'
    export default {
        name: "CourseInfo",
      components:{
        BackBar,
      },
      data(){
          return{
            courseId:-1,
            courseName:'OOAD',
            courseInfo:{},
          }
      },
      created(){
        this.$data.courseId=this.$route.query.courseId;

        let _this=this;
        this.$axios({
          method:'get',
          url:'course/'+this.$data.courseId,
        }).then(function (response) {
          response.data.teamStartTime=response.data.teamStartTime.slice(0,10);
          response.data.teamEndTime=response.data.teamEndTime.slice(0,10);
          _this.$data.courseInfo=response.data;
        })
      },
      methods:{
        showRequirement(){
          this.$router.push({path:'/StuTeamRequire',query:{courseId:this.$data.courseId}});

        },
      }

    }
</script>

<style scoped>
  @import "../../../less/CourseInfo.less";
  @media screen and (min-width: 1024px ){
    .content {
      margin-top: 13vh;
    }
  }
</style>
