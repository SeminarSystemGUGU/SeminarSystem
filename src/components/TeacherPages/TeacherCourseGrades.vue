<template>
  <div id="TeacherCourseGrades">
    <app-bar titleName="OOAD-学生成绩" :showMessages="true"></app-bar>
    <div class="main-content">
      <mu-expansion-panel v-for="item in seminars" :key="item.name">
        <div slot="header" class="panel-header">{{item.name}}</div>
        <div class="divider"></div>
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item name="1">
            <template slot="title">
              <div class="group-grades">
                <span class="left-grades">小组1-1</span>
                <span class="right-grades">4.5</span>
              </div>
            </template>
            <!--<div class="divider"></div>-->
            <div class="group-seminar-grades">
              <div class="seminar-name">
                <span>用例分析</span>
              </div>
              <div class="seminar-grades">
                <el-row>
                  <el-col class="row-col">
                    <span>展示：</span><span class="grade-mark">5</span>
                  </el-col>
                  <el-col class="row-col">
                    <span>提问：</span><span class="grade-mark">5</span>
                  </el-col>
                  <el-col class="row-col">
                    <span>报告：</span><span class="grade-mark">5</span>
                  </el-col>
                </el-row>
              </div>

            </div>
          </el-collapse-item>
          <el-collapse-item title="反馈 Feedback" name="2">
            <template slot="title">
              <div class="group-grades">
                <span class="left-grades">小组1-1</span>
                <span class="right-grades">4.5</span>
              </div>
            </template>
          </el-collapse-item>
        </el-collapse>

      </mu-expansion-panel>
    </div>
    <div style="height: 8vh"></div>
    <div class="footer-new-course">
      <mu-button class="new-course-button" color="info"><i class="el-icon-plus"/>新建课程</mu-button>
    </div>
  </div>
</template>

<script>
  import AppBar from '../ReuseComponents/AppBar'
  export default {
    name: "TeahcerMyCourses",
    components:{
      AppBar
    },
    data(){
      return{
        seminars:[
          {
            name:'第一轮',
            // isMainCourse:true,
          },
          {
            name:'第二轮',
            // isMainCourse:false
          }
        ]
      }
    },
    methods:{
      linkToGrades(item){
        this.$router.push('/TeacherCourseGrades');
      }
    }
  }
</script>

<style scoped lang="less">
  #TeacherCourseGrades{
    width: 100vw;

    .divider{
      margin-top: 1.5vh;
      width: 100%;
      height: 3px;
      background-color: lightgray;
    }


    .title{
      margin-top: 20px;
      text-align: left;
      font-size: 20px;
      margin-left: 25px;
      font-weight: bold;
    }

    .divider{
      width:100%;
      height: 2px;
      background-color: whitesmoke
    }

    .main-content{
      margin-top: 3vh;
      .panel-header{
        font-size: 20px;
      }

      .group-seminar-grades{
        margin-top: 1.5vh;
        .seminar-name{
          font-size: 16px;
          font-weight: bold;
        }
        .seminar-grades{
          margin-top: 3vh;
          .row-col{
            width: 30%;
            font-size: 16px;
            .grade-mark{
              color: dodgerblue;
              font-weight: bold;
            }
          }

        }
      }

      .group-grades{
        width: 80%;
        margin-left: 0;
        font-size: 18px;

        .left-grades{
          float: left;
          margin-left: 10%
        }

        .right-grades{
          float: right;
        }
      }

      .table-item{
        height: 8vh;
        line-height: 8vh;
        font-size: 20px;
        text-align: left;

        .item-title{
          margin-left: 6vw;
        }
        .item-arrow{
          float: right;
        }
      }
    }
    .footer-new-course{
      position: fixed;
      width:100vw;
      height: 7vh;
      bottom: 0;
      background-color: dodgerblue;

      .new-course-button{
        width: 100%;
        height: 7vh;
        font-size: 20px;

      }
    }
  }
</style>
