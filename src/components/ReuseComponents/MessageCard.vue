<template>
  <div id="MessageCard">
    <el-card class="message-card" >
      <div class="card-title">
        <el-badge value="未处理" class="item" v-show="!beenRead">
          <span>{{messagetitle}}</span>
        </el-badge>
        <span v-show="beenRead">{{messagetitle}}</span>
        <span class="details-button" @click="seeMore">详情</span>
      </div>
      <el-collapse-transition>
      <div class="animate slideInLeft-enter card-content" v-show="messageVisible">
        <div class="content-details">
          {{messageBody}}
        </div>
        <div class="do-button">
          <div class="button-panel">
            <!--<span></span>-->
            <el-button class="accept-button" type="text" @click="acceptMessage">同意</el-button>
            <el-button class="reject-button" type="text" @click="rejectMessage">拒绝</el-button>
          </div>
        </div>
      </div>
      </el-collapse-transition>
    </el-card>
  </div>
</template>

<script>
    export default {
        name: "MessageCard",
      data(){
          return{
            messagetitle:'J2ee共享组队',
            beenRead:false,
            messageVisible:false,
            messageBody:'组队邀请组队邀请组队邀请组队邀请组队邀请组队邀请组队邀请组队',
            requestType:'',
            requestId:''
          }
      },
      methods:{
        seeMore(){
          this.messageVisible=!this.messageVisible;
          this.beenRead=true;
        },
        acceptMessage(){
          let _this=this;
          this.$axios({
            method:'get',
            url:'/request/'+this.$data.requestId+'/teamShare'
          })
        },
        rejectMessage(){

        }
      }
    }
</script>

<style lang="less">
  #MessageCard{
    .message-card{
      margin-top: 6px;
      width: 80%;
      margin-left: auto;
      margin-right: auto;
      transition: all 1s;

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
