<template>
  <div align="center">
    <back-bar titleName="我的组队" :showMessages="true" :showBackBar="true" backUrl="/StuMyCourses"></back-bar>

    <div class="animated fadeInRight">
    <div  v-if="teamState==0" >
    <div class="panel-group" id="accordion" align="left" >
      <div class="title">
        我的队伍
      </div>
      <div class="cF" v-if="!createFlag">当前未组队</div>
      <!--其他队伍-->
      <div class="title">
        其他队伍
      </div>
      <div class="panel panel-default" style="border: 0;">
        <div class="panel-heading" data-toggle="collapse" data-parent="#accordion"  href="#collapseTwo">
          {{teamName}}
        </div>
        <div id="collapseTwo" class="panel-collapse collapse">
          <div class="panel-body" style="padding:1vh 0;">
            <div class="subContent">
              <span class="subItem"  data-toggle="collapse"  data-target="#demo21"></span>
              <div id="demo21" class="collapse in">
                <table class="table table-bordered">
                  <thead>
                  <tr>
                    <th>身份</th>
                    <th>姓名</th>
                    <th>学号</th>
                    <th>备注</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>组长</td>
                    <td>Li</td>
                    <td>243201222</td>
                    <td>J2EE</td>
                  </tr>
                  <tr>
                    <td>组员</td>
                    <td>Wang</td>
                    <td>243201223</td>
                    <td>J2EE</td>
                  </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--未组队学生-->
      <div class="title" >
        未组队学生
      </div>
      <div class="subContent">
        <span class="subItem"  data-toggle="collapse"  data-target="#demo31">未组队学生列表</span>
        <div id="demo31" class="collapse in">
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>姓名</th>
              <th>学号</th>
              <th>备注</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Li</td>
              <td>243201222</td>
              <td>J2EE</td>
            </tr>
            <tr>
              <td>Wang</td>
              <td>243201223</td>
              <td>J2EE</td>
            </tr>

            </tbody>
          </table>
        </div>
      </div>
      <mu-button class="butnCT" color="success" @click="createTeam">创建小组<i class="el-icon-circle-plus-outline" style="margin-left: 3vw;"/></mu-button>
    </div>
    </div>

      <!--组队后 队长界面 leaderOrNot==true  -->
      <div class="animated fadeInRight" style="margin-top: 10vh;width:100%;" align="left" v-if="teamState==1 " >
        <span style="font-size: 22px;margin-left: 1vh; ">{{newTeam.teamName}}</span>
        <mu-divider inset ></mu-divider>
        <mu-list textline="two-line" style="margin-bottom: 5vh;">
          <mu-sub-header inset>已有成员</mu-sub-header>
          <mu-list-item avatar button :ripple="false" :key="newTeam.members"  v-for="option in newTeam.members" style="margin-left: -2vh;">
            <mu-list-item-action>
              <mu-avatar color="red" style="margin-left:-2vh;font-size: 18px;margin-top: 1vh;" v-if="option.identify=='组长'">
                <!--头像图标-->
                {{option.identify}}
              </mu-avatar>
              <mu-tooltip content="选了J2EE">
                <mu-avatar color="blue" style="font-size: 18px;margin-left:-2vh;margin-top: 1vh;" v-if="option.identify=='组员'">
                  <!--头像图标-->
                  {{option.identify}}
                </mu-avatar>
              </mu-tooltip>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title style=" display: inline"> &emsp;{{option.name}}</mu-list-item-title>
              <mu-button v-if="option.identify=='组员'" style="margin-left: 15%;display: inline"  flat color="error">移出</mu-button>
              <mu-list-item-sub-title >&emsp;{{option.stuNo}}</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
        <span style="font-size: 22px;margin-left: 1vh; ">添加成员</span>
        <mu-divider inset ></mu-divider>
        <mu-form label-position="left" style="margin-top: 5vh;">
          <mu-form-item  label="搜索" >
            <mu-text-field v-model="tempNumber" placeholder="输入学号">
              <mu-button color="primary" flat small> <img src="../../assets/search.svg" style="size: 25px;"></mu-button>
            </mu-text-field>
          </mu-form-item>
        </mu-form>
        <mu-list textline="two-line" style="margin-top: -2vh;">
          <mu-sub-header >搜索结果:</mu-sub-header>
          <mu-list-item avatar button :ripple="false" :key="tempMembers.length"  v-for="option in tempMembers" style="margin-left: -2vh;">
            <mu-list-item-action>
              <mu-avatar color="red" style="margin-left:-2vh;font-size: 18px;margin-top: 1vh;" v-if="option.identify==''">
                <!--头像图标-->
              </mu-avatar>
              <mu-tooltip content="选了J2EE">
                <mu-avatar color="bisque" style="font-size: 18px;margin-left:-2vh;margin-top: 1vh;" >
                  <!--头像图标-->
                  <img style="width: 20px;height: 20px;" src="../../assets/头像.png"   />
                </mu-avatar>
              </mu-tooltip>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title style="margin-top:-2vh; display: inline"> &emsp;{{option.name}}</mu-list-item-title>
              <mu-button  style="margin-left: 15%;display: inline"  flat color="success">添加</mu-button>
              <mu-list-item-sub-title >&emsp;{{option.stuNo}}</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
        <mu-button class="dissolve" color="error"  @click="dissolve">解散小组</mu-button>
      </div>
      <!--组队后 队员界面  -->
      <div class="animated fadeInRight" style="margin-top: 10vh;width:100%;" align="left" v-if="teamState==2 " >
        <span style="font-size: 22px;margin-left: 1vh; ">{{newTeam.teamName}}</span>
        <mu-divider inset ></mu-divider>
        <mu-list textline="two-line" style="margin-bottom: 5vh;">
          <mu-sub-header inset>已有成员</mu-sub-header>
          <mu-list-item avatar button :ripple="false" :key="newTeam.members"  v-for="option in newTeam.members" style="margin-left: -2vh;">
            <mu-list-item-action>
              <mu-avatar color="red" style="margin-left:-2vh;font-size: 18px;margin-top: 1vh;" v-if="option.identify=='组长'">
                <!--头像图标-->
                {{option.identify}}
              </mu-avatar>
              <mu-tooltip content="选了J2EE">
                <mu-avatar color="blue" style="font-size: 18px;margin-left:-2vh;margin-top: 1vh;" v-if="option.identify=='组员'">
                  <!--头像图标-->
                  {{option.identify}}
                </mu-avatar>
              </mu-tooltip>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title style=" display: inline"> &emsp;{{option.name}}</mu-list-item-title>
              <!--<mu-button v-if="option.identify=='组员'" style="margin-left: 15%;display: inline"  flat color="error">移出</mu-button>-->
              <mu-list-item-sub-title >&emsp;{{option.stuNo}}</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>

        <mu-button class="dissolve" color="error"  @click="dropout">退出小组</mu-button>
      </div>

   </div>
  </div>
