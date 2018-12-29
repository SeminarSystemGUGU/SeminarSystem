<template>
  <div id="MyMessage">
    <app-bar title-name="待办消息" :back-path="backPath"></app-bar>
    <div class="main-content">
      <div class="todo-title">
        <span>待办通知</span>
      </div>
      <div class="wait-message-bar">
        <team-share-card v-for="item,index in teamShare" :item="item" :key="item.requestId"></team-share-card>
        <team-valid-card v-for="item,index in teamValid" :item="item" :key="item.requestId"></team-valid-card>
        <seminar-share-card v-for="item,index in seminarShare" :item="item" :key="item.requestId"></seminar-share-card>
      </div>
    </div>
  </div>
</template>

<script>
  import AppBar from '../../ReuseComponents/AppBar'
  import MessageCard from '../../ReuseComponents/MessageCard'
  import HistoryCard from '../../ReuseComponents/HistoryMessageCard'
  import TeamShareCard from '../../ReuseComponents/TeamShareCard'
  import TeamValidCard from '../../ReuseComponents/TeamValidCard'
  import SeminarShareCard from '../../ReuseComponents/SeminarShareCard'
    export default {
        name: "MyMessage",
      components:{
        TeamValidCard,
        SeminarShareCard,
        TeamShareCard,
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

            ],

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
              _this.$data.seminarShare=response.data;
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
              _this.$data.teamShare=response.data;
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
              _this.$data.teamValid=reponse.data;
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
