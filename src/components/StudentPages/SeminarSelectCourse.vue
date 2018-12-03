<template>
  <div>
    <back-bar titleName="课程列表" :showMessages="false" backUrl="/StuMainPage"></back-bar>

    <div  class="animated fadeInRight" align="left">
      <div class="container" >
            <div class="itemTitle" @click="linkToSeminars">
              <i class="el-icon-document"/>
              {{courseName}}&emsp;{{startDate}}
              <i class="el-icon-arrow-right" style="float: right;margin-right: 5vw;margin-top: 1vh "/>
            </div>
      </div>

      <div class="container">
            <div class="itemTitle">
              <i class="el-icon-document"/>
              {{courseName}}&emsp;{{startDate}}
              <i class="el-icon-arrow-right" style="float: right;margin-right: 5vw;margin-top: 1vh  "/>
            </div>
          </div>
    </div>

  </div>
</template>

<script>
  import BackBar from '../ReuseComponents/BackBar'
    export default {
        name: "SeminarSelectCourse",
      components:{
        BackBar,
      },
      data(){
        return{
          title:"讨论课",
          courseName:"OOAD",
          startDate:'2016(1)',
        }
      },
      methods:{
        linkToSeminars(){
          this.$router.push('/StuMainSeminars');
        }

      }
    }
</script>

<style scoped>

  .container  {
    width: 100%;
    /*height: 20vh;*/
    position: relative;
    border-radius: 5px;
    margin-top: 2vh;
  }
  .container:nth-child(1){
    margin-top: 10vh;
  }
  .itemTitle{
    padding-top: 10px;
    padding-left: 4vw;
    width: 100%;
    height:7vh;
    font-size: 20px;
    box-shadow: 0 1px 0.2px 0 rgba(0, 0, 0, 0.2), 0 2px 20px 0 rgba(0, 0, 0, 0.1);

  }

  @media screen and (min-width: 481px ){
    .container:nth-child(1){
      margin-top: 13vh;
    }
    .itemTitle{
      padding-top: 10px;
      padding-left: 4vw;
      height:7vh;
      font-size: 40px;
    }

  }
</style>
