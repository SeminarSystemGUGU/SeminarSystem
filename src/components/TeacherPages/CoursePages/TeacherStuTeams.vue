<template>
  <div id="TeacherStuTeams">
    <app-bar titleName="学生组队" :showMessages="false" backPath="/TeacherMainPage"></app-bar>
    <div class="main-content" v-loading="isLoading">
      <span v-show="noItem" class="no-item-message">暂无组队信息哦~</span>
      <mu-expansion-panel v-for="item in teams" :key="item.teamId" v-show="!noItem">
        <div slot="header" class="panel-header">{{item.teamName}}</div>
        <div class="divider"></div>
        <div class="table-item">
          <span class="item-title"></span>
          <span class="left-title">组长：</span>
          <span>{{item.leader.account}}&nbsp;&nbsp;&nbsp;{{item.leader.studentName}}&nbsp;&nbsp;</span>
          <!--<span class="item-course">J2EE</span>-->
        </div>
        <div v-for="member in item.members">
          <div class="divider"></div>
          <div class="table-item">
            <span class="item-title"></span>
            <span class="left-title" style="float: left">组员：</span>
            <span>{{member.account}}&nbsp;&nbsp;&nbsp;{{member.studentName}}&nbsp;&nbsp;</span>
          </div>
        </div>
        <div class="divider"></div>
      </mu-expansion-panel>
    </div>
    <div style="height: 8vh"></div>
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
        noItem:false,
        courseId:'',
        isLoading:false,
        teams:[
          {
            status:0,
            teamName:'1-1 咕咕鸟队',
            teamId:'',
            courseId:'',
            klassId:'',
            leader:{
              acoount:'',
              email:'',
              id:'',
              isActive:'',
              studentName:''
            },
            members:[
              {
                account:'',
                email:'',
                id:'',
                isActive:'',
                studentName:''
              }
            ],

            // isMainCourse:true,
          },

        ]
      }
    },
    methods:{
      linkToGrades(item){
        this.$router.push('/TeacherCourseGrades');
      },
      loadCourseTeams(){
        let _this=this;
        this.$axios({
          method:'get',
          url:'/course/'+this.$data.courseId+'/teams'
        }).then(function (response) {
          console.log(response.data);
          _this.$data.noItem = response.data.length === 0;
          _this.$data.teams=response.data;
        })
      },
    },
    created(){
      this.$data.courseId=this.$route.query.courseId;
      this.loadCourseTeams();
    }
  }
</script>

<style scoped lang="less">
  #TeacherStuTeams{
    width: 100vw;

    .no-item-message{
      /*font-size: 15px;*/
      font-size: 18px;
      font-weight: bold;
      /*margin-left: auto;*/
      /*margin-right: auto;*/
      /*display: inline-block;*/
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
