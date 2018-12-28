<template>
    
</template>

<script>
    export default {
        name: "TransitionPage",
      created() {
          console.log(this.$route);
          this.$router.push({path:this.$route.query.paths,query:{courseId:this.$route.query.courseId}})
      },
      watch:{

      }
    }
</script>

<style scoped>

</style>
