<template>
  <div id="app" >
    <div ontouchstart onload="setTimeout(function(){window.scrollTo(0,1)},100);" >
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

      let _this=this;
      this.$axios({
        method:'get',
        url:'/user'
      }).then(function (response) {
        if(response.data===true){
          if(_this.$route.path==='/'){
            // _this.$router.push('/LoginPc');
          }

        }else{
          // if(isLogin===false) {
          //   _this.$message({
          //     type:'error',
          //     message:'请先登录哦！'
          //   });
        }
      }).catch(function (error) {
        // console.log()
      })


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
