<template>
<div>
  <back-bar titleName="组队要求" :showMessages="true" :showBackBar="true" :backUrl="{path:'/StuCourseInfo',query:{courseId:courseId}}"></back-bar>

  <div class="content animated fadeInRight">
    <div class="intro" align="left">
      <span class="tit">组员基本要求</span>
      <p style=" border-bottom: 0.5px solid lightgrey;"></p>
      <div>
        小组总人数:<br/>
        组内选修课程人数:.<br/>
      </div>
    </div>
    <div class="intro" align="left">
      <span class="tit">冲突课程</span>
      <p style=" border-bottom: 0.5px solid lightgrey;"></p>

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
    },
    data(){
          return{
            courseId:-1,
            crequirement:{},
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
