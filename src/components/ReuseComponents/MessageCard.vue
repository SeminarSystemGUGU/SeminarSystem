<template>
  <div id="MessageCard">
    <el-card class="message-card">
      <div class="card-title">

      </div>
      <div class="card-content" v-show="messageVisible">

      </div>
    </el-card>
  </div>
</template>

<script>
    export default {
        name: "MessageCard",
      data(){
          return{
            messageVisible:false
          }
      }
    }
</script>

<style lang="less">
  #MessageCard{
    .message-card{
      width: 80%;
      margin-left: auto;
      margin-right: auto;
    }
  }
</style>
