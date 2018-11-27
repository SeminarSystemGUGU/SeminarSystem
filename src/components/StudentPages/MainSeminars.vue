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

  export default {
    name: "MainSeminars",
    components:{

    },
    data(){
      return{
        title:"OOAD",
        round:['第一轮','第二轮'],
        seminarName:["业务流程","界面原型","领域模型","需求分析"],
      }
    },
    methods:{
      backTo(){
        this.$router.push('/SeminarSelectCourse')
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
  }
  .parent1    {
    height: 7vh;
    overflow: hidden;

    transition-property: height;
    transition-duration: 1s;
    perspective: 1000px;
    transform-style: preserve-3d;
  }
  .parent3    {
    height: 7vh;
    transition-property: all;
    transition-duration: 1s;
    transform: rotateX(-90deg);
    transform-origin: top;
  }
  .container:hover .parent1   {
    height: 20vh;
  }
  .container:hover .parent3   {
    transform: rotateX(0deg);
    height: 20vh;
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
