<template>
    <div>
      <back-bar :titleName="seminarDetails.title" :showMessages="true" :showBackBar="true" backUrl="/StuMainSeminars"></back-bar>

      <div class="seminarDetailsBack animated fadeInRight" align="left">
        <span  class="tit" style="margin-left: 2vw;">{{seminarDetails.seminarTopic}}</span>
        <mu-list  toggle-nested class="infoList">
          <mu-list-item class="item" avatar :ripple="false" button>
            <mu-list-item-content>
              <mu-list-item-title>轮次</mu-list-item-title>
              <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)"></mu-list-item-sub-title>
              <mu-list-item-sub-title>
                {{seminarDetails.roundId}}
              </mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider></mu-divider>

          <mu-list-item class="item" avatar :ripple="false" button>
            <mu-list-item-content>
              <mu-list-item-title>课次序号</mu-list-item-title>
              <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)"></mu-list-item-sub-title>
              <mu-list-item-sub-title>
                {{seminarDetails.classOrder}}
              </mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider></mu-divider>

          <mu-list-item class="item" textline="two-line" button :ripple="false" nested :open="open === 'drafts'" @toggle-nested="open = arguments[0] ? 'drafts' : ''">
            <mu-list-item-title>课程要求</mu-list-item-title>
            <mu-list-item-action>
            <i class="el-icon-arrow-down"></i>
            </mu-list-item-action >
            <mu-list-item-content button :ripple="false" slot="nested" class="requirContent">
              <mu-list-item-content >{{seminarDetails.seminarContent}}</mu-list-item-content>
            </mu-list-item-content>
          </mu-list-item>

          <mu-divider class="" style="height: 5px;" v-if="status==2"></mu-divider>
          <mu-list-item class="item" avatar :ripple="false" button v-if="status==2">
            <mu-list-item-content >
              <mu-list-item-title>课程情况</mu-list-item-title>
              <mu-list-item-sub-title >
                {{seminarDetails.status}}
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-button flat color="success" @click="showStatusDetails">查看详情</mu-button>
          </mu-list-item>

          <mu-list-item class="item" avatar :ripple="false" button v-if="status==3">
            <mu-list-item-content >
              <mu-list-item-title>课程情况</mu-list-item-title>
              <mu-list-item-sub-title >
                已经结束
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-button flat color="success" @click="showStatusDetails">查看详情</mu-button>
          </mu-list-item>

          <mu-divider  v-if="status==1"></mu-divider>
          <mu-list-item class="item" avatar :ripple="false" button v-if="status==1">
            <mu-list-item-content >
              <mu-list-item-title>课程情况</mu-list-item-title>
              <mu-list-item-sub-title >
                未开始
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-button flat color="success" @click="showStatusDetails">查看详情</mu-button>
          </mu-list-item>

          <!--已报名，未开始-->
          <mu-list-item avatar :ripple="false" button v-if="status==4">
            <mu-list-item-content>
              <mu-list-item-title>报名情况</mu-list-item-title>
              <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)"></mu-list-item-sub-title>
              <mu-list-item-sub-title>
                {{seminarDetails.registerStatus}}
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-button flat color="success" @click="changeRegister">修改</mu-button>
          </mu-list-item>
          <mu-divider  v-if="status==4"></mu-divider>
          <mu-list-item avatar :ripple="false" button v-if="status==4">
            <mu-list-item-content>
              <mu-list-item-title>PPT</mu-list-item-title>
              <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)"></mu-list-item-sub-title>
              <mu-list-item-sub-title>
                {{seminarDetails.pptEndTime}}
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-button flat color="normal">{{seminarDetails.pptStatus}}</mu-button>
          </mu-list-item>
          <mu-divider  v-if="status==4"></mu-divider>
          <mu-list-item avatar :ripple="false" button v-if="status==4">
            <mu-list-item-content>
              <mu-list-item-title>报告</mu-list-item-title>
              <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)"></mu-list-item-sub-title>
              <mu-list-item-sub-title>
                {{seminarDetails.reportEndTime}}
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-button flat color="normal">{{seminarDetails.reportStatus}}</mu-button>
          </mu-list-item>

          <!--已报名，已结束-->
          <mu-list-item avatar :ripple="false" button v-if="status==5">
            <mu-list-item-content>
              <mu-list-item-title>报名情况</mu-list-item-title>
              <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)"></mu-list-item-sub-title>
              <mu-list-item-sub-title>
                {{seminarDetails.registerStatus}}
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-button flat color="success" @click="changeRegister">修改</mu-button>
          </mu-list-item>
          <mu-divider v-if="status==5"></mu-divider>
          <mu-list-item avatar :ripple="false" button v-if="status==5">
            <mu-list-item-content>
              <mu-list-item-title>PPT</mu-list-item-title>
              <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)"></mu-list-item-sub-title>
              <mu-list-item-sub-title>
               已提交
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-button flat color="normal">  已提交</mu-button>
          </mu-list-item>
          <mu-divider v-if="status==5"></mu-divider>
          <mu-list-item avatar :ripple="false" button v-if="status==5">
            <mu-list-item-content>
              <mu-list-item-title>报告</mu-list-item-title>
              <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)"></mu-list-item-sub-title>
              <mu-list-item-sub-title>
              已提交
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-button flat color="normal">  已提交</mu-button>
          </mu-list-item>

          <!--已报名，正在进行-->
          <mu-list-item avatar :ripple="false" button v-if="status==3">
            <mu-list-item-content>
              <mu-list-item-title>报名情况</mu-list-item-title>
              <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)"></mu-list-item-sub-title>
              <mu-list-item-sub-title>
                {{seminarDetails.registerStatus}}
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-button flat color="success" @click="changeRegister">修改</mu-button>
          </mu-list-item>
          <mu-divider v-if="status==3"></mu-divider>
          <mu-list-item avatar :ripple="false" button v-if="status==3">
            <mu-list-item-content>
              <mu-list-item-title>PPT</mu-list-item-title>
              <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)"></mu-list-item-sub-title>
              <mu-list-item-sub-title>
                已提交
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-button flat color="normal">  已提交</mu-button>
          </mu-list-item>
          <mu-divider v-if="status==3"></mu-divider>
          <mu-list-item avatar :ripple="false" button v-if="status==3">
            <mu-list-item-content>
              <mu-list-item-title>报告</mu-list-item-title>
              <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)"></mu-list-item-sub-title>
              <mu-list-item-sub-title>
                已提交
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-button flat color="normal">  已提交</mu-button>
          </mu-list-item>
        </mu-list>

        <!--未报名未开始-->
        <div class="dateRemind" v-if="status==1">
          <img class="iimg" src="../../../assets/schedule.svg"   />
          开始报名时间：{{seminarDetails.regieterStartTime}}<br/>
          <img class="iimg" src="../../../assets/schedule.svg"   />
          结束报名时间：{{seminarDetails.registerEndTime}}
        </div>
        <mu-button class="inSeminar" color="success"  @click="showStatusDetails" v-if="status==1">报名</mu-button>

        <!--正在进行 -->
        <mu-button class="inSeminar" color="success"  style="margin-top: 10vh;" @click="inSeminar" v-if="status==2">进入讨论课</mu-button>


        <!--已报名 未开始-->
        <mu-button class="submit"  style="margin-top: 5vh;" color="success"  @click="submitReport" v-if="status==4">报告提交</mu-button>
        <mu-button class="submit" color="success"  @click="submitPPT" v-if="status==4" >PPT提交</mu-button>
        <mu-dialog title="上传PPT" width="360" :open.sync="pptFlag">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <mu-button slot="actions" flat color="success" @click="pptFlag=!pptFlag">Sure</mu-button>
          <mu-button slot="actions" flat color="primary" @click="pptFlag=!pptFlag">Close</mu-button>
        </mu-dialog>

        <mu-dialog title="上传报告" width="360" :open.sync="reportFlag">
          <mu-button slot="actions" flat color="success" @click="reportFlag=!reportFlag">Sure</mu-button>
          <mu-button slot="actions" flat color="primary" @click="reportFlag=!reportFlag">Close</mu-button>
        </mu-dialog>

        <!--已报名，正在进行-->
        <mu-button class="submit"  style="margin-top: 5vh;" color="success"  @click="submitReport" v-if="status==3">报告提交</mu-button>
        <mu-button class="submit" color="success"  @click="submitPPT" v-if="status==3" >PPT提交</mu-button>

        <mu-flex justify-content="center" align-items="center" class="conRunning">
          <mu-button large round  class="runningSeminar" @click="inSeminar" v-if="status==3"  color="error">进入讨论课 &emsp; <i class="el-icon-d-arrow-right"/></mu-button>
        </mu-flex>
        <!--<mu-button class="runningSeminar" color="success"  style="margin-top: 10vh;" @click="inSeminar" v-if="status==3">进入讨论课<></mu-button>-->

        <!--未报名，正在进行-->

        <!--已报名，已结束-->
        <mu-button class="submit" color="success"  @click="showGrades" v-if="status==5">查看成绩</mu-button>

        <!--未报名，已结束-->
      </div>
    </div>
