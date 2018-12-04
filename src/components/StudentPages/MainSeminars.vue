<template>
  <div>
    <back-bar :titleName="title" :showMessages="false" backUrl="/SeminarSelectCourse"></back-bar>

    <div  class="animated fadeInRight" align="left" >
      <div class="con">
        <span class="tit">讨论课信息</span><br/>
      <div class="container" v-for="option in  rounds">
        <div class="parent1">
          <div >
            <div class="itemTitle"> {{option.roundName}}</div>
            <div class="parent3">
              <!-- Content  -->
              <div class="subList" @click="linkToDetails(item.seminarId,option.roundId)" v-for="item in option.list">
                <span class="subItem"  > <i class="el-icon-document"/>{{item.seminarTopic}}</span>
                <i style="float: right;margin-right: 5vw;margin-top: 1vh " class="el-icon-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      <div class="con">
        <span class="tit">已报名讨论课</span><br/>
        <div class="container"  v-for="option in roundsSigned">
        <div class="parent1">
          <div >
            <div class="itemTitle"> {{option.roundName}}</div>
            <div class="parent3">
              <!-- Content  -->
              <div class="subList" @click="linkToRegisteredDetails" v-for="item in option.list">
                <span class="subItem"  > <i class="el-icon-document"/>{{item.seminarTopic}}</span>
                <i style="float: right;margin-right: 5vw;margin-top: 1vh " class="el-icon-arrow-right"></i>
              </div>
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
    name: "MainSeminars",
    components:{
      BackBar,
    },
    created(){
      this.$data.courseId=this.$route.query.courseId;

      let _this=this;    //根据courseId获取该课程讨论课列表
      this.$axios({
        method:'get',
        url:'course/courseId/round',
      }).then(function(response){
        _this.$data.rounds=response.data;
      },function(error){
        alert(error);
      });


      let  _th=this;    //根据courseId获取该课程讨论课列表
      this.$axios({
        method:'get',
        url:'/course/courseId/roundSigned',
      }).then(function(response){
        _th.$data.roundsSigned=response.data;
      },function(error){
        alert(error);
      });

    },
    data(){
      return{
        title:"讨论课",
        courseId:1,

        rounds:[],  //发布的讨论课所在round
        roundsSigned:[], //已经报名的讨论课所在round
      }
    },
    methods:{
      linkToDetails(seminarId,roundId){
        this.$router.push({path:'/StuSeminarDetails',query:{ seminarId:seminarId,roundId:roundId} });
      },
      linkToRegisteredDetails(){
        this.$router.push('/StuRegisteredSeminarDetails')
      }
    }
  }
</script>

<style scoped>
  .con{
    color: grey;
    font-size: 20px;
    margin-top: 10vh;
  }
  .tit{
    /*font-size: ;*/
    margin-left: 4vw;
  }
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
    color: #000;
    font-size: 22px;
    box-shadow: 0 1px 0.2px 0 rgba(0, 0, 0, 0.2), 0 2px 20px 0 rgba(0, 0, 0, 0.1);

    /*border: 1px solid black;*/
    /*border-radius: 10px;*/
    /*background-color:#96c4e6;*/
  }

  .subList {
    padding-top: 1vh;
    padding-left: 3vw;
    margin-top: 10px;
    width: 100%;
    height: 5vh;
    /*background-color: #c7e1f0;*/
    border-radius: 5px;
  }
  .subItem{
    color:gray;
    font-size: 14px;
  }

  @media screen and (min-width: 481px ){
    .con  {
      font-size: 38px;
      margin-top: 13vh;
    }
    .itemTitle{
      padding-top: 10px;
      padding-left: 4vw;
      height:7vh;
      font-size: 38px;
    }

    .subList {
      padding-top: 1vh;
      padding-left: 3vw;
      margin-top: 10px;
      width: 100%;
      height: 5vh;
      /*background-color: #c7e1f0;*/
      border-radius: 5px;
    }
    .subItem{
      color:gray;
      font-size: 18px;
    }

  }

</style>
