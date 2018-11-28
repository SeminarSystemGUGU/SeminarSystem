<template>
  <div>
    <back-bar titleName="课程列表" :showMessages="false" backUrl="/StuMainPage"></back-bar>

    <div  class="animated fadeInRight" align="left">
      <div class="container" style="margin-top: 13vh">
            <div class="itemTitle" @click="linkToSeminars">
              <i class="el-icon-document"/>
              {{courseName}}&emsp;{{startDate}}
              <i class="el-icon-arrow-right" style="margin-left:14%; "/>
            </div>
      </div>

      <div class="container">
            <div class="itemTitle">
              <i class="el-icon-document"/>
              {{courseName}}&emsp;{{startDate}}
              <i class="el-icon-arrow-right" style="margin-left:14%; "/>
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

  .itemTitle{
    padding-top: 10px;
    padding-left: 4vw;
    width: 100%;
    height:7vh;
    font-size: 22px;
    box-shadow: 0 1px 0.2px 0 rgba(0, 0, 0, 0.2), 0 2px 20px 0 rgba(0, 0, 0, 0.1);

    /*border: 1px solid black;*/
    /*border-radius: 10px;*/
  }

  @media screen and (min-width: 481px ){

  }
</style>