</template>

<script>
  import BackBar from '../../ReuseComponents/BackBar'
    export default {
        name: "SeminarDetails",
      components:{
          BackBar,
      },
      // created(){
      //   this.$data.seminarDetails.seminarId=this.$route.query.seminarId;
      //   this.$data.seminarDetails.roundId=this.$route.query.roundId;
      //
      //   let _this=this;    //根据courseId获取该课程讨论课列表
      //    this.$axios({
      //     method:'get',
      //     url:'/seminar/'+this.$data.seminarDetails.seminarId,
      //   }).then(function(response){
      //     _this.$data.seminarDetails.seminarTopic=response.data.seminarTopic;
      //      _this.$data.seminarDetails.seminarContent=response.data.seminarContent;
      //      _this.$data.seminarDetails.status=response.data.status;
      //      _this.$data.seminarDetails.regieterStartTime=response.data.signStartTime;
      //      _this.$data.seminarDetails.registerEndTime=response.data.signEndTime;
      //
      //   },function(error){
      //     alert(error);
      //   });
      // },
      data(){
          return{
            open:'send',
            status:1,   //1-未开始，未报名    2-未报名，正在进行  3-已报名，正在进行  4-已报名，未开始  5-已报名，已结束
            seminarDetails:{
              seminarId:"",
              title:"OOAD-讨论课",
              seminarTopic:'业务流程分析',
              roundId:2,
              classOrder:'第二次',
              seminarContent:'不上课了 We should eat this: Grate, Squash, Corn, and tomatillo Tacos.sdasdasd',
              status:'正在进行',
              registerEndTime:"2018-10-1",
              regieterStartTime:'2018-1-1',
              pptStatus:'未提交',
              reportStatus:'未提交',
              pptEndTime:'距截止时间还有一天',
              reportEndTime:'距截止时间还有一天',
              registerStatus:'2016(1)-第三组',
            },
            fileList: [{name: 'food.jpeg', url:[],}],
            reportFlag:false,
            pptFlag:false,
          }
      },
      methods:{
          showStatusDetails(){
            this.$router.push('/StuStatusDetails');
          },
        inSeminar(){
            this.$router.push('/StuAskQuestion');
        },
        //原RegisteredSeminarDetails方法
        changeRegister(){
          this.$router.push('/StuChangeRegister');
        },
        submitPPT(){
          this.$data.pptFlag=true;
        },
        showGrades(){
          this.$router.push('/StuCheckGrades');
        },

        submitReport(){
          this.$data.reportFlag=true;
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },
        handleExceed(files, fileList) {
          this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
          return this.$confirm(`确定移除 ${ file.name }？`);
        }

      }
    }
