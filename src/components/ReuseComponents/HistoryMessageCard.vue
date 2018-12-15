<template>
  <div id="HistoryMessageCard">
    <el-card class="message-card" >
      <div class="card-title">
        <span v-show="!isRefused" class="agree-title">已同意</span>
        <span v-show="isRefused" class="refused-title">已拒绝</span>
        <span>{{messageTitle}}</span>
        <span class="details-button" @click="seeMore">详情</span>
      </div>
      <el-collapse-transition>
        <div class="animate slideInLeft-enter card-content" v-show="messageVisible">
          <div class="content-details">
            {{messageBody}}
          </div>
        </div>
      </el-collapse-transition>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "HistoryMessageCard",
    data(){
      return{
        isRefused:false,
        messageTitle:'J2ee共享组队',
        messageVisible:false,
        messageBody:'组队邀请组队邀请组队邀请组队邀请组队邀请组队邀请组队邀请组队',

      }
    },
    methods:{
      seeMore(){
        this.messageVisible=!this.messageVisible;
      }
    }
  }
</script>

<style lang="less">
  #HistoryMessageCard{
    .message-card{
      margin-top: 6px;
      width: 80%;
      margin-left: auto;
      margin-right: auto;
      transition: all 1s;


      .agree-title{
        color: #4cae4c;
      }

      .refused-title{
        color: orangered;
      }

      .card-title{
        text-align: left;
        font-size: 17px;
        font-weight: bold;
      }

      .do-button{
        margin-top: 10px;
        .button-panel{
          float: right;
          margin-right:10px;
          font-size: 16px;

          .reject-button{
            color: dodgerblue;
          }


        }

      }

      .card-content{
        transition: all 0.3s;
        /*height: 120px;*/
      }

      .content-details{
        text-align: left;
        margin-top: 20px;
        width: 93%;
        margin-right: auto;
        margin-left: auto;
        font-size: 15px;
      }

      .details-button{
        float: right;
        color: dodgerblue;
        font-weight: normal;
      }
    }
  }
</style>
