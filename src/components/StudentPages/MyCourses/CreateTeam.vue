<template>
  <div align="center">
    <back-bar titleName="创建队伍" :showMessages="true" :showBackBar="true" :backUrl="{path:'/StuMyTeam',query:{courseId:courseId}}"></back-bar>

    <div class="back animated fadeInRight" align="left" >
      <mu-form label-position="left">
        <mu-form-item  label="组名">
          <mu-text-field v-model="newTeam.teamName"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="班级">
          <mu-select v-model="newTeam.klassId" >
            <mu-option v-for="option,index in klasses" :key="index" :label="option.id" :value="option"></mu-option>
          </mu-select>
        </mu-form-item>
      </mu-form>

      <div class="newMember">
        <mu-divider inset></mu-divider>
        <mu-list textline="two-line">
          <mu-sub-header inset>已有成员</mu-sub-header>
          <mu-sub-header style="margin-top: -3vh;" inset>(人数限制3-5人，不符合限制需<span style="border-bottom: 0.5px solid darkred;color: darkred;cursor: pointer">提交申请</span>)</mu-sub-header>
          <mu-list-item avatar button :ripple="false"  :key="index"  v-for="option,index in newTeam.members" style="margin-left: -2vh;">
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
              <mu-button icon v-if="option.identify=='组员'" @click="deleteMember(index)">
               <i style="margin-top: -1vh;" class="el-icon-circle-close-outline"/>
              </mu-button>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>

        <mu-form label-position="left" style="margin-top: 5vh;">
          <mu-form-item  label="搜索">
            <mu-text-field v-model="searchNumber" placeholder="输入学号查找"><i class="el-icon-search"/></mu-text-field>
          </mu-form-item>
        </mu-form>

        <mu-divider inset></mu-divider>
        <mu-list textline="two-line">
          <mu-sub-header inset>搜索结果</mu-sub-header>
          <mu-list-item avatar button :ripple="false" :key="index"  v-for="option,index in resultMembers" >
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
              <mu-button icon @click="addMember(index)">
                <i style="margin-top: -1vh;"  class="el-icon-circle-plus-outline"/>
              </mu-button>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </div>
      <mu-button class="save" color="success" @click="createTeam" >保存</mu-button>
      <mu-button class="dissolve" color="error" style="margin-bottom: 50px;">解散小组</mu-button>

    </div>

    <mu-dialog title="确认删除？" width="360" :open.sync="deleteFlag" >
      <mu-button slot="actions" flat color="success" @click="confirmDelete">Sure</mu-button>
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
      created(){
        // 获取该课程下所有班级
         this.$data.courseId=this.$route.query.courseId;

        let _this=this;
        this.$axios({
          method:'get',
          url:'/course/'+_this.$data.courseId+'/class',
        }).then(function (response) {
          _this.$data.klasses=response.data;
        },function (error) {


        })

      },
      data(){
        return{
          courseId:1,
          klasses:[],
          teamId:'',

          inTeamOrNot:true,
          leaderOrNot:true,
          deleteIndex:1,
          deleteFlag:false,
          addFlag:false,

          newTeam:{   //创建队伍信息
            teamName:'咕咕鸟',
            klassId:1,
            members:[
              {
                name:'LiMing',
                id:1,
                stuNo:'11111',
                identify:'组长',
              },
              {
                name:'WangQIan',
                id:2,
                stuNo:'11112',
                identify:'组员',
              },
              {
                name:'WangQIan',
                id:3,
                stuNo:'11112',
                identify:'组员',
              },
            ]
          },
          searchNumber:'',  //搜索学号
          resultMembers:[    //搜索结果
            {
              name:'LiMing',
              id:1,
              stuNo:'11111',
            },
          ],
        }
      },
      methods:{
        deleteMember(index){
          this.$data.deleteIndex=index;
          this.$data.deleteFlag=!this.$data.deleteFlag;
        },
        confirmDelete(){
          this.$data.deleteFlag=!this.$data.deleteFlag;
          this.$set(this.$data.newTeam.members.splice(this.$data.deleteIndex,1));
        },
        addMember(index){
          this.$data.resultMembers[index].identify="组员";
          this.$set(this.$data.newTeam.members,this.$data.newTeam.members.length,this.$data.resultMembers[index]);
        },
        createTeam(){
          let leaderId=0;
          let commonMembers=[];
          for( let i=0;i<this.$data.newTeam.members.length;i++ ) {
            if (this.$data.newTeam.members[i].identify === "组长")
              leaderId = this.$data.newTeam.members[i].id;
            else {
              commonMembers.push({id: this.$data.newTeam.members[i].id});
            }
          }
          let _this=this;
          this.$axios({
            method:'post',
            url:'/team/',
            data:{
                teamId:'',
                team_name:_this.$data.newTeam.teamName,
                course_id:_this.$data.courseId,
                klass_id:_this.$data.newTeam.klassId,
                leader:{
                    id:3,
                },
                members:commonMembers,
              status:0,
              serial:1,
            }
          }).then(function (resopnse) {
            _this.$data.teamId=resopnse.data.teamId;
            console.log(resopnse);
          })
        },
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
