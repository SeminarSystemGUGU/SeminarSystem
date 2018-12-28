<template>
    
</template>

<script>
    export default {
        name: "TransitionPage",
      created() {
          this.$router.push({path:'/TeacherCourseRounds',query:{courseId:this.$route.query.courseId}})
      }
    }
</script>

<style scoped>

</style>
