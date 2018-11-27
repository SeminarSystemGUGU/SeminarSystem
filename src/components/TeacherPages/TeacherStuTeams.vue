<template>
  <div id="TeacherStuTeams">
    <app-bar titleName="OOAD-学生组队" :showMessages="false"></app-bar>
    <div class="main-content">
      <mu-expansion-panel v-for="item in seminars" :key="item.name">
        <div slot="header" class="panel-header">{{item.name}}</div>
        <div class="divider"></div>
        <div class="table-item">
          <span class="item-title"></span>
          <span class="left-title">组长：</span>
          <span>24320162202906 &nbsp;&nbsp;&nbsp;谭源杰&nbsp;&nbsp;</span>
          <span class="item-course">J2EE</span>
        </div>
        <div class="divider"></div>
        <div class="table-item">
          <span class="item-title"></span>
          <span class="left-title" style="float: left">组员：</span>
          <span>24320162202917 &nbsp;&nbsp;&nbsp;王圣哲&nbsp;&nbsp;</span>
        </div>
        <div class="divider"></div>
        <div class="table-item">
          <span class="item-title"></span>
          <span class="left-title" style="float: left;visibility: hidden">组员：</span>
          <span>24320162202906 &nbsp;&nbsp;&nbsp;任剑鹏&nbsp;&nbsp;</span>
          <span class="item-course">J2EE</span>
        </div>
        <div class="divider"></div>

      </mu-expansion-panel>
    </div>
    <div style="height: 8vh"></div>
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
            name:'1-1 咕咕鸟队',
            // isMainCourse:true,
          },
          {
            name:'1-2 早早鸟',
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
  #TeacherStuTeams{
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
        font-size: 16px;
        text-align: left;

        .item-course{
          font-weight: bold;
          color: dodgerblue
        }

        .left-title{
          float: left;
          color: dodgerblue;
          font-weight: bold
        }

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
