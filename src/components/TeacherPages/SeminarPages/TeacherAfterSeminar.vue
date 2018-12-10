<template>
    <div id="TeacherAfterSeminar">
      <app-bar title-name="OOAD-讨论课报告" back-path="/TeacherSeminar"></app-bar>
      <div class="table-title">
        <span>对象模型课后报告</span>
      </div>
      <div class="main-content">
        <mu-paper :z-depth="1">
          <mu-data-table :columns="columns" :data="reports" stripe>
            <template slot-scope="scope">
              <td>{{scope.row.groupName}}</td>
              <td style="text-align: left">{{scope.row.afterReport}}</td>
              <td style="text-align: left">{{scope.row.reportGrade}}&nbsp&nbsp<el-button size="mini" type="text">修改</el-button> </td>
            </template>
          </mu-data-table>
        </mu-paper>
      </div>
      <div class="button-panel">
        <el-button type="primary">批量下载</el-button><br/>
        <el-button type="primary">确认修改</el-button>
      </div>
    </div>
</template>

<script>
  import AppBar from '../../ReuseComponents/AppBar'
    export default {
        name: "TeacherAfterSeminar",
      components:{
          AppBar
      },
      data(){
          return{
            columns:[
              {title:'小组名称',name:'groupName'},
              {title:'书面报告',name:'afterReport'},
              {title:'报告得分',name:'reportGrade'}
            ],
            reports:[
              {
                groupName:'咕咕鸟',
                afterReport:'dwdwdw',
                reportGrade:'5'
              },
              {
                groupName:'咕咕鸟',
                afterReport:'dwdwdw',
                reportGrade:'5'
              }
            ]
          }
      }
    }
</script>

<style lang="less">
#TeacherAfterSeminar{
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
