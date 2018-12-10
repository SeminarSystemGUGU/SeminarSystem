<template>
    <!--讨论课轮次设置界面-->
    <div id="TeacherRoundSetting">
      <app-bar title-name="轮次设置" back-path="/TeacherCourseRounds"></app-bar>
      <div class="main-content">
        <div class="round-seminars">
          <!--本轮次所含讨论课-->
          <div class="round-seminars-title">
            <!--<div class="square"></div>-->
            <span>本轮次所含讨论课：</span>
          </div>
          <div class="round-seminars-class">
            <seminar-card></seminar-card>
          </div>
        </div>
        <div class="round-grade-setting">
          <!--讨论课每轮成绩设置-->
          <div class="round-grade-setting-title">
            <span>成绩设置：</span>
          </div>
          <div class="round-grade-setting-form">
            <el-form class="round-grade-form">
              <el-form-item label="展示：">
                <el-select class="the-select" size="small"></el-select>
              </el-form-item>
              <el-form-item label="提问：">
                <el-select class="the-select" size="small"></el-select>
              </el-form-item>
              <el-form-item label="报告：">
                <el-select class="the-select" size="small"></el-select>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="round-grade-setting">
          <!--讨论课每轮成绩设置-->
          <div class="round-grade-setting-title">
            <span>本次讨论课报名次数：</span>
          </div>
          <div class="round-grade-setting-form">
            <el-form class="round-grade-form">
              <el-form-item label="一班：">
                <el-select class="the-select" size="small"></el-select>
              </el-form-item>
              <el-form-item label="二班：">
                <el-select class="the-select" size="small"></el-select>
              </el-form-item>
              <el-form-item label="三班：">
                <el-select class="the-select" size="small"></el-select>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="button-panel">
        <el-button type="primary">确定修改</el-button>
      </div>
    </div>
</template>

<script>
  import SeminarCard from '../../ReuseComponents/SeminarCard'
  import AppBar from '../../ReuseComponents/AppBar'
    export default {
        name: "TeacherRoundSetting",
      components:{
          AppBar,SeminarCard
      }
    }
</script>

<style lang="less">
#TeacherRoundSetting{
  text-align: left;

  .button-panel{
    width: 100%;
    position: fixed;
    bottom: 0;

    .el-button{
      width: 100%;
    }
  }

  .main-content{
    margin-top: 1.5vh;

    .the-select{
      width: 60%;
    }

    .round-grade-setting{
      margin-top: 3vh;
      margin-left: 3vw;
      font-size: 20px;
      font-weight: bold;


      .round-grade-setting-form{
        margin-top: 2vh;
        width: 50%;
        margin-left: auto;
        margin-right: auto;
      }
    }


    .round-seminars{
      margin-left: 3vw;
      font-size: 20px;
      font-weight: bold;

      .square{
        width: 3vw;
        height: 20px;
        background-color: dodgerblue;
        display: inline-block;
      }


      .round-seminars-class{
        text-align: center;
      }

    }


  }

}

</style>
