<template>
  <div id="TeacherOutGrades">
    <div class="title">
      <span>查看成绩</span>
      <div class="divider"></div>
    </div>
    <div class="main-content">
      <div class="main-title">
        <span>课程：</span>
        <mu-select>
          <mu-option label="1" value="1"></mu-option>
          <mu-option label="全部" value="0"></mu-option>
        </mu-select>
      </div>
      <div class="main-title">
        <span>轮次：</span>
        <mu-select>
          <mu-option label="1" value="1"></mu-option>
          <mu-option label="全部" value="0"></mu-option>
        </mu-select>
      </div>
      <div class="class-table">
        <el-card class="grade-card" v-for="(item,index) in table" :key="index">
          <div class="card-title" slot="header">
            <span>{{item.groupName}}</span>
            <span class="class-title">总分：{{item.groupTotalGrade}}</span>
          </div>
          <div class="card-grades-content" v-for="(seminar,i) in item.seminars" :key="i">
            <span>{{seminar.seminarName}}</span>
            <span class="right-total-point">总分：{{seminar.totalGrade}}</span>
            <el-row>
              <el-col class="row-col">
                <span>展示：{{seminar.preGrade}}</span>
              </el-col>
              <el-col class="row-col">
                <span>提问：{{seminar.queGrade}}</span>
              </el-col>
              <el-col class="row-col">
                <span>报告：{{seminar.repGrade}}</span>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TeacherMain",
    data(){
      return{

        table:[
          {
            groupName:'1-6咕咕鸟',
            groupTotalGrade:'5',
            seminars:[
              {
                seminarName:'需求分析',
                preGrade:'5',
                queGrade:'5',
                repGrade:'5',
                totalGrade:'5'
              },
              {
                seminarName:'界面原型设计',
                preGrade:'5',
                queGrade:'5',
                repGrade:'5',
                totalGrade:'5'
              }
            ]
          },
          {
            groupName:'1-6咕咕鸟',
            groupTotalGrade:'5',
            seminars:[
              {
                seminarName:'需求分析',
                preGrade:'5',
                queGrade:'5',
                repGrade:'5',
                totalGrade:'5'
              },
              {
                seminarName:'界面原型设计',
                preGrade:'5',
                queGrade:'5',
                repGrade:'5',
                totalGrade:'5'
              }
            ]
          }
        ]
      }
    }
  }
</script>

<style lang="less">

</style>
