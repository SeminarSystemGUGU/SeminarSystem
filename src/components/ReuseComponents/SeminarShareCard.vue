<template>
  <div id="MessageCard">
    <el-card class="message-card" v-loading="isLoading">
      <div class="card-title">
        <el-badge value="未读" class="item" v-show="!beenRead">
          <span>{{item.mainTeacherName}}老师：共享讨论课</span>
        </el-badge>
        <span v-show="beenRead">{{item.mainTeacherName}}老师：共享讨论课</span>
        <span class="details-button" @click="seeMore">详情</span>
      </div>
      <el-collapse-transition>
        <div class="animate slideInLeft-enter card-content" v-show="messageVisible">
          <div class="content-details">
            <span>类型：</span>
            <span>共享讨论课</span><br/>
            <span>主课程：</span>
            <span>{{item.mainCourseName}}</span><br/>
            <span>从课程：</span>
            <span>{{item.subCourseName}}</span>
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
    props:['item'],
    data(){
      return{
        isLoading:false,
        subCourseName:'',
        subCourseId:'',
        type:2,
        requestId:1,
        mainCourseName:'',
        mainCourseId:'',
        mainTeacherName:'王鸿吉',
        // messagetitle:'J2ee共享组队',
        beenRead:false,
        messageVisible:false,
        messageBody:'组队邀请组队邀请组队邀请组队邀请组队邀请组队邀请组队邀请组队',
        requestType:'',
      }
    },
    methods:{
      seeMore(){
        this.messageVisible=!this.messageVisible;
        this.beenRead=true;
      },
      acceptMessage(){
        let _this=this;
        _this.$data.isLoading=true;
        this.$axios({
          method:'put',
          url:'/request/'+this.$props.item.requestId+'/seminarshare',
          data:{
            handleType:'accept'
          }
        }).then(function (response) {
          if(response.data===true){
            _this.$message({
              type:'success',
              message:'处理成功！'
            })
            _this.$data.isLoading=false;
            _this.$router.push({path:'/TransitionPage',query:{courseId:_this.$data.courseId,paths:'/TeacherMyMessage'}});
          }
        })
      },
      rejectMessage(){
        let _this=this;
        _this.$data.isLoading=true;
        this.$axios({
          method:'put',
          url:'/request/'+this.$props.item.requestId+'/seminarshare',
          data:{
            handleType:'refuse'
          }
        }).then(function (response) {
          if(response.data===true){
            _this.$message({
              type:'success',
              message:'处理成功！'
            })
            _this.$data.isLoading=false;
            _this.$router.push({path:'/TransitionPage',query:{courseId:_this.$data.courseId,paths:'/TeacherMyMessage'}});
          }
        })
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
        font-size: 16px;
      }

      .details-button{
        float: right;
        color: dodgerblue;
        font-weight: normal;
      }
    }
  }
</style>
