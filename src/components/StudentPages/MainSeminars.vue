<template>
  <div>
    <back-bar titleName="讨论课" :showMessages="false" backUrl="/SeminarSelectCourse"></back-bar>

    <div  class="animated fadeInRight" align="left" >
      <div class="container" style="margin-top: 13vh;">
        讨论课信息<br/>
        <div class="parent1">
          <div >
            <div class="itemTitle"> {{round[0]}}</div>
            <div class="parent3">
              <!-- Content  -->
              <div class="subList" @click="linkToDetails">
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


      <div class="container" style="margin-top: 13vh;">
        已报名讨论课<br/>
        <div class="parent1">
          <div >
            <div class="itemTitle"> {{round[0]}}</div>
            <div class="parent3">
              <!-- Content  -->
              <div class="subList" @click="">
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
    font-size: 18px;
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
    height: 22vh;
  }
  .container:hover .parent3   {
    transform: rotateX(0deg);
    height: 22vh;
  }

  .itemTitle{
    padding-top: 2vh;
    padding-left: 4vw;
    border-radius: 5px;
    width: 100%;
    height:8vh;
    font-size: 25px;
    background-color:#96c4e6;
  }

  .itemTitle{
    padding-top: 2vh;
    padding-left: 4vw;
    border-radius: 5px;
    width: 100%;
    height:8vh;
    font-size: 20px;
    background-color:#96c4e6;
  }

  .subList {
    padding-top: 1vh;
    padding-left: 3vw;
    margin-top: 10px;
    width: 100%;
    height: 5vh;
    background-color: #c7e1f0;
    border-radius: 5px;
  }
  .subItem{
    color:gray;
    font-size: 14px;
  }

  @media screen and (min-width: 481px ){

  }

</style>
