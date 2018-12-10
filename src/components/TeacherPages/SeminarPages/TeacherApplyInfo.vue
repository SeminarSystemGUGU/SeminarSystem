<template>
  <div id="TeacherApplyInfo">
    <app-bar title-name="OOAD-讨论课报告" back-path="/TeacherSeminar"></app-bar>
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
    }
  }
</script>

<style lang="less">
  #TeacherApplyInfo{
    padding: 1px;

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