</script>

<style lang="less">
  .tit{
    font-size: 25px;
  }
  .seminarDetailsBack{
    margin-top: 12vh;
  }
  .infoList{
    margin-top: 2vh;
    border-top:5px solid lightgray;
    border-bottom: 0.5px solid lightgray;
  }
  .requirContent{
    margin: 5px 20px;
    height:auto;
  }
  .submit,.inSeminar{
    font-size: 18px;
    margin-top: 2vh;
    width: 100%;
    height:6vh;
    opacity: 0.9;
  }
  .dateRemind{
    margin-top: 10vh;
    color:darkred;
    width: 100%;
  }
  .iimg{
    width: 25px;
    height: 25px;
  }
  .iimg:nth-child(2){
    margin-left: 4vw;
  }
  .conRunning{
    height:8vh;
    float:right;
    margin-right: 4vw;
    margin-top: 2vh;
  }
  .runningSeminar{
    height:8vh;
    width:50vw;
    font-size: 18px;
  }
  @media screen and (min-width: 481px ){
    .tit{
      font-size: 30px;
    }
    .seminarDetailsBack{
      margin-top: 12vh;
    }
    .infoList{
      font-size: 30px;
      margin-top: 2vh;
      border-top:5px solid lightgray;
      border-bottom: 0.5px solid lightgray;
    }
    .requirContent{
      margin: 5px 20px;
      height:auto;
    }
    .inSeminar,.submit{
      font-size: 30px;
    }
    .dateRemind{
      font-size: 25px;
    }
    .iimg{
      height:25px;
      width:25px;
    }
    .iimg:nth-child(2){
      margin-left: 40px;
    }
    .conRunning{
      height:8vh;
      float:right;
      margin-right: 4vw;
      margin-top: 2vh;
    }
    .runningSeminar{
      height:8vh;
      width:35vw;
      font-size: 25px;
    }
    .el-icon-d-arrow-right{
      font-size: 30px;
    }



    .item{
      height:auto;
    }
    .mu-list-item-content{
      font-size: 30px;
    }
    .mu-list-item-title{
      font-size: 30px;
    }

  }


</style>
