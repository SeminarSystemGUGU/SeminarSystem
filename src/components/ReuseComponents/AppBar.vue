<template>
  <div class="reset-card-bar">
    <div class="reset-app-bar">
      <!--<div class="icon"></div>-->
      <div class="app-button">
        <i :class="iconCode"></i>
      </div>
      <div class="app-bar-title">
        <span>{{title}}</span>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "AppBar",
      props:['icon','title'],
      data(){
          return{
            // title:'密码设置',
            iconCode:'el-icon-arrow-left'
          }
      },
      created(){
          this.$data.iconCode=this.$props.icon;
          // this.$data.title=this.$props.title;
      }
    }
</script>

<style scoped>
  .reset-app-bar{
    width: 100vw;
    height: 15vw;
    position: fixed;
    z-index: 1000;
    top:0;
    background-color: #5677fc;
    color: white;
    box-shadow: 0 1px 0.2px 0 rgba(0, 0, 0, 0.2), 0 2px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .app-bar-title{
    /*background-color: gray;*/
    margin-top: 3.5vw;
    font-size: 5.2vw;
    color: white;
    font-family: "PingFang SC";
    /*font-weight: bold;*/
  }

  .app-button{
    font-size: 30px;
    /*float: left;*/
    position: fixed;
    left: 2vw;
    color: white;
    /*background-color: orangered;*/
    margin-top: 2vw;
  }
</style>
