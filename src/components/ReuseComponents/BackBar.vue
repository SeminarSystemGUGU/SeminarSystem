<template>
  <div class="bar animated bounce fadeIn" >
    <div class="reset-app-bar">
      <div class="app-button" @click="linkBack(backUrl)" v-if="!showMessages">
        <i class="el-icon-back"></i>
      </div>
      <div class="app-bar-title">
        <span>{{titleName}}</span>
      </div>
      <div class="icon-button1" style="display: inline-block;float: right;" v-if="showMessages">
        <img style="width: 35px;height: 35px;margin-right: 20px;" src="../../assets/头像.png"/>
        <img style="width: 35px;height: 35px;margin-right: 5px;" src="../../assets/讨论课.png"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BackBar",
    props:['titleName','showMessages','backUrl'],
    methods:{
      linkBack(backurl){
        this.$router.push(backurl);
      }
    }
  }
</script>

<style scoped lang="less">
  .reset-app-bar{
    width: 100vw;
    height: 13vw;
    position: fixed;
    z-index: 1000;
    top:0;
    color: #409EFF;
    background-color: white;
    box-shadow: 0 1px 0.2px 0 rgba(0, 0, 0, 0.2), 0 2px 20px 0 rgba(0, 0, 0, 0.1);
  }
  .app-bar-title{
    margin-top: 3.5vw;
    font-size: 5.2vw;
    color: #409EFF;
  }
  .app-button{
    font-size: 30px;
    position: fixed;
    left: 2vw;
    color: #409EFF;
    margin-top: 2vw;
  }

</style>
