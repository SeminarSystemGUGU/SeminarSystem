<template>
  <div id="TeacherMyCourses">
    <app-bar titleName="我的课程" :show-messages="true" backPath="/TeacherMainPage"></app-bar>
      <div class="main-content" v-loading="isLoading">
      <div class="no-course-message animate bounceInLeft" v-show="isNull">当前尚无课程哦~</div>
    <mu-expansion-panel v-for="item in courses" :key="item.courseName" v-show="!isNull">
      <div slot="header" class="panel-header">{{item.courseName}}
        <!--<span v-if="item.isMainCourse">（主）</span>-->
        <!--<span v-else>（从）</span>-->
      </div>
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
        <span class="item-title">讨论课</span>
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
  import AppBar from '../../ReuseComponents/AppBar'
    export default {
        name: "TeahcerMyCourses",
      components:{
          AppBar
      },
      data(){
          return{
            backPath:'/TeacherMainPage',
            isLoading:true,
            courses:[
              // {
              //   id:1,
              //   courseName:'OOAD',
              //   teacherId:'',
              //   introduction: '',
              // }
            ],
            isNull:false,
          }
      },
      watch:{

      },
      methods:{
        linkToGrades(item){
          this.$router.push({path:'/TeacherCourseGrades',query:{courseId:item.id}});
        },
        linkToTeams(item){
          this.$router.push({path:'/TeacherStuTeams',query:{courseId:item.id}});
        },
        linkToDetails(item){
          this.$router.push({path:'/TeacherCourseDetails',query:{courseId:item.id}});
        },
        linkToClass(item){
          this.$router.push({path:'/TeacherClassInfos',query:{courseId:item.id}});
        },
        linkToRounds(item){
          this.$router.push({path:'/TeacherCourseRounds',query:{courseId:item.id}});
        },
        linkToShare(item){
          this.$router.push({path:'/TeacherCourseShareSetting',query:{courseId:item.id}});
        },
        linkToNewCourse(){
          this.$router.push('/TeacherNewCourse');
        },
        /**
         * 加载教师的所有课程
         */
        loadTeacherCourse(){
          let _this=this;
          console.log(this.$axios.defaults);
          this.$axios({
            method:'get',
            url:'/course/'
          }).then(function (response) {
            _this.$data.courses=response.data;
            _this.$data.isLoading=false;
            if(response.data.length===0){
              _this.$data.isNull=true;
            }else{
              _this.$data.isNull=false;
            }
          })
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

    .no-course-message{
      font-size: 18px;
      font-weight: bold;
    }


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
