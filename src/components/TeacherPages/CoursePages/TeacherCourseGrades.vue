<template>
  <div id="TeacherCourseGrades">
    <app-bar titleName="OOAD-学生成绩" :showMessages="true" backPath="/TeacherMyCourses"></app-bar>
    <mu-dialog title="修改小组分数" width="360" :open.sync="openModGrade">
      <div>
        <span>正在为小组修改分数：</span>
      </div>
      <el-form :model="formModGrade" ref="formModGrade" label-width="120px;" style="margin-top: 10px;">
        <el-form-item prop="preGrade" label="展示分数：">
          <el-input class="grade-input" v-model="formModGrade.preGrade" style="width: 50%"  placeholder="请输入展示分数"></el-input>
        </el-form-item>
        <el-form-item prop="queGrade" label="提问分数：">
          <el-input class="grade-input" v-model="formModGrade.queGrade" style="width: 50%"  placeholder="请输入提问分数"></el-input>
        </el-form-item>
        <el-form-item prop="repGrade" label="报告分数：">
          <el-input class="grade-input" v-model="formModGrade.repGrade" style="width: 50%" placeholder="请输入报告分数"></el-input>
        </el-form-item>
      </el-form>
      <mu-button slot="actions" flat color="primary" @click="confirmModify">确认修改</mu-button>
      <mu-button slot="actions" flat color="primary" @click="openModGrade=false">放弃</mu-button>
    </mu-dialog>
    <div class="main-content">
      <mu-expansion-panel v-for="item1 in seminars" :key="item1.name">
        <div slot="header" class="panel-header">{{item1.name}}</div>
        <div class="divider"></div>
        <el-collapse v-model="activeNames">
          <el-collapse-item name="1" v-for="(item,index) in groupGrades" :key="index">
            <template slot="title">
              <div class="group-grades">
                <span class="left-grades">{{item.groupName}}</span>
                <span class="right-grades">总分：{{item.groupRoundScore}}</span>
              </div>
            </template>
            <!--<div class="divider"></div>-->
            <div class="group-seminar-grades" v-for="(it,i) in item.grades" :key="i">
              <div class="seminar-name">
                <span>{{it.seminarName}}</span>
              </div>
              <div class="seminar-grades">
                <el-row>
                  <el-col class="row-col">
                    <span>展示：</span><span class="grade-mark">{{it.preGrade}}</span>
                  </el-col>
                  <el-col class="row-col">
                    <span>提问：</span><span class="grade-mark">{{it.queGrade}}</span>
                  </el-col>
                  <el-col class="row-col">
                    <span>报告：</span><span class="grade-mark">{{it.repGrade}}</span>
                  </el-col>
                </el-row>
                <div class="modify-button-panel">
                  <el-button type="primary" size="small" @click="modifyGrade(it)">修改成绩</el-button>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>

      </mu-expansion-panel>
    </div>
    <div style="height: 8vh"></div>
    <!--<div class="footer-new-course">-->
      <!--<mu-button class="new-course-button" color="info"><i class="el-icon-plus"/>新建课程</mu-button>-->
    <!--</div>-->
  </div>
</template>

<script>
  import AppBar from '../../ReuseComponents/AppBar'
  export default {
    name: "TeahcerMyCourses",
    components:{
      AppBar
    },
    created(){
      console.log(this.$data.groupGrades[0]);
    },
    data(){
      return{
        openModGrade:false,
        formModGrade:{
          seminarName:'',
          preGrade:0,
          repGrade:0,
          queGrade:0,
        },
        formTempGrade:{},
        activeNames:'1',
        groupGrades:[
          {
            groupName:'小鸟 ',
            groupRoundScore:4,
            grades:[
              {
                index:0,
                seminarName:'用例分析',
                preGrade:4,
                queGrade:4,
                repGrade:4
              },
              {
                index:1,
                seminarName:'界面分析',
                preGrade:4,
                queGrade:4,
                repGrade:4
              }
            ]
          }
        ],
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
      confirmModify(){
        console.log(this.$data.groupGrades[0])
        this.$data.groupGrades[parseInt(this.$data.activeNames)-1].grades.splice(this.$data.formTempGrade.index,1,this.$data.formModGrade);
        this.$data.openModGrade=false;
      },
      modifyGrade(it){
        this.$data.formModGrade.preGrade=it.preGrade;
        this.$data.formModGrade.queGrade=it.queGrade;
        this.$data.formModGrade.repGrade=it.repGrade;
        this.$data.formModGrade.seminarName=it.seminarName;
        this.formTempGrade=it;
        this.$data.openModGrade=true;
      },
      linkToGrades(item){
        this.$router.push('/TeacherCourseGrades');
      }
    }
  }
</script>

<style scoped lang="less">
  #TeacherCourseGrades{
    width: 100vw;


   .grade-input{
     width: 50%;
   }


    .modify-button-panel{
      margin-top: 1.5vh;
    }

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
