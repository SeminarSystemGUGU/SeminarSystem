<template>
  <div class="app-bar" style="margin-top: 10px;border-bottom: 1px solid lightgray">
    <div class="title" style="height: 35px;">
      <i style="color: dodgerblue" @click="linkBack" class="el-icon-back"/>&nbsp;
      {{titleName}}</div>
    <div class="icon-button1" style="display: inline-block;float: right;" v-if="showMessages">
      <img style="width: 35px;height: 35px;margin-right: 20px;" src="../../assets/消息.png"/>
      <img style="width: 35px;height: 35px;margin-right: 20px;" src="../../assets/头像.png"/>
      <img style="width: 35px;height: 35px;margin-right: 5px;" src="../../assets/讨论课.png"/>
    </div>
  </div>
</template>

<script>
    export default {
        name: "AppBar",
      props:['titleName','showMessages'],
      methods:{
          linkBack(){
            this.$router.push('/TeacherMainPage');
          }
      }
    }
</script>

<style scoped lang="less">
  .app-bar{
    padding:1px;
    width: 100vw;
    height: 7vh;
    max-height: 50px;
    /*background-color: gray;*/
    text-align: left;

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
