<template>
  <div id="TeacherSeminarIng">
    <AppBar title-name="讨论课-正在进行"></AppBar>
    <div class="main-content">
      <div class="seminar-title">
        <el-row>
          <el-col class="title-col">
            <span>正在进行：{{seminarTitle}}&nbsp<i class="el-icon-loading"/> </span>
          </el-col>
          <el-col class="stop-col">
            <span>暂停</span>
          </el-col>
        </el-row>
      </div>
      <div class="seminar-tooltip">
        <el-row>
          <el-col class="pre-col">
            <span>正在展示：1-6小组 5分钟</span>
          </el-col>
          <el-col class="que-col">
            <span>已有1位同学提问</span>
          </el-col>
        </el-row>
      </div>
      <div class="seminar-main">
        <el-row>
          <el-col class="pre-list-col">
            <div class="list-left">
              <div class="pre-list-item" style="background-color: lightgrey">
                <span style="color: white;font-weight: bold">1-6</span>
              </div>
              <div class="pre-list-item">
                <span>1-6</span>
              </div>
              <div class="pre-list-item">
                <span>1-6</span>
              </div>

              <div class="pre-list-item">
                <span>1-6</span>
              </div>
            </div>
          </el-col>
          <el-col class="grade-list-col">
            <span class="grade-input-title">展示分数：</span>
            <input class="grade-input"/>
          </el-col>
          <el-col class="que-list-col">
            <div class="list-right">
              <div class="pre-list-item">
                <span>1-6</span>
              </div>
              <div class="pre-list-item">
                <span>1-6</span>
              </div>
              <div class="pre-list-item">
                <span>1-6</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="button-panel">
        <el-button v-show="isQuestion" type="primary">提交分数</el-button>
        <el-button v-show="!isQuestion" type="primary">下个提问</el-button>
        <el-button v-show="!isQuestion" type="primary">下个展示</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import AppBar from '../../ReuseComponents/AppBar'
    export default {
        name: "TeacherSeminarIng",
      components:{
          AppBar
      },
      data(){
          return{
            seminarTitle:'业务流程分析',
            isQuestion:false,
          }
      }

    }
</script>

<style lang="less">
  #TeacherSeminarIng{

    .main-content{
      margin-top: 4vh;
      .seminar-title{
        /*background-color: dodgerblue;*/
        margin-left: 5vw;
        text-align: left;
        font-size: 20px;
        font-weight: bold;


        .title-col{
          width: 80%;
          overflow: hidden;
        }

        .stop-col{
          width: 20%;
          color: orangered;
        }


      }

      .seminar-tooltip{
        margin-top: 2vh;
        text-align: left;
        margin-left: 3vw;
        font-size: 14px;
        color: dodgerblue;


        .pre-col{
          width: 60%;
        }

        .que-col{
          width: 40%;
        }


      }


      .button-panel{
        margin-top: 4vh;

        .el-button{
          width: 40%;
          height: 50px;
          display: block;
          margin-left: auto;
          margin-right: auto;
          margin-top: 10px;
        }
      }

      .seminar-main{
        margin-top: 3vh;

        .list-left {
          width: 80%;
          border-right: 0.5px solid lightgrey;
          .pre-list-item {
            height: 50px;
            line-height: 50px;
            font-size: 19px;
          }
        }

        .list-right {
          width: 80%;
          border-left: 1px solid lightgrey;
          .pre-list-item {
            height: 50px;
            line-height: 50px;
            font-size: 19px;
          }
        }
        .grade-input-title{
          display: block;
          margin-top: 3vh;
          font-weight: bold;
        }


        .grade-input{
          margin-top: 11px;
          height: 13vh;
          width: 60%;
          font-size: 40px;
          text-align: center;
          outline: none;
        }


        .pre-list-col{
          width: 24%;
        }

        .que-list-col{
          width: 24%;
          float: right;
        }

        .grade-list-col{
          margin-left: 4vw;
          /*margin-left: auto;*/
          /*margin-right: auto;*/
          width: 45%;
          font-size: 20px;
        }

      }


    }
  }

</style>
