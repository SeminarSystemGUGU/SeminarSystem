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
        <span>展示小组：{{preTeams[preTeamIndex].teamStatus}}</span>
      </div>
      <div class="seminar-bar">
        <el-row class="bar-row">
          <el-col class="pre-list-col">
            <div class="box-title">展示列表</div>
            <div class="pre-list">
              <div :class="item.teamClass" v-for="item,index in preTeams" :key="index" @click="choosePreTeam(index,0)">
                {{item.teamSerial}}
              </div>
            </div>
          </el-col>
          <el-col class="operation-list-col">
            <div class="operation-box">
              <div class="operation-box-title">
                <span v-if="teamStatus===4">提问结束</span>
                <span v-if="teamStatus===3">正在提问</span>
                <span v-if="teamStatus===2">展示结束</span>
                <span v-if="teamStatus===1">正在展示</span>
                <span v-if="teamStatus===0">准备展示</span><br/>
                <!--<span>{{chooseTeam}}</span>-->
                <span>{{chooseTeamName}}</span><br/>

                <i v-if="teamStatus===2||teamStatus===4" class="el-icon-circle-check-outline"></i>
                <i v-if="teamStatus===1||teamStatus===3" class="el-icon-loading"></i>
                <i v-if="teamStatus===0" class="el-icon-time"></i>
              </div>
              <div class="operation-grade" v-if="teamStatus!==0">
                <span>得分</span><br/>
                <input v-if="teamStatus===4" class="grade-input" v-model="formModifyQuestion.quesScore">
                <input v-if="teamStatus===3" class="grade-input" v-model="quesTeams[quesTeamIndex].quesScore">
                <input v-if="teamStatus===2" class="grade-input" v-model="formModify.preScore" />
                <input v-if="teamStatus===1" class="grade-input" v-model="preTeams[preTeamIndex].preScore" /><br/>
                <el-button v-if="teamStatus===2" type="text" class="modify-button" @click="modifyTeamPreScore">修改</el-button>
                <el-button v-if="teamStatus===4" type="text" class="modify-button" @click="modifyQuesScore">修改</el-button>
                <!--<el-button v-if="teamStatus===2" type="text" class="modify-button">放弃</el-button>-->
              </div>
            </div>
            <div class="button-panel">
              <mu-button color="error" @click="nextPreTeam">下组展示</mu-button>
              <mu-button color="error" @click="loadQuestion">抽取提问</mu-button>
            </div>
          </el-col>
          <el-col class="ques-list-col">
            <div class="ques-title">提问列表</div>
            <div :class="item.teamClass" v-for="item,index in quesTeams"  @click="choosePreTeam(index,3)">
              {{item.teamSerial}}
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
      computed:{
        teamStatus(){
          if(this.$data.chooseType==0) {
            return this.$data.preTeams[this.$data.chooseTeamIndex].status + this.$data.chooseType;
          }else{
            return this.$data.quesTeams[this.$data.chooseTeamIndex].status+this.$data.chooseType;
          }
        }
      },
      data(){
          return{
            chooseType:0,  //0:pre  3:ques
            chooseTeamIndex:0,
            preTeamIndex:0,
            preTeamName:'',
            quesTeamIndex:0,
            chooseTeam:'1-6',
            chooseTeamName:'',
            seminarId:'',
            classId:0,
            classSerial:'0',
            reportTime:'',
            openSimple:false,
            iconClass:'back-icon-use',
            seminarTitle:'业务流程分析',
            isQuestion:false,
            socket:null,
            klassSeminarId:'',
            courseId:'',
            formModifyQuestion:{
              quesScore:0,
            },
            formModify:{
              preScore:'',
            },
            webSocketAddress:'',
            preTeams:[
            ],
            quesTeams:[
              {
                id:0,
                teamSerial: '1-6',
                quesScore:0,
                status:0,
                teamClass:'pre-list-item-un'
              },
              {
                id:1,
                teamSerial: '1-8',
                quesScore:0,
                status:0,
                teamClass:'pre-list-item-un'
              },
              {
                id:2,
                teamSerial: '1-10',
                quesScore:0,
                status:0,
                teamClass:'pre-list-item-un'
              }
            ],

          }
      },
      mounted() {
        this.$data.classId=this.$route.query.classId;
        this.$data.courseId=this.$route.query.courseId;
        this.$data.seminarId=this.$route.query.seminarId;
        this.$data.classSerial=this.$route.query.classSerial;
        this.$data.klassSeminarId=this.$route.query.klassSeminarId;
        this.loadPreTeams();
        // this.getWebSocketAddress();

      },
      methods:{
        /**
         * 修改展示小组的成绩
         **/
        modifyTeamPreScore(){
          this.$data.preTeams[this.$data.chooseTeamIndex].preScore=this.$data.formModify.preScore;
        },
        /**
         * 下一个展示小组
         **/
        nextPreTeam(){
          this.$data.preTeams[this.$data.preTeamIndex].status=2;
          // this.$data.preTeams[this.$data.preTeamIndex].preScore=this.formModify.preScore;
          if(this.$data.preTeamIndex===this.$data.preTeams.length-1){
            this.$message({
              type:'success',
              message:'展示组已全部展示完！'
            })
          }
          this.$data.preTeamIndex++;
          this.$data.preTeams[this.$data.preTeamIndex].status=1;
          this.choosePreTeam(this.$data.preTeamIndex,0);
        },
        /**
         * 选择列表中某一个队伍
         **/
        choosePreTeam(index,type){
          console.log(this.$data.quesTeams);

          if(this.$data.chooseType==0) {
            console.log(111);
            this.$data.preTeams[this.$data.chooseTeamIndex].teamClass = 'pre-list-item-un';
          }else{
            console.log(777);
            this.$data.quesTeams[this.$data.chooseTeamIndex].teamClass = 'pre-list-item-un';
          }
          this.$data.chooseTeamIndex = index;

          if(type===0) {
            this.$data.formModify.preScore = this.$data.preTeams[this.$data.chooseTeamIndex].preScore
            this.$data.chooseTeamName = this.$data.preTeams[this.$data.chooseTeamIndex].teamSerial;
            this.$data.preTeams[this.$data.chooseTeamIndex].teamClass = 'pre-list-item';
            this.$data.chooseType=0;
          }else{
            this.$data.formModifyQuestion.quesScore=this.$data.quesTeams[this.$data.chooseTeamIndex].quesScore;
            this.$data.chooseTeamName=this.$data.quesTeams[this.$data.chooseTeamIndex].teamSerial;
            this.$data.quesTeams[this.$data.chooseTeamIndex].teamClass = 'pre-list-item';
            this.$data.chooseType=3;
          }
        },
        /**
         * 设置报告的时间
         **/
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
        /**
         * 获取展示的小组
         **/
        loadPreTeams(){
          let _this=this;
          this.$axios({
            method:'get',
            url:'/attendance/'+this.$data.klassSeminarId
          }).then(function (response) {
            // _this.$data.preTeams=response.data;
            for(let index=0;index<response.data.length;index++){
              _this.$data.preTeams.push({
                teamSerial:_this.$data.classSerial+'-'+response.data[index].teamEntity.teamSerial,
                teamClass:'pre-list-item-un',
                id:response.data.id,
                klassSeminarId: response.data.klassSeminarId,
                teamOrder:response.data.teamOrder,
                status:0,
                preScore:0,
              });
            }
            _this.choosePreTeam(0,0);
            _this.$data.preTeams[_this.$data.preTeamIndex].status=1;
            // _this.$data.preTeams[_this.$data.chooseTeamIndex].teamClass='pre-list-item';
            console.log(_this.$data.preTeams);
          })
        },
        /**
         * 设置讨论课状态
         */
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
        /**
         * 获取websocket地址
         */
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
        /**
         * 初始化websocket
         */
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
        /**
         * websocket打开时
         */
        webSocketOnOpen(){
          // alert('成功！')
        },
        /**
         * websocket发送消息
         */
        webSocketSend(){
          this.$data.socket.send("1");
        },
        /**
         * 修改提问小组的分数
         */
        modifyQuesScore(){
          this.$data.quesTeams[this.$data.chooseTeamIndex].quesScore=this.$data.formModifyQuestion.quesScore;
        },
        /**
         * 获取下一个提问,id为attendanceid
         */
        loadQuestion(){

          if(this.$data.chooseType==0) {
            console.log(111);
            this.$data.preTeams[this.$data.chooseTeamIndex].teamClass = 'pre-list-item-un';
          }else{
            if(this.$data.quesTeams.length===0){

            }else {
              console.log(777);
              this.$data.quesTeams[this.$data.chooseTeamIndex].teamClass = 'pre-list-item-un';
            }
          }
          if(this.$data.quesTeams.length!==0) {
            this.$data.quesTeams[this.$data.quesTeamIndex].status = 1;
            //提问打分
            let _this=this;
            this.$axios({
              method:'put',
              url:'/question/'+this.$data.quesTeams[this.$data.quesTeamIndex].id+'/score',
              params:{
                score:this.$data.quesTeams[this.$data.quesTeamIndex].quesScore
              }
            }).then(function (response) {
              _this.$data.quesTeamIndex++;
            })
          }



          //下一个提问
          
          this.$data.chooseTeamIndex=this.$data.quesTeamIndex;
          this.$data.formModifyQuestion.quesScore=this.$data.quesTeams[this.$data.chooseTeamIndex].quesScore;
          this.$data.chooseTeamName=this.$data.quesTeams[this.$data.chooseTeamIndex].teamSerial;
          this.$data.quesTeams[this.$data.chooseTeamIndex].teamClass = 'pre-list-item';
          this.$data.chooseType=3;

          // let _this=this;
          // this.$axios({
          //   method:'get',
          //   url:'/question/nextQuestion',
          //   params:{
          //     attendanceId:this.$data.chooseTeam
          //   }
          // }).then(function (response) {
          //
          // }).catch(function (error) {
          //
          // })
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

    .modify-button{
      color: white;
    }

    .app-bar-blank{
      height: 10vh;
      max-height: 60px;
    }

    .transition-box{
      transition: all 0.8s;
    }

    .el-icon-time{
      margin-top: 30px;
      font-size: 40px;
    }

    .el-icon-circle-check-outline{
      font-size: 30px;
    }


    .app-bar {
      padding: 0.1px;
      height: 10vh;
      max-height: 60px;
      position: fixed;
      z-index: 1000;
      .back-icon-use{
        border-bottom-right-radius: 20px;
        -moz-box-shadow:0px 0px 2px whitesmoke;
        -webkit-box-shadow:0px 0px 2px whitesmoke;
        box-shadow:0px 0px 2px whitesmoke;
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
                margin-top: 10px;
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
