<template>
  <div id="app" >
    <!--<mu-appbar style="width: 100%;position: absolute;top:0" color="primary">-->
      <!--<mu-button icon slot="left">-->
      <!--</mu-button>-->
      <!--Title-->
      <!--<mu-button flat slot="right">LOGIN</mu-button>-->
    <!--</mu-appbar>-->
    <div ontouchstart>
    <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    // let platform=navigator.platform;

    // if(platform.indexOf('W')!==-1){
    //   this.$router.push('/');
    // }
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

}
</style>
