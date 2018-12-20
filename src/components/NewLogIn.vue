<template>
  <div id="LogIn">
    <div class="login-metal">
      <div class="main-content">
        <div class="animated fadeIn">
          <div class="fonts-panel">
            <span>厦门大学讨论课管理系统</span><br/>
            <span>欢迎您！</span>
          </div>
        </div>
        <div class="login-panel animated fadeInUp">
          <form class="input-panel" action="http://2gr5gz.natappfree.cc/user/login" method="post" >
            <div class="input-account">
              <label>账号</label><br/>
              <input  class="login-input"  name="username" id="username" placeholder="请输入账号" v-model="account" />
            </div>
            <div class="input-password">
              <label>密码</label><br/>
              <input class="login-input" name="password" type="password"  id="password" placeholder="请输入密码" v-model="password" />
            </div>

          <div class="button-panel">
            <!--<button class="login-button" ref="loginButton" @click="LogIn">登录</button>-->
            <button class="login-button" ref="loginButton" type="submit">登录</button>
          </div>
          </form>
          <div class="button-panel">
            <span @click="forgetPassword" >忘记密码</span>
            <span style="float: right">初始密码为123456</span>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "NewLogIn",
      data(){
          return{
           account:'',
           password:'',
           value1:'1',
            success:'',
          firstLogin:'',
          }

      },
      watch:{
          password(curValue,oldValue){
            if(curValue!==''){
              this.$refs.loginButton.style.backgroundColor='DodgerBlue'
              this.$refs.loginButton.style.color='white';
            }else{
              this.$refs.loginButton.style.backgroundColor='rgba(190,190,190,0.35)'
              this.$refs.loginButton.style.color='color: rgba(255,255,255,0.6)';
            }
          }
      },
      methods:{
        linkTo(){
          if(this.$data.value1==='1'){
            this.$router.push('/ConfirmAccount');
          }else{
            this.$router.push('/StuMainPage');
          }
        },

        LogIn(){
          this.$axios({
            method:'post',
            url:'http://192.168.1.101:8000/loginabc',
            data: this.$qs.stringify({
              username: '24320162202918',
              password: '00000'
            }),

          }).then(function (response) {
            console.log(response)
          }).catch(function (error) {
            console.log(error.response.header);
          })
        },


        forgetPassword(){
          this.$router.push('/forgetPassword');
        }
    },

    }
</script>

<style lang="less">
 @import "../less/Login";
</style>
