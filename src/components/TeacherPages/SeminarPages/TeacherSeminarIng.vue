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
        <transition name="slide-fade" class="transition-box">
          <span class="title">讨论课</span>
        </transition>
        <span>&nbsp;&nbsp;</span>
      </div>
    </div>
    <div class="app-bar-blank"></div>
    <div class="main-content">
      <div class="seminar-title">
        <div class="title-content">
          <span>正在进行：{{seminarTitle}}<i class="el-icon-loading"/> </span>
        </div>
      </div>
      <div class="seminar-bar">
        <el-row class="bar-row">
          <el-col class="pre-list-col">
            <div class="box-title">展示列表</div>
            <div class="pre-list">

              <div :class="item.teamClass" v-for="item,index in preTeams" :key="index" @click="choosePreTeam(index)">
                {{item.teamSerial}}
              </div>

            </div>
          </el-col>
          <el-col class="operation-list-col">
            <div class="operation-box">
              <div class="operation-box-title">
                <span>正在展示</span><br/>
                <span>{{chooseTeam}}</span>
                <span>{{chooseTeamName}}</span><br/>
                <i class="el-icon-loading"></i>
              </div>
              <div class="operation-grade">
                <span>展示得分</span><br/>
                <input class="grade-input"/>
              </div>
            </div>
            <div class="button-panel">
              <mu-button color="error">下组展示</mu-button>
              <mu-button color="error">抽取提问</mu-button>
            </div>
          </el-col>
          <el-col class="ques-list-col">
            <div class="ques-title">提问列表</div>
            <div class="pre-list-item">
              1-6
            </div>
            <div class="pre-list-item-un">
              1-7
            </div>
          </el-col>
        </el-row>
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
            chooseTeamIndex:0,
            chooseTeam:'1-6',
            chooseTeamName:'咕咕鸟',
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
            webSocketAddress:'',
            preTeams:[
              {
                teamSerial:'1-6',
                teamName:'咕咕鸟',
                teamClass:'pre-list-item-un'
              },
              {
                teamSerial:'1-7',
                teamName:'晚晚鸟',
                teamClass:'pre-list-item-un'
              }
            ],
            chosenStyle:{
              color: 'white',
              fontWeight: 'bold'
            },
            chosenItemStyle:{
              backgroundColor:'lightgrey'
            }
          }
      },
      mounted() {
        this.$data.classId=this.$route.query.classId;
        this.$data.courseId=this.$route.query.courseId;
        this.$data.seminarId=this.$route.query.seminarId;
        this.$data.klassSeminarId=this.$route.query.klassSeminarId;
        // this.loadPreTeams();
        // this.getWebSocketAddress();
        this.$data.preTeams[this.$data.chooseTeamIndex].teamClass='pre-list-item';

      },
      methods:{
        choosePreTeam(index){
          this.$data.preTeams[this.$data.chooseTeamIndex].teamClass='pre-list-item-un';
          this.$data.chooseTeamIndex=index;
          this.$data.chooseTeamName=this.$data.preTeams[this.$data.chooseTeamIndex].teamName;
          this.$data.preTeams[this.$data.chooseTeamIndex].teamClass='pre-list-item';

        },
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
        loadPreTeams(){
          let _this=this;
          this.$axios({
            method:'get',
            url:'/attendance/'+this.$data.klassSeminarId
          }).then(function (response) {
            _this.$data.preTeams=response.data;
          })
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
          this.$data.socket.onmessage=function (msg) {
            console.log(msg);
            if(msg.data==='200'){
              this.$message({
                type:'success',
                message:'连接成功！正式开始上课！'
              })
            }
          };


        },
        webSocketOnOpen(){
          // alert('成功！')
        },
        webSocketSend(){
          this.$data.socket.send("1");
        },
        loadQuestion(){
          let _this=this;
          this.$axios({
            method:'get',
            url:'/question/nextQuestion',
            params:{
              attendanceId:this.$data.chooseTeam
            }
          }).then(function (response) {

          }).catch(function (error) {

          })
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
      /*margin-top: 4vh;*/

      .seminar-title{
        /*color: black;*/
        text-align: left;
        font-weight: bold;
        font-size: 25px;
        padding-left: 8px;
      }


      .seminar-bar{
        margin-top: 2vh;
        width: 100%;

        .bar-row{
          width: 100%;

          .pre-list-col{
            width: 26%;
            /*background-color: darkkhaki;*/

            .box-title{
              text-align: left;
              font-weight: bold;
              margin-left: 2px;
              /*margin-bottom: 5px;*/
            }

            .pre-list-item{
              line-height: 55px;
              margin-top: 4px;
              margin-left: 2px;
              width: 55px;
              height: 55px;
              background-color: #dd6161;
              border-radius: 50%;
              box-shadow: 1px 1px 4px darkgrey;
              color: white;
            }

            .pre-list-item-un{
              line-height: 55px;
              margin-top: 4px;
              margin-left: 2px;
              width: 55px;
              height: 55px;
              background-color: white;
              border-radius: 50%;
              box-shadow: 1px 1px 4px darkgrey;
            }


          }

          .operation-list-col{
            width: 44%;
            /*background-color: darkgrey;*/
            .operation-box{
              padding: 1px;
              width: 98%;
              margin-left: auto;
              margin-right: auto;
              height: 200px;
              background: -webkit-linear-gradient(right, #00b2ee, #63b8ff); /* Safari 5.1 - 6.0 */
              background: -o-linear-gradient(right, #00b2ee, #63b8ff); /* Opera 11.1 - 12.0 */
              background: -moz-linear-gradient(right, #00b2ee, #63b8ff); /* Firefox 3.6 - 15 */
              background: linear-gradient(right, dodgerblue , 	#87cefa); /* 标准的语法（必须放在最后） */
              border-radius: 6px;
              box-shadow: 0 0 6px lightgrey;

              .operation-box-title{
                margin-top: 5px;
                color: white;
                font-size: 20px;
                font-weight: bold;
                .el-icon-loading{
                  font-size: 30px;
                }
              }

              .operation-grade{
                margin-top: 20px;
                color: white;
                font-size: 20px;
                font-weight: bold;
                .grade-input{
                  width: 60px;
                  background-color: transparent;
                  outline: none;
                  border: none;
                  border-bottom:1px solid #ffffff;
                }
              }



            }

            .button-panel{
              margin-top: 20px;

              .mu-button{
                margin-top: 10px;
                width: 120px;
                background-color: #dd6161;
              }
            }

          }

          .ques-list-col{
            /*float: right;*/
            width: 26%;

            .ques-title{
              text-align: right;
              font-weight: bold;
              margin-right: 1px;
            }
            .pre-list-item{
              float: right;
              line-height: 55px;
              margin-top: 4px;
              margin-right: 2px;
              width: 55px;
              height: 55px;
              background-color: #dd6161;
              border-radius: 50%;
              box-shadow: 1px 1px 4px darkgrey;
              color: white;
            }

            .pre-list-item-un{
              float: right;
              line-height: 55px;
              margin-top: 4px;
              margin-right: 2px;
              width: 55px;
              height: 55px;
              background-color: white;
              border-radius: 50%;
              box-shadow: 1px 1px 4px darkgrey;
            }
            /*background-color: #4cae4c;*/
          }








        }


      }


    }
  }

</style>
