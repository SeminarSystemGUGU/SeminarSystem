<template>
    <div>
      <back-bar :titleName="title" :showMessages="true" :showBackBar="true" :backUrl="{path:'/StuMainSeminars',query:{courseId:courseId,klassId:klassId}}"></back-bar>

      <div class="seminarDetailsBack animated fadeInRight" align="left">
        <span  class="tit" style="margin-left: 2vw;">{{seminarEntity.seminarName}}</span>
        <mu-list  toggle-nested class="infoList">
          <mu-list-item class="item" avatar :ripple="false" button>
            <mu-list-item-content>
              <mu-list-item-title>轮次</mu-list-item-title>
              <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)"></mu-list-item-sub-title>
              <mu-list-item-sub-title>
                {{seminarEntity.roundSerial}}
              </mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider></mu-divider>
          <mu-list-item class="item" avatar :ripple="false" button>
            <mu-list-item-content>
              <mu-list-item-title>课次序号</mu-list-item-title>
              <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)"></mu-list-item-sub-title>
              <mu-list-item-sub-title>
                {{seminarEntity.seminarSerial}}
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
              <mu-list-item-content >{{seminarEntity.introduction}}</mu-list-item-content>
            </mu-list-item-content>
          </mu-list-item>
          <!--所有ITEM-->
          <!--未开始、未报名-->
          <mu-divider  v-if="status===1"></mu-divider>
          <mu-list-item class="item" avatar :ripple="false" button v-if="status===1">
            <mu-list-item-content >
              <mu-list-item-title>课程情况</mu-list-item-title>
              <mu-list-item-sub-title >
                未开始
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-button flat color="success" @click="showStatusDetails(status)">查看详情</mu-button>
          </mu-list-item>
          <!--已报名，未开始-->
          <mu-divider  v-if="status===4"></mu-divider>
          <mu-list-item avatar :ripple="false" button v-if="status===4">
            <mu-list-item-content>
              <mu-list-item-title>课程情况</mu-list-item-title>
              <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)"></mu-list-item-sub-title>
              <mu-list-item-sub-title>
                未开始
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-button flat color="success" @click="showStatusDetails(status)">修改报名</mu-button>
          </mu-list-item>
          <mu-divider  v-if="status===4"></mu-divider>
          <mu-list-item avatar :ripple="false" button v-if="status===4">
            <mu-list-item-content>
              <mu-list-item-title>PPT</mu-list-item-title>
              <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)"></mu-list-item-sub-title>
              <mu-list-item-sub-title>
                <span v-if="getPPT.name===''||getPPT.name===null">未上传</span>
                {{getPPT.name}}
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <!--<mu-button flat color="normal">-->
              <a :href="baseURL+getPPT.path" v-if="getPPT.name!==''&&getPPT.name!==null">下载</a>
            <!--</mu-button>-->
          </mu-list-item>

          <!--未报名、正在进行-->
          <mu-divider class="" style="height: 5px;" v-if="status===2"></mu-divider>
          <mu-list-item class="item" avatar :ripple="false" button v-if="status===2">
            <mu-list-item-content >
              <mu-list-item-title>课程情况</mu-list-item-title>
              <mu-list-item-sub-title >
                正在进行
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-button flat color="success" @click="showStatusDetails(status)">查看详情</mu-button>
          </mu-list-item>
          <!--已报名，正在进行-->
          <mu-divider class="" style="height: 5px;" v-if="status===3"></mu-divider>
          <mu-list-item class="item" avatar :ripple="false" button v-if="status===3">
            <mu-list-item-content >
              <mu-list-item-title>课程情况</mu-list-item-title>
              <mu-list-item-sub-title >
                正在进行
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-button flat color="success" @click="showStatusDetails(status)">查看详情</mu-button>
          </mu-list-item>
          <!--<mu-list-item avatar :ripple="false" button v-if="status===3">-->
            <!--<mu-list-item-content>-->
              <!--<mu-list-item-title>报名情况</mu-list-item-title>-->
              <!--<mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)"></mu-list-item-sub-title>-->
              <!--<mu-list-item-sub-title>-->
                <!--&lt;!&ndash;{{// seminarDetails.registerStatus}}&ndash;&gt;-->
              <!--</mu-list-item-sub-title>-->
            <!--</mu-list-item-content>-->
            <!--<mu-button flat color="success" @click="">修改</mu-button>-->
          <!--</mu-list-item>-->
          <mu-divider v-if="status===3"></mu-divider>
          <mu-list-item avatar :ripple="false" button v-if="status===3">
            <mu-list-item-content>
              <mu-list-item-title>PPT</mu-list-item-title>
              <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)"></mu-list-item-sub-title>
              <mu-list-item-sub-title>
                <span v-if="getPPT.name===''||getPPT.name===null">未上传</span>
                {{getPPT.name}}
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-button flat color="normal">
              <a :href="baseURL+getPPT.path" v-if="getPPT.name!==''&&getPPT.name!==null" >下载</a>
            </mu-button>
          </mu-list-item>

          <!--已报名，已结束、未截止-->
          <mu-list-item avatar :ripple="false" button v-if="status===5">
            <mu-list-item-content>
              <mu-list-item-title>课程情况</mu-list-item-title>
              <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)"></mu-list-item-sub-title>
              <mu-list-item-sub-title>
                已结束
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-button flat color="success" @click="showStatusDetails(status)">详情</mu-button>
          </mu-list-item>
          <mu-divider v-if="status===5"></mu-divider>
          <mu-list-item avatar :ripple="false" button v-if="status===5">
            <mu-list-item-content>
              <mu-list-item-title>PPT</mu-list-item-title>
              <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)"></mu-list-item-sub-title>
              <mu-list-item-sub-title>
                <span v-if="getPPT.name===''||getPPT.name===null">未上传</span>
                {{getPPT.name}}
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-button flat color="normal">
              <a :href="baseURL+getPPT.path" v-if="getPPT.name!==''&&getPPT.name!==null" >下载</a>
            </mu-button>
          </mu-list-item>
          <mu-divider v-if="status===5"></mu-divider>
          <mu-list-item avatar :ripple="false" button v-if="status===5">
            <mu-list-item-content>
              <mu-list-item-title>报告</mu-list-item-title>
              <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)"></mu-list-item-sub-title>
              <mu-list-item-sub-title>
                <span v-if="getReport.name===''||getReport.name===null">未上传</span>
                {{getReport.name}}
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-button flat color="normal">
              <a :href="baseURL+getReport.path"  v-if="getReport.name!==''&&getReport.name!==null">下载</a>
            </mu-button>
          </mu-list-item>
          <!--已报名，已结束、已截止-->
          <mu-list-item avatar :ripple="false" button v-if="status===7||status===6">
            <mu-list-item-content>
              <mu-list-item-title>课程情况</mu-list-item-title>
              <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)"></mu-list-item-sub-title>
              <mu-list-item-sub-title>
                已结束
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-button flat color="success" @click="showStatusDetails(status)">详情</mu-button>
          </mu-list-item>
          <mu-divider v-if="status===6"></mu-divider>
          <mu-list-item avatar :ripple="false" button v-if="status===6">
            <mu-list-item-content>
              <mu-list-item-title>PPT</mu-list-item-title>
              <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)"></mu-list-item-sub-title>
              <mu-list-item-sub-title>
                <span v-if="getPPT.name===''||getPPT.name===null">未上传</span>
                {{getPPT.name}}
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-button flat color="normal">
              <a :href="baseURL+getPPT.path" v-if="getPPT.name!==''&&getPPT.name!==null">下载</a>
            </mu-button>
          </mu-list-item>
          <mu-divider v-if="status===6"></mu-divider>
          <mu-list-item avatar :ripple="false" button v-if="status===6">
            <mu-list-item-content>
              <mu-list-item-title>报告</mu-list-item-title>
              <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)"></mu-list-item-sub-title>
              <mu-list-item-sub-title>
                <span v-if="getReport.name===''||getReport.name===null">未上传</span>
                {{getReport.name}}
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-button flat color="normal">
              <a :href="baseURL+getReport.path" v-if="getReport.name!==''&&getReport.name!==null&&getReport!==''">下载</a>
            </mu-button>
          </mu-list-item>
          <!--未报名，已结束-->
          <mu-divider v-if="status===7"></mu-divider>
          <mu-list-item avatar :ripple="false" button v-if="status===7">
            <mu-list-item-content>
              <mu-list-item-title>课程情况</mu-list-item-title>
              <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)"></mu-list-item-sub-title>
              <mu-list-item-sub-title>
                已结束
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-button flat color="success" @click="showStatusDetails(status)">详情</mu-button>
          </mu-list-item>
        </mu-list>

        <!--所有按钮-->
        <!--未报名未开始-->
        <div class="dateRemind" v-if="status===1">
          <img class="iimg" src="../../../assets/schedule.svg"   />
          开始报名时间：{{seminarEntity.enrollStartTime}}<br/>
          <img class="iimg" src="../../../assets/schedule.svg"   />
          结束报名时间：{{seminarEntity.enrollEndTime}}
        </div>
        <mu-button class="inSeminar" color="success"  @click="showStatusDetails(status)" v-if="status===1" :disabled="ddl===1">报名</mu-button>

        <!--已报名 未开始-->
        <mu-button class="submit" color="success"  @click="submitPPT" v-if="status===4" >PPT提交</mu-button>
        <mu-dialog title="上传PPT" width="360" :open.sync="pptFlag">
          <!--<el-upload-->
            <!--class="upload-demo"-->
            <!--:action="baseURL+'/attendance/'+attendanceId+'/powerpoint'"-->
            <!--:limit="1"-->
            <!--:file-list="ppt">-->
            <el-button size="small" type="primary">点击上传</el-button>
          <!--</el-upload>-->
          <mu-button slot="actions" flat color="success" @click="submit">Sure</mu-button>
          <mu-button slot="actions" flat color="primary" @click="pptFlag=!pptFlag">Close</mu-button>
        </mu-dialog>

        <!--已报名，正在进行-->
        <!--<mu-button class="submit"  style="margin-top: 5vh;" color="success"  @click="submitReport" v-if="status===3">报告提交</mu-button>-->
        <mu-button class="submit" color="success"  @click="submitPPT" v-if="status===3" >PPT提交</mu-button>
        <mu-flex justify-content="center" align-items="center" class="conRunning">
          <mu-button large round  class="runningSeminar" @click="inSeminar" v-if="status===3"  color="error">进入讨论课 &emsp; <i class="el-icon-d-arrow-right"/></mu-button>
        </mu-flex>

        <!--未报名，正在进行-->
        <mu-flex justify-content="center" align-items="center" class="conRunning">
          <mu-button large round  class="runningSeminar" @click="inSeminar" v-if="status===2"  color="error">进入讨论课 &emsp; <i class="el-icon-d-arrow-right"/></mu-button>
        </mu-flex>

        <!--已报名，已结束，已截止-->
        <mu-button class="submit" color="success"  @click="showGrades" v-if="status===6">查看成绩</mu-button>

        <!--已报名，已结束，未截止-->
        <mu-button class="submit"  style="margin-top: 5vh;" color="success"  @click="submitReport" v-if="status===5">报告提交</mu-button>
        <mu-dialog title="上传报告" width="360" :open.sync="reportFlag">
          <mu-dialog title="上传报告" width="360" :open.sync="reportFlag">
            <!--<el-upload-->
              <!--class="upload-demo"-->
              <!--:action="baseURL+'/attendance/'+attendanceId+'/report'"-->
              <!--:limit="1"-->
              <!--:file-list="report">-->
              <el-button size="small" type="primary">点击上传</el-button>
            <!--</el-upload>-->
            <mu-button slot="actions" flat color="success" @click="reportFlag=!reportFlag">Sure</mu-button>
            <mu-button slot="actions" flat color="primary" @click="reportFlag=!reportFlag">Close</mu-button>
          </mu-dialog>
          <mu-button slot="actions" flat color="success" @click="reportFlag=!reportFlag">Sure</mu-button>
          <mu-button slot="actions" flat color="primary" @click="reportFlag=!reportFlag">Close</mu-button>
        </mu-dialog>

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
      created(){
        this.$data.baseURL=this.$axios.defaults.baseURL;
        this.$data.courseId=this.$route.query.courseId;
        this.$data.seminarId=this.$route.query.seminarId;
        this.$data.klassId=this.$route.query.klassId;

        let tt=this;
        this.$axios({
          method:'get',
          url:'/course/'+tt.$data.courseId+'/team',
        }).then(function (response) {
          tt.$data.myTeam=response.data;
        });
        let _this=this;
         this.$axios({
          method:'get',
          url:'/seminar/'+_this.$data.seminarId+'/class/'+_this.$data.klassId,
        }).then(function(response){
           _this.$data.reportDDL=response.data.reportDDL;
           _this.$data.processing=response.data.status;          //课程进度
           _this.$data.seminarEntity=response.data.seminarEntity;
           _this.$data.klassSeminarId=response.data.klassSeminarId;
           _this.$data.seminarEntity.enrollStartTime=_this.$data.seminarEntity.enrollStartTime.slice(0,10);
           _this.$data.seminarEntity.enrollEndTime=_this.$data.seminarEntity.enrollEndTime.slice(0,10);

           // let nowDate=_this.getNowDate();       //组队是否截止
           // if(nowDate<=_this.$data.seminarEntity.enrollEndTime)
           //   _this.$data.ddl=0;
           // else if(nowDate>_this.$data.seminarEntity.enrollEndTime)
           //   _this.$data.ddl=1;

           let t=_this;
           _this.$axios({
             method:'get',
             url:'/attendance/'+t.$data.klassSeminarId,
           }).then(function (response) {
             t.$data.enrollTeams=response.data;           //判断是否报名
             let i;
             for( i=0;i<t.$data.enrollTeams.length;i++)
             {
               if(t.$data.enrollTeams[i].teamId===t.$data.myTeam.teamId)
               {
                 t.$data.enrollState=1;     //已报名
                 t.$data.attendanceId=t.$data.enrollTeams[i].id;
                 break;
               }
             }
             if(t.$data.enrollState===1){
              let ttt=t;      //获取长传ppt
              t.$axios({
                 method:'get',
                 url:'/attendance/'+ttt.$data.attendanceId+'/ppt',
              }).then(function (response) {
                ttt.$data.getPPT=response.data;
               });

               let tttt=t;      //获取长传ppt
               t.$axios({
                 method:'get',
                 url:'/attendance/'+tttt.$data.attendanceId+'/report',
               }).then(function (response) {
                 tttt.$data.getReport=response.data;
               });


             }
             //   判断讨论课状态       processing: 0未开始   1正在进行  2已经结束
             //                      enrollState:  0未报名   1已经报名
             // 报告是否截止            reportEnd:    0-未截止   1-已经截止
             //  1-未开始，未报名    2-未报名，正在进行         3-已报名，正在进行
             //  4-已报名，未开始    5-已报名，已结束,未截止    6-已报名，已经完成，已经截止  7-未报名，已截止

             if(t.$data.processing===0 && t.$data.enrollState===0)
               t.$data.status=1;
             else if(t.$data.processing===0 && t.$data.enrollState===1)
               t.$data.status=4;
             else if(t.$data.processing===1 && t.$data.enrollState===0)
               t.$data.status=2;
             else if(t.$data.processing===1 && t.$data.enrollState===1)
               t.$data.status=3;
             else if(t.$data.processing===2 && t.$data.enrollState===1 && t.$data.reportEnd===0)
               t.$data.status=5;
             else if(t.$data.processing===2 && t.$data.enrollState===1 && t.$data.reportEnd===1)
               t.$data.status=6;
             else if(t.$data.processing===2 && t.$data.enrollState===0 )
               t.$data.status=7;
             // t.$data.status=5;
           })
         },function(error){
           alert(error);
        });
      },
      data(){
          return{
            open:'send',
            baseURL:'',
            title:'讨论课',
            myTeam:'',
            klassId:'',
            courseId:'',
            seminarId:'',
            klassSeminarId:'',
            attendanceId:'',
            seminarEntity:'',
            reportDDL:'',
            getPPT:'',
            getReport:'',
            processing:-1,   //状态判定
            enrollState:0,
            reportEnd:1,
            status:-1,     //1-未开始，未报名    2-未报名，正在进行  3-已报名，正在进行  4-已报名，未开始  5-已报名，已结束
            enrollTeams:[],  //报名小组列表
            ppt: [],
            report:[],
            webSocketAddress:'',
            socket:'',
            ddl:0,

            reportFlag:false,
            pptFlag:false,
          }
      },
      methods:{
        showStatusDetails(status){      //报名
          this.$router.push({path:'/StuStatusDetails',query:{klassId:this.$data.klassId,seminarId:this.$data.seminarId,status:status}});
        },
        inSeminar(){
            this.$router.push({path:'/StuAskQuestion',query:{klassId:this.$data.klassId,seminarId:this.$data.seminarId}});
        },
        submitPPT(){
          this.$data.pptFlag=true;
        },
        showGrades(){
          this.$router.push({path:'/StuCheckGrades',query:{courseId:this.$data.courseId,klassId:this.$data.klassId,seminarId:this.$data.seminarId}});
        },
        submit(){
          let ttt=this;      //获取长传ppt
          this.$axios({
            method:'get',
            url:'/attendance/'+ttt.$data.attendanceId+'/ppt',
          }).then(function (response) {
            ttt.$data.getPPT=response.data;
            ttt.$data.pptFlag=!ttt.$data.pptFlag;
          });
        },
        submitReport(){
          this.$data.reportFlag=true;
        },
        getNowDate() {
          let date = new Date();
          let seperator1 = "-";
          let year = date.getFullYear();
          let month = date.getMonth() + 1;
          let strDate = date.getDate();
          if (month >= 1 && month <= 9) {
            month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }
          let currentdate = year + seperator1 + month + seperator1 + strDate;
          return currentdate;
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
