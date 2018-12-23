<template>
  <div id="MyMessage">
    <app-bar title-name="OOAD-待办消息" :back-path="backPath"></app-bar>
    <div class="main-content">
      <div class="todo-title">
        <span>待办通知</span>
      </div>
      <div class="wait-message-bar">
        <message-card></message-card>
      </div>
    </div>
  </div>
</template>

<script>
  import AppBar from '../../ReuseComponents/AppBar'
  import MessageCard from '../../ReuseComponents/MessageCard'
  import HistoryCard from '../../ReuseComponents/HistoryMessageCard'
    export default {
        name: "MyMessage",
      components:{
        MessageCard,
        AppBar,
        HistoryCard
      },
      data(){
          return{
            backPath:'/TeacherMainPage',
            seminarShare:[

            ],
            teamShare:[

            ],
            teamValid:[

            ]
          }
      },
      watch:{
          $route(to,fromP){
            this.$data.backPath=fromP.path;
          }
      },

      created() {
        this.loadSeminarShareMessage();
        this.loadTeamShareMessage();
        this.loadTeamValidMessage();
      },

      methods:{
          loadSeminarShareMessage:function(){
            let _this=this;
            _this.$axios({
              method:'get',
              url:'/request/seminarshare',
              contentType:'application/json;charset=UTF-8',
            }).then(function (response) {
              console.log(response.data);
            }).catch(function (error) {
              console.log(error.response.data);
            })
          },

          loadTeamShareMessage:function () {
            let _this=this;
            _this.$axios({
              method:'get',
              url:'/request/teamshare',
              contentType:'application/json;charset=UTF-8',
            }).then(function (response) {
              console.log(response.data);
            }).catch(function (error) {
              console.log(error.response.data);
            })
          },
          loadTeamValidMessage(){
            let _this=this;
            this.$axios({
              method:'get',
              url:'/request/teamvalid'
            }).then(function (reponse) {

            })
          }

      }
    }
</script>

<style lang="less">
#MyMessage{
  .main-content{

    .todo-title{
      text-align: left;
      margin-left: 25px;
      font-size: 20px;
      font-weight: bold;
      margin-top: 10px;
    }

    .history-message-bar{
      margin-top: 20px;
      text-align: left;

      .history-title{
        margin-left: 25px;
        font-size: 20px;
        font-weight: bold;
      }

      .history-cards{
        margin-top: 10px;

      }
    }

  }


}
</style>
