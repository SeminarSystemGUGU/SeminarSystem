<template>
  <div id="TeacherSeminarIng">
    <el-dialog title="结束讨论课" width="70%" :visible.sync="openSimple">
      讨论课已结束，请设置书面报告截止时间：<br/><br/>
      <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" v-model="reportTime"></el-date-picker>
      <div class="dialog-button">
        <el-button type="text" @click="setReportTime">确定</el-button>
      </div>
    </el-dialog>
    <div class="app-bar">
      <div :class="iconClass" ref="iconUse">
        <i class="el-icon-back" @click="linkBack"></i>
        <!--<span class="">轮次设置</span>-->
        <transition name="slide-fade" class="transition-box">
          <span class="title">讨论课</span>
        </transition>
        <span>&nbsp;&nbsp;</span>
      </div>
    </div>
    <div class="app-bar-blank"></div>
    <!--<AppBar title-name="讨论课-正在进行"></AppBar>-->
    <div class="main-content">
      <div class="seminar-title">
        <el-row>
          <el-col class="title-col">
            <span>正在进行：{{seminarTitle}}&nbsp<i class="el-icon-loading"/> </span>
          </el-col>
          <el-col class="stop-col">
            <span>暂停</span>
          </el-col>
        </el-row>
      </div>
      <div class="seminar-tooltip">
        <el-row>
          <el-col class="pre-col">
            <span>正在展示：1-6小组 5分钟</span>
          </el-col>
          <el-col class="que-col">
            <span>已有1位同学提问</span>
          </el-col>
        </el-row>
      </div>
      <div class="seminar-main">
        <el-row>
          <el-col class="pre-list-col">
            <div class="list-left">
              <div class="pre-list-item" style="background-color: lightgrey">
                <span style="color: white;font-weight: bold">1-6</span>
              </div>
              <div class="pre-list-item">
                <span>1-6</span>
              </div>
              <div class="pre-list-item">
                <span>1-6</span>
              </div>

              <div class="pre-list-item">
                <span>1-6</span>
              </div>
            </div>
          </el-col>
          <el-col class="grade-list-col">
            <span class="grade-input-title">展示分数：</span>
            <input class="grade-input"/>
          </el-col>
          <el-col class="que-list-col">
            <div class="list-right">
              <div class="pre-list-item">
                <span>1-6</span>
              </div>
              <div class="pre-list-item">
                <span>1-6</span>
              </div>
              <div class="pre-list-item">
                <span>1-6</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="button-panel">
        <el-button v-show="isQuestion" type="primary">提交分数</el-button>
        <el-button v-show="!isQuestion" type="primary">下个提问</el-button>
        <el-button v-show="!isQuestion" type="primary">下个展示</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import AppBar from '../../ReuseComponents/AppBar'
    export default {
        name: "TeacherSeminarIng",
      components:{
          AppBar
      },
      data(){
          return{
            seminarId:'',
            classId:'',
            reportTime:'',
            openSimple:false,
            iconClass:'back-icon',
            seminarTitle:'业务流程分析',
            isQuestion:false,
            socket:null,
            klassSeminarId:'',
            courseId:'',
            webSocketAddress:''
          }
      },
      created() {
          // this.initWebSocket();


        this.$data.classId=this.$route.query.classId;
        this.$data.courseId=this.$route.query.courseId;
        this.$data.seminarId=this.$route.query.seminarId;
        this.$data.klassSeminarId=this.$route.query.klassSeminarId;
        this.getWebSocketAddress();
        // this.setSeminarStatus();
      },
      methods:{
        setReportTime(){
          let reportTime=this.$data.reportTime;
          if(this.$data.reportTime) {
            let _this = this;
            this.$axios({
              method: 'put',
              url: '/seminar/' + this.$data.seminarId + '/class/' + this.$data.classId + '/reportddl',
              params: {
                date: reportTime
              }
            }).then(function (response) {
              if (response.data === true) {
                _this.$message({
                  type: 'success',
                  message: '设置成功！'
                });
                _this.$data.simpleOpen=false;
                _this.setSeminarStatus();
              }
            })
          }else{
            this.$message({
              type:'error',
              message:'请设置时间！'
            })
          }
        },
        setSeminarStatus(){
          let _this=this;
          this.$axios({
            method:'put',
            url:'/seminar/'+this.$data.seminarId+'/class/'+this.$data.classId+'/status',
            data:{
              status:2
            }
          }).then(function (response) {
            if(response.data===true){
              _this.$router.push('/TeacherMyCourses');
            }
          })
        },
        getWebSocketAddress(){
          let _this=this;
          this.$axios({
            method:'get',
            url:'/seminar/'+this.$data.klassSeminarId+'/seminarEnter'
          }).then(function (response) {
            _this.$data.webSocketAddress=response.data;
            _this.initWebSocket();
          })
        },
        initWebSocket(){
          this.$data.socket=new WebSocket(this.$data.webSocketAddress);
          this.$data.socket.onopen=this.webSocketOnOpen();
          this.$data.socket.onmessage=this.webSocketOnMessage();

        },
        webSocketOnOpen(){
          // alert('成功！')
        },
        webSocketSend(){

        },
        webSocketOnMessage(e){
          console.log(e);
          // const redata=JSON.parse(e.);
          // console.log(redata.value);
        },
        linkBack(){
          history.back();
        }
      }

    }
</script>

<style lang="less">
  #TeacherSeminarIng{

    .dialog-button{
      margin-top: 20px;
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

    .main-content{
      margin-top: 4vh;
      .seminar-title{
        /*background-color: dodgerblue;*/
        margin-left: 5vw;
        text-align: left;
        font-size: 20px;
        font-weight: bold;


        .title-col{
          width: 80%;
          overflow: hidden;
        }

        .stop-col{
          width: 20%;
          color: orangered;
        }


      }

      .seminar-tooltip{
        margin-top: 2vh;
        text-align: left;
        margin-left: 3vw;
        font-size: 14px;
        color: dodgerblue;


        .pre-col{
          width: 60%;
        }

        .que-col{
          width: 40%;
        }


      }


      .button-panel{
        margin-top: 4vh;

        .el-button{
          width: 40%;
          height: 50px;
          display: block;
          margin-left: auto;
          margin-right: auto;
          margin-top: 10px;
        }
      }

      .seminar-main{
        margin-top: 3vh;

        .list-left {
          width: 80%;
          border-right: 0.5px solid lightgrey;
          .pre-list-item {
            height: 50px;
            line-height: 50px;
            font-size: 19px;
          }
        }

        .list-right {
          width: 80%;
          border-left: 1px solid lightgrey;
          .pre-list-item {
            height: 50px;
            line-height: 50px;
            font-size: 19px;
          }
        }
        .grade-input-title{
          display: block;
          margin-top: 3vh;
          font-weight: bold;
        }


        .grade-input{
          margin-top: 11px;
          height: 13vh;
          width: 60%;
          font-size: 40px;
          text-align: center;
          outline: none;
        }


        .pre-list-col{
          width: 24%;
        }

        .que-list-col{
          width: 24%;
          float: right;
        }

        .grade-list-col{
          margin-left: 4vw;
          /*margin-left: auto;*/
          /*margin-right: auto;*/
          width: 45%;
          font-size: 20px;
        }

      }


    }
  }

</style>
