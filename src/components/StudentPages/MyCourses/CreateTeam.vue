<template>
  <div >
    <back-bar titleName="创建队伍" :showMessages="true" :showBackBar="true" :backUrl="{path:'/StuMyTeam',query:{courseId:courseId}}"></back-bar>

    <div class="back animated fadeInRight" align="left" >
      <mu-form label-position="left" :model="newTeam" class="mu-demo-form">
        <mu-form-item  label="组名" prop="teamName">
          <mu-text-field v-model="newTeam.teamName"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="班级" prop="klassId">
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
              <mu-avatar color="red" style="margin-left:-2vh;font-size: 18px;" v-if="option.id===newTeam.leader.id">
                <!--头像图标-->
                组长
              </mu-avatar>
              <mu-avatar color="blue" style="font-size: 18px;margin-left:-2vh;" v-if="option.id!==newTeam.leader.id">
               <!--头像图标-->
                组员
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title style="margin-top:-2vh; "> &emsp;{{option.studentName}}</mu-list-item-title>
              <mu-list-item-sub-title>&emsp;{{option.account}}</mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action style="margin-left: -4vh;">
              <mu-button icon v-if="option.id!==newTeam.leader.id" @click="deleteMember(index)">
               <i style="margin-top: -1vh;" class="el-icon-circle-close-outline"/>
              </mu-button>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>

        <el-table :data="noTeamMember.filter(data => !search || data.account.toLowerCase().includes(search.toLowerCase()))"
                  style="width: 90%;margin-left: 5%;margin-top: 2vh;"  max-height="250">
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
      <mu-button class="save" color="success" @click="createTeam" >保存</mu-button>
      <mu-button class="dissolve" color="error" style="margin-bottom: 50px;" @click="backToMyTeam">取消</mu-button>

    </div>
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
        this.$data.courseId=this.$route.query.courseId;

        // 获取该课程下所有班级
        let _this=this;
        this.$axios({
          method:'get',
          url:'/course/'+_this.$data.courseId+'/class',
        }).then(function (response) {
          _this.$data.klasses=response.data;
        },function (error) {
        });

        let ts=this;     //未组队成员
        this.$axios({
          method:'get',
          url:'course/'+ts.$data.courseId+'/noTeam',
        }).then(function(response){
          ts.$data.noTeamMember=response.data;
        },function(error){
          alert(error);
        });

        let ttt=this;      //获取个人信息
        this.$axios({
          method:'get',
          url:'user/information',
        }).then(function (response) {
          ttt.$data.newTeam.members.push(response.data);
          ttt.$data.newTeam.leader=response.data;
        })

      },
      data(){
        return{
          courseId:1,
          klasses:[],

          newTeam:{   //创建队伍信息
            teamName:'',
            klassId:'',
            members:[],
            status:'',
            serial:'',
            leader:'',
          },
          noTeamMember:[],    //未组队成员
          search:'',  //搜索学号
          maxMember:5,
        }
      },
      methods:{
        deleteMember(index){
          this.$set(this.$data.noTeamMember,0,this.$data.newTeam.members[index]);
          this.$set(this.$data.newTeam.members.splice(index,1));
        },
        createTeam(){
          let commonMembers=[];
          for( let i=0;i<this.$data.newTeam.members.length;i++ )
            commonMembers.push({id: this.$data.newTeam.members[i].id});

          if(this.$data.newTeam.members.length<=this.$data.maxMember)    //组队合法
            this.$data.newTeam.status=1;

          let _this=this;
          this.$axios({
            method:'post',
            url:'/team',
            data:{
                teamId:'',
                teamName:_this.$data.newTeam.teamName,
                courseId:_this.$data.courseId,
                klassId:_this.$data.newTeam.klassId.id,
                leader:{
                    id:_this.$data.newTeam.leader.id,
                },
                members:commonMembers,
              status:_this.$data.newTeam.status,
              serial:'',
            }
          }).then(function (resopnse) {
            _this.$data.teamId=resopnse.data.teamId;
            _this.$router.push({path:'StuMyTeam',query:{courseId:_this.$data.courseId}});
          })
        },
        addMember(index, row) {
          const loading = this.$loading();
          setTimeout(() => {
            loading.close();
          }, 500);
          this.$set(this.$data.newTeam.members,this.$data.newTeam.members.length,row);

          // this.$set(this.$data.newTeam.members.unshift(row));
          this.$set(this.$data.noTeamMember.splice(index,1));
        },
        backToMyTeam(){
          this.$router.push({path:'StuMyTeam',query:{courseId:this.$data.courseId}});
        }
       }
    }
</script>

<style lang="less">
  .back{
    margin-top: 12vh;
    width:100% ;
    max-width: 600px;
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
