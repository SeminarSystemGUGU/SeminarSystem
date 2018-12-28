<template>
    <div style="max-width: 600px;width:100%;" align="center">
      <back-bar titleName="我的小组" :showMessages="true" :showBackBar="true" :backUrl="{path:'/StuMyTeam',query:{courseId:courseId}}"></back-bar>

      <div class="animated fadeInRight">
        <!--组队后 队长界面 -->
        <div class="animated fadeInRight" style="margin-top: 10vh;width:90%;" align="left" v-if="teamState===1 " >
          <span style="font-size: 22px;margin-left: 1vh; ">{{myTeam.teamName}}</span>
          <mu-divider inset ></mu-divider>
          <mu-list textline="two-line" style="margin-bottom: 5vh;">
            <mu-sub-header inset>已有成员</mu-sub-header>
            <mu-list-item avatar button :ripple="false" :key="index"  v-for="option,index in myTeam.members" style="margin-left: -2vh;">
              <mu-list-item-action>
                <mu-avatar color="red" style="font-size: 18px;margin-top: 1vh;" v-if="option.id===myTeam.leader.id">
                  <!--头像图标-->
                  组长
                </mu-avatar>
                <mu-tooltip content="选了J2EE">
                  <mu-avatar color="blue" style="font-size: 18px;margin-top: 1vh;" v-if="option.id!==myTeam.leader.id">
                    <!--头像图标-->
                    组员
                  </mu-avatar>
                </mu-tooltip>
              </mu-list-item-action>
              <mu-list-item-content>
                <mu-list-item-title style=" display: inline"> &emsp;{{option.studentName}}</mu-list-item-title>
                <mu-button v-if="option.id!==myTeam.leader.id" style="margin-left: 15%;display: inline;position: relative;top: 11px;left:30%"
                           flat color="error" @click="kickout(option.id)" :disabled="status===2">移出</mu-button>
                <mu-list-item-sub-title >&emsp;{{option.account}}</mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
          </mu-list>
          <div v-if="ddl===0&&follow===0&&status!==2">
          <span style="font-size: 22px;margin-left: 1vh; ">添加成员
          <span v-if="status===0" style="margin-left: 1%;font-size: 17px;">
            （队伍状态不合法，需<mu-button style="cursor: pointer;font-size: 17px" flat color="error" @click="askFlag=!askFlag">提交审核</mu-button>）
          </span>
          <span v-if="status===2" style="margin-left: 27%;font-size: 17px;">
            <mu-button style="cursor: pointer;" flat color="error" >待审核</mu-button>
          </span>
        </span>
          <mu-divider inset ></mu-divider>
          <el-table :data="noTeamMembers.filter(data => !search || data.account.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 90%;margin-left: 5%;margin-top: 2vh;"max-height="250">
            <el-table-column label="学号" prop="account" width="140"></el-table-column>
            <el-table-column label="姓名" prop="studentName" width="70"></el-table-column>
            <el-table-column align="right">
              <template slot="header" slot-scope="scope">
                <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
              </template>
              <template slot-scope="scope">
                <el-button size="mini" type="success"  @click="addMember(scope.$index, scope.row)">添加</el-button>
              </template>
            </el-table-column>
          </el-table>
          </div>
          <mu-button class="dissolve" color="error"  @click="dissolve" v-if="ddl===0&&follow===0">解散小组</mu-button>
        </div>
        <!--组队后 队员界面  -->
        <div class="animated fadeInRight" style="margin-top: 10vh;width:90%;" align="left" v-if="teamState===2 " >
          <span style="font-size: 22px;margin-left: 1vh; ">{{myTeam.teamName}}</span>
          <mu-divider inset ></mu-divider>
          <mu-list textline="two-line" style="margin-bottom: 5vh;">
            <mu-sub-header inset>已有成员</mu-sub-header>
            <mu-list-item avatar button :ripple="false" :key="index"  v-for="option,index in myTeam.members" style="margin-left: -2vh;">
              <mu-list-item-action>
                <mu-avatar color="red" style="font-size: 18px;margin-top: 1vh;" v-if="option.id===myTeam.leader.id">
                  <!--头像图标-->
                  组长
                </mu-avatar>
                <!--<mu-tooltip content="选了J2EE">-->
                  <mu-avatar color="blue" style="font-size: 18px;margin-top: 1vh;" v-if="option.id!==myTeam.leader.id">
                    <!--头像图标-->
                    组员
                  </mu-avatar>
                <!--</mu-tooltip>-->
              </mu-list-item-action>
              <mu-list-item-content>
                <mu-list-item-title style=" display: inline"> &emsp;{{option.studentName}}</mu-list-item-title>
                <mu-list-item-sub-title >&emsp;{{option.account}}</mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
          </mu-list>
          <mu-button class="dissolve" color="error"  @click="dropout" v-if="ddl===0&&follow===0">退出小组</mu-button>
        </div>
      </div>
      <mu-dialog title="提交申请" width="360" :open.sync="askFlag" >
        <el-input type="textarea" :rows="3" placeholder="请输入申请理由" v-model="reason"></el-input>
        <mu-button slot="actions" flat color="success" @click="askForPermit">Sure</mu-button>
        <mu-button slot="actions" flat color="primary" @click="askFlag=!askFlag">Close</mu-button>
      </mu-dialog>
      </div>
