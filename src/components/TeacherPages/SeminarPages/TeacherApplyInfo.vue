<template>
  <div id="TeacherApplyInfo">
    <!--<app-bar title-name="OOAD-讨论课报告" back-path="/TeacherSeminar"></app-bar>-->
    <div class="app-bar">
      <div :class="iconClass" ref="iconUse">
        <i class="el-icon-back" @click="linkBack"></i>
        <!--<span class="">轮次设置</span>-->
        <transition name="slide-fade" class="transition-box">
          <span class="title">讨论课报名</span>
        </transition>
        <span>&nbsp;&nbsp;</span>
      </div>
    </div>
    <div class="app-bar-blank"></div>
    <div class="table-title">
      <span>对象模型报名情况</span>
    </div>


    <div class="main-content">
      <mu-paper :z-depth="1">
        <el-table :data="reports">
          <el-table-column label="顺序">
            <template slot-scope="scope">
              {{scope.row.teamOrder}}
            </template>
          </el-table-column>
          <el-table-column label="小组名">
            <template slot-scope="scope">
              {{scope.row.teamEntity.teamName}}
            </template>
          </el-table-column>
          <el-table-column label="PPT材料">
            <template slot-scope="scope">
              {{scope.row.pptName}}
            </template>
          </el-table-column>
        </el-table>
      </mu-paper>
    </div>
  </div>
</template>

<script>
  import AppBar from '../../ReuseComponents/AppBar'
  export default {
    name: "TeacherApplyInfo",
    components:{
      AppBar
    },
    data(){
      return{
        seminarId:'',
        klassSeminarId:'',
        iconClass:'back-icon-use',
        columns:[
          {title:'顺序',name:'teamOrder'},
          {title:'小组名称',name:'teamName'},
          {title:'展示材料',name:'preMaterials'}
        ],
        reports:[
          {
            id: 73,
            isPresent: 0,
            klassSeminarId: 23,
            pptName: null,
            pptUrl: null,
            reportName: null,
            reportUrl: null,
            teamEntity: {id: 22, klassId: 23, courseId: 16, leaderId: 211, teamName: "3-1", teamSerial: 1, status: 1},
            teamSerial: 1,
            teamId: 22,
            teamOrder: 1,
          },
        ]
      }
    },
    created(){
      this.$data.klassSeminarId=this.$route.query.klassSeminarId;
      this.loadApplyInfos();
    },
    methods:{
      linkBack(){
        history.back();
      },
      loadApplyInfos(){
        let _this=this;
        this.$axios({
          method:'get',
          url:'/attendance/'+this.$data.klassSeminarId
        }).then(function (response) {
          _this.$data.reports=response.data;
        })
      },
      loadTeamMaterial(){

      }
    }
  }
</script>

<style lang="less">
  #TeacherApplyInfo{
    padding: 1px;

    .app-bar-blank{
      height: 10vh;
      max-height: 60px;
    }

    .transition-box{
      transition: all 0.8s;
    }

    .row-col{
      width: 40%;
    }

    .app-bar {
      padding: 0.1px;
      height: 10vh;
      max-height: 60px;
      position: fixed;
      z-index: 1000;

      .back-icon-use{
        border-bottom-right-radius: 20px;
        -moz-box-shadow:0px 0px 2px whitesmoke;
        -webkit-box-shadow:0px 0px 2px whitesmoke;
        box-shadow:0px 0px 2px whitesmoke;
        z-index: 1000;
        /*width: 40vw;*/
        /*height: 10vh;*/
        /*max-height: 60px;*/
        background-color: white;
        color: dodgerblue;
        padding-left: 4vw;
        font-size: 25px;
        padding-top: 1vh;
        line-height: 25px;
        padding-bottom:5px;

        .title{
          color: black;
          font-size: 20px;
          font-weight: bold;
          /*line-height: 25px;*/
        }
      }


      .back-icon {
        z-index: 1000;
        /*width: 40vw;*/
        /*height: 10vh;*/
        /*max-height: 60px;*/
        background-color: white;
        color: dodgerblue;
        padding-left: 4vw;
        font-size: 25px;
        padding-top: 1vh;
        line-height: 25px;
        padding-bottom:5px;


        .title{
          color: black;
          font-size: 20px;
          font-weight: bold;
          /*line-height: 25px;*/
        }
      }
    }

    .table-title{
      margin-top: 10px;
      text-align: left;
      font-size: 25px;
      margin-left: 4vw;
      /*color: dodgerblue;*/
      /*font-weight: bold;*/
    }

    .button-panel{
      margin-top: 3vh;
      width: 80%;
      margin-left: auto;
      margin-right: auto;

      .el-button{
        margin-top: 1vh;
        width: 100%;
      }
    }


    .main-content{
      margin-top: 10px;
    }
  }
</style>
