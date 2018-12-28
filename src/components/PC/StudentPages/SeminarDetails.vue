<template>
  <div class="seminarBack animated fadeIn" align="left">
    <div class="titleBar">
      第一轮讨论课
    </div>
    <div class="contentCard">
      <div class="smallCard">
        {{seminar.seminarName}}
      </div>
      <div class="nextCard">
        报名情况：{{seminar.registerStatus}}
      </div>
      <div>
        <span class="subCon">报名起止日期：{{seminar.enrollStartTime.slice(0,10)}}--{{seminar.enrollEndTime.slice(0,10)}}</span><br/>
        <span class="subCon">报告提交截止日期：</span><br/>
        <span class="subCon">要求：{{seminar.introduction}}</span><br/>
      </div>
    </div>
    <div class="lastCard">
      已报名小组
    </div>
    <el-table  :data="registerOrder" stripe id="teamTable" v-if="state===0" style="margin-bottom: 100px;">
      <el-table-column prop="order" label="次序" width="100"></el-table-column>
      <el-table-column prop="teamSerial" label="组号" width="80"></el-table-column>
      <el-table-column prop="leader" label="组长" width="150"></el-table-column>
      <el-table-column prop="pptName" label="展示材料" width="150">
        <template slot-scope="scope">
          <!--<img  v-if="registerOrder[scope.$index].pptName!==''" style="width: 30px;height: 30px;color:#67C23A;cursor: pointer" src="../../../assets/download.svg"/>-->
          <a v-if="registerOrder[scope.$index].pptName!==''&&registerOrder[scope.$index].pptName!==null"
             :href="baseURL+registerOrder[scope.$index].pptUrl">
            {{registerOrder[scope.$index].pptName}}下载
          </a>
          <span v-if="(registerOrder[scope.$index].pptName===''||registerOrder[scope.$index].pptName===null)
          &&registerOrder[scope.$index].teamSerial!==''">未上传</span>
          <span v-if="registerOrder[scope.$index].pptName===''&&registerOrder[scope.$index].teamSerial!==''" style="width: 30px;height: 30px;color:#67C23A;cursor: pointer" >未上传</span>
        </template>
      </el-table-column>
      <el-table-column label="">
        <template slot-scope="scope">
          <div>
            <mu-button  flat :disabled="registerOrder[scope.$index].teamSerial!==''" @click.native.prevent="enroll(scope.$index )" color="success"  >
              可报名
            </mu-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!--已报名-->
    <el-table  :data="registerOrder" stripe  v-if="state===1" style="margin-bottom: 100px;">
      <el-table-column prop="order" label="次序" width="100"></el-table-column>
      <el-table-column prop="teamSerial" label="组号" width="80"></el-table-column>
      <el-table-column prop="leader" label="组长" width="150"></el-table-column>
      <el-table-column prop="pptName" label="展示材料" width="150">
        <template slot-scope="scope">
          <!--<img  v-if="registerOrder[scope.$index].pptName!==''" style="width: 30px;height: 30px;color:#67C23A;cursor: pointer" src="../../../assets/download.svg"/>-->
          <a v-if="registerOrder[scope.$index].pptName!==''&&registerOrder[scope.$index].pptName!==null " :href="baseURL+registerOrder[scope.$index].pptUrl">
            {{registerOrder[scope.$index].pptName}}下载
          </a>
          <span v-if="registerOrder[scope.$index].pptName===''&&registerOrder[scope.$index].teamSerial!==''&&registerOrder[scope.$index].leader!==myTeam.leader.id" style="width: 30px;height: 30px;color:#67C23A;cursor: pointer" >未上传</span>
          <mu-button @click="pptFlag=!pptFlag" flat large color="success" v-if="(registerOrder[scope.$index].pptName===''||registerOrder[scope.$index].pptName===null)&&registerOrder[scope.$index].leader===myTeam.leader.id">上传</mu-button>
        </template>
      </el-table-column>
      <el-table-column label="">
        <template slot-scope="scope">
          <div>
            <mu-button  flat v-if="registerOrder[scope.$index].teamSerial===''" @click.native.prevent="changeEnroll(scope.$index )" color="success"  >
              可报名
            </mu-button>
            <mu-button  flat v-if="registerOrder[scope.$index].leader===myTeam.leader.id" @click.native.prevent="cancleEnroll(scope.$index )" color="error"  >
              取消报名
            </mu-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

      <mu-dialog title="上传PPT" width="360" :open.sync="pptFlag">
        <el-upload
        class="upload-demo"
        :action="baseURL+'/attendance/'+attendanceId+'/powerpoint'"
        :limit="1"
        :file-list="report">
        <!--<el-button size="small" type="primary">点击上传</el-button>-->
        </el-upload>
        <mu-button slot="actions" flat color="success" @click="confirmUP">Sure</mu-button>
      </mu-dialog>
  </div>
</template>

