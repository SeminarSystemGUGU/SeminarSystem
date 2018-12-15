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
      <div class="history-message-bar">
        <div class="history-title">
          <span>历史消息</span>
        </div>
        <div class="history-cards">
          <history-card></history-card>
        </div>
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
            backPath:'/TeacherMainPage'

          }
      },
      watch:{
          $route(to,fromP){
            this.$data.backPath=fromP.path;
          }
      },

      created() {

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
