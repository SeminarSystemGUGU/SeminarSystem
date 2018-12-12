<template>
  <div id="PCTeacherMainpage">
    <div class="top-menu">
      <PcNavMenu></PcNavMenu>
    </div>
    <div style="width: 80%;margin: 0 auto;height: 100%;vertical-align: top;">
      <el-row>
        <el-col style="width: 15%">
          <div v-bind:style="'position:relative;height:'+(height+20)+'px'">
            <!--<pc-menu v-show="!isTeacherPages"></pc-menu>-->
            <pc-menu-teacher></pc-menu-teacher>
          </div>
        </el-col>
        <el-col style="width: 75%;margin-left: 50px;">
          <div class="main-content" style="width: 100%;min-height: 600px;display: inline-block">
            <router-view v-bind:style="'box-shadow: 5px 5px 5px #888888;background: #ffffff;margin-top:20px;overflow-y:auto;height:'+height+'px'" />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import PcMenuTeacher from '../ReuseComponents/PCMenuTeacher'
  import PcMenu from '../ReuseComponents/PCMenu'
  import PcNavMenu from '../ReuseComponents/PCNavMenu'
  export default {
    name: "LoginPC",
    components:{
      PcMenu,
      PcNavMenu,
      PcMenuTeacher
    },
    data(){
      return{
        height:'',
        isTeacherPages:false
      }
    },
    watch:{

    },
    mounted(){
      console.log(this.$route.path);
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
  @import "../../less/PC.less";
  @import "../../less/TeacherOutGrades.less";
</style>