<script>
    export default {
        name: "SeminarDetails",
      created(){
        this.$data.baseURL=this.$axios.defaults.baseURL;
        this.$data.seminarId=this.$route.query.seminarId;
        this.$data.klassId=this.$route.query.klassId;
        this.$data.courseId=this.$route.query.courseId;

        let h=this;
        this.$axios({
          method:'get',
          url:'/seminar/'+h.$data.seminarId,
        }).then(function (response) {
          h.$data.maxMember=response.data.maxTeam;
        });

        let _this=this;     //讨论课信息
        this.$axios({
          method:'get',
          url:'/seminar/'+_this.$data.seminarId,
        }).then(function (response) {
          _this.$data.seminar=response.data;
        });

        let hs=this;      //我的组队信息
        this.$axios({
          method:'get',
          url:'/course/'+hs.$data.courseId+'/team'
        }).then(function (response) {
          hs.$data.myTeam=response.data;
          let ts=hs;
          hs.$axios({
            method:'get',
            url:'/seminar/'+ts.$data.seminarId+'/class/'+ts.$data.klassId,
          }).then(function(response){
            ts.$data.klassSeminarId = response.data.klassSeminarId;
            ts.$data.processing=response.data.status;

            let tt=ts;
            ts.$axios({         //讨论课报名情况
              method:'get',
              url:'/attendance/'+tt.$data.klassSeminarId,
            }).then(function (response) {
              tt.$data.enrollTeams=response.data;
              tt.$data.registerOrder=[];
              let m;
              for(m=0;m<6;m++)
              {
                let mm=m;
                tt.$data.registerOrder.push({order:mm+1,teamSerial:'',teamName:'',leader:'',pptName:'',pptPath:'',reportName:'',reportPath:''});
              }
              let x,y;
              for(x=0;x<tt.$data.registerOrder.length;x++)
                for(y=0;y<tt.$data.enrollTeams.length;y++)
                {
                  if(tt.$data.enrollTeams[y].teamOrder===tt.$data.registerOrder[x].order)
                  {
                    tt.$data.registerOrder[x].leader=tt.$data.enrollTeams[y].teamEntity.leaderId;
                    tt.$data.registerOrder[x].teamSerial=tt.$data.enrollTeams[y].teamEntity.teamSerial;
                    tt.$data.registerOrder[x].teamName=tt.$data.enrollTeams[y].teamEntity.teamName;
                    if(tt.$data.enrollTeams[y].teamEntity.pptName!==null)
                      tt.$data.registerOrder[x].pptName=tt.$data.enrollTeams[y].pptName;
                    if(tt.$data.enrollTeams[y].teamEntity.pptUrl!==null)
                      tt.$data.registerOrder[x].pptUrl=tt.$data.enrollTeams[y].pptUrl;
                    if(tt.$data.enrollTeams[y].teamEntity.reportName!==null)
                      tt.$data.registerOrder[x].reportName=tt.$data.enrollTeams[y].reportName;
                    if(tt.$data.enrollTeams[y].teamEntity.reportUrl!==null)
                      tt.$data.registerOrder[x].reportUrl=tt.$data.enrollTeams[y].reportUrl;
                    break;
                  }
                }

              tt.$data.state=0;
              let i;
              for(i=0;i<response.data.length;i++)
              {
                if(response.data[i].teamId===tt.$data.myTeam.teamId) {
                  tt.$data.state = 1;
                  tt.$data.attendanceId=response.data[i].id;
                  break;
                }
              }
            });
          });
        });
      },
      data(){
          return{
            baseURL:'',
            doundID:1,
            state:-1,  //是否报名   0-未报名   1-已报名
            processing:-1,   //上课状态
            courseId:-1,
            seminarId:-1,
            attendanceId:-1,
            seminar:'',
            myTeam:'',
            klassSeminarId:-1,
            enrollTeams:[],
            registerOrder:[],
            ppt:[],
            report:[],
            pptFlag:false,
            reportFlag:false,
            maxMember:-1,

        }
      },
      methods:{
          getRegisterOrder(){
            let ts=this;
            this.$axios({
              method:'get',
              url:'/seminar/'+ts.$data.seminarId+'/class/'+ts.$data.klassId,
            }).then(function(response){
              ts.$data.klassSeminarId = response.data.klassSeminarId;

              let tt=ts;
              ts.$axios({         //讨论课报名情况
                method:'get',
                url:'/attendance/'+tt.$data.klassSeminarId,
              }).then(function (response) {
                tt.$data.enrollTeams=response.data;
                tt.$data.registerOrder=[];
                let x;
                for(x=0;x<6;x++)
                {
                  tt.$data.registerOrder.push({order:x+1,teamSerial:'',teamName:'',leader:'',pptName:'',pptPath:'',reportName:'',reportPath:''});
                }
                let y;
                for(x=0;x<tt.$data.registerOrder.length;x++)
                  for(y=0;y<tt.$data.enrollTeams.length;y++)
                  {
                    if(tt.$data.enrollTeams[y].teamOrder===tt.$data.registerOrder[x].order)
                    {
                      tt.$data.registerOrder[x].leader=tt.$data.enrollTeams[y].teamEntity.leaderId;
                      tt.$data.registerOrder[x].teamSerial=tt.$data.enrollTeams[y].teamEntity.teamSerial;
                      tt.$data.registerOrder[x].teamName=tt.$data.enrollTeams[y].teamEntity.teamName;
                      if(tt.$data.enrollTeams[y].teamEntity.pptName!==null)
                        tt.$data.registerOrder[x].pptName=tt.$data.enrollTeams[y].pptName;
                      if(tt.$data.enrollTeams[y].teamEntity.pptUrl!==null)
                        tt.$data.registerOrder[x].pptUrl=tt.$data.enrollTeams[y].pptUrl;
                      if(tt.$data.enrollTeams[y].teamEntity.reportName!==null)
                        tt.$data.registerOrder[x].reportName=tt.$data.enrollTeams[y].reportName;
                      if(tt.$data.enrollTeams[y].teamEntity.reportUrl!==null)
                        tt.$data.registerOrder[x].reportUrl=tt.$data.enrollTeams[y].reportUrl;
                    }
                  }

                tt.$data.state=0;
                let i;
                for(i=0;i<response.data.length;i++)
                {
                  if(response.data[i].teamId===tt.$data.myTeam.teamId) {
                    tt.$data.state = 1;
                    tt.$data.attendanceId=response.data[i].id;
                    break;
                  }
                }
              });
            });
          },
          enroll(index){
            let _this = this;
            this.$axios({
              method: 'post',
              url: '/attendance',
              data: {
                klassSeminarId: _this.$data.klassSeminarId,
                teamId: _this.$data.myTeam.teamId,
                teamOrder: index+1,
              }
            }).then(function (response) {
              _this.$data.attendanceId = response.data;
              _this.$toast.success("报名成功！");

              const loading = _this.$loading();
              setTimeout(() => {
                loading.close();
              }, 500);

              let ts=_this;
              _this.$axios({
                method:'get',
                url:'/seminar/'+ts.$data.seminarId+'/class/'+ts.$data.klassId,
              }).then(function(response){
                ts.$data.klassSeminarId = response.data.klassSeminarId;

                let tt=ts;
                ts.$axios({         //讨论课报名情况
                  method:'get',
                  url:'/attendance/'+tt.$data.klassSeminarId,
                }).then(function (response) {
                  tt.$data.enrollTeams=response.data;
                  tt.$data.registerOrder=[];
                  let x;
                  for(x=0;x<6;x++)
                  {
                    tt.$data.registerOrder.push({order:x+1,teamSerial:'',teamName:'',leader:'',pptName:'',pptPath:'',reportName:'',reportPath:''});
                  }
                  let y;
                  for(x=0;x<tt.$data.registerOrder.length;x++)
                    for(y=0;y<tt.$data.enrollTeams.length;y++)
                    {
                      if(tt.$data.enrollTeams[y].teamOrder===tt.$data.registerOrder[x].order)
                      {
                        tt.$data.registerOrder[x].leader=tt.$data.enrollTeams[y].teamEntity.leaderId;
                        tt.$data.registerOrder[x].teamSerial=tt.$data.enrollTeams[y].teamEntity.teamSerial;
                        tt.$data.registerOrder[x].teamName=tt.$data.enrollTeams[y].teamEntity.teamName;
                        if(tt.$data.enrollTeams[y].teamEntity.pptName!==null)
                          tt.$data.registerOrder[x].pptName=tt.$data.enrollTeams[y].pptName;
                        if(tt.$data.enrollTeams[y].teamEntity.pptUrl!==null)
                          tt.$data.registerOrder[x].pptUrl=tt.$data.enrollTeams[y].pptUrl;
                        if(tt.$data.enrollTeams[y].teamEntity.reportName!==null)
                          tt.$data.registerOrder[x].reportName=tt.$data.enrollTeams[y].reportName;
                        if(tt.$data.enrollTeams[y].teamEntity.reportUrl!==null)
                          tt.$data.registerOrder[x].reportUrl=tt.$data.enrollTeams[y].reportUrl;
                      }
                      tt.$data.state=1;
                    }
                });
              });
            });
          },
          changeEnroll(index){
            let _this=this;
            this.$axios({
              method:'put',
              url:'/attendance/'+_this.$data.attendanceId,
              params:{
                teamOrder:index+1,
              },
            }).then(function () {
              _this.getRegisterOrder();
            })
          },
        cancleEnroll(index){
          let _this=this;
          this.$axios({
            method:'delete',
            url:'/attendance/'+_this.$data.attendanceId,
          }).then(function (response) {
            _this.$toast.success("取消报名成功");
            _this.getRegisterOrder();
          })
        },
        confirmUP(){
          this.$data.pptFlag=!this.$data.pptFlag;
          this.getRegisterOrder();
        },
      }
    }
</script>

<style scoped>

</style>
