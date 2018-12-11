<template>
  <div id="PCMenu">
    <el-menu  :default-active="activeIndex" class="el-menu-demo" @select="handleSelect"

              text-color="#ffffff"
              background-color="#001C31"
              active-text-color='#ffffff'
              active-background-color="#1476BF"
              style="font-size: 16px;display: inline-block;margin: 0 auto;height: 100%;width: 90%;z-index: 0;">
      <el-menu-item index="1" style="border: none;margin-top: 30px;"  class="item4menu"  >
        <div style="width: 100%;height: 100%">
          <div style="height: 10px"></div>
          <div style="margin-bottom: 20px;">
            <!--<img src="../../assets/审核流程.png" style="width: 15%;height: 23%"/>-->
          </div>
          <div style="height: 40px;" >
            <span slot="title" style="display: block;">讨论课</span>
          </div>
        </div>
      </el-menu-item>
      <el-menu-item index="2"  style="border: none"  class="item4menu">
        <div style="width: 100%;height: 100%" >
          <div style="height: 10px"></div>
          <div style="margin-bottom: 20px;">
            <!--<img src="../../assets/管理事项.png" style="width: 15%;height: 23%"/>-->
          </div>
          <div style="height: 40px;">
            <span  slot="title" style="display: block;">成绩查看</span>
          </div>
        </div>
      </el-menu-item>
      <!--<el-menu-item index="3"  style="border: none"  class="item4menu">-->
        <!--<div style="width: 100%;height: 100%">-->
          <!--<div style="height: 10px"></div>-->
          <!--<div style="margin-bottom: 20px;">-->
            <!--&lt;!&ndash;<img src="../../assets/管理事项.png" style="width: 15%;height: 23%"/>&ndash;&gt;-->
          <!--</div>-->
          <!--<div style="height: 40px;">-->
            <!--<span  slot="title" style="display: block;">申请信息</span>-->
          <!--</div>-->
        <!--</div>-->
      <!--</el-menu-item>-->
      <!--<el-menu-item index="4"  style="border: none"  class="item4menu">-->
        <!--<div style="width: 100%;height: 100%">-->
          <!--<div style="height: 10px"></div>-->
          <!--<div style="margin-bottom: 20px;">-->
            <!--&lt;!&ndash;<img src="../../assets/管理事项.png" style="width: 15%;height: 23%"/>&ndash;&gt;-->
          <!--</div>-->
          <!--<div style="height: 40px;">-->
            <!--<span  slot="title" style="display: block;">消息中心</span>-->
          <!--</div>-->
        <!--</div>-->
      <!--</el-menu-item>-->
    </el-menu>
  </div>
</template>
<script>
  export default{
    name: 'AdminMenu',

    mounted(){
      // switch(this.$route.path){
      //   case '/Authority':
      //     this.$data.activeIndex = '4'
      //     break
      //   case '/Release':
      //     this.$data.activeIndex = '3'
      //     break
      //   case '/History':
      //     this.$data.activeIndex = '2'
      //     break
      //   case '/MessageCenter':
      //     this.$data.activeIndex = '5'
      //   default:
      //
      // }
    },
    watch: {
      $route(to, from) {
        // switch(to.path){
        //   case '/Now':
        //     this.$data.activeIndex = '1'
        //     break
        //   case '/Authority':
        //     this.$data.activeIndex = '4'
        //     break
        //   case '/Release':
        //     this.$data.activeIndex = '3'
        //     break
        //   case '/History':
        //     this.$data.activeIndex = '2'
        //     break
        //   default:
        //
        // }
      }
    },
    data () {
      return {
        activeIndex: '1',
        document:null
      }
    },
    methods:{
      handleSelect (key, keyPath) {
        switch(key){
          case '1':
            this.$router.push('PcStuSeminars');
            break;
          case '2':
            this.$router.push('PcStuGrades');
            break;
        }
      },
    }
  }
</script>
<style lang="less">
  #PCMenu {
    display: block;
    height: 100%;
    position:absolute;
    top:0px;
    left:0;
    width: 100%;


    .iconfont{
      font-size: 50px !important;
    }
    .el-menu-item, .el-submenu__title{
      line-height: 1.4;
    }
    .item4menu {
      background: #001C31 !important;
      height: 100px !important;
      text-align: center;
      font-size: 17px;
      width: 100%;
      transition: all 0.3s;
      box-sizing: border-box;
      z-index: 0;
    }

    .item4menu:hover {
      background:#1476BF !important;
      color: #ffffff !important;

    }
    .item4menu.is-active {
      background:#1476BF !important;
      color: #ffffff !important;
      width: 110%;
      box-sizing: border-box;
    }
  }
</style>
