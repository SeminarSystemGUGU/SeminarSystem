<template>
    <div class="reset-app-bar animated bounce fadeIn">
      <div class="app-button" @click="linkBack(backUrl)" v-if="showBackBar">
        <i class="el-icon-back"></i>
      </div>
      <div class="app-bar-title" >
        <span>{{titleName}}</span>
      </div>
      <div style="float:right;margin-right:4vw;margin-top: 15px;" v-if="showMessages">
        <el-dropdown @command="handleCommand">
            <div class="el-dropdown-link" >
              <i class="el-icon-menu"/>
            </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item  command="selectCourse" >讨论课</el-dropdown-item>
            <el-dropdown-item command="myInfo">个人中心</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
</template>

<script>
  export default {
    name: "BackBar",
    props:['titleName','showMessages','showBackBar','backUrl'],
    methods:{
      linkBack(backurl){
        this.$router.push(backurl);
      },
      handleCommand(command) {
       if(command==="selectCourse")
         this.$router.push('/SeminarSelectCourse');
       else if(command==='myInfo')
         this.$router.push('/StuMyAccount');
      }
    }
  }
</script>

<style lang="less">
  .reset-app-bar{
    width: 100vw;
    height: 13vw;
    position: fixed;
    z-index: 999;
    top:0;
    color: #409EFF;
    background-color: white;
    box-shadow: 0 1px 0.2px 0 rgba(0, 0, 0, 0.2), 0 2px 20px 0 rgba(0, 0, 0, 0.1);

  }
  .app-bar-title{
    margin-top: 3.5vw;
    font-size: 5.2vw;
    display: inline-block;
    color: #409EFF;
  }
  .app-button{
    font-size: 30px;
    position: fixed;
    left: 2vw;
    color: #409EFF;
    margin-top: 2vw;
  }
  .el-dropdown-link{
    display:inline-block;
    height:35px;
    line-height:35px;
  }
  .el-icon-menu{
    font-size: 25px;
    color:#409EFF;
  }
  @media screen and (min-width: 481px ){
    .reset-app-bar{
        height:90px;
    }
    .app-bar-title{
      margin-top: 3.5vw;
      font-size:32px;
    }
    .el-dropdown-link{
      display:inline-block;
      height:35px;
      line-height:35px;
    }
    .el-icon-back{
      margin-top: 15px;
      font-size: 40px;
    }
    .el-icon-menu{
      margin-top: 13px;
      font-size: 40px;
      color:#409EFF;
    }

  }
  @media screen and (min-width: 1024px ){
    .reset-app-bar{
      height:65px;
    }
    .app-bar-title{
      margin-top: 1.5vw;
      font-size:30px;
    }
    .el-dropdown-link{
      display:inline-block;
      height:35px;
      line-height:35px;
    }
    .el-icon-back{
      margin-top: 2px;
      font-size: 40px;
    }
    .el-icon-menu{
      margin-top: 4px;
      font-size: 40px;
      color:#409EFF;
    }

  }

</style>
