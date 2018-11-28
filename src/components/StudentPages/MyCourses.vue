<template>
  <div>
    <back-bar titleName="我的课程" :showMessages="false" backUrl="/StuMainPage"></back-bar>

    <div  class="animated fadeInRight" align="left">
      <div class="container" style="margin-top: 13vh">
        <div class="parent1">
          <div >
            <div class="itemTitle"> <i class="el-icon-document"/> {{courseName}}&emsp;{{startDate}}</div>
            <div class="parent3">
              <!-- Content  -->
              <div class="subList" @click="linkToMyGrades">
                <span class="subItem"  >我的成绩</span>
                <i style="margin-left: 66vw;" class="el-icon-arrow-right"></i>
              </div>
              <div class="subList"  @click="linkToMyTeam">
                <span class="subItem">我的组队</span>
                <i style="margin-left: 66vw;" class="el-icon-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="parent1">
          <div >
            <div class="itemTitle"> <i class="el-icon-document"/> {{courseName}}&emsp;{{startDate}}</div>
            <div class="parent3">
              <!-- Content  -->
              <div class="subList" >
                <span class="subItem"  >我的成绩</span>
                <i style="margin-left: 66vw;" class="el-icon-arrow-right"></i>
              </div>
              <div class="subList">
                <span class="subItem" >我的组队</span>
                <i style="margin-left: 66vw;" class="el-icon-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import BackBar from '../ReuseComponents/BackBar'
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
      }
    },
    methods:{
      linkToMyGrades(){
        this.$router.push('/StuMyGrades');
      },
      linkToMyTeam(){
        this.$router.push('/StuMyteam');
      }

    }
  }
</script>

<style lang="less">

  .container  {
    width: 100%;
    /*height: 20vh;*/
    position: relative;
    border-radius: 5px;
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
    height: 21vh;
  }
  .container:hover .parent3   {
    transform: rotateX(0deg);
    height: 21vh;
  }

  .itemTitle{
    padding-top: 10px;
    padding-left: 4vw;
    width: 100%;
    height:7vh;
    font-size: 20px;

    box-shadow: 0 1px 0.2px 0 rgba(0, 0, 0, 0.2), 0 2px 20px 0 rgba(0, 0, 0, 0.1);

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
    font-size: 18px;
  }

  @media screen and (min-width: 481px ){

  }

</style>
