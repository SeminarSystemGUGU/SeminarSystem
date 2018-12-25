<template>
  <div id="TeacherSeminar">
    <div class="app-bar">
      <div :class="iconClass" ref="iconUse">
        <i class="el-icon-back" @click="linkBack"></i>
        <!--<span class="">轮次设置</span>-->
        <transition name="slide-fade" class="transition-box">
          <span class="title">讨论课详情</span>
        </transition>
        <span>&nbsp;&nbsp;</span>
      </div>
    </div>
    <div class="app-bar-blank"></div>
    <!--<app-bar :show-messages="true" title-name="讨论课详情" backPath="/TeacherCourseRounds"></app-bar>-->
    <div class="main-content" v-loading="isLoading" v-show="!isLoading">
      <div class="course-title">
        <span>{{seminarName}}<i v-if="seminarStatus==='2'" class="el-icon-loading"></i>
                             <i v-if="seminarStatus==='3'" class="el-icon-circle-check-outline"></i> </span>
        <div class="divider"></div>
      </div>
      <div class="course-grade-requirments">
        <el-row>
          <el-col class="row-col">
            <span>轮次：</span>
          </el-col>
          <el-col class="row-col">
            <span>第{{roundSerial}}轮</span><br/>
          </el-col>
        </el-row>
      </div>
      <div class="course-grade-requirments">
        <el-row>
          <el-col class="row-col">
            <span>班级：</span>
          </el-col>
          <el-col class="row-col">
            <span>{{grade}}级{{klassSerial}}班</span><br/>
          </el-col>
        </el-row>
      </div>
      <div class="course-grade-requirments">
        <el-row>
          <el-col class="row-col">
            <span>地点：</span>
          </el-col>
          <el-col class="row-col">
            <span>{{klassLocation}}</span><br/>
          </el-col>
        </el-row>
      </div>
      <div class="course-grade-requirments">
      <el-row>
        <el-col class="row-col">
          <span>时间：</span>
        </el-col>
        <el-col class="row-col">
          <span>{{klassTime}}</span><br/>
        </el-col>
      </el-row>
    </div>
      <div class="course-team-requirments">
        <el-row>
          <el-col class="row-col">
            <span>要求：</span>
          </el-col>
          <el-col class="row-col1">
            <span>{{seminarRequirments}}</span>
          </el-col>
        </el-row>
      </div>
      <div class="course-team-requirments">
        <el-row>
          <el-col class="row-col">
            <span>课程状态：</span>
          </el-col>
          <el-col class="row-col">
            <span class="not-start-status" v-if="seminarStatus===0">未开始</span>&nbsp;
            <span class="see-seminar-info" v-if="seminarStatus===0" @click="linkToApply">报名信息</span>
            <span class="doing-status" v-else-if="seminarStatus===1"><i class="el-icon-loading"></i>正在进行</span>
            <span class="doing-status" v-else-if="seminarStatus===3">已暂停</span>
            <span class="end-status" v-else="seminarStatus===2">已结束<i class="el-icon-circle-check-outline"></i> </span>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="button-panel" v-show="!isLoading">
      <div>
      <el-button type="danger" class="start-button" v-if="seminarStatus===0" @click="GotoSeminar">开始讨论课</el-button>
      </div>
      <div class="button-pel">
      <el-button type="danger" class="start-button" v-if="seminarStatus===0" @click="deleteSeminar">删除讨论课</el-button>
      </div>
      <el-button type="primary" class="doing-button" v-if="seminarStatus===1" @click="doSeminar">进入讨论课</el-button>
      <el-button type="primary" class="doing-button" v-if="seminarStatus===3" @click="doSeminar">进入讨论课</el-button>
      <el-button type="success" class="end-button" v-if="seminarStatus===2" @click="linkToReport">报告打分</el-button><br/>
      <el-button type="success" class="end-button" v-if="seminarStatus===2" @click="linkToGrades">查看成绩</el-button>
    </div>
  </div>
</template>

