<template>
  <div id="TeacherAddStu">
    <div class="titleBar">
      导入学生名单
    </div>
    <div class="main-content">
      <div class="main-title">
        <span>课程：</span>
        <mu-select v-model="courseId" @change="changeCourse">
          <mu-option v-for="item,index in options" :label="item.courseName" :value="item.id" :key="item.id"></mu-option>
        </mu-select>
      </div>
      <div class="main-title">
        <span>班级列表</span>
      </div>
      <div class="class-table">
        <el-table stripe border :data="classList" class="data-table">
          <el-table-column label="班级名称">
            <template slot-scope="scope">
              {{classList[scope.$index].grade}}级{{classList[scope.$index].klassSerial}}班
            </template>
          </el-table-column>
          <el-table-column prop="classForm" label="班级名单文件">
            <template slot-scope="scope">
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="mini">提交</el-button>
              <!--<el-button type="text" size="mini">重置</el-button>-->
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
            courseId:'',
            classList:[

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
        changeCourse(){
          let _this=this;
          this.$axios({
            method:'get',
            url:'/course/'+this.$data.courseId+'/class'
          }).then(function (response) {
            _this.$data.classList=response.data;
          })
        },
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
