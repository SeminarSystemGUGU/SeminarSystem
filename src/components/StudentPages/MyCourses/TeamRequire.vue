<template>
<div>
  <back-bar titleName="组队要求" :showMessages="true" :showBackBar="true" :backUrl="{path:'/StuCourseInfo',query:{courseId:courseId}}"></back-bar>

  <div class="content animated fadeInRight">
    <div class="intro" align="left">
      <span class="tit">组员基本要求</span>
      <p style=" border-bottom: 0.5px solid lightgrey;"></p>
      <div style="margin-left: 3vw;">
        小组总人数:<br/>
        组内选修课程人数:.<br/>
      </div>
      <span class="tit" style="font-size: 12px;color:darkred">
        均满足指选课人数均达到要求<br/>
        ，满足其一指任意选课人数满足即可。
      </span>
    </div>
    <div class="intro" align="left">
      <span class="tit">冲突课程</span>
      <p style=" border-bottom: 0.5px solid lightgrey;"></p>
      <span class="tit" style="font-size: 12px;color:darkred">
        选修不同冲突课程的学生不可同组<br/>
        ，注意同课程名不同教师名为不同课程。
      </span>
    </div>

  </div>
</div>
</template>

<script>
  import BackBar from '../../ReuseComponents/BackBar'
  export default {
        name: "TeamRequire",
    components:{
      BackBar,
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
    data(){
          return{
            courseId:-1,
            crequirement:{},
            conflictCourseList:[],
            courseMemberLimitStrategyEntityList:'',
            memberLimitStrategy:'',

          }
    },
    methods:{

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
