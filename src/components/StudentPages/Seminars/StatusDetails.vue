<template>
  <div >
    <back-bar titleName="OOAD-讨论课" :showMessages="true" :showBackBar="true" :backUrl="{path:'/StuSeminarDetails',query:{courseId:courseId,seminarId:seminarId,klassId:klassId}}"></back-bar>

    <div class="statusDetailsBack animated fadeInRight" >
      <!--报名阶段-->
      <mu-paper :z-depth="1" class="demo-list-wrap" v-if="status===1">
        <mu-list v-for="option,index in registerOrder" :key = "index">
          <mu-list-item class="listItem" button :ripple="false" style="font-size: 18px;">
            <mu-list-item-action>
              {{option.order}}
            </mu-list-item-action>
            <mu-list-item-title style="margin-left:35%;font-size: 20px;">{{option.team}}
              <mu-button flat color="success" style="margin-top:-2vh;margin-left: -10%;"large @click="register(index)" v-if="option.team===''">可报名</mu-button>
            </mu-list-item-title>
          </mu-list-item>
        </mu-list>
        <mu-divider></mu-divider>
      </mu-paper>
      <!--修改报名-->
      <mu-paper :z-depth="1" class="demo-list-wrap"  v-if="status===2">
        <mu-list v-for="option,index in registerOrder" :key = "index">
          <mu-list-item class="listItem" button :ripple="false" style="font-size: 18px;">
            <mu-list-item-action>
              {{option.order}}
            </mu-list-item-action>
            <mu-list-item-title style="margin-left: 35%;font-size: 20px">
              {{option.team}}  <mu-button flat color="success" v-if="option.team===''" class="btR" @click="changeOrder(index)">可报名</mu-button>
            </mu-list-item-title>
          </mu-list-item>
        </mu-list>
        <mu-divider></mu-divider>
      </mu-paper>
      <!--正在进行讨论课-->
      <mu-paper :z-depth="1" class="demo-list-wrap" v-if="status===3">
        <mu-list v-for="option,index in registerOrder" :key = "index">
          <mu-list-item class="listItem" button :ripple="false" style="font-size: 18px;">
            <mu-list-item-action>
              {{option.order}}
            </mu-list-item-action>
            <mu-list-item-title style="margin-left: 20%;font-size: 20px;height:8vh;">
              <mu-button flat color="success" style="margin-top: 1vh;" large @click="download" v-if="option.pptName!==''"><a :href="baseURL+'option.pptPath'">{{option.pptName}}</a></mu-button>
              <mu-button flat disabled v-if="option.pptName===''" style="margin-top: 1vh;"large>未上传</mu-button>
            </mu-list-item-title>
          </mu-list-item>
        </mu-list>
        <mu-divider></mu-divider>
      </mu-paper>
      <!--讨论课已经结束-->
      <mu-paper :z-depth="1" class="demo-list-wrap" v-if="status===5">
        <mu-list v-for="option,index in registerOrder" :key = "option.team">
          <mu-list-item class="listItem" button :ripple="true" style="font-size: 18px;">
            <mu-list-item-action>
              {{option.order}}
            </mu-list-item-action>
            <mu-list-item-title style="margin-left: 20%;font-size: 20px">{{option.team}}</mu-list-item-title>
          </mu-list-item>
        </mu-list>
        <mu-divider></mu-divider>
      </mu-paper>
     <!--所有弹窗-->
      <mu-dialog title="提示" width="360" :open.sync="registerFlag" :overlay="false">
        确认报名？
        <mu-button slot="actions" flat color="success" @click="enroll">Sure</mu-button>
        <mu-button slot="actions" flat color="primary" @click="registerFlag=!registerFlag">Close</mu-button>
      </mu-dialog>
      <mu-dialog title="提示" width="360" :open.sync="downloadFlag">
        是否下载该PPT!
        <mu-button slot="actions" flat color="success" @click="downloadFlag=!downloadFlag">Sure</mu-button>
        <mu-button slot="actions" flat color="primary" @click="downloadFlag=!downloadFlag">Close</mu-button>
      </mu-dialog>

      <mu-button class="cancleR" slot="actions"  v-if="status===2" color="error" @click="cancleFlag=!cancleFlag">取消报名</mu-button>
      <mu-dialog title="确认修改报名？" width="360" :open.sync="changeFlag" :overlay="false">
        <mu-button slot="actions" flat color="success" @click="confirmChange">Sure</mu-button>
        <mu-button slot="actions" flat color="primary" @click="changeFlag=!changeFlag">Close</mu-button>
      </mu-dialog>
      <mu-dialog title="取消报名" width="360" :open.sync="cancleFlag" :overlay="false">
        <mu-button slot="actions" flat color="success" @click="cancle">Sure</mu-button>
        <mu-button slot="actions" flat color="primary" @click="cancleFlag=!cancleFlag">Close</mu-button>
      </mu-dialog>

    </div>
  </div>
