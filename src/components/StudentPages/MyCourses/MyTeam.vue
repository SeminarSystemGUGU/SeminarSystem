<template>
  <div>
    <back-bar titleName="我的组队" :showMessages="true" :showBackBar="true" backUrl="/StuMyCourses"></back-bar>

    <div class="animated fadeInRight" style="max-width: 600px;margin-left: 5%;">
    <div>
    <div class="panel-group" id="accordion" align="left" >
      <div class="titlee">
        我的队伍
      </div>
      <div class="cF" style="" v-if="teamState===0">当前未组队</div>
      <div  class="panel panel-default" style="background-color: #67C23A;opacity: 0.8;color:white" v-if="teamState!==0" @click="showMyTeamDetails">
        <div class="panel-heading" style="background-color: #67C23A;color:white" data-toggle="collapse" data-parent="#accordion"  href="#collapseTwo"  onclick="">
          {{myTeam.teamName}}
          <i style="float: right;margin-right: 5vw;margin-top: 0.6vh " class="el-icon-arrow-right"></i>
        </div>
      </div>
      <div class="titlee">
        其他队伍
      </div>
      <div style="height: 300px;overflow: scroll" v-loading="loading1" data-mu-loading-color="secondary" data-mu-loading-overlay-color="rgba(0, 0, 0, .7)">
      <div class="panel panel-default" style="border: 0;" v-for="option,index in allTeams" v-if="option.teamId!==myTeam.teamId">
        <div class="panel-heading" data-toggle="collapse" data-parent="#accordion"  :href="'#collapseTwo'+index"    onclick="">
          {{option.teamName}}
          <span v-if="option.status===0" style="margin-right:20%;float:right;color: darkred;">不合法</span>
          <span v-if="option.status===2" style="margin-right:20%;float:right;color: darkred;">待审核</span>
        </div>
        <div :id="'collapseTwo'+index" class="panel-collapse collapse" >
          <div class="panel-body" style="padding:1vh 0;">
            <div class="subContent" >
              <div  class="collapse in">
                <table class="table table-bordered">
                  <thead>
                  <tr>
                    <th>身份</th>
                    <th>姓名</th>
                    <th>学号</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td style="color:darkred">组长</td>
                    <td>{{option.leader.studentName}}</td>
                    <td>{{option.leader.account}}</td>
                  </tr>
                  <tr v-for="item,index in option.members" v-if="item.id!==option.leader.id" :key="index">
                    <td>组员</td>
                    <td>{{item.studentName}}</td>
                    <td>{{item.account}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <!--未组队学生-->
      <div class="titlee" >
        未组队学生
      </div>
      <div class="subContent" data-mu-loading-color="secondary" data-mu-loading-overlay-color="rgba(0, 0, 0, .7)" v-loading="loading2">
        <span class="subItem"  data-toggle="collapse"  data-target="#demo31"   onclick="" >
          未组队学生列表(点击展开)</span>
        <div id="demo31" class="collapse out">
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>姓名</th>
              <th>学号</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="option,index in noTeamMembers" :key="index">
              <td>{{option.studentName}}</td>
              <td>{{option.account}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <mu-button class="butnCT" color="success" @click="createTeam" v-if="teamState===0&&ddl===0&&follow===0">
        创建小组<i class="el-icon-circle-plus-outline" style="margin-left: 3vw;"/>
      </mu-button>
    </div>
    </div>
   </div>
  </div>
</template>

<script>
  import BackBar from '../../ReuseComponents/BackBar'
  export default {
    name: "MyTeam",
    components:{
      BackBar,
    },
    created(){
      this.$data.courseId=this.$route.query.courseId;

      this.$data.loading1 = true;
      this.$data.loading2 = true;

      let _is=this;
      this.$axios({
        method:'get',
        url:'course/'+_is.$data.courseId,
      }).then(function (response) {
        response.data.teamStartTime=response.data.teamStartTime.slice(0,10);
        response.data.teamEndTime=response.data.teamEndTime.slice(0,10);
        _is.$data.teamStartTime=response.data.teamStartTime;
        _is.$data.teamEndTime=response.data.teamEndTime;
        // if(response.data.seminarMainCourseId!==null)    //是否是从课程
        //   _is.$data.follow=1;
        // else  if(response.data.seminarMainCourseId===null)
        //   _is.$data.follow=0;
        // let nowDate=_is.getNowDate();       //组队是否截止
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
          if(response.data.teamId===null)    //未组队
            ts.$data.teamState=0;
          else if(response.data.leader.account===ts.$data.myAccount+'')  //我是组长
            ts.$data.teamState=1;
          else if(response.data.leader.account!==ts.$data.myAccount+'')   //我是组员
            ts.$data.teamState=2;

          ts.$data.myTeam=response.data;
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
          _this.$data.loading2=false;
        },function(error){
          alert(error);
        });

      let ss=this;     //所有队伍信息
      this.$axios({
        method:'get',
        url:'/course/'+ss.$data.courseId+'/teams',
      }).then(function (response) {
        ss.$data.allTeams=response.data;
        ss.$data.loading1 = false;
      });


    },
    data(){
      return{
        title:"OOAD",    //当前课程名
        myAccount:'',
        myId:'',
        courseId:1,
        teamState:-1,    //组队状态 0-未组队  1-组长   2-组员
        myTeam:{},
        noTeamMembers:[],    //未组队成员
        maxMember:5,
        members:[],
        teamStartTime:'',
        teamEndTime:'',
        allTeams:[],
        follow:0,
        ddl:0,    //组队截止   1-截止
        loading2:false,
        loading1:false,
      }
    },
    methods:{
      showMyTeamDetails(){
        this.$router.push({path:'/StuMyTeamDetails',query:{courseId:this.$data.courseId}});
      },
      createTeam(){
        this.$router.push({path:'/CreateTeam',query:{courseId:this.$data.courseId}});
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

<style scoped>
  #accordion{
    margin-top: 13vh;
    width:90%;
  }
  .titlee{
    width:31vw;
    font-size: 22px;
    margin-bottom: 2vh;
    margin-top: 1vh;
  }
  .panel-heading{
    border-radius: 5px;
    width: 100%;
    height:6vh;
    font-size: 20px;
    background-color:#96c4e6;
  }
  .panel-body{
    border:0;
  }
  .panel{
    border:0;
    margin-bottom: 2vh ;
    border-bottom: 0.5px solid gray;
  }
  .subContent{
    margin-top: 1vh;
    padding: 2vh 3vw 1px;
    width: 100%;
    background-color: #c7e1f0;
    border-radius: 5px;
    min-height: 6vh;
  }
  .subItem{
    color:gray;
    font-size: 14px;
  }
  /*.cF{*/
    /*margin-left: 5%;*/
  /*}*/
  .butnCT{
    font-size: 18px;
    margin-top: 8vh;
    width: 100%;
    height:6vh;
    opacity: 0.9;
  }
  #demo31{
    overflow: scroll;
    max-height: 300px;
  }
  @media screen and (min-width: 481px ){
    #accordion{
      margin-top: 13vh;
      width:90%;
    }
    .cF{
      font-size: 20px;
    }
    .title{
      font-size: 30px;
    }
    .panel-heading{
      font-size: 25px;
    }
    .subContent{
      font-size: 20px;
    }
    .subItem{
      color:gray;
      font-size: 20px;
    }
    .butnCT{
      font-size: 23px;
      height:6vh;
    }
  }

</style>
