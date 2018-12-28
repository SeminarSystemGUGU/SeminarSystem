<template>
  <div id="MyAccount">
    <div class="back-button">
      <div class="back-button-panel">
        <i class="el-icon-back" @click="backTo"></i>
      </div>
    </div>
    <div class="my-info-card" v-loading="loadingInfo">
      <el-card>
        <div class="top-card">
          <span class="top-card-username">{{userName}}</span>
          <div class="top-image">
            <span class="top-card-image">{{userName}}</span>
          </div>
        </div>
        <div class="middle-card">
          <span class="middle-card-username">工号:</span>
          <span>{{account}}</span><br/>
          <span class="middle-card-email">邮箱：</span>
          <span>{{email}}</span>
          <span class="middle-card-link" @click="linkToEmail">&nbsp;修改</span>
        </div>
      </el-card>
    </div>
    <div class="middle-menu-bar"></div>
    <div class="modify-menu">
      <div class="my-course-card">
        <el-row :gutter="10">
          <el-col class="course-card-col1">
            <span>&nbsp;</span>
          </el-col>
          <el-col class="course-card-main-col">
            <div class="course-card-top-dis">
              <img src="../../../assets/修改密码.png" class="menu-image"/>
            </div>
          </el-col>
          <el-col class="course-card-ano-col">
            <div class="course-card-top-dis" @click="linkToPassword">
              <span>修改密码</span>
            </div>
          </el-col>
          <el-col class="course-card-this-col">
            <div class="unused-col">
              <!--<i class="el-icon-arrow-right" style="width: 25px;height: 25px;"></i>-->
            </div>
          </el-col>
        </el-row>
      </div>
      <!--<div style="height: 1.5px;background-color: whitesmoke;width: 100vw"></div>-->
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
      <div class="course-menu-divider"></div>
    </div>
    <div class="logout">
      <mu-button color="error" class="logout-button" @click="logBack">退出登录</mu-button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "MyAccount",
      data(){
          return{
            account:'',
            email:'',
            timeInterval:'',
            userName:'',
            loadingInfo:true,
          }
      },
      created(){
        let _this=this;
        this.$axios({
          method:'get',
          url:'/user/information'
        }).then(function (response) {
          _this.$data.account=response.data.account;
          _this.$data.email=response.data.email;
          _this.$data.userName=response.data.studentName;
          _this.$data.loadingInfo=false;
        })
      },
      methods:{
          backTo(){
            this.$router.push('/TeacherMainPage');
          },
        linkToPassword(){
          this.$router.push('/ResetPassword');
        },
        linkToEmail(){
          this.$router.push('/ResetEmail');
        },
        logBack(){
          let _this=this;
          this.$axios({
            method:'post',
            url:'/user/out'
          }).then(function (response) {
            if(response.data===true){
              _this.$router.push('/');
            }
          })

        }
      }
    }
</script>

<style scoped lang="less">
#MyAccount{
  width: 98vw;
  padding:1px;

  .unused-col{
    line-height: 9vw;
    text-align: right
  }

  .course-menu-divider{
    height: 1.5px;
    background-color: whitesmoke;
    width: 100vw
  }

  .course-card-this-col{
    width: 27%
  }

  .course-card-ano-col{
    width: 50%;
  }

  .course-card-top-dis{
    margin-top: 3vw;
  }

  .course-card-main-col{
    width: 10%;
    text-align: right;
  }

  .course-card-col1{
    width: 3%
  }

  .middle-menu-bar{
    height: 8px;
    background-color: whitesmoke;
    width: 100vw;
    margin-top: 5vw
  }

  .middle-card-link{
    color: dodgerblue
  }

  .middle-card-email{
    font-weight: bold;
    display: inline-block;
    margin-top: 1.3vw
  }

  .middle-card-username{
    font-weight: bold
  }

  .top-card-username{
    font-size: 20px;
    font-weight: bold;
  }

  .top-card-image{
    color: white
  }

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
  height: 12vw;
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
</style>
