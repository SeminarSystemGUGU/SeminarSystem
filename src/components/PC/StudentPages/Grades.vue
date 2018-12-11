<template>
  <div class="seminarBack animated slideInUp" align="left">
    <div class="titleBar">
      查看成绩
    </div>
    <div class="courseSelect">
      <span >课程 </span>
      <mu-select class="select" v-model="courseName">
        <mu-option v-for="option,index in courseList" :key="option.courseID" :label="option.courseName" :value="option.courseName"></mu-option>
      </mu-select>
    </div>

    <el-table :data="grades" border="false" id="gradesTable">
      <el-table-column prop="roundName" label="轮次" width="120"></el-table-column>
      <el-table-column prop="seminarTopic" label="参与讨论课主题" width="150"></el-table-column>
      <el-table-column label="成绩">
        <el-table-column prop="presentationScore" label="展示" width="70"></el-table-column>
        <el-table-column prop="reportScore" label="报告" width="70"></el-table-column>
        <el-table-column prop="questionScore" label="提问" width="70"></el-table-column>
      </el-table-column>
      <el-table-column prop="totalScore" label="总分" ></el-table-column>
    </el-table>

    <mu-button color="success" class="exportGrade">导出成绩</mu-button>


  </div>
</template>

<script>
    export default {
        name: "Grades",
      data(){
          return{
            grades:[
              {
                roundName:"第一轮",
                seminarTopic:'业务流程',
                presentationScore:5.0,
                reportScore:5.0,
                questionScore:5.0,
                totalScore:5.0,
              },
              {
                roundName:"第二轮",
                seminarTopic:'需求分析',
                presentationScore:5.0,
                reportScore:5.0,
                questionScore:5.0,
                totalScore:5.0,
              },
              {
                roundName:"第三轮",
                seminarTopic:'领域模型',
                presentationScore:5.0,
                reportScore:5.0,
                questionScore:5.0,
                totalScore:5.0,
              }
            ]
          }
      }
    }
</script>

<style scoped>

</style>
