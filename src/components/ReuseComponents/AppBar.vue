<template>
  <div class="app-bar" style="margin-top: 10px;border-bottom: 1px solid lightgray">
  <el-row>
  <el-col style="width:70%">
    <div class="title" style="height: 35px;">
      <i style="color: dodgerblue" @click="linkBack" class="el-icon-back" v-show="isBack" />&nbsp;
      {{titleName}}</div>
      </el-col>
      <el-col style="width:29%;float:right;">
        <div style="float:right;margin-right:4vw;">
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="el-icon-menu"/>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>讨论课</el-dropdown-item>
              <el-dropdown-item>新消息</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    <!-- <div class="icon-button1" style="display: inline-block;float: right;" v-if="showMessages">
      <img style="width: 35px;height: 35px;margin-right: 20px;" src="../../assets/消息.png"/>
      <img style="width: 35px;height: 35px;margin-right: 20px;" src="../../assets/头像.png"/>
      <img style="width: 35px;height: 35px;margin-right: 5px;" src="../../assets/讨论课.png"/>

    </div> -->
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "AppBar",
      props:['titleName','showMessages','showBack','backPath'],
      methods:{
          linkBack(){
            console.log(this.$props.backPath);
            this.$router.push(this.$props.backPath);
          }
      },
      data(){
        return{
          isBack:true,
        }
      },
      created(){
        console.log(this.$props.backPath);
       if(this.$props.showBack===false){
        this.$data.isBack=this.$props.showBack;
       } 
      }
    }
</script>

<style scoped lang="less">
  .app-menu{
    fload:right;
    margin-right:0;
  }

  .app-bar{
    .el-icon-menu{
      display:inline-block;
      font-size:25px;
      color:dodgerblue;
      font-weight:bold;
      /*<!-- margin-top:7px;;*/
    }
    
    .el-dropdown-link{
      display:inline-block;
      height:35px;
      line-height:35px;
    }

    padding:1px;
    width: 100vw;
    height: 7vh;
    max-height: 50px;
    /*background-color: gray;*/
    text-align: left;
    /*position: fixed;*/
    /*top:0;*/

  .title{
    display: inline-block;
    overflow: scroll;
    /*margin-top: 0vw;*/
    font-size: 20px;
    text-align: left;
    margin-left: 2vw;
    font-family: "等线 Light";
    font-weight: bold;
  }
  }
</style>
