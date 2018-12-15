<template>
  <div>
  <div class="app-bar" style="margin-top: 10px;border-bottom: 1px solid lightgray;background-color: white">
  <el-row>
  <el-col style="width:70%">
    <div class="title" style="height: 35px;">
      <i style="color: dodgerblue" @click="linkBack" class="el-icon-back" v-show="isBack" />&nbsp;
      {{titleName}}</div>
      </el-col>
      <el-col style="width:29%;float:right;">
        <div style="float:right;margin-right:4vw;">
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              <i class="el-icon-menu"/>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>讨论课</el-dropdown-item>
              <el-dropdown-item command="2">新消息</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
    <div class="white-spaces"></div>
  </div>
</template>

<script>
    export default {
        name: "AppBar",
      props:['titleName','showMessages','showBack','backPath'],
      methods:{
          linkBack(){
            history.back();
            // console.log(this.$props.backPath);
            // this.$router.push(this.$props.backPath);
          },
          linkToMessage(){
            console.log(1111);
            this.$router.push({path:'/TeacherMyMessage'});
          },
          handleCommand(command){
            if (command=='2'){
              this.linkToMessage();
            }
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

  .white-spaces{
    height: 7vh;
    max-height: 50px;
  }

  .app-bar{
    position: fixed;
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
