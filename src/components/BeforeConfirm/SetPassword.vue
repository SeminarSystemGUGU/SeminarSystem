<template>
  <div id="SetPassword">
    <app-bar :title="title" :icon="icon"></app-bar>
    <div class="set-main-content">
      <el-form :model="resetPassword">
        <el-form-item prop="newPassword">
          <el-input v-model="resetPassword.newPassword" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item prop="conformPassword">
          <el-input v-model="resetPassword.confirmPassword" placeholder="请确认密码"></el-input>
        </el-form-item>
      </el-form>
      <div class="button-panel">
        <div class="fonts-panel">
          <span>可包含数字、字母和下划线，长度不少于6位</span>
        </div>
        <mu-button color="primary" class="another-button">确认提交</mu-button>
      </div>
    </div>
  </div>
</template>

<script>
  import AppBar from '../AppBar'
    export default {
        name: "SetPassword",
      components:{
          AppBar
      },
      data(){
          return{
            title:'设置密码',
            icon:'el-icon-arrow-left',
            resetPassword:{
              newPassword:'',
              confirmPassword:''
            }
          }
      }

    }
</script>

<style lang="less">
  @base-color:#5677fc;

  #SetPassword{
    padding: 1px;
  }
@media screen and (max-width: 600px){
  .fonts-panel{
    text-align: left;
    color: gray;
  }
  .another-button{
    color: white;
    height: 10vw;
    font-size: 16px;
    background-color: @base-color;
    width: 100%;
  }
  .button-panel{
    width: 90vw;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15vw;
  }
  .set-main-content{
    margin-top: 20vw;

  }
  .el-input__inner::-webkit-input-placeholder{
    color: gray;
    font-size: 15px;
  }


  .el-input__inner{
    border:none;
    background-color: whitesmoke;
    height: 12vw;
    width: 90vw;
    color: gray;
  }
}
</style>
