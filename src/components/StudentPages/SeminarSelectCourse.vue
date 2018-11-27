<template>
  <div>
    <div class="bar animated bounce fadeIn">
      <div class="reset-app-bar">
        <div class="app-button" @click="backTo">
          <i class="el-icon-back"></i>
        </div>
        <div class="app-bar-title">
          <span>{{title}}</span>
        </div>
      </div>
    </div>

    <div  class="animated bounceInRight" align="left">
      <div class="container" style="margin-top: 13vh">
            <div class="itemTitle" @click="linkToSeminars">
              <i class="el-icon-document"/>
              {{courseName}}&emsp;{{startDate}}
              <i class="el-icon-arrow-right" style="margin-left:40%; "/>
            </div>
      </div>

      <div class="container">
            <div class="itemTitle">
              <i class="el-icon-document"/>
              {{courseName}}&emsp;{{startDate}}
              <i class="el-icon-arrow-right" style="margin-left:40%; "/>
            </div>
          </div>
    </div>

  </div>
</template>

<script>
    export default {
        name: "SeminarSelectCourse",
      data(){
        return{
          title:"讨论课",
          courseName:"OOAD",
          startDate:'2016(1)',
        }
      },
      methods:{
        backTo(){
          this.$router.push('/StuMainPage')
        },
        linkToSeminars(){
          this.$router.push('/StuMainSeminars');
        }

      }
    }
</script>

<style scoped>
  .reset-app-bar{
    width: 100vw;
    height: 13vw;
    position: fixed;
    z-index: 1000;
    top:0;
    color: #409EFF;
    box-shadow: 0 1px 0.2px 0 rgba(0, 0, 0, 0.2), 0 2px 20px 0 rgba(0, 0, 0, 0.1);
  }
  .app-bar-title{
    margin-top: 3.5vw;
    font-size: 5.2vw;
    color: #409EFF;
  }
  .app-button{
    font-size: 30px;
    position: fixed;
    left: 2vw;
    color: #409EFF;
    margin-top: 2vw;
  }

  .container  {
    width: 100%;
    /*height: 20vh;*/
    position: relative;
    border-radius: 5px;
    margin-top: 2vh;
  }

  .itemTitle{
    padding-top: 1vh;
    padding-left: 3vw;
    border-radius: 5px;
    width: 100%;
    height:6vh;
    font-size: 20px;
    background-color:#96c4e6;
  }

  @media screen and (min-width: 481px ){

  }
</style>
