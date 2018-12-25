<template>
    <div>
      <back-bar titleName="我的小组" :showMessages="true" :showBackBar="true" :backUrl="{path:'/StuMyTeam',query:{courseId:courseId}}"></back-bar>

      <div class="animated fadeInRight">
        <!--组队后 队长界面 -->
        <div class="animated fadeInRight" style="margin-top: 10vh;width:100%;" align="left" v-if="teamState===1 " >
          <span style="font-size: 22px;margin-left: 1vh; ">{{myTeam.teamName}}</span>
          <mu-divider inset ></mu-divider>
          <mu-list textline="two-line" style="margin-bottom: 5vh;">
            <mu-sub-header inset>已有成员</mu-sub-header>
            <mu-list-item avatar button :ripple="false" :key="index"  v-for="option,index in myTeam.members" style="margin-left: -2vh;">
              <mu-list-item-action>
                <mu-avatar color="red" style="margin-left:-2vh;font-size: 18px;margin-top: 1vh;" v-if="option.id===myTeam.leader.id">
                  <!--头像图标-->
                  组长
                </mu-avatar>
                <mu-tooltip content="选了J2EE">
                  <mu-avatar color="blue" style="font-size: 18px;margin-left:-2vh;margin-top: 1vh;" v-if="option.id!==myTeam.leader.id">
                    <!--头像图标-->
                    组员
                  </mu-avatar>
                </mu-tooltip>
              </mu-list-item-action>
              <mu-list-item-content>
                <mu-list-item-title style=" display: inline"> &emsp;{{option.studentName}}</mu-list-item-title>
                <mu-button v-if="option.id!==myTeam.leader.id" style="margin-left: 15%;display: inline;position: relative;top: 11px;left:30%"
                           flat color="error" @click="kickout(index)">移出</mu-button>
                <mu-list-item-sub-title >&emsp;{{option.account}}</mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
          </mu-list>
          <span style="font-size: 22px;margin-left: 1vh; ">添加成员
          <span v-if="myTeam.status===0" style="margin-left: 27%;font-size: 14px;">
            人员超限，<mu-button style="cursor: pointer;" flat color="error" @click="askFlag=!askFlag">提交审核</mu-button>
          </span>
          <span v-if="myTeam.status===2" style="margin-left: 27%;font-size: 14px;">
            <mu-button style="cursor: pointer;" flat color="error" disabled>待审核</mu-button>
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
          <mu-button class="dissolve" color="error"  @click="dissolve">解散小组</mu-button>
        </div>

        <!--组队后 队员界面  -->
        <div class="animated fadeInRight" style="margin-top: 10vh;width:100%;" align="left" v-if="teamState==2 " >
          <span style="font-size: 22px;margin-left: 1vh; ">{{myTeam.teamName}}</span>
          <mu-divider inset ></mu-divider>
          <mu-list textline="two-line" style="margin-bottom: 5vh;">
            <mu-sub-header inset>已有成员</mu-sub-header>
            <mu-list-item avatar button :ripple="false" :key="index"  v-for="option,index in myTeam.members" style="margin-left: -2vh;">
              <mu-list-item-action>
                <mu-avatar color="red" style="margin-left:-2vh;font-size: 18px;margin-top: 1vh;" v-if="option.id===myTeam.leader.id">
                  <!--头像图标-->
                  组长
                </mu-avatar>
                <mu-tooltip content="选了J2EE">
                  <mu-avatar color="blue" style="font-size: 18px;margin-left:-2vh;margin-top: 1vh;" v-if="option.id!==myTeam.leader.id">
                    <!--头像图标-->
                    组员
                  </mu-avatar>
                </mu-tooltip>
              </mu-list-item-action>
              <mu-list-item-content>
                <mu-list-item-title style=" display: inline"> &emsp;{{option.studentName}}</mu-list-item-title>
                <mu-list-item-sub-title >&emsp;{{option.account}}</mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
          </mu-list>
          <mu-button class="dissolve" color="error"  @click="dropout">退出小组</mu-button>
        </div>
      </div>
      <mu-dialog title="提交申请" width="360" :open.sync="askFlag" >
        <el-input type="textarea" :rows="3" placeholder="请输入申请理由" v-model="reason"></el-input>
        <mu-button slot="actions" flat color="success" @click="askForPermit">Sure</mu-button>
        <mu-button slot="actions" flat color="primary" @click="daskFlag=!askFlag">Close</mu-button>
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
          if(response.data.teamId===null)    //未组队
            ts.$data.teamState=0;
          else if(response.data.leader.account===ts.$data.myAccount+'')  //我是组长
            ts.$data.teamState=1;
          else if(response.data.leader.account!==ts.$data.myAccount+'')   //我是组员
            ts.$data.teamState=2;
          ts.$data.myTeam=response.data;
          ts.$data.myTeam.members.reverse();
        });
      },function (error) {
        alert(error+"获取个人账户失败！");
      });

      let _this=this;     //未组队成员
      this.$axios({
        method:'get',
        url:'course/'+_this.$data.courseId+'/noTeam',
      }).then(function(response){
        _this.$data.noTeamMembers=response.data;
      },function(error){
        alert(error);
      });
    },
    data(){
      return{
        title:"OOAD",    //当前课程名
        myAccount:'',
        myId:'',
        courseId:1,
        teamState:-1,    //组队状态  1-组长   2-组员
        myTeam:{},
        noTeamMembers:[],    //未组队成员
        reason:'',     //申请理由
        search: '',
        maxMember:5,
        members:[],
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
        });
        this.$router.push({path:'/StuMyTeam',query:{courseId:this.$data.courseId}});
      },
      dropout(){
        //组员退出小组
        let i;
        for(i=0;i<this.$data.myTeam.members.length;i++)
        {
          if(this.$data.myTeam.members[i].account===this.$data.myAccount+'')
            myId=this.$data.myTeam.members[i].id;
        }
        let _this = this;       //退组成员
        this.$axios({
          method: 'put',
          url: '/team/' + _this.$data.myTeam.teamId + '/remove',
          data: {
            id: _this.$data.myId,
          }
        }).then(function (response) {
          _this.$router.push({path:'/StuMyTeam',query:{courseId:_this.$data.courseID}});
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
          data: {
            id: row.id,
          }
        }).then(function (response) {
          let th = _this;     //重新获取未组队成员
          _this.$axios({
            method: 'get',
            url: 'course/' + th.$data.courseId + '/noTeam',
          }).then(function (response) {
            th.$data.noTeamMembers = response.data;
          }, function (error) {
            alert(error);
          });

          let ts = _this;      //我的组队信息
          _this.$axios({
            method: 'get',
            url: '/course/' + ts.$data.courseId + '/team'
          }).then(function (response) {
            ts.$data.myTeam = response.data;
          })
        });

        let j;
        for(j=0;j<this.$data.myTeam.members.length;j++)
        {
          this.$data.members.push({id:this.$data.myTeam.members[j].id})
        }

        if(this.$data.myTeam.members.length===this.$data.maxMember+1)   //人员超限  改变小组状态
        {
          let t=this;
          this.$axios({
            method:'put',
            url:'/team/'+t.$data.myTeam.teamId,
            data:{
              teamId:t.$data.myTeam.teamId,
              teamName:t.$data.myTeam.team_name,
              courseId:t.$data.courseId,
              klassId:t.$data.myTeam.klassId,
              status:0,       //队伍非法
              leader:{
                id:t.$data.myTeam.leader.id,
              },
              members:t.$data.members,
            }
          });
        }
      },
      kickout(index) {
        const loading = this.$loading();
        setTimeout(() => {
          loading.close();
        }, 500);

        let _this = this;       //删除成员
        this.$axios({
          method: 'put',
          url: '/team/' + _this.$data.myTeam.teamId + '/remove',
          data: {
            id: _this.$data.myTeam.members[index].id,
          }
        }).then(function (response) {
          let th = _this;     //重新获取未组队成员
          _this.$axios({
            method: 'get',
            url: 'course/' + th.$data.courseId + '/noTeam',
          }).then(function (response) {
            th.$data.noTeamMembers = response.data;
          }, function (error) {
            alert(error);
          });
          let ts = _this;      //我的组队信息
          _this.$axios({
            method: 'get',
            url: '/course/' + ts.$data.courseId + '/team'
          }).then(function (response) {
            ts.$data.myTeam = response.data;
          })
        });
      },
      askForPermit(){

        let _this=this;
        this.$axios({
          method:'put',
          url:'/team/'+_this.$data.myTeam.teamId+'/teamvalidrequest',
          data:{
            courseId:_this.$data.courseId,
            reason:_this.$data.reason,
          }
        }).then(function (response) {
          let j;
          for(j=0;j<_this.$data.myTeam.members.length;j++)
          {
            _this.$data.members.push({id:_this.$data.myTeam.members[j].id})
          }
          let t=_this;       //改变队伍状态为待审核
          _this.$axios({
            method:'put',
            url:'/team/'+t.$data.myTeam.teamId,
            data:{
              teamId:t.$data.myTeam.teamId,
              teamName:t.$data.myTeam.teamName,
              courseId:t.$data.courseId,
              klassId:t.$data.myTeam.klasId,
              status:2,       //待审核
              leader:{
                id:t.$data.myTeam.leader.id,
              },
              members:t.$data.members,
            }
          });
          _this.$data.myTeam.status=2;
          _this.$data.askFlag=!_this.$data.myTeam.askFlag;

        });

      }
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
