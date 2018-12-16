<template>
  <div id="app" >
    <div ontouchstart>
    <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    // this.logInJudge(); //用于自动跳转pc还是移动端以及获取jwt
  },
  methods:{
    logInJudge(){
      let platform=navigator.platform;  //用于获取平台号
      let isLogin=false;        //用于请求获取是否之前已经登陆过

      if(isLogin===false) {
        this.$message({
          type:'error',
          message:'请先登录哦！'
        });
        if (platform.indexOf('Win') !== -1) {
          this.$router.push('/LoginPc');
        } else {
          this.$router.push('/');
        }
      }else{
        this.$message({
          type:'success',
          message:'欢迎回来！'
        })
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
  width: 100vw;
  height: 100vh;
  background-color: white;
  padding: 0;
  margin: 0;
  overflow: scroll;

}
</style>
