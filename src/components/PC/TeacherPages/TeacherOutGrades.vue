<template>
  <div id="TeacherOutGrades">
    <div class="titleBar">
      查看成绩
    </div>
    <div class="main-content">
      <div class="main-title">
        <span>课程：</span>
        <mu-select v-model="courseId" @change="changeCourse">
          <mu-option v-for="item,index in courseList" :label="item.courseName" :value="item.id" :key="item.id"></mu-option>
        </mu-select>
      </div>
      <div class="main-title">
        <span>轮次：</span>
        <mu-select v-model="roundId" @change="changeRound">
          <mu-option v-for="item,index in roundList" :label="'第'+item.roundSerial+'轮'" :value="item.id" :key="index"></mu-option>
        </mu-select>
      </div>
      <div class="class-table" v-loading="isLoading">
        <span v-show="noItem">当前暂无成绩哦~~</span>
        <el-card class="grade-card" v-for="(item,index) in grades.teamScoreInRoundEntities" :key="index" v-show="!noItem">
          <div class="card-title" slot="header">
            <span>{{item.teamEntity.teamName}}</span>
            <span class="class-title">总分：{{item.roundScoreEntity.totalScore}}</span>
          </div>
          <div class="card-grades-content" v-for="(seminar,i) in item.seminarScoreEntities" :key="i">
            <span>{{seminar.seminarEntity.seminarName}}</span>
            <span class="right-total-point">总分：{{seminar.totalScore}}</span>
            <el-row>
              <el-col class="row-col">
                <span>展示：{{seminar.presentationScore}}</span>
              </el-col>
              <el-col class="row-col">
                <span>提问：{{seminar.questionScore}}</span>
              </el-col>
              <el-col class="row-col">
                <span>报告：{{seminar.reportScore}}</span>
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
        courseId:'',
        roundId:'',
        noItem:false,
        isLoading:false,
        roundList:[

        ],
        courseList:[

        ],
        grades:[
        ],

        // table:[
        //   {
        //     groupName:'1-6咕咕鸟',
        //     groupTotalGrade:'5',
        //     seminars:[
        //       {
        //         seminarName:'需求分析',
        //         preGrade:'5',
        //         queGrade:'5',
        //         repGrade:'5',
        //         totalGrade:'5'
        //       },
        //       {
        //         seminarName:'界面原型设计',
        //         preGrade:'5',
        //         queGrade:'5',
        //         repGrade:'5',
        //         totalGrade:'5'
        //       }
        //     ]
        //   },
        //   {
        //     groupName:'1-6咕咕鸟',
        //     groupTotalGrade:'5',
        //     seminars:[
        //       {
        //         seminarName:'需求分析',
        //         preGrade:'5',
        //         queGrade:'5',
        //         repGrade:'5',
        //         totalGrade:'5'
        //       },
        //       {
        //         seminarName:'界面原型设计',
        //         preGrade:'5',
        //         queGrade:'5',
        //         repGrade:'5',
        //         totalGrade:'5'
        //       }
        //     ]
        //   }
        // ]
      }
    },
    created(){
      this.loadAllCourses();
    },
    methods:{
      changeRound(){
        this.$data.isLoading=true;
        let _this=this;
        this.$axios({
          method:'get',
          url:'/course/'+this.$data.courseId+'/round/'+this.$data.roundId
        }).then(function (response) {
          if(response.data.teamScoreInRoundEntities.length!==0) {
            _this.$data.grades = response.data;
            _this.$data.isLoading = false;
            _this.$data.noItem=false;
          }else{
            _this.$data.isLoading = false;
            _this.$data.noItem=true;
          }
        })
      },
      changeCourse(){
        this.$data.roundId='';
        let _this=this;
        this.$axios({
          method:'get',
          url:'/course/'+this.$data.courseId+'/round'
        }).then(function (response) {
          _this.$data.roundList=response.data;
        })
      },
      loadAllCourses(){
        let _this=this;
        this.$axios({
          method:'get',
          url:'/course'
        }).then(function (response) {
          _this.$data.courseList=response.data;
        })
      }
    }
  }
</script>

<style lang="less">

</style>
