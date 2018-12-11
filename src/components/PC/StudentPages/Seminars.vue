<template>
  <div class="seminarBack animated slideInDown" align="left">
    <div class="titleBar">
      讨论课
    </div>
    <div class="courseSelect">
      <span>课程 </span>
        <mu-select class="select" v-model="courseName">
          <mu-option v-for="option,index in courseList" :key="option.courseID" :label="option.courseName" :value="option.courseName"></mu-option>
        </mu-select>
    </div>

  </div>
</template>

<script>
    export default {
        name: "Seminars",
      data() {
        return {
          courseName:'OOAD',
          courseList:[
            {
              courseName:'OOAD',
              courseID:1,
            },
            {
              courseName:'J2EE',
              courseID:2,
            }
          ]
        }
      }
    }
</script>

<style scoped>

</style>
