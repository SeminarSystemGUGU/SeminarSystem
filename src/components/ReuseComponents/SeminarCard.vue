<template>
  <div id="SeminarCard">
    <div class="the-card">
      <el-row>
        <el-col class="title-row-col">
          <div class="card-course-title">
            <span>{{seminarName}}</span>
          </div>
        </el-col>
        <el-col class="details-row-col">
          <div class="card-course-details">
            <span class="seminar-do-button">删除讨论课</span>
            <span class="seminar-do-button">修改讨论课</span>
            <!--<el-button type="text" class="seminar-do-button">删除讨论课</el-button>-->
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
    export default {
        name: "SeminarCard",
      data(){
          return{
            seminarName:'对象模型',
          }
      },
    }
</script>

<style lang="less">
#SeminarCard{
  .the-card{
    margin-top: 13px;
    width: 83%;
    height: 10vh;
    background-color: deepskyblue;
    border-radius: 20px;
    margin-left: auto;
    margin-right: auto;

    .title-row-col{
      width: 70%;

      .card-course-title{
        margin-left: 3vw;
        color: white;
        font-size: 25px;
        line-height: 10vh;
        overflow: hidden;
        text-align: left;
      }
    }

    .details-row-col{
      width: 30%;

      .seminar-do-button{
        margin-top: 1vh;
        display: inline-block;
        color: white;
        font-weight: bold;
      }

      .card-course-details{
        color: white;
        font-size: 15px;
      }
    }
  }
}
</style>
