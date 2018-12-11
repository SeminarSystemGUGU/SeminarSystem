<template>
  <div id="TeacherAddStu">
    <div class="title">
      <span>导入学生名单</span>
      <div class="divider"></div>
    </div>
    <div class="main-content">
      <div class="main-title">
        <span>班级列表</span>
      </div>
      <div class="class-table">
        <el-table :data="table">
          <el-table-column prop="className" label="班级名称">
          </el-table-column>
          <el-table-column prop="classForm">
          </el-table-column>
          <el-table-column>

          </el-table-column>

        </el-table>
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
                className:'',
                classForm:'',
              }
            ]
          }
      }
    }
</script>

<style lang="less">
#TeacherAddStu{
  .title{
    margin-top: 20px;
    text-align: left;
    font-size: 24px;
    font-weight: bold;
  }

  .divider{
    margin-top: 10px;
    height: 3px;
    width: 600px;
    background-color: dodgerblue;
  }

  .main-content{
    margin-top: 20px;

    .main-title{
      text-align: left;
      font-size: 20px;
    }
  }
}
</style>
