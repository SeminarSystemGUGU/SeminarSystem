<template>
  <div class="seminarBack animated fadeIn" align="left">
    <div class="titleBar">
      第一轮讨论课
    </div>
    <div class="contentCard">
      <div class="smallCard">
        业务流程分析
      </div>
      <div class="nextCard">
        报名情况：{{seminar.registerStatus}}
      </div>
      <div>
        <span class="subCon">报名起止日期：{{seminar.registerStartStopTime}}</span><br/>
        <span class="subCon">报告提交截止日期：{{seminar.submitReportEndTime}}</span><br/>
        <span class="subCon">要求：{{seminar.content}}</span><br/>
      </div>
    </div>
    <div class="lastCard">
      已报名小组
    </div>
    <el-table  :data="seminar.registeredTeams" stripe id="teamTable">
      <el-table-column prop="preOrder" label="次序" width="100"></el-table-column>
      <el-table-column prop="teamID" label="组号" width="80"></el-table-column>
      <el-table-column prop="leader" label="组长" width="150"></el-table-column>
      <el-table-column prop="ppt" label="展示材料" width="150">
        <template slot-scope="scope">
          <img  v-if="seminar.registeredTeams[scope.$index].ppt=='已上传'" style="width: 30px;height: 30px;color:#67C23A;cursor: pointer" src="../../../assets/download.svg"/>
          <span v-if="seminar.registeredTeams[scope.$index].ppt=='未上传'">{{seminar.registeredTeams[scope.$index].ppt}}</span>
        </template>
      </el-table-column>
      <el-table-column label="">
        <template slot-scope="scope">
          <div>
            <mu-button  flat :disabled="seminar.registeredTeams[scope.$index].teamID !=''" @click.native.prevent="updateHandle(scope.$index )" color="success"  >
              可报名
            </mu-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "SeminarDetails",
    data(){
      return{
        doundID:1,
        seminar:{
          topic:'业务流程分析',
          registerStatus:'3 / 6',
          registerStartStopTime:'2018.9.2—2018.9.12',
          content:'别来上课！',
          submitReportEndTime:'2018.9.20',
          registeredTeams:[
            {
              preOrder:1,
              teamID:'1-1',
              leader:'Andrew',
              ppt:'未上传',
            },
            {
              preOrder:2,
              teamID:'1-2',
              leader:'Jenny',
              ppt:'未上传',
            },
            {
              preOrder:3,
              teamID:'1-3',
              leader:'WTF',
              ppt:'已上传',
            },
            {
              preOrder:3,
              teamID:'',
              leader:'',
              ppt:'',
            },
            {
              preOrder:4,
              teamID:'',
              leader:'',
              ppt:'',
            },
            {
              preOrder:6,
              teamID:'1-6',
              leader:'Li',
              ppt:'已上传',
            },
          ]
        }

      }
    }
  }
</script>

<style scoped>

</style>
