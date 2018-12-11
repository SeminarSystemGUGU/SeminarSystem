<template>
  <div id="LoginPC">
    <div class="top-menu">
      <PcNavMenu></PcNavMenu>
    </div>
    <div style="width: 80%;margin: 0 auto;height: 100%;vertical-align: top;">
      <el-row>
        <el-col style="width: 15%">
          <div v-bind:style="'position:relative;height:'+(height+20)+'px'">
            <pc-menu></pc-menu>
          </div>
        </el-col>
        <el-col style="width: 68%">
          <div class="main-content" style="width: 70%;height: 600px;display: inline-block">
            <router-view/>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import PcMenu from '../ReuseComponents/PCMenu'
  import PcNavMenu from '../ReuseComponents/PCNavMenu'
  export default {
    name: "LoginPC",
    components:{
      PcMenu,
      PcNavMenu
    },
    data(){
      return{
        height:''
      }
    },
    mounted(){
      let _this=this;
      _this.$data.height = window.innerHeight - 110;
      window.onresize = function temp() {
        _this.$data.height = window.innerHeight - 110;
        console.log(_this.$data.height)
      };
    }
  }
</script>

<style lang="less">
  .el-menu--horizontal>.el-menu-item.is-active{
    border-bottom: none;
  }
  @import "../../CSS/pc.css";
</style>