</template>

<script>
  import BackBar from '../../ReuseComponents/BackBar'
  export default {
        name: "MyTeamDetails",
    components:{
        BackBar,
    },
    created(){
      this.$data.courseId=parseInt(this.$route.query.courseId);

      let _is=this;
      this.$axios({
        method:'get',
        url:'course/'+this.$data.courseId,
      }).then(function (response) {
        response.data.teamStartTime=response.data.teamStartTime.slice(0,10);
        response.data.teamEndTime=response.data.teamEndTime.slice(0,10);
        _is.$data.teamStartTime=response.data.teamStartTime;
        _is.$data.teamEndTime=response.data.teamEndTime;

        // if(response.data.seminarMainCourseId!==null)    //是否是从课程
        //   _is.$data.follow=1;
        //  else  if(response.data.seminarMainCourseId===null)
        //   _is.$data.follow=0;

        // let nowDate=_is.getNowDate();
        // if(nowDate<=_is.$data.teamEndTime)
        //   _is.$data.ddl=0;
        // else if(nowDate>_is.$data.teamEndTime)
        //   _is.$data.ddl=1;
      });

      let tt=this;       //获取个人账号
      this.$axios({
        method:'get',
        url:'/student/getaccount'
      }).then(function (response) {
        tt.$data.myAccount=response.data;

        let ts=tt;      //我的组队信息
        tt.$axios({
          method:'get',
          url:'/course/'+ts.$data.courseId+'/team'
        }).then(function (response) {
          if(response.data.leader.account===ts.$data.myAccount+'')  //我是组长
            ts.$data.teamState=1;
          else if(response.data.leader.account!==ts.$data.myAccount+'')   //我是组员
            ts.$data.teamState=2;
          ts.$data.myTeam=response.data;
          let i;
          for(i=0;i<response.data.members.length;i++)
          {
            if(response.data.members[i].id===response.data.leader.id) {
              response.data.members.splice(i, 1);
              break;
            }
          }
          ts.$data.myTeam=response.data;
          ts.$data.myTeam.members.push(response.data.leader);
          ts.$data.myTeam.members.reverse();

          ts.$data.status=response.data.status;

          if(ts.$data.teamState===1)
          {
            let _this=ts;     //未组队成员
            ts.$axios({
              method:'get',
              url:'course/'+_this.$data.courseId+'/noTeam',
            }).then(function(response){
              _this.$data.noTeamMembers=response.data;
            },function(error){
              alert(error);
            });
          }
        });
      },function (error) {
        alert(error+"获取个人账户失败！");
      });
    },
    data(){
      return{
        title:"OOAD",    //当前课程名
        myAccount:'',
        myId:'',
        courseId:1,
        teamState:-1,    // 1-组长   2-组员
        status:-1,   //队伍状态  0 非法  1合法  2待审核
        myTeam:{},
        noTeamMembers:[],    //未组队成员
        reason:'',     //申请理由
        search: '',
        maxMember:5,
        members:[],
        teamStartTime:'',
        teamEndTime:'',
        follow:0,   //是否是从课程
        ddl:0,    //报名截止
        askFlag:false,
      }
    },
    methods:{
      createTeam(){
        this.$router.push({path:'/CreateTeam',query:{courseId:this.$data.courseId}});
      },
      dissolve(){
        //组长解散小组
        let _this=this;
        this.$axios({
          method:'delete',
          url:'/team/'+_this.$data.myTeam.teamId,
        }).then(function (response) {
          _this.$router.push({path:'/StuMyTeam',query:{courseId:_this.$data.courseId}});
        });
      },
      dropout(){
        //组员退出小组
        let i;
        for(i=0;i<this.$data.myTeam.members.length;i++)
        {
          if(this.$data.myTeam.members[i].account===this.$data.myAccount+'')
            this.$data.myId=this.$data.myTeam.members[i].id;
        }
        let _this = this;       //退组成员
        this.$axios({
          method: 'put',
          url: '/team/' + _this.$data.myTeam.teamId + '/remove',
          data: {
            id: _this.$data.myId,
          }
        }).then(function (response) {
          _this.$router.push({path:'/StuMyTeam',query:{courseId:_this.$data.courseId}});
        });
      },
      addMember(index, row) {
        const loading = this.$loading();
        setTimeout(() => {
          loading.close();
        }, 500);

        let _this = this;       //添加成员
        this.$axios({
          method: 'put',
          url: '/team/' + _this.$data.myTeam.teamId + '/add',
          params: {
            courseId:_this.$data.courseId,
          },
          data:{
            id: row.id,
          }
        }).then(function(response) {     //返回组队状态
          _this.$data.status=response.data;

          let th = _this;     //重新获取未组队成员
          _this.$axios({
            method: 'get',
            url: '/course/' + th.$data.courseId + '/noTeam',
          }).then(function (response) {
            th.$data.noTeamMembers = response.data;
          });
          let ts = _this;      //我的组队信息
          _this.$axios({
            method: 'get',
            url: '/course/' + ts.$data.courseId + '/team'
          }).then(function (response) {
            ts.$data.myTeam = response.data;
            let i;
            for(i=0;i<response.data.members.length;i++)
            {
              if(response.data.members[i].id===response.data.leader.id) {
                response.data.members.splice(i, 1);
                break;
              }
            }
            ts.$data.myTeam=response.data;
            ts.$data.myTeam.members.push(response.data.leader);
            ts.$data.myTeam.members.reverse();
            // ts.$data.members=[];
            // let j;
            // for(j=0;j<ts.$data.myTeam.members.length;j++)
            // {
            //   ts.$data.members.push({id:ts.$data.myTeam.members[j].id})
            // }
            // console.log(ts.$data.members);
            //
            // if(ts.$data.myTeam.members.length===ts.$data.maxMember+1)   //人员超限  改变小组状态
            // {
            //   ts.$data.status=0;
            //   let t = ts;
            //   ts.$axios({
            //     method: 'put',
            //     url: '/team/' + t.$data.myTeam.teamId,
            //     data: {
            //       teamId: t.$data.myTeam.teamId,
            //       teamName: t.$data.myTeam.teamName,
            //       courseId: t.$data.courseId,
            //       klassId: t.$data.myTeam.klassId,
            //       status: t.$data.status,       //队伍非法  0
            //       leader: {
            //         id: t.$data.myTeam.leader.id,
            //       },
            //       members: t.$data.members,
            //     }
            //   });
            // }
          });
        });
      },
      kickout(id) {
        const loading = this.$loading();
        setTimeout(() => {
          loading.close();
        }, 500);

        let _this = this;       //删除成员
        this.$axios({
          method: 'put',
          url: '/team/' + _this.$data.myTeam.teamId + '/remove',
          params: {
            courseId:_this.$data.courseId,
          },
          data:{
            id: id,
          }
        }).then(function (response) {
          _this.$data.status=response.data;

          let th = _this;     //重新获取未组队成员
          _this.$axios({
            method: 'get',
            url: '/course/' + th.$data.courseId + '/noTeam',
          }).then(function (response) {
            th.$data.noTeamMembers = response.data;
          }, function (error) {
            alert(error);
          });
          let ts = _this;      //我的组队信息
          _this.$axios({
            method: 'get',
            url: '/course/' + ts.$data.courseId + '/team',
          }).then(function (response) {
            ts.$data.myTeam = response.data;
            let i;
            for(i=0;i<response.data.members.length;i++)
            {
              if(response.data.members[i].id===response.data.leader.id) {
                response.data.members.splice(i, 1);
                break;
              }
            }
            ts.$data.myTeam=response.data;
            ts.$data.myTeam.members.push(response.data.leader);
            ts.$data.myTeam.members.reverse();
            // ts.$data.members=[];
            // let j;
            // for(j=0;j<ts.$data.myTeam.members.length;j++)
            // {
            //   ts.$data.members.push({id:ts.$data.myTeam.members[j].id})
            // }
            // if(ts.$data.myTeam.members.length===ts.$data.maxMember)   //人员超限  改变小组状态
            // {
            //   ts.$data.status=1;
            //   let t = ts;
            //   ts.$axios({
            //     method: 'put',
            //     url: '/team/' + t.$data.myTeam.teamId,
            //     data: {
            //       teamId: t.$data.myTeam.teamId,
            //       teamName: t.$data.myTeam.teamName,
            //       courseId: t.$data.courseId,
            //       klassId: t.$data.myTeam.klassId,
            //       status: t.$data.status,       //队伍非法  0
            //       leader: {
            //         id: t.$data.myTeam.leader.id,
            //       },
            //       members: t.$data.members,
            //     }
            //   });
            // };
          });
        });
      },
      askForPermit(){
        let _this=this;
        this.$axios({
          method:'post',
          url:'/team/'+_this.$data.myTeam.teamId+'/teamvalidrequest',
          data:{
            courseId:_this.$data.courseId,
            reason:_this.$data.reason,
          }
        }).then(function (response) {
          _this.$data.status=2;           //提交成功、待审核
          _this.$data.askFlag=!_this.$data.askFlag;
          // _this.$data.members=[];
          // let j;
          // for(j=0;j<_this.$data.myTeam.members.length;j++)
          // {
          //   _this.$data.members.push({id:_this.$data.myTeam.members[j].id})
          // }
          // let t=_this;       //改变队伍状态为待审核
          // _this.$axios({
          //   method:'put',
          //   url:'/team/'+t.$data.myTeam.teamId,
          //   data:{
          //     teamId:t.$data.myTeam.teamId,
          //     teamName:t.$data.myTeam.teamName,
          //     courseId:t.$data.courseId,
          //     klassId:t.$data.myTeam.klassId,
          //     status:2,       //待审核
          //     leader:{
          //       id:t.$data.myTeam.leader.id,
          //     },
          //     members:t.$data.members,
          //   }
          // });
          // _this.$data.status=2;
        });
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
      },
    }
  }
</script>

<style scoped>
  .dissolve{
    width:90%;
    margin-left:5%;
    margin-top: 5vh;
    margin-bottom: 10vh;
  }

</style>
