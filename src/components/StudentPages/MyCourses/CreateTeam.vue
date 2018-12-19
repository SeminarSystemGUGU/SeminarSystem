<template>
  <div align="center">
    <back-bar titleName="创建队伍" :showMessages="true" :showBackBar="true" backUrl="/StuMyTeam"></back-bar>

    <div class="back animated fadeInRight" align="left" >
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
          <mu-sub-header style="margin-top: -3vh;" inset>(人数限制3-5人，不符合限制需<span style="border-bottom: 0.5px solid darkred;color: darkred;cursor: pointer">提交申请</span>)</mu-sub-header>
          <mu-list-item avatar button :ripple="false"  :key="newTeam.members"  v-for="option in newTeam.members" style="margin-left: -2vh;">
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
              <mu-button icon v-if="option.identify=='组员'" @click="deleteFlag=!deleteFlag">
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
          <mu-list-item avatar button :ripple="false" :key="tempMembers.length"  v-for="option in tempMembers" >
            <mu-list-item-action>
              <mu-avatar color="snow" style="font-size: 18px;" >
                <!--头像图标-->
                <img style="width: 23px;height: 23px;" src="../../../assets/头像.png"   />
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title> &emsp;{{option.name}}</mu-list-item-title>
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
      <mu-button class="save" color="success" >保存</mu-button>
      <mu-button class="dissolve" color="error" style="margin-bottom: 50px;">解散小组</mu-button>

    </div>

    <mu-dialog title="确认删除？" width="360" :open.sync="deleteFlag">
      sdadsad
      <mu-button slot="actions" flat color="success" @click="deleteFlag=!deleteFlag">Sure</mu-button>
      <mu-button slot="actions" flat color="primary" @click="deleteFlag=!deleteFlag">Close</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
  import BackBar from '../../ReuseComponents/BackBar'
    export default {
      name: "CreateTeam",
      components:{
        BackBar,
      },
      data(){
        return{
          inTeamOrNot:true,
          leaderOrNot:true,
          deleteFlag:false,

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
       }
    }
</script>

<style lang="less">
  .back{
    margin-top: 12vh;
    width:100% ;
  }
  .newMember{
    width: 100%;
    color: gray;
    font-size: 25px;
    margin-top: 5vh;
    padding-top: 1vh;
    /*border-top: 0.5px solid gray;*/
  }
  .save{
    float: left;
    margin-left: 4vw;
    font-size: 18px;
    margin-top: 5vh;
    width: 40%;
    height:6vh;
    opacity: 0.9;
  }
  .mu-form-item{
    margin-left: 3vh;
    width: 80%;
  }
  .dissolve{
    float:right;
    margin-right: 4vw;
    font-size: 18px;
    margin-top: 5vh;
    width: 40%;
    height:6vh;
    opacity: 0.9;
  }
  @media screen and(min-width: 481px){
    .back{
      margin-top: 13vh;
    }
    .save{
      width:30%;
      margin-left: 10%;
      font-size: 23px;
      height:4vh;
    }
    .mu-form-item{
      margin-left: 3vh;
      width: 80%;
    }
    .dissolve{
      font-size: 23px;
      margin-top: 5vh;
      margin-right: 10%;
      width:30%;
      height:4vh;
      opacity: 0.9;
    }

  }
</style>
