<template>
  <div id="MessageCard">
    <el-card class="message-card">
      <div class="card-title">
        <span>J2EE 共享组队邀请</span>
        <el-button type="text" class="details-button" @click="messageVisible=!messageVisible">详情</el-button>
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
