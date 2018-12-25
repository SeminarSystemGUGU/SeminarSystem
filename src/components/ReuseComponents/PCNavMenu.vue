<template>
    <div id="Nav">
      <div class="navigator">
        <div class="left-menu">
          <div class="system-icon">
            <img class="icon" src="../../assets/系统.png" />
            <!--<span class="system-title">讨论课管理系统</span>-->
          </div>
        </div>
        <div class="right-menu">
          <div class="menu-title">
            <span>登出</span>
          </div>
        </div>
      </div>
      <div class="blank-space"></div>
    </div>
</template>

<script>
    export default {
        name: "PCNavMenu",
      data(){
          return{
            activeIndex:'1'
          }
      }
    }
</script>

<style lang="less">
  #Nav{
    width: 100vw;

    .navigator{
      padding: 0;
      width: 100%;
      height: 50px;
      left: 0;
      top:0;
      box-shadow: 0px 0px 3px #333333;
      border-bottom: 1px solid whitesmoke;
      position: fixed;
      background-color: white;
      z-index: 1000;

      .right-menu{
        position: fixed;
        padding: 0;
        margin: 0;
        top:0;
        float: right;
        width: 150px;
        background-color: #dd5347;
        height: 51px;
        right: 0;
        line-height: 50px;

        .menu-title{
          text-align: center;
          margin-left: auto;
          margin-right: auto;
          color: white;
          font-weight: normal;
          font-size: 14px;
          /*display: inline-block;*/
        }
      }
      .system-icon{
        width: 60px;
        height: 50px;
      }

      .left-menu{
        /*margin-top: 10px;*/
        margin-left: 20px;
        line-height: 50px;
        width: 60px;
        text-align: left;
        /*width: 100px;*/
        /*height: 50px;*/
        /*line-height: 7vh;*/
        /*.system-title{*/
        /*margin-left: 10px;*/
        /*line-height: 50px;*/
        /*color: #dd5347;*/
        /*font-weight: bold;*/
        /*}*/
        .icon{
          width: 30px;
          height: 30px;
        }
      }
    }

    .blank-space{
      width: 100vw;
      display: block;
      height: 50px;
    }
    /*height: 100vw;*/
  }

  /* Main styles */



</style>
