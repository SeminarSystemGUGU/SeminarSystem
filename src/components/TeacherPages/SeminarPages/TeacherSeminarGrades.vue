<template>
  <div id="TeacherSeminarGrades">
    <app-bar title-name="OOAD-讨论课报告" back-path="/TeacherSeminar"></app-bar>
    <div class="table-title">
      <span>对象模型成绩</span>
    </div>
    <div class="main-content">
      <mu-paper :z-depth="1">
        <mu-data-table :columns="columns" :data="reports" stripe>
          <template slot-scope="scope">
            <td>{{scope.row.groupName}}</td>
            <td style="text-align: left">{{scope.row.preGrade}}</td>
            <td style="text-align: left">{{scope.row.queGrade}}</td>
            <td style="text-align: left">{{scope.row.repGrade}}</td>
            <td style="text-align: left">{{scope.row.total}}</td>
          </template>
        </mu-data-table>
      </mu-paper>
    </div>
    <div class="button-panel">
      <el-button type="primary">确认</el-button><br/>
      <!--<el-button type="primary">确认修改</el-button>-->
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
          {title:'小组名称',name:'groupName',width:'20%'},
          {title:'展示分',name:'preGrade',width:'20%'},
          {title:'提问分',name:'queGrade',width:'20%'},
          {title:'报告分',name:'repGrade',width:'20%'},
          {title:'总分',name:'total',width:'20%'}
        ],
        reports:[
          {
            groupName:'咕咕鸟',
            preGrade:'5',
            queGrade:'5',
            repGrade:'5',
            total:'5'
          },
          {
            groupName:'咕咕鸟',
            preGrade:'5',
            queGrade:'5',
            repGrade:'5',
            total:'5'
          },


        ]
      }
    }
  }
</script>

<style lang="less">
  #TeacherSeminarGrades{
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
