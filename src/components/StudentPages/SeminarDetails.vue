<template>
    <div>
      <back-bar titleName="我的课程" :showMessages="false" backUrl="/StuMainPage"></back-bar>

      <div>

      </div>
    </div>
</template>

<script>
  import BackBar from '../ReuseComponents/BackBar'
    export default {
        name: "SeminarDetails",
      components:{
          BackBar,
      },
      data(){
          return{

          }
      }
    }
</script>

<style scoped>

</style>