<script>
  import AppBar from '../../ReuseComponents/AppBar'
  import App from "../../../App";
  export default {
    name: "TeacherCourseDetails",
    components:{
      AppBar
    },
    data(){
      return {
        isLoading:true,
        grade:'',
        klassSerial:'',
        klassTime:'',
        iconClass:'back-icon',
        klassSeminarId:'',
        klassLocation:'',
        courseId:'',
        classId:'',
        seminarId:'',
        seminarName:'',
        seminarTopic:'对象模型',
        roundSerial:'1',
        seminarRequirments:'每个组15分钟，要求为展示所做的对象模型和数据库设计',
        seminarStatus:0,
      }
    },
    methods:{
      deleteSeminar(){
        let _this=this;
        this.$axios({
          method:'delete',
          url:'/seminar/'+this.$data.seminarId+'/class/'+this.$data.classId
        }).then(function (response) {
          if(response.data===true){
            _this.$message({
              type:'success',
              message:'删除成功！'
            });
            history.back();
          }else{
            _this.$message({
              type:'error',
              message:'删除失败！'
            })
          }
        }).catch(function (error) {
          _this.$message({
            type:'error',
            message:'删除失败！'
          })
        })
      },
      doSeminar(){
        let _this=this;
        this.$router.push({path:'/TeacherSeminarIng',query:{courseId:_this.$data.courseId,
            klassSeminarId:_this.$data.klassSeminarId,
            classId:this.$data.classId,
            seminarId:this.$data.seminarId}});
      },
      GotoSeminar(){
        let _this=this;
        this.$axios({
          method:'put',
          url:'/seminar/'+this.$data.seminarId+'/class/'+this.$data.classId+'/status',
          data:{
            status:1
          }
        }).then(function (response) {
          if(response.data===true){
            _this.$router.push({path:'/TeacherSeminarIng',query:{courseId:_this.$data.courseId,
                klassSeminarId:_this.$data.klassSeminarId,
                classId:_this.$data.classId,
                seminarId:_this.$data.seminarId}});
          }
        })

      },
      loadSeminarClass(){
        let _this=this;
        this.$axios({
          method:'get',
          url:'/seminar/'+this.$data.seminarId+'/class/'+this.$data.classId,
        }).then(function (response) {
          console.log(response.data);
          _this.$data.seminarName=response.data.seminarEntity.seminarName;
          _this.$data.seminarRequirments=response.data.seminarEntity.introduction;
          _this.$data.seminarStatus=response.data.status;
          _this.$data.grade=response.data.klassEntity.grade;
          _this.$data.klassSerial=response.data.klassEntity.klassSerial;
          _this.$data.klassSeminarId=response.data.klassSeminarId;
          _this.$data.klassLocation=response.data.klassEntity.klassLocation;
          _this.$data.klassTime=response.data.klassEntity.klassTime;
          _this.$data.isLoading=false;
        })
      },
      loadRoundInfos(){
        let _this=this;
        this.$axios({
          method:'get',
          url:'/round/'+this.$data.roundId
        }).then(function (response) {
          _this.$data.roundSerial=response.data.roundSerial
        })
      },
      linkBack(){
        this.$router.push({path:'/TeacherCourseRounds',query:{courseId:this.$data.courseId}})
      },
      linkToReport(){
        this.$router.push('/TeacherAfterSeminar');
      },
      linkToGrades(){
        this.$router.push({path:'/TeacherSeminarGrades',query:{klassSeminarId:this.$data.klassSeminarId,classId:this.$data.classId,seminarId:this.$data.seminarId,courseId:this.$data,courseId}});
      },
      linkToApply(){
        this.$router.push({path:'/TeacherApplyInfo',query:{klassSeminarId:this.$data.klassSeminarId,classId:this.$data.classId,seminarId:this.$data.seminarId}});
      }
    },

    created(){
      this.$data.classId=this.$route.query.classId;
      this.$data.courseId=this.$route.query.courseId;
      this.$data.roundId=this.$route.query.roundId;
      this.$data.seminarId=this.$route.query.seminarId;
      // this.loadSeminarDetails();
      this.loadSeminarClass();
      this.loadRoundInfos();



      // this.loadCourseDetails();
    }

  }
</script>

<style scoped lang="less">
  #TeacherSeminar{
    width: 100vw;


    .button-pel{
      margin-top: 10px;
    }

    .app-bar-blank{
      height: 10vh;
      max-height: 60px;
    }

    .transition-box{
      transition: all 0.8s;
    }

    .row-col{
      width: 40%;
    }

    .row-col{
      width: 70%;
    }

    .app-bar {
      padding: 0.1px;
      height: 10vh;
      max-height: 60px;
      position: fixed;
      z-index: 1000;


      .back-icon {
        z-index: 1000;
        /*width: 40vw;*/
        /*height: 10vh;*/
        /*max-height: 60px;*/
        background-color: white;
        color: dodgerblue;
        padding-left: 4vw;
        font-size: 25px;
        padding-top: 1vh;
        line-height: 25px;
        padding-bottom:5px;


        .title{
          color: black;
          font-size: 20px;
          font-weight: bold;
          /*line-height: 25px;*/
        }
      }
    }

    .see-seminar-info{
      color: dodgerblue;
      font-weight: normal;
      font-size: 15px;
      text-decoration: underline;
    }


    .button-panel{
      margin-top: 8vh;
      .el-button{
        font-size: 17px;
      }

      .start-button{
        width: 80vw;
      }

      .doing-button{
        width: 80vw;
      }

      .end-button{
        margin-top: 1vh;
        width: 80vw;
        background-color: #5daf34;
      }
    }

    .main-content{
      width: 80%;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;

      .not-start-status{
        color: orangered;
      }
      .doing-status{
        color: dodgerblue;
      }
      .end-status{
        color: #5daf34;
      }




      .row-col{
        width: 50%;
      }
      .row-col1{
        width: 100%;
      }

      .course-title{
        margin-top: 3vh;
        text-align: left;
        font-size: 24px;
        font-weight: bold;
      }

      .course-grade-requirments{
        margin-top: 2vh;
        text-align: left;
        font-size: 18px;
        font-weight: bold;
      }

      .course-team-requirments{
        margin-top: 4vh;
        text-align: left;
        font-size: 18px;
        font-weight: bold;
      }


      .divider{
        margin-top: 1vh;
        width: 100%;
        height: 2px;
        background-color: dodgerblue;
      }
    }
  }
</style>
