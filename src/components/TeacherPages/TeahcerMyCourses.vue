<template>
  <div id="TeacherMyCourses">
    <app-bar titleName="我的课程" :show-messages="true" backPath="/TeacherMainPage"></app-bar>

    <div class="main-content">
    <mu-expansion-panel v-for="item in courses" :key="item.name">
      <div slot="header" class="panel-header">{{item.name}}<span v-if="item.isMainCourse">（主）</span>
        <span v-else>（从）</span></div>
      <div class="divider"></div>
      <div class="table-item" @click="linkToGrades(item)">
        <span class="item-title">学生成绩</span>
        <span class="item-arrow"><i class="el-icon-arrow-right"></i></span>
      </div>
      <div class="divider"></div>
      <div class="table-item" @click="linkToTeams(item)">
        <span class="item-title">学生组队</span>
        <span class="item-arrow"><i class="el-icon-arrow-right"></i></span>
      </div>
      <div class="divider"></div>
      <div class="table-item"  @click="linkToDetails(item)">
        <span class="item-title">课程信息</span>
        <span class="item-arrow"><i class="el-icon-arrow-right"></i></span>
      </div>
      <div class="divider"></div>
      <div class="table-item" @click="linkToClass(item)">
        <span class="item-title">班级信息</span>
        <span class="item-arrow"><i class="el-icon-arrow-right"></i></span>
      </div>
      <div class="divider"></div>
      <div class="table-item" @click="linkToRounds(item)">
        <span class="item-title">讨论课轮次</span>
        <span class="item-arrow"><i class="el-icon-arrow-right"></i></span>
      </div>
      <div class="divider"></div>
      <div class="table-item" @click="linkToShare(item)">
        <span class="item-title">共享设置</span>
        <span class="item-arrow"><i class="el-icon-arrow-right"></i></span>
      </div>
      <div class="divider"></div>

    </mu-expansion-panel>
    </div>
    <div style="height: 8vh"></div>
    <div class="footer-new-course">
      <mu-button class="new-course-button" @click="linkToNewCourse" color="info"><i class="el-icon-plus"/>新建课程</mu-button>
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
            backPath:'/TeacherMainPage',
            courses:[
              {
                id:0,
                name:'OOAD',
                isMainCourse:true,
              },
              {
                id:0,
                name:'软件工程',
                isMainCourse:false
              }
            ]
          }
      },
      methods:{
        linkToGrades(item){
          this.$router.push('/TeacherCourseGrades');
        },
        linkToTeams(item){
          this.$router.push('/TeacherStuTeams');
        },
        linkToDetails(item){
          this.$router.push('/TeacherCourseDetails');
        },
        linkToClass(item){
          this.$router.push('/TeacherClassInfos');
        },
        linkToRounds(item){
          this.$router.push('/TeacherCourseRounds');
        },
        linkToShare(item){
          this.$router.push('/TeacherCourseShareSetting');
        },
        linkToNewCourse(){
          this.$router.push('/TeacherNewCourse');
        },

        //加载教师所选课程
        loadTeacherCourse(){
          let _this=this;
          _this.$axios({
            method:'get',
            url:'/course/teacherCourse',
          }).then(function (response) {
            _this.$data.courses=[];//先清空静态数据
            let responseData=response.data;
            for(var i=0;i<responseData.length;i++){
              _this.$data.courses.push({
                id:responseData[i].courseId,
                name:responseData[i].courseName,
                isMainCourse:(responseData[i].status.toString()==="1")?true:false,
              })
            }
          }).catch(function (error) {
            console.log(error.response.data);
          });
        }
      },
      created(){
        this.loadTeacherCourse();
      }
    }
</script>

<style scoped lang="less">
#TeacherMyCourses{
  width: 100vw;

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
