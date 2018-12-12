<template>
  <div id="MyMessage">
    <app-bar title-name="OOAD-待办消息" :back-path="backPath"></app-bar>
    <div class="main-content">
      <div class="wait-message-bar">
        <message-card></message-card>
      </div>
      <div class="history-message-bar">
        <div class="history-title">
          <span>历史消息</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AppBar from '../../ReuseComponents/AppBar'
  import MessageCard from '../../ReuseComponents/MessageCard'
    export default {
        name: "MyMessage",
      components:{
        MessageCard,
        AppBar
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

  }
}
</style>
