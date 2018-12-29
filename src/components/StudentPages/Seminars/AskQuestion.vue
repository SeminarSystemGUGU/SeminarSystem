<template>
    <div>
      <back-bar :titleName="title" :showMessages="true" :showBackBar="true" :backUrl="{path:'/StuSeminarDetails',query:{courseId:courseId,klassId:klassId,seminarId:seminarId}}"> </back-bar>
      <div class="statusDetailsBack animated fadeInRight" >
      <div class="titleN" align="left"> 当前展示小组 :&emsp; &emsp;{{currentName}}</div>
        <mu-paper :z-depth="1" class="demo-list-wrap">
          <mu-list v-for="option,index in registerOrder" :key = "index"  data-mu-loading-color="secondary" data-mu-loading-overlay-color="rgba(0, 0, 0, .7)" v-loading="loading2">
            <mu-list-item class="listItem" button :ripple="true" style="font-size: 18px;">
              <mu-list-item-action>
                {{option.order}}
              </mu-list-item-action>
              <mu-list-item-title style="margin-left: 35%;font-size: 20px">{{option.team}}</mu-list-item-title>
            </mu-list-item>
          </mu-list>
          <mu-divider></mu-divider>
        </mu-paper>
        <mu-button class="askQ" color="success"  @click="askQuestion"
                   :disabled="currentName===myTeamName&&end!==true">发起提问</mu-button>
        <mu-dialog title="发起提问？" width="360" :open.sync="questionFlag" :overlay="false">
          <mu-button slot="actions" flat color="success" @click="confirmQuestion" v-loading="askLoading">Sure</mu-button>
          <mu-button slot="actions" flat color="primary" @click="questionFlag=!questionFlag">Close</mu-button>
        </mu-dialog>
        <mu-dialog title="提问" width="360" :open.sync="questionAlert">
          请 {{me.studentName}}同学({{me.account}})<br/>
          提问
          <mu-button slot="actions" flat color="primary" @click="questionAlert=!questionAlert">Close</mu-button>
        </mu-dialog>
        <mu-dialog title="讨论课结束" width="360" :open.sync="endFlag" :overlay="false">
          离开当前页面？
          <mu-button slot="actions" flat color="success" @click="sureLeave">Sure</mu-button>
          <!--<mu-button slot="actions" flat color="success" @click="cancleLeave">cancel</mu-button>-->
        </mu-dialog>
      </div>
    </div>
</template>

