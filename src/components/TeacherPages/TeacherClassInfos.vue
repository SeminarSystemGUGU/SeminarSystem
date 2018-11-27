<template>
    <div id="TeacherClassInfos">
      <app-bar :show-messages="true" title-name="OOAD-班级信息"></app-bar>
      <div class="main-content">
        <el-collapse v-model="activeName">
          <el-collapse-item title="2016级1班" name="1">
            <div class="item-content">
              <div class="class-info">
                <el-row :gutter="10">
                  <el-col class="row-col-left">
                    <span>讨论课时间：</span>
                  </el-col>
                  <el-col class="row-col-right">
                    <span>周三78节</span>
                  </el-col>
                </el-row>
              </div>
              <div class="class-info">
                <el-row :gutter="10">
                  <el-col class="row-col-left">
                    <span>讨论课地点：</span>
                  </el-col>
                  <el-col class="row-col-right">
                    <span>海韵301</span>
                  </el-col>
                </el-row>
              </div>
              <div class="class-info">
                <el-row :gutter="10">
                  <el-col class="row-col-left">
                    <span>班级学生名单：</span>
                  </el-col>
                  <el-col class="row-col-right">
                    <span class="link-class">周三78节.xlsx</span>
                    <el-button type="text" size="small" class="choose-file-button">选择文件</el-button>
                  </el-col>
                </el-row>
              </div>
              <div class="button-panel">
                <el-button class="the-button">删除班级</el-button>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="2016级2班" name="2">

          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="new-button-panel">
        <mu-button color="primary" class="new-button" @click="linkToNewClass">新建班级</mu-button>
      </div>
    </div>
</template>

<script>
  import AppBar from '../../components/ReuseComponents/AppBar'
    export default {
        name: "TeacherClassInfos",
      components:{
          AppBar
      },
      data(){
          return{
            activeName:'1'
          }
      },
      methods:{
          linkToNewClass(){
            this.$router.push('/NewClass');
          }
      }
    }
</script>

<style lang="less">

#TeacherClassInfos{
  width: 100vw;

  .el-collapse-item__header{
    font-size: 18px;
    /*background-color: orange;*/
    font-weight: bold;
  }

  .new-button-panel{
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 7vh;

    .new-button{
      width: 100%;
      height: 6.8vh;

    }

  }


  .main-content{
    margin-top: 3vh;

    .choose-file-button{
      /*background-color: white;*/
      /*border-color: dodgerblue;*/
      /*color: dodgerblue;*/
    }

    .item-content{
      margin-top: 3vh;
      width: 80%;
      margin-right: auto;
      margin-left: auto;

      .link-class{
        color: dodgerblue;
        font-weight: normal;
      }

      .button-panel{
        margin-top: 3vh;

      }
      .the-button{
        width: 160px;
        height: 40px;
        /*background-color: orangered;*/
        border-color: orangered;
        color: orangered;
      }
      .row-col-left{
        width: 50%;
        font-size: 17px;
        text-align: right;
        /*font-weight: bold;*/
      }

      .row-col-right{
        text-align: left;
        width: 50%;
        font-size: 17px;
        font-weight: bold;
      }

    }
  }

}
</style>
