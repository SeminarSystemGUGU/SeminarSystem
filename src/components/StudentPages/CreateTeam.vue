<template>
  <div align="center">
    <back-bar titleName="创建队伍" :showMessages="false" backUrl="/StuMyTeam"></back-bar>

    <!--未组队时显示  inTeamOrNot==false  -->
    <div class="animated fadeInRight" style="margin-top: 10vh;width:100%;" align="left" v-if="teamState==0" >
      <mu-form label-position="left">
        <mu-form-item  label="组名">
          <mu-text-field v-model="newTeam.class"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="班级">
          <mu-select v-model="newTeam.class" ></mu-select>
        </mu-form-item>
      </mu-form>

      <div class="newMember">
        <mu-divider inset></mu-divider>
        <mu-list textline="two-line">
          <mu-sub-header inset>已有成员</mu-sub-header>
          <mu-list-item avatar button :ripple="false"  v-for="option in newTeam.members" style="margin-left: -2vh;">
            <mu-list-item-action>
              <mu-avatar color="red" style="margin-left:-2vh;font-size: 18px;" v-if="option.identify=='组长'">
                <!--头像图标-->
                {{option.identify}}
              </mu-avatar>
              <mu-avatar color="blue" style="font-size: 18px;margin-left:-2vh;" v-if="option.identify=='组员'">
               <!--头像图标-->
                {{option.identify}}
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title style="margin-top:-2vh; "> &emsp;{{option.name}}</mu-list-item-title>
              <mu-list-item-sub-title>&emsp;{{option.stuNo}}</mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action style="margin-left: -4vh;">
              <mu-button icon v-if="option.identify=='组员'">
               <i style="margin-top: -1vh;" class="el-icon-circle-close-outline"/>
              </mu-button>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>

        <mu-form label-position="left" style="margin-top: 5vh;">
          <mu-form-item  label="搜索">
            <mu-text-field v-model="tempNumber" placeholder="输入学号查找"><i class="el-icon-search"/></mu-text-field>
          </mu-form-item>
        </mu-form>

        <mu-divider inset></mu-divider>
        <mu-list textline="two-line">
          <mu-sub-header inset>搜索结果</mu-sub-header>
          <mu-list-item avatar button :ripple="false"  v-for="option in tempMembers" >
            <mu-list-item-action>
              <mu-avatar color="snow" style="font-size: 18px;" >
                <!--头像图标-->
                <img style="width: 23px;height: 23px;" src="../../assets/头像.png"   />
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title style=" "> &emsp;{{option.name}}</mu-list-item-title>
              <mu-list-item-sub-title>&emsp;{{option.stuNo}}</mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action>
              <mu-button icon >
                <i style="margin-top: -1vh;"  class="el-icon-circle-plus-outline"/>
              </mu-button>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </div>
      <mu-button class="submit" color="success" >提交申请</mu-button>
    </div>

    <!--组队后 队长界面 leaderOrNot==true  -->
    <div class="animated fadeInRight" style="margin-top: 10vh;width:100%;" align="left" v-if="teamState==1 " >
      <span style="font-size: 22px;margin-left: 1vh; ">{{newTeam.teamName}}</span>
      <mu-divider inset ></mu-divider>
      <mu-list textline="two-line" style="margin-bottom: 5vh;">
        <mu-sub-header inset>已有成员</mu-sub-header>
        <mu-list-item avatar button :ripple="false"  v-for="option in newTeam.members" style="margin-left: -2vh;">
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
        <mu-list-item avatar button :ripple="false"  v-for="option in tempMembers" style="margin-left: -2vh;">
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

    <!--组队后 队长界面 leaderOrNot==true  -->
    <div class="animated fadeInRight" style="margin-top: 10vh;width:100%;" align="left" v-if="teamState==2 " >
      <span style="font-size: 22px;margin-left: 1vh; ">{{newTeam.teamName}}</span>
      <mu-divider inset ></mu-divider>
      <mu-list textline="two-line" style="margin-bottom: 5vh;">
        <mu-sub-header inset>已有成员</mu-sub-header>
        <mu-list-item avatar button :ripple="false"  v-for="option in newTeam.members" style="margin-left: -2vh;">
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
</template>

<script>
  import BackBar from '../ReuseComponents/BackBar'
    export default {
      name: "CreateTeam",
      components:{
        BackBar,
      },
      data(){
        return{
          teamState:0,  //0-未组队   1-队长组队中  2-队员组队中
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
        dissolve(){
          //组长解散小组
        },
        dropout(){}
         //组员退出小组
       }
    }
</script>

<style lang="less">
  .enter{
    width:80%;
    margin-left: 3vh;
    margin-top: -1vh;
    font-size: 18px;
  }
  .newMember{
    width: 100%;
    color: gray;
    font-size: 25px;
    margin-top: 5vh;
    padding-top: 1vh;
    /*border-top: 0.5px solid gray;*/
  }
  .submit{
    font-size: 18px;
    margin-top: 7vh;
    width: 100%;
    height:6vh;
    opacity: 0.9;
  }
  .mu-form-item{
    margin-left: 3vh;
    width: 80%;
  }
  .dissolve{
    font-size: 18px;
    margin-top: 5vh;
    width: 100%;
    height:6vh;
    opacity: 0.9;
  }
</style>
