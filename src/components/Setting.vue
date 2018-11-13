<template>
    <div id="Setting">
      <app-bar title="设置" icon="el-icon-arrow-left"></app-bar>
      <div class="setting-main-content">
        <div class="card" >
          <div class="text-panel">
            <span class="text-left">新通知显示：</span>
            <el-switch class="notice-switch" v-model="value3">
            </el-switch>

          </div>
        </div>
        <span class="text-middle">关闭新通知显示后系统将不显示发至邮箱中的通知</span>
        <div class="card card1" >
          <div class="text-panel">
            <span class="text-left">通知间隔：</span>
            <el-select class="timeout-select" size="mini" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
            <!--<span class="text-middle"></span>-->
          </div>
        </div>

      </div>
    </div>
</template>

<script>
  import AppBar from '../components/AppBar'
    export default {
        name: "Setting",
      components:{
          AppBar
      },
      data(){
          return{
            value3:false,
            value:'',
            options:[
              {value:'2小时'}
            ]
          }
      }
    }
</script>

<style lang="less">
#Setting{
  width: 100vw;
  height: 100vh;
  background-color: whitesmoke;
}
  @media screen and (max-width: 600px){
    #Setting{
      .timeout-select{
        width: 25vw;
        float: right;
        margin-right: 3vw;
      }
      .setting-main-content{
        margin-top: 20vw;
      }
      .notice-switch{
        float: right;
        margin-right: 5vw;
        margin-top: 5vw;
      }

      .card{
        font-size: 25px;
        line-height: 14vw;
        margin-top: 0.5px;
        width: 100vw;
        height: 15vw;
        border-radius: 10px;
        background-color: white;
        border: 1px solid lightgray;
      }
      .card1{
        margin-top: 2vh;
      }
      .text-panel{
        text-align: left;
        /*width: 100%;*/
        font-size: 18px;
        font-weight: bold;
        /*text-align: center;*/
      }
      .text-left{
        margin-left: 5vw;
      }
    }
  }
</style>
