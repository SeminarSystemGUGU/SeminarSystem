<template>
  <div id="TeacherSeminarIng">
    <el-dialog title="结束讨论课" width="70%" :visible.sync="openSimple" :show-close="false">
      讨论课已结束，请设置书面报告截止时间：（若放弃设置则设为今天）<br/><br/>
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
          <span>正在进行：{{seminarName}}<i class="el-icon-loading"/> </span>
        </div>
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
            <div class="pre-title">
              <span>展示小组：{{preTeams[preTeamIndex].teamSerial}}</span>
            </div>
            <div class="operation-box">
              <div class="operation-box-title">
                <span v-if="teamStatus===4">提问结束</span>
                <span v-if="teamStatus===3">正在提问</span>
                <span v-if="teamStatus===2">展示结束</span>
                <span v-if="teamStatus===1">正在展示</span>
                <span v-if="teamStatus===0">准备展示</span><br/>
                <!--<span>{{chooseTeam}}</span>-->
                <span>{{chooseTeamName}}</span><br/>
                <span>{{questionName}}</span> <br v-if="teamStatus===3||teamStatus===4" />
                <i v-if="teamStatus===2" class="el-icon-circle-check-outline"></i>
                <i v-if="teamStatus===1" class="el-icon-loading"></i>
                <i v-if="teamStatus===0" class="el-icon-time"></i>
              </div>
              <div class="operation-grade" v-if="teamStatus!==0">
                <span>得分</span><br/>
                <input v-if="teamStatus===4" class="grade-input" v-model="formModifyQuestion.quesScore">
                <input v-if="teamStatus===3" class="grade-input" v-model="formModifyQuestion.quesScore">
                <input v-if="teamStatus===2" class="grade-input" v-model="formModify.score" />
                <input v-if="teamStatus===1" class="grade-input" v-model="preTeams[preTeamIndex].score" /><br/>
                <el-button v-if="teamStatus===2" type="text" class="modify-button" @click="modifyTeamPreScore">修改</el-button>
                <el-button v-if="teamStatus===4" type="text" class="modify-button" @click="modifyQuesScore">修改</el-button>
                <el-button v-if="teamStatus===3" type="text" class="modify-button" @click="modifyQuesScore">打分</el-button>
                <!--<el-button v-if="teamStatus===2" type="text" class="modify-button">放弃</el-button>-->
              </div>
            </div>
            <div class="button-panel">
              <mu-button color="error" @click="nextPreTeam" v-if="preTeamIndex===preTeams.length-1">结束讨论课</mu-button>
              <mu-button color="error" @click="nextPreTeam" v-else>下组展示</mu-button>
              <mu-button color="error" @click="webSocketSend">抽取提问</mu-button>
            </div>
          </el-col>
          <el-col class="ques-list-col">
            <div class="ques-title">提问列表</div>
            <div :class="item.teamClass" v-for="item,index in quesTeams"  @click="choosePreTeam(index,3)">
              {{item.teamEntity.klassSerial+'-'+item.teamEntity.teamSerial}}
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
          if(this.$data.chooseType===0) {
            return this.$data.preTeams[this.$data.chooseTeamIndex].status + this.$data.chooseType;
          }else{
            return this.$data.quesTeams[this.$data.chooseTeamIndex].status+this.$data.chooseType;
          }
        },
        questionName(){
          if(this.$data.chooseType===3){
            return this.$data.quesTeams[this.$data.chooseTeamIndex].studentEntity.studentName;
          }
        }
      },
      data(){
          return{
            overStatus:false,
            seminarName:'',
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
            isQuestion:false,
            socket:null,
            klassSeminarId:'',
            courseId:'',
            formModifyQuestion:{
              quesScore:0,
            },

            formModify:{
              score:'',
            },
            webSocketAddress:'',
            preTeams:[
            ],
            quesTeams:[
              // {
              //   id:0,
              //   teamSerial: '1-6',
              //   quesScore:0,
              //   status:0,
              //   teamClass:'pre-list-item-un'
              // },
              // {
              //   id:1,
              //   teamSerial: '1-8',
              //   quesScore:0,
              //   status:0,
              //   teamClass:'pre-list-item-un'
              // },
              // {
              //   id:2,
              //   teamSerial: '1-10',
              //   quesScore:0,
              //   status:0,
              //   teamClass:'pre-list-item-un'
              // }
            ],

          }
      },
      mounted() {
        // this.$data.reportTime=new Date();
        this.$data.classId=this.$route.query.classId;
        this.$data.roundId=this.$route.query.roundId;
        this.$data.courseId=this.$route.query.courseId;
        this.$data.seminarId=this.$route.query.seminarId;
        this.$data.classSerial=this.$route.query.classSerial;
        this.$data.seminarName=this.$route.query.seminarName;
        this.$data.klassSeminarId=this.$route.query.klassSeminarId;
        this.loadPreTeams();
        this.getWebSocketAddress();

      },
      methods:{
        /**
         * 修改展示小组的成绩
         **/
        modifyTeamPreScore(){

          let _this=this;
          this.$axios({
            method:'put',
            url:'/course/'+this.$data.courseId+'/round/'+this.$data.roundId+'/team/'+this.$data.preTeams[this.$data.preTeamIndex].teamId
              +'/klassSeminar/'+this.$data.klassSeminarId+'/presentation',
            params:{
              score:this.$data.formModify.score
            }
          }).then(function (response) {
            _this.$message({
              type:'success',
              message:'修改成功！'
            })
            _this.$data.preTeams[_this.$data.chooseTeamIndex].score=_this.$data.formModify.score;
          })
        },
        /**
         * 下一个展示小组
         **/
        nextPreTeam(){
          let _this=this;
          this.$axios({
            method:'put',
            url:'/course/'+this.$data.courseId+'/round/'+this.$data.roundId+'/team/'+this.$data.preTeams[this.$data.preTeamIndex].teamId
            +'/klassSeminar/'+this.$data.klassSeminarId+'/presentation',
            params:{
              score:this.$data.preTeams[this.$data.preTeamIndex].score
            }
          }).then(function (response) {
              _this.$message({
                type:'success',
                message:'打分成功！'
              })
              _this.$data.preTeams[_this.$data.preTeamIndex].status=2;
              // _this.$data.preTeams[_this.$data.preTeamIndex].score=_this.formModify.score;
              if(_this.$data.preTeamIndex===_this.$data.preTeams.length-1){
                _this.$message({
                  type:'success',
                  message:'展示组已全部展示完！'
                })
                _this.$data.socket.send('3');
                _this.$data.openSimple=true;
              }else {
                _this.$data.quesTeams.splice(0,_this.$data.quesTeams.length);
                // _this.loadQuestionList();
                _this.$data.preTeamIndex++;
                _this.$data.preTeams[_this.$data.preTeamIndex].status=1;
                _this.$data.socket.send('1;' + _this.$data.preTeams[_this.$data.preTeamIndex].id);    //发送下一组的id
                _this.choosePreTeam(_this.$data.preTeamIndex,0);

              }
          })

        },
        /**
         * 获取提问列表
         **/
        loadQuestionList(){
          let _this=this;
          this.$data.quesTeams.splice(0,this.$data.quesTeams.length);
          this.$axios({
            method:'get',
            url:'/question/allquestion',
            params:{
              attendanceId:this.$data.preTeams[this.$data.chooseTeamIndex].id
            }
          }).then(function (response) {
            for(let index=0;index<response.data.length;index++){
              if(response.data[index].questionEntity.score!==null) {
                _this.$data.quesTeams.push({
                  questionEntity: response.data[index].questionEntity,
                  studentEntity: response.data[index].studentEntity,
                  teamEntity: response.data[index].teamEntity,
                  status: 1,
                  teamClass: 'pre-list-item-un'
                });
              }else{
                _this.$data.quesTeams.push({
                  questionEntity: response.data[index].questionEntity,
                  studentEntity: response.data[index].studentEntity,
                  teamEntity: response.data[index].teamEntity,
                  status: 0,
                  teamClass: 'pre-list-item-un'
                });
              }
            }
          })
        },
        /**
         * 选择两个列表中某一个队伍
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
            this.$data.formModify.score = this.$data.preTeams[this.$data.chooseTeamIndex].score;
            this.$data.chooseTeamName = this.$data.preTeams[this.$data.chooseTeamIndex].teamSerial;
            this.$data.preTeams[this.$data.chooseTeamIndex].teamClass = 'pre-list-item';
            this.$data.chooseType=0;
            this.loadQuestionList();

          }else{
            this.$data.formModifyQuestion.quesScore=this.$data.quesTeams[this.$data.chooseTeamIndex].questionEntity.score;
            this.$data.chooseTeamName=this.$data.quesTeams[this.$data.chooseTeamIndex].teamEntity.klassSerial+'-'+this.$data.quesTeams[this.$data.chooseTeamIndex].teamEntity.teamSerial;
            this.$data.quesTeams[this.$data.chooseTeamIndex].teamClass = 'pre-list-item';
            this.$data.chooseType=3;
          }
        },
        /**
         * 设置报告的时间
         **/
        setReportTime(){
          // console.log(reportTime);
          this.$data.socket.send('3');
          if(this.$data.reportTime) {
            let _this = this;
            this.$axios({
              method: 'put',
              url: '/seminar/' + this.$data.seminarId + '/class/' + this.$data.classId + '/reportddl',
              params: {
                date: this.$data.reportTime
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
            for(let index=response.data.length-1;index>=0;index--){
              if(response.data[index].score!==null){
                console.log('1-6');
                response.data[index].status=2;
                console.log(response.data[index].status);
                _this.$data.chooseType=0;
                console.log(response.data[index].status);
              }else{
                if(!response.data[index-1]||response.data[index-1].score!==null) {
                  response.data[index].status = 1;
                }else{
                  response.data[index].status = 0;
                }
                _this.$data.chooseType=0;
                _this.$data.chooseTeamIndex=index;
                _this.$data.preTeamIndex=index;
                response.data[index].score=0;
              }
              console.log(response.data[index].status);
              _this.$data.preTeams.push({
                teamSerial:response.data[index].teamEntity.klassSerial+'-'+response.data[index].teamEntity.teamSerial,
                teamClass:'pre-list-item-un',
                id:response.data[index].id,
                klassSeminarId: response.data[index].klassSeminarId,
                teamOrder:response.data[index].teamOrder,
                status:response.data[index].status,
                teamId:response.data[index].teamEntity.id,
                score:response.data[index].score,
              });

            }
            _this.$data.preTeams.reverse();
            _this.choosePreTeam(_this.$data.chooseTeamIndex,0);

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
          let _this=this;
          this.$data.socket=new WebSocket(this.$data.webSocketAddress);
          console.log('1111');
          this.$data.socket.onopen=this.webSocketOnOpen();
          this.$data.socket.onclose=this.webSocketClose;
          this.$data.socket.onmessage=function (msg) {
            console.log(msg);
            if(msg.data==='200'){
              _this.$message({
                type:'success',
                message:'连接成功！正式开始上课！'
              })
            }else if(msg.data=='nextQuestion'){
              // console.log('发提问啊！！！');
              _this.loadNextQuestion();
            }
          };
        },
        /**
         * websocket关闭
         **/
        webSocketClose(e){
          console.log(e);
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
          this.$data.socket.send("2");

        },
        /**
         * 修改提问小组的分数
         */
        modifyQuesScore(){
          let _this=this;
          this.$axios({
            method:'put',
            url:'/course/'+this.$data.courseId+'/round/'+this.$data.roundId+'/team/'+this.$data.quesTeams[this.$data.chooseTeamIndex].teamEntity.id+'/klassSeminar/'
              +this.$data.klassSeminarId+'/question/'+this.$data.quesTeams[this.$data.chooseTeamIndex].questionEntity.id,
            params:{
              score:this.$data.formModifyQuestion.quesScore
            }
          }).then(function (response) {
            _this.$message({
              type:'success',
              message:'修改成功！'
            })
            _this.$data.quesTeams[_this.$data.chooseTeamIndex].questionEntity.score=_this.$data.formModifyQuestion.quesScore;
          })
        },
        /**
         * 获取下一个提问,id为attendanceid
         */
        loadQuestion(){
          if(this.$data.quesTeams.length!==0&&this.$data.chooseType===3) {
            console.log('提问打分');
            this.$data.quesTeams[this.$data.quesTeamIndex].status = 1;
            //提问打分
            let _this=this;

            this.$axios({
              method:'put',
              url:'/course/'+this.$data.courseId+'/round/'+this.$data.roundId+'/team/'+this.$data.quesTeams[this.$data.quesTeamIndex].teamEntity.id+'/klassSeminar/'
                +this.$data.klassSeminarId+'/question/'+this.$data.quesTeams[this.$data.quesTeamIndex].questionEntity.id,
              params:{
                score:this.$data.quesTeams[this.$data.quesTeamIndex].quesScore
              }
            }).then(function (response) {
              _this.$data.quesTeamIndex++;
              _this.loadNextQuestion();
            }).catch((function (error) {
              // console.log('出错额！');
              console.log(error);
            }))
          }else {
            this.loadNextQuestion();
          }
        },
        loadNextQuestion(){
          let _this=this;
          this.$axios({
            method:'get',
            url:'/question/nextQuestion',
            params:{
              attendanceId:this.$data.preTeams[this.$data.preTeamIndex].id
            }
          }).then(function (response) {
            _this.$data.quesTeams.push({
              questionEntity:response.data.questionEntity,
              studentEntity:response.data.studentEntity,
              teamEntity:response.data.teamEntity,
              teamClass:'pre-list-item-un',
              status:0,
            });
            // _this.$data.chooseTeamIndex=_this.$data.quesTeamIndex;
            // _this.$data.formModifyQuestion.quesScore=_this.$data.quesTeams[_this.$data.chooseTeamIndex].quesScore;
            // _this.$data.chooseTeamName=_this.$data.classSerial+'-'+_this.$data.quesTeams[_this.$data.chooseTeamIndex].teamEntity.teamSerial;
            // _this.$data.quesTeams[_this.$data.chooseTeamIndex].teamClass = 'pre-list-item';
            // _this.$data.chooseType=3;

            // if(_this.$data.chooseType==0) {
            //   console.log(111);
            //   _this.$data.preTeams[_this.$data.chooseTeamIndex].teamClass = 'pre-list-item-un';
            // }else{
              if(_this.$data.quesTeams.length===1){
                _this.choosePreTeam(_this.$data.quesTeamIndex,3);
              }else {
                console.log(777);
                _this.$data.quesTeamIndex++;
                // _this.$data.quesTeams[_this.$data.chooseTeamIndex].teamClass = 'pre-list-item-un';
                _this.choosePreTeam(_this.$data.quesTeamIndex,3);
              }
            // }
          }).catch(function (error) {
            console.log(error.response);
            if(error.response.status===404){
              console.log('？？？？');
              _this.$message({
                type:'warning',
                message:'当前已无提问！'
              })
            }
          })

        },
        linkBack(){
          history.back();
        }
      },
      destroyed() {
          this.webSocketClose();
      }

    }
</script>

<style lang="less">
  #TeacherSeminarIng{

    .pre-title{
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }

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
      .el-icon-time{
        margin-top: 30px;
        font-size: 40px;
      }

      .seminar-title{
        width: 97%;
        margin-left: auto;
        margin-right: auto;
        /*color: black;*/
        text-align: left;
        font-weight: bold;
        font-size: 20px;
        /*padding-left: 8px;*/
        box-shadow: 3px 3px 2px lightgrey;
        padding: 3px;

        .title-content{
          margin-top: 3px;
        }
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
              /*background: -webkit-linear-gradient(right, #00b2ee, #63b8ff); !* Safari 5.1 - 6.0 *!*/
              /*background: -o-linear-gradient(right, #00b2ee, #63b8ff); !* Opera 11.1 - 12.0 *!*/
              /*background: -moz-linear-gradient(right, #00b2ee, #63b8ff); !* Firefox 3.6 - 15 *!*/
              /*background: linear-gradient(right, dodgerblue , 	#87cefa); !* 标准的语法（必须放在最后） *!*/
              background-color: #87cefa;
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
                  text-align: center;
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
