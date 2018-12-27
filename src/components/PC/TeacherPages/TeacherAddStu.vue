<template>
  <div id="TeacherAddStu">
    <div class="title">
      <span>导入学生名单</span>
      <div class="divider"></div>
    </div>
    <div class="main-content">
      <div class="select-course">
        <span>选择课程：</span>
        <el-select v-model="currentCourseId">
          <el-option v-for="item in options" :key="item.id" :value="item.id" :label="item.courseName"></el-option>
        </el-select>
      </div>
      <div class="main-title">
        <span>班级列表</span>
      </div>
      <div class="class-table">
        <el-table stripe border :data="table" class="data-table">
          <el-table-column prop="className" label="班级名称">
          </el-table-column>
          <el-table-column prop="classForm" label="班级名单文件">
            <template slot-scope="scope">
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini">提交</el-button>
              <el-button type="primary" size="mini">重置</el-button>
            </template>
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
                className:'一班',
                classForm:'',
              },
              {
                className:'二班',
                classForm:'',
              }
            ],
            options:[

            ],
            currentCourseId:'',
          }
      },
      created(){
        this.loadAllCourses();
      },
      methods:{
        loadAllCourses(){
          let _this=this;
          this.$axios({
            method:'get',
            url:'/course'
          }).then(function (response) {
            _this.$data.options=response.data;
          })
        }
      }
    }
</script>

<style lang="less">
#TeacherAddStu{

  .select-course{
    text-align: left;
    font-weight: bold;
    margin-bottom: 20px;
  }

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

    .data-table{
      width: 95%;
      border: none;
      border-top-color: #182f63;
      border-top-width: 1.5px;

    }

    .el-table__body {
      border-color: #182f63;
      border-width: 1.5px;
      font-size: 15px;
      .el-table__row {
        background: #F6F7FB;
      }
      .el-table__row--striped {
        background: #ffffff !important;
        td {
          background: #ffffff !important;
        }
      }
    }


    margin-top: 20px;

    .main-title{
      text-align: left;
      font-size: 20px;
    }

    .class-table{
      margin-top: 10px;
    }
  }
}
</style>
