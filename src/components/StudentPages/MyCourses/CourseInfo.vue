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
          <span class="subTit">小组人数：</span>
          <p class="subc">123</p>
        </div>
        <div class="card">
          <span class="subTit">组队开始时间：</span>
          <p class="subc">{{courseInfo.teamStartTime}}</p>
        </div>
        <div class="card">
          <span class="subTit">组队结束时间：</span>
          <p class="subc">{{courseInfo.teamEndTime}}</p>
        </div>
        <div class="card">
          <span class="subTit">组员性别要求：</span>
          <p class="subc">123</p>
        </div>
        <div class="card">
          <span class="subTit">组员星座要求：</span>
          <p class="subc">123</p>
        </div>
        <div class="card">
          <span class="subTit">冲突课程：</span>
          <p class="subc">123</p>
        </div>
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
            courseId:0,
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
          _this.$data.courseInfo=response.data;
        })
      }

    }
</script>

<style scoped>
  @import "../../../less/CourseInfo.less";
</style>
