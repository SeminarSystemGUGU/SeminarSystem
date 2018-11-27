<template>
  <div align="center">
    <back-bar titleName="创建队伍" :showMessages="false" backUrl="/StuMyTeam"></back-bar>

    <div class="animated fadeInRight" style="margin-top: 13vh;width:90%;" align="left">
      <mu-text-field v-model="teamName" label="小组名" class="enter" label-float></mu-text-field>
      <mu-select label="班级" v-model="newTeam.class" class="enter" label-float>
        <mu-option v-for=""  :value="newTeam.class" > </mu-option>
      </mu-select>

      <div class="newMember">
        添加成员<br/><br/>
        <mu-text-field v-model="tempNumber" placeholder="输入学号" class="enter" ><i class="el-icon-search"/></mu-text-field>
        <br/>搜索结果
        <div style="width: 90%;" >
          <div class="member">
            {{tempMamber.name}}&emsp;{{tempMamber.stuNo}}
            <i class="el-icon-plus" style="float:right;margin-right: 5vw;margin-top: 5px;" @click=""/>
          </div>
        </div>
        <br/>当前成员
        <div style="width: 90%;" v-for="option in newTeam.members">
          <div class="member">
            {{option.identify}}&emsp;{{option.name}}&emsp;{{option.stuNo}}
            <i class="el-icon-circle-close-outline" style="float:right;margin-right: 5vw;margin-top: 5px; "@click=""/>
          </div>
        </div>
      </div>
      <mu-button class="submit" color="success" >提交申请</mu-button>
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
          newTeam:{
            teamName:'',
            class:'',
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
            ]
          },
          tempNumber:'',
          tempMamber:{
            name:'LiMing',
            stuNo:'11111',
        },
        }
      },
      methods:{

      }
    }
</script>

<style scoped>
  .enter{
    width:80%;
    margin-top: -1vh;
    font-size: 18px;
  }
  .newMember{
    width: 100%;
    color: gray;
    font-size: 25px;
    margin-top: 5vh;
    padding-top: 1vh;
    border-top: 0.5px solid gray;
  }
  .member{
    padding-top: 1vh;
    padding-left: 3vw;
    border-radius: 5px;
    width: 100%;
    height:6vh;
    font-size: 18px;
    background-color:#96c4e6;
    margin-top: 1vh;
  }
  .submit{
    font-size: 18px;
    margin-top: 10vh;
    width: 90%;
    height:6vh;
    opacity: 0.9;
  }
</style>
