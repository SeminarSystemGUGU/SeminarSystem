<template>
  <app-bar :show-messages="true" title-name="OOAD-课程详情"></app-bar>
</template>

<script>
  import AppBar from '../../components/ReuseComponents/AppBar'
  import App from "../../App";
    export default {
        name: "TeacherCourseDetails",
      components:{
        App,
          AppBar
      }
    }
</script>

<style scoped>

</style>
