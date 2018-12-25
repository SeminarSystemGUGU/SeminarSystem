<template>
  <div>
    <back-bar titleName="我的课程" :showMessages="true" :showBackBar="true" backUrl="/StuMainPage"></back-bar>

    <div  class="animated fadeInRight" align="left">
      <div class="container" v-for="option,index in courses" :key="index">
        <div class="parent1">
          <div >
            <div class="itemTitle">
              <i class="el-icon-document"/>
              {{option.courseName}}&emsp;{{startDate}}
            </div>
            <div class="parent3">
              <!-- Content  -->
              <div class="subList"  @click="linkToCourseInfo(option.id)">
                <span class="subItem">课程信息</span>
                <i style="float: right;margin-right: 5vw;margin-top: 1vh" class="el-icon-arrow-right"></i>
              </div>
              <div class="subList" @click="linkToMyGrades(option.id)">
                <span class="subItem"  >我的成绩</span>
                <i style="float: right;margin-right: 5vw;margin-top: 1vh" class="el-icon-arrow-right"></i>
              </div>
              <div class="subList"  @click="linkToMyTeam(option.id)">
                <span class="subItem">我的组队</span>
                <i style="float: right;margin-right: 5vw;margin-top: 1vh" class="el-icon-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import BackBar from '../../ReuseComponents/BackBar'
    export default {
    name: "MyCourses",
    components:{
      BackBar,
    },
    data(){
      return{
        title:"我的课程",
        courseName:"OOAD",
        startDate:'2016(1)',
        courseId:1,

        courses:[],
      }
    },
    created(){
     let _this=this;
     this.$axios({
       method:'get',
       url:'/course',
     }).then(function(response){
       _this.$data.courses=response.data;
     },function(error){
       alert(error);
     });
    },
    methods:{
      linkToMyGrades(courseId){
        this.$router.push({path:'/StuMyGrades',query:{courseId:courseId}});
      },
      linkToMyTeam(courseId){
        this.$router.push({path:'/StuMyTeam',query:{courseId:courseId}});
      },
      linkToCourseInfo(courseId){
        this.$router.push({path:'/StuCourseInfo',query:{ courseId:courseId}});
      }
    }
  }
</script>

<style lang="less">

  .container  {
    width: 100%;
    /*height: 20vh;*/
    /*position: relative;*/
    border-radius: 5px;
  }
  .container:nth-child(1)  {
    margin-top: 10vh;
  }
  .parent1    {
    height: 8vh;
    overflow: hidden;
    transition-property: height;
    transition-duration: 1s;
    perspective: 1000px;
    transform-style: preserve-3d;
  }
  .parent3    {
    height: 8vh;
    transition-property: all;
    transition-duration: 1s;
    transform: rotateX(-90deg);
    transform-origin: top;
  }
  .container:hover .parent1   {
    height: 27vh;
  }
  .container:hover .parent3   {
    transform: rotateX(0deg);
    height: 27vh;
  }

  .itemTitle{
    padding-top: 10px;
    padding-left: 4vw;
    width: 100%;
    height:7vh;
    font-size: 18px;

    box-shadow: 0 1px 0.2px 0 rgba(0, 0, 0, 0.2), 0 2px 20px 0 rgba(0, 0, 0, 0.1);

  }

  .subList {
    padding-top: 1vh;
    padding-left: 3vw;
    margin-top: 10px;
    width: 100%;
    height: 5vh;
    border-radius: 5px;
  }
  .subItem{
    color:gray;
    font-size: 16px;
  }
  @media screen and (min-width: 481px ){
    .container:nth-child(1)  {
      margin-top: 11vh;
    }
    .parent1    {
      height: 9vh;
      overflow: hidden;
      transition-property: height;
      transition-duration: 1s;
      perspective: 1000px;
      transform-style: preserve-3d;
    }
    .parent3    {
      height: 9vh;
      transition-property: all;
      transition-duration: 1s;
      transform: rotateX(-90deg);
      transform-origin: top;
    }
    .container:hover .parent1   {
      height: 27vh;
    }
    .container:hover .parent3   {
      transform: rotateX(0deg);
      height: 27vh;
    }
    .itemTitle{
      padding-top: 20px;
      padding-left: 4vw;
      width: 100%;
      height:7vh;
      font-size: 27px;
    }
    .subList {
      padding-top: 1vh;
      padding-left: 3vw;
      margin-top: 10px;
      width: 100%;
      height: 5vh;
      /*border-bottom: 1px solid gray;*/
      /*background-color: #c7e1f0;*/
      border-radius: 5px;
    }
    .subItem{
      color:gray;
      font-size: 20px;
    }
  }

</style>