</template>

<script>
  import BackBar from '../../ReuseComponents/BackBar'
    export default {
        name: "StatusDetails",
      components:{
        BackBar,
      },
      created(){
        this.$data.baseURL=this.$axios.defaults.baseURL;
        this.$data.klassId=this.$route.query.klassId;
        this.$data.seminarId=this.$route.query.seminarId;
        if(this.$route.query.status===1 )
          this.$data.status=1;
        else if(this.$route.query.status===4)
          this.$data.status=2;
        else if(this.$route.query.status===2 || this.$route.query.status===3)   //ppt
          this.$data.status=3;
        else if(this.$route.query.status===5 || this.$route.query.status===7)   //顺序
          this.$data.status=5;

        let _this=this;
        this.$axios({
          method:'get',
          url:'/seminar/'+_this.$data.seminarId+'/class/'+_this.$data.klassId,
        }).then(function(response){
          _this.$data.courseId=response.data.seminarEntity.courseId;
          _this.$data.klassSeminarId=response.data.klassSeminarId;

          const loading = _this.$loading();
          setTimeout(() => {
            loading.close();
          }, 1000);

          let t=_this;           //报名情况
          _this.$axios({
            method:'get',
            url:'/attendance/'+t.$data.klassSeminarId,
          }).then(function (response) {
            t.$data.enrollTeams=response.data;
            _this.$data.registerOrder=[];
            let x;
            for(x=0;x<t.$data.maxMember;x++) {
              t.$data.registerOrder.push({order: '第' + (x +1)+ '组', team:'',pptName:'',pptPath:'',attenddaceId:''});
            }
            let i,j;
            for(i=0;i<t.$data.registerOrder.length;i++)
              for(j=0;j<t.$data.enrollTeams.length;j++)
              {
                if(t.$data.enrollTeams[j].teamOrder===i+1)
                {
                  t.$data.registerOrder[i].attendanceId=t.$data.enrollTeams[j].id;
                  t.$data.registerOrder[i].team=t.$data.enrollTeams[j].teamEntity.teamName;
                }
              }

            let tt=_this;           //我的队伍信息
            _this.$axios({
              method:'get',
              url:'/course/'+tt.$data.courseId+'/team',
            }).then(function (response) {
              tt.$data.myTeam=response.data;
              let i;
              for(i=0;i<tt.$data.enrollTeams.length;i++)
              {
                if(tt.$data.enrollTeams[i].teamId===tt.$data.myTeam.teamId)   //已报名
                {
                  tt.$data.attendanceId=tt.$data.enrollTeams[i].id;   //获取attendanceId
                }
              }
            });

            if(tt.$data.status===3)  //获取ppt
            {
              let x;
              for(x=0;x<tt.$data.registerOrder.length;x++) {
                let ts = tt;
                tt.$axios({
                  method: 'get',
                  url: '/attendance/'+ts.$data.registerOrder[x].attendanceId+'/ppt',
                }).then(function (response) {
                  ts.$data.registerOrder[x].pptName=response.data.name;
                  ts.$data.registerOrder[x].pptPath=response.data.path;
                })
              }
            }
          });
        });
      },
      data(){
          return {
            status:-1,   //该页面状态  1-报名   2-修改报名  3-正在进行(显示ppt)  4-已经结束（显示成绩）  5-已经结束、未报名(显示序列)
            courseId:-1,
            klassId:-1,
            seminarId:-1,
            klassSeminarId:-1,
            attandenceId:-1,

            enrollTeams:[],   //报名情况
            myTeam:'',      //我的队伍
            maxMember:6,      //限制最大组数
            enrollOrder:-1,     //报名顺序
            registerOrder:[],     //展示顺序

            downloadFlag:false,
            registerFlag:false,
            cancleFlag:false,
            changeFlag:false,
            baseURL:'',

          }
      },
      methods: {
          download(){
            this.$data.downloadFlag=true;
          },
          register(index){     //报名弹出
            this.$data.enrollOrder=index+1;
            this.$data.registerFlag=true;
          },
        changeOrder(index){    //修改弹出
          this.$data.enrollOrder=index+1;
          this.$data.changeFlag=true;
        },
        enroll(){        //确定报名
            let _this=this;
            this.$axios({
              method:'post',
              url:'/attendance',
              data:{
                klassSeminarId:_this.$data.klassSeminarId,
                teamId:_this.$data.myTeam.teamId,
                teamOrder:_this.$data.enrollOrder,
              }
            }).then(function (response) {
              _this.$data.attendanceId=response.data;
              _this.$data.registerFlag=!_this.$data.registerFlag;
              _this.$toast.success("报名成功！");
              _this.$data.status=2;

              const loading = _this.$loading();
              setTimeout(() => {
                loading.close();
              }, 500);

              let t=_this;           //重新获取报名情况
              _this.$axios({
                method:'get',
                url:'/attendance/'+t.$data.klassSeminarId,
              }).then(function (response) {
                t.$data.enrollTeams=response.data;
                _this.$data.registerOrder=[];
                let x;
                for(x=0;x<t.$data.maxMember;x++) {
                  t.$data.registerOrder.push({order: '第' + (x +1)+ '组', team:''});
                }
                let i,j;
                for(i=0;i<t.$data.registerOrder.length;i++)
                  for(j=0;j<t.$data.enrollTeams.length;j++)
                  {
                    if(t.$data.enrollTeams[j].teamOrder===i+1)
                    {
                      t.$data.registerOrder[i].team+='这个组没名，ID是'+t.$data.enrollTeams[j].teamId;
                    }
                  }
              });
            });
        },
        confirmChange(){
          let _this=this;
          this.$axios({
            method:'put',
            url:'/attendance/'+_this.$data.attendanceId,
            params:{
              teamOrder:_this.$data.enrollOrder,
            },
          }).then(function () {
            _this.$data.changeFlag=!_this.$data.changeFlag;
            _this.$toast.success("修改报名成功！");
            let t=_this;           //重新获取报名情况
            _this.$axios({
              method:'get',
              url:'/attendance/'+t.$data.klassSeminarId,
            }).then(function (response) {
              t.$data.enrollTeams=response.data;
              _this.$data.registerOrder=[];
              let x;
              for(x=0;x<t.$data.maxMember;x++) {
                t.$data.registerOrder.push({order: '第' + (x +1)+ '组', team:''});
              }
              let i,j;
              for(i=0;i<t.$data.registerOrder.length;i++)
                for(j=0;j<t.$data.enrollTeams.length;j++)
                {
                  if(t.$data.enrollTeams[j].teamOrder===i+1)
                  {
                    t.$data.registerOrder[i].team+='这个组没名，ID是'+t.$data.enrollTeams[j].teamId;
                  }
                }
            });
          })
        },
        cancle(){
          let _this=this;
          this.$axios({
            method:'delete',
            url:'/attendance/'+_this.$data.attendanceId,
          }).then(function (response) {
            _this.$data.cancleFlag=!_this.$data.cancleFlag;
            _this.$toast.success("取消报名成功");

            let t=_this;           //重新获取报名情况
            _this.$axios({
              method:'get',
              url:'/attendance/'+t.$data.klassSeminarId,
            }).then(function (response) {
              t.$data.enrollTeams=response.data;
              t.$data.registerOrder=[];
              t.$data.status=1;

              let x;
              for(x=0;x<t.$data.maxMember;x++) {
                t.$data.registerOrder.push({order: '第' + (x +1)+ '组', team:''});
              }
              console.log(t.$data.registerOrder);

              let i,j;
              for(i=0;i<t.$data.registerOrder.length;i++)
                for(j=0;j<t.$data.enrollTeams.length;j++)
                {
                  if(t.$data.enrollTeams[j].teamOrder===i+1)
                  {
                    t.$data.registerOrder[i].team+='这个组没名，ID是'+t.$data.enrollTeams[j].teamId;
                  }
                }
            });
          })
        }

      }

    }
</script>

<style lang="less">
  .statusDetailsBack{
    margin-top: 12vh;
  }
  .cancleR{
    font-size: 18px;
    margin-top: 8vh;
    width: 100%;
    height:6vh;
    opacity: 0.9;
  }

</style>