<script>
  import BackBar from '../../ReuseComponents/BackBar'
  export default {
        name: "AskQuestion",
      components:{
          BackBar,
      },
    created(){
      this.$data.seminarId=this.$route.query.seminarId;
      this.$data.klassId=this.$route.query.klassId;

      this.$data.loading2=true;

      let da=this;
      this.$axios({
        method:'get',
        url:'user/information',
      }).then(function (response) {
        da.$data.me=response.data;
      });

      let h=this;
      this.$axios({
        method:'get',
        url:'/seminar/'+h.$data.seminarId,
      }).then(function (response) {
        h.$data.maxMember=response.data.maxTeam;
      });

      let _this=this;
      this.$axios({
        method:'get',
        url:'/seminar/'+_this.$data.seminarId+'/class/'+_this.$data.klassId,
      }).then(function(response){
        _this.$data.courseId=response.data.seminarEntity.courseId;
        _this.$data.klassSeminarId=response.data.klassSeminarId;
        _this.getRegisterTeams();
        _this.getWebSocketAddress();
        _this.$data.loading2=false;

        let ts=_this;      //我的组队信息
        _this.$axios({
          method:'get',
          url:'/course/'+ts.$data.courseId+'/team'
        }).then(function (response) {
          if(response.data.teamName!==null)    //未组队
            ts.myTeamName=response.data.teamName;
        });
      });
    },
    destroyed(){
      this.$data.socket.close();
    },
      data() {
        return {
          me:'',
          courseId:-1,
          seminarId:-1,
          klassId:-1,
          klassSeminarId:-1,
          title:'讨论课提问',
          currentAttendance:'',    //当前展示小组
          currentIndex:0,
          currentName:'',
          enrollTeams:[],        //所有报名的小组
          questionFlag:false,
          registerOrder:[],
          // myTeam:'',
          // teamState:-1,
          myTeamName:'',
          // questionNumbers:'',

          loading2:false,
          webSocketAddress:'',
          socket:'',
          maxMember:-1,

          // questionEntity:'',
          // studentEntity:'',
          // teamEntity:'',
          questionAlert:false,
          endFlag:false,
          end:false,
          askLoading:false,
          allQuestions:[],
        }
      },
      methods:{
          sureLeave(){
            this.$data.endFlag=!this.$data.endFlag;
            this.$router.push({path:'/StuMainSeminars',query:{courseId:this.$data.courseId,klassId:this.$data.klassId}});
          },
        cancleLeave(){
          this.$data.endFlag=!this.$data.endFlag;
          this.$data.end=true;
        },
        getRegisterTeams(){
          let t=this;                   //报名情况
          this.$axios({
            method:'get',
            url:'/attendance/'+t.$data.klassSeminarId,
          }).then(function (response) {
              t.$data.enrollTeams=response.data;
              t.$data.registerOrder=[];
              let x;
              for(x=0;x<t.$data.maxMember;x++) {
                t.$data.registerOrder.push({order: '第' + (x +1)+ '组', team:'',attendanceId:'',});
              }
              let i,j;
              for(i=0;i<t.$data.registerOrder.length;i++)
                for(j=0;j<t.$data.enrollTeams.length;j++)
                {
                  if(t.$data.enrollTeams[j].teamOrder===i+1)
                  {
                    t.$data.registerOrder[i].team=t.$data.enrollTeams[j].teamEntity.teamName;
                    t.$data.registerOrder[i].attendanceId=t.$data.enrollTeams[j].id;
                  }
                }
                t.$data.currentAttendance=t.$data.enrollTeams[t.$data.currentIndex];   //第一个展示的小组
                t.$data.currentName=t.$data.currentAttendance.teamEntity.teamName;
            });
        },
        askQuestion(){
          this.$data.questionFlag=true;
        },
        confirmQuestion(){        //确认提问
            this.$data.askLoading=true;
            let _this = this;
            this.$axios({
              method: 'post',
              url: '/question/newQuestion',
              params: {
                attendanceId: _this.$data.enrollTeams[_this.$data.currentIndex].id,
              }
            }).then(function (response) {
              _this.$data.socket.send('4');
              _this.$data.askLoading=false;
              _this.$toast.success("提问成功！");
              _this.$data.questionFlag = !_this.$data.questionFlag;
            },function (error) {
              _this.$data.askLoading=false;
              _this.$toast.error("提问失败！");
              _this.$data.questionFlag = !_this.$data.questionFlag;
            });
        },
        getWebSocketAddress(){
          let _this=this;
          this.$axios({
            method:'get',
            url:'/seminar/'+_this.$data.klassSeminarId+'/seminarEnter'
          }).then(function (response) {
            _this.$data.webSocketAddress=response.data;
            _this.initWebSocket();
          });
        },
        initWebSocket(){
          this.$data.socket=new WebSocket(this.$data.webSocketAddress);
          this.$data.socket.onopen=this.webSocketOnOpen();
          this.$data.socket.onclose=function (error) {
            console.log("我出来了！");
          };
          let _this=this;
          this.$data.socket.onmessage=function (msg) {

            console.log("ws建立连接！"+msg.data);
           if(msg.data==='-1')       //重新连接
           {
             _this.$data.currentIndex=0;
           }
           else if(msg.data!=='-1')
           {
             let i;
             for(i=0;i<_this.$data.enrollTeams.length;i++)
             {
               let x=i;
              if( _this.$data.enrollTeams[x].id===msg.data) {
                // _this.$data.currentIndex = parseInt(_this.$data.registerOrder[i].order.slice(1, 2)) - 1;
                _this.$data.currentIndex=x;
                _this.$data.currentAttendance=_this.$data.enrollTeams[_this.$data.currentIndex];
                _this.$data.currentName=_this.$data.currentAttendance.teamEntity.teamName;
              }
             }
           }
          };

          this.$data.socket.addEventListener("message", function(event) {
            // 1-切换提问   2-切换展示
            if(event.data==='nextQuestion')
            {   //获取提问

              // let ts=_this;
              // _this.$axios({
              //   method:'get',
              //   url:'question/allquestion',
              //   params:{
              //     attendanceId:ts.currentAttendance.id,
              //   }
              // }).then(function (response) {
              //   ts.$data.questionEntity=response.data.questionEntity;
              //   ts.$data.studentEntity=response.data.studentEntity;
              //   ts.$data.teamEntity=response.data.teamEntity;
                _this.$data.questionAlert=true;
              // });
            }
            else if(event.data==='nextPresentation'){  //切换展示小组
              _this.$data.currentIndex++;
              _this.$data.currentAttendance=_this.$data.enrollTeams[_this.$data.currentIndex];
              // while(_this.$data.currentAttendance.team==='')
              // {
              //   _this.$data.currentIndex++;
              //   _this.$data.currentAttendance=_this.$data.registerOrder[_this.$data.currentIndex];
              // }
              // _this.$data.currentAttendance=_this.$data.registerOrder[_this.$data.currentIndex];   //第一个展示的小组
              _this.$data.currentName=_this.$data.currentAttendance.teamEntity.teamName;
              console.log(_this.$data.currentName);
            }
            else if(event.data==='end'){
              _this.$data.endFlag=true;
            }
          });
        },
        webSocketOnOpen(){
          // alert('成功！')
        },
        webSocketSend(){
          this.$data.socket.send("4");
        },
        webSocketOnMessage(e){
          // if(e==='2')   //切换展示小组
          // {
          //   this.$data.currentIndex++;
          //   console.log(this.$data.currentIndex);
          //   // this.$set(this.$data.currentAttendance=this.$data.enrollTeams[this.$data.currentIndex]);
          // }
          // console.log(e);
          // const redata=JSON.paramsse(e.);
          // console.log(redata.value);
        },

      }
    }
</script>

<style scoped>
  .statusDetailsBack{
    margin-top: 12vh;
  }
  .titleN{
    padding-left: 3vw;
    font-size: 25px;
    box-shadow: 0 1px 0.2px 0 rgba(0, 0, 0, 0.2), 0 2px 20px 0 rgba(0, 0, 0, 0.1);
    color:darkred;
    margin-bottom: 2vh;
  }
  .askQ{
    font-size: 18px;
    margin-top: 12vh;
    width: 100%;
    height:6vh;
    opacity: 0.9;
  }



</style>
