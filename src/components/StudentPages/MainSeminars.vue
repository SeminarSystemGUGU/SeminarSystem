<template>
  <div>
    <back-bar titleName="讨论课" :showMessages="false" backUrl="/SeminarSelectCourse"></back-bar>

    <div  class="animated fadeInRight" align="left" >
      <div class="container" >
        讨论课信息<br/>
        <div class="parent1">
          <div >
            <div class="itemTitle"> {{round[0]}}</div>
            <div class="parent3">
              <!-- Content  -->
              <div class="subList" @click="linkToDetails">
                <span class="subItem"  > <i class="el-icon-document"/>{{seminarName[0]}}</span>
                <i style="float: right;margin-right: 5vw;margin-top: 1vh " class="el-icon-arrow-right"></i>
              </div>
              <div class="subList"  @click="">
                <span class="subItem"> <i class="el-icon-document"/>{{seminarName[1]}}</span>
                <i style="float: right;margin-right: 5vw;margin-top: 1vh " class="el-icon-arrow-right"></i>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="container">
        <div class="parent1">
          <div >
            <div class="itemTitle"> {{round[1]}}</div>
            <div class="parent3">
              <!-- Content  -->
              <div class="subList" >
                <span class="subItem"  > <i class="el-icon-document"/>{{seminarName[2]}}</span>
                <i style="margin-left: 66vw;" class="el-icon-arrow-right"></i>
              </div>
              <div class="subList">
                <span class="subItem" > <i class="el-icon-document"/>{{seminarName[3]}}</span>
                <i style="margin-left: 66vw;" class="el-icon-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="container" style="margin-top: 13vh;">
        已报名讨论课<br/>
        <div class="parent1">
          <div >
            <div class="itemTitle"> {{round[0]}}</div>
            <div class="parent3">
              <!-- Content  -->
              <div class="subList" @click="linkToRegisteredDetails">
                <span class="subItem"  > <i class="el-icon-document"/>{{seminarName[0]}}</span>
                <i style="margin-left: 66vw;" class="el-icon-arrow-right"></i>
              </div>
              <div class="subList"  @click="">
                <span class="subItem"> <i class="el-icon-document"/>{{seminarName[1]}}</span>
                <i style="margin-left: 66vw;" class="el-icon-arrow-right"></i>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="container">
        <div class="parent1">
          <div >
            <div class="itemTitle"> {{round[1]}}</div>
            <div class="parent3">
              <!-- Content  -->
              <div class="subList" >
                <span class="subItem"  > <i class="el-icon-document"/>{{seminarName[2]}}</span>
                <i style="margin-left: 66vw;" class="el-icon-arrow-right"></i>
              </div>
              <div class="subList">
                <span class="subItem" > <i class="el-icon-document"/>{{seminarName[3]}}</span>
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
    name: "MainSeminars",
    components:{
      BackBar,
    },
    data(){
      return{
        title:"OOAD",
        round:['第一轮','第二轮'],
        seminarName:["业务流程","界面原型","领域模型","需求分析"],
      }
    },
    methods:{
      linkToDetails(){
        this.$router.push('/StuSeminarDetails');
      },
      linkToRegisteredDetails(){
        this.$router.push('/StuRegisteredSeminarDetails')
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
    color: grey;
    font-size: 20px;
  }
  .container:nth-child(1){
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
    .container  {
      font-size: 38px;
    }
    .container:nth-child(1){
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
