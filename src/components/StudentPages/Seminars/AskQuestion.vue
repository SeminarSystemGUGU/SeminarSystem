<template>
    <div>
      <back-bar :titleName="title" :showMessages="true" :showBackBar="true" :backUrl="{path:'/StuSeminarDetails',query:{courseId:courseId,klassId:klassId,seminarId:seminarId}}"> </back-bar>

      <div class="statusDetailsBack animated fadeInRight" >
      <div class="titleN" align="left"> 当前展示小组 :&emsp; &emsp;{{currentIndex}}</div>
        <mu-paper :z-depth="1" class="demo-list-wrap">
          <mu-list v-for="option,index in registerOrder" :key = "index">
            <mu-list-item class="listItem" button :ripple="true" style="font-size: 18px;">
              <mu-list-item-action>
                {{option.order}}
              </mu-list-item-action>
              <mu-list-item-title style="margin-left: 35%;font-size: 20px">{{option.team}}</mu-list-item-title>
            </mu-list-item>
          </mu-list>
          <mu-divider></mu-divider>
        </mu-paper>

        <mu-button class="askQ" color="success"  @click="askQuestion">发起提问</mu-button>

        <mu-dialog title="Dialog" width="360" :open.sync="questionFlag">
          <mu-button slot="actions" flat color="primary" @click="questionFlag=!questionFlag">Close</mu-button>
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

      let _this=this;
      this.$axios({
        method:'get',
        url:'/seminar/'+_this.$data.seminarId+'/class/'+_this.$data.klassId,
      }).then(function(response){
        _this.$data.courseId=response.data.seminarEntity.courseId;
        _this.$data.klassSeminarId=response.data.klassSeminarId;

        _this.getWebSocketAddress();

        let t=_this;           //报名情况
        _this.$axios({
          method:'get',
          url:'/attendance/'+t.$data.klassSeminarId,
        }).then(function (response) {
          t.$data.enrollTeams=response.data;
          t.$data.registerOrder=[];
          let x;
          for(x=0;x<t.$data.maxMember;x++) {
            t.$data.registerOrder.push({order: '第' + (x +1)+ '组', team:''});
          }
          let i,j;
          for(i=0;i<t.$data.registerOrder.length;i++)
            for(j=0;j<t.$data.enrollTeams.length;j++)
            {
              if(t.$data.enrollTeams[j].teamOrder===i+1)
              {
                t.$data.registerOrder[i].team+='这个组没名，ID是'+t.$data.enrollTeams[j].teamId;
              }
            }
        });
        _this.$data.currentAttendance=_this.$data.enrollTeams[_this.$data.currentIndex];
      });
    },
      data() {
        return {
          courseId:-1,
          seminarId:-1,
          klassId:-1,
          klassSeminarId:-1,
          title:'OOAD-讨论课',
          currentAttendance:'',    //但前展示小组
          currentIndex:0,
          enrollTeams:[],
          questionFlag:false,
          registerOrder:[],
          webSocketAddress:'',
          socket:'',
          maxMember:6,
        }
      },
      methods:{
        getRegisterTeams(){
          let t=this;           //报名情况
          this.$axios({
            method:'get',
            url:'/attendance/'+t.$data.klassSeminarId,
          }).then(function (response) {
              t.$data.enrollTeams=response.data;
              t.$data.registerOrder=[];
              let x;
              for(x=0;x<t.$data.maxMember;x++) {
                t.$data.registerOrder.push({order: '第' + (x +1)+ '组', team:''});
              }
              let i,j;
              for(i=0;i<t.$data.registerOrder.length;i++)
                for(j=0;j<t.$data.enrollTeams.length;j++)
                {
                  if(t.$data.enrollTeams[j].teamOrder===i+1)
                  {
                    t.$data.registerOrder[i].team+='这个组没名，ID是'+t.$data.enrollTeams[j].teamId;
                  }
                }
            });
        },
        askQuestion(){
          this.$data.questionFlag=true;
        },
        getWebSocketAddress(){
          let _this=this;
          this.$axios({
            method:'get',
            url:'/seminar/'+_this.$data.klassSeminarId+'/seminarEnter'
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
          if(e==='2')   //切换展示小组
          {
            this.$data.currentIndex++;
            console.log(this.$data.currentIndex);
            this.$set(this.$data.currentAttendance=this.$data.enrollTeams[this.$data.currentIndex]);
          }
          // console.log(e);
          // const redata=JSON.parse(e.);
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
