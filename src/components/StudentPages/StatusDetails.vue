<template>
  <div>
    <back-bar titleName="" :showMessages="false" backUrl="/StuSeminarDetails"></back-bar>

  </div>
</template>

<script>
  import BackBar from '../ReuseComponents/BackBar'
    export default {
        name: "StatusDetails",
      components:{
        BackBar,
      },
    }
</script>

<style scoped>

</style>
