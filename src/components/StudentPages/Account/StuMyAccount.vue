<template>
  <div class="MyAccount">
    <div class="back-button">
      <div class="back-button-panel">
        <i class="el-icon-back" @click="backTo"></i>
      </div>
    </div>
    <div class="my-info-card">
      <el-card>
        <div class="top-card">
          <span style="font-size: 20px;font-weight: bold">{{studentInfo.studentName}}</span>
          <div class="top-image">
            <!--<span style="color: white">{{studentInfo.studentName.substring(1)}}</span>-->
          </div>
        </div>
        <div class="middle-card">
          <span style="font-weight: bold">学号：</span>
          <span>{{studentInfo.account}}</span><br/>
          <span style="font-weight: bold;display: inline-block;margin-top: 1.3vw">邮箱：</span>
          <span>{{studentInfo.email}}</span>
          <span style="color: dodgerblue" @click="linkToEmail">&nbsp;修改</span>
        </div>
      </el-card>
    </div>
    <div style="height: 8px;background-color: whitesmoke;width: 100vw;margin-top: 5vw"></div>
    <div class="modify-menu">
      <div class="my-course-card">
        <el-row :gutter="10" >
          <el-col style="width: 3%" @click="linkToPassword">
            <span>&nbsp;</span>
          </el-col>
          <el-col style="width: 10%;text-align: right;">
            <div style="margin-top: 3vw;">
              <img src="../../../assets/修改密码.png" class="menu-image"/>
            </div>
          </el-col>
          <el-col style="width: 50%;" >
            <div style="margin-top: 3vw" @click="linkToPassword" >
              <span>修改密码</span>
            </div>
          </el-col>
          <el-col style="width: 27%">
            <div style="line-height: 9vw;text-align: right" @click="linkToPassword">
              <i class="el-icon-arrow-right" style="width: 25px;height: 25px;"></i>
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="height: 1.5px;background-color: whitesmoke;width: 100vw"></div>
      <!--<div class="my-course-card">-->
        <!--<el-row :gutter="10">-->
          <!--<el-col style="width: 3%">-->
            <!--<span>&nbsp;</span>-->
          <!--</el-col>-->
          <!--<el-col style="width: 10%;text-align: right;">-->
            <!--<div style="margin-top: 3vw;">-->
              <!--<img src="../../../assets/通知时间.png" class="menu-image"/>-->
            <!--</div>-->
          <!--</el-col>-->
          <!--<el-col style="width: 50%;">-->
            <!--<div style="margin-top: 3vw">-->
              <!--<span>通知发送时间</span>-->
            <!--</div>-->
          <!--</el-col>-->
          <!--<el-col style="width: 33%" >-->
            <!--<el-select size="mini" style="" class="the-select" v-model="timeInterval">-->
              <!--<el-option value="3h"></el-option>-->
            <!--</el-select>-->
          <!--</el-col>-->
        <!--</el-row>-->
      <!--</div>-->
      <!--<div style="height: 1.5px;background-color: whitesmoke;width: 100vw"></div>-->
    </div>
    <div class="logout">
      <mu-button color="error" class="logout-button">退出登录</mu-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "StuMyAccount",
    data(){
      return{
        studentInfo:{
          // studentName:'李大海',
          // account:'24320162202999',
          // email:'123124@qq.com',
        }
      }
    },
    created(){
        const loading = this.$loading();
        setTimeout(() => {
          loading.close();
        }, 500);

      let _this=this;
      this.$axios({
        method: 'get',
        url: '/user/information',
      }).then(function (response) {
        _this.$data.studentInfo=response.data;
      }, function (error) {
        alert("请求失败",error);
      });
    },
    methods:{
      backTo(){
        this.$router.push('/StuMainPage');
      },
      linkToPassword(){
        this.$router.push('/StuResetPassword');
      },
      linkToEmail(){
        this.$router.push('/StuResetEmail');
      }
    }
  }
</script>

<style scoped lang="less">
  .MyAccount{
    width: 98vw;
    padding:1px;

    .the-select{
      margin-top: 12px;
      width: 26vw;

      @media screen and(min-width: 700px){
        margin-top: 20px;
      }

    }

    .my-info-card{
      width: 85%;
      margin-left: auto;
      margin-right: auto;
      margin-top: 2.5vw;
      text-align: left;

      .top-image{
        display: inline-block;
        width: 50px;
        height: 50px;
        line-height: 50px;
        border-radius: 50%;
        background-color: dodgerblue;
        text-align: center;
        font-size: 16px;
        float: right;
      }

      .middle-card{
        margin-top: 5vw;
        font-family: "等线 Light";
        font-size: 16px;
      }

    }

    .my-course-card{
      font-family: "PingFang SC";
      width: 100vw;
      height: 12vw;
      max-height: 68px;
      /*background-color: gray;*/
      text-align: left;
      font-size: 18px;
      /*font-weight: bold;*/
      /*line-height: 15vw;*/

      .menu-image{
        width: 5vw;
        height: 5vw;
        max-height: 25px;
        max-width: 25px;
      }
    }


  }
  .logout{
    width: 100vw;
    height: 15vw;
    /*background-color: orangered;*/
    position: fixed;
    bottom: 0;

    .logout-button{
      width: 100%;
      /*height: 12vw;*/
    }



  }

  .back-button-panel{
    font-size: 25px;
    text-align: left;
    width: 90%;
    margin-right: auto;
    margin-left: auto;
    margin-top: 3vw;
    color: dodgerblue;
    font-weight: bold
  }
  @media screen and (min-width: 481px ){
    .logout-button{
      height:6vh;
    }
  }
</style>
