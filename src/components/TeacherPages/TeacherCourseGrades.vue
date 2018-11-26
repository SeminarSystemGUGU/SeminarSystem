<template>
  <div id="TeacherCourseGrades">
    <app-bar titleName="OOAD-学生成绩" :showMessages="false"></app-bar>
    <div class="main-content">
      <mu-expansion-panel v-for="item in seminars" :key="item.name">
        <div slot="header" class="panel-header">{{item.name}}</div>
        <div class="divider"></div>
        <div class="table-item" @click="linkToGrades(item)">
          <span class="item-title">学生成绩</span>
          <span class="item-arrow"><i class="el-icon-arrow-right"></i></span>
        </div>
        <div class="divider"></div>

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
