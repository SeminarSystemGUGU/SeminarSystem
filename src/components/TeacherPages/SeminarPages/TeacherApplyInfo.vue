<template>
  <div id="TeacherApplyInfo">
    <!--<app-bar title-name="OOAD-讨论课报告" back-path="/TeacherSeminar"></app-bar>-->
    <div class="app-bar">
      <div :class="iconClass" ref="iconUse">
        <i class="el-icon-back" @click="linkBack"></i>
        <!--<span class="">轮次设置</span>-->
        <transition name="slide-fade" class="transition-box">
          <span class="title">讨论课详情</span>
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
        <mu-data-table :columns="columns" :data="reports" stripe>
          <template slot-scope="scope">
            <td>{{scope.row.round}}</td>
            <td style="text-align: left">{{scope.row.groupName}}</td>
            <td style="text-align: left">{{scope.row.preMaterials}}</td>
          </template>
        </mu-data-table>
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
        iconClass:'back-icon',
        columns:[
          {title:'顺序',name:'No'},
          {title:'小组名称',name:'groupName'},
          {title:'展示材料',name:'preMaterials'}
        ],
        reports:[
          {
            groupName:'咕咕鸟',
            round:'1',
            preMaterials:'无'
          },
          {
            groupName:'咕咕鸟',
            round:'2',
            preMaterials:'无'
          },

        ]
      }
    },
    methods:{
      linkBack(){
        history.back();
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