</template>

<script>
  import BackBar from '../ReuseComponents/BackBar'
  export default {
    name: "MyTeam",
    components:{
      BackBar,
    },
    data(){
      return{
        title:"OOAD",
        createFlag:false,    //是否有组
        teamName:"1-6  咕咕鸟",
        leaderName:'Li',
        leaderID:'110',

        teamState:0,
        newTeam:{
          teamName:'咕咕鸟',
          class:'1',
          members:[
            {
              name:'LiMing',
              stuNo:'11111',
              identify:'组长',
            },
            {
              name:'WangQIan',
              stuNo:'11112',
              identify:'组员',
            },
            {
              name:'WangQIan',
              stuNo:'11112',
              identify:'组员',
            },
          ]
        },
        tempNumber:'',
        tempMembers:[
          {
            name:'LiMing',
            stuNo:'11111',
          },
        ],
      }
    },
    methods:{
      createTeam(){
        this.$router.push('/CreateTeam');
      },
      dissolve(){
        //组长解散小组
      },
      dropout(){}
      //组员退出小组
    }
  }
</script>

<style scoped>
  #accordion{
    margin-top: 13vh;
    width:90%;
  }
  .title{
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
  .butnCT{
    font-size: 18px;
    margin-top: 10vh;
    width: 100%;
    height:6vh;
    opacity: 0.9;
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
      font-size: 30px;
      height:7vh;
    }
  }

</style>
