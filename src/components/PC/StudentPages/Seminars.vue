<template>
  <div class="seminarBack animated slideInDown" align="left">
    <div class="titleBar">
      讨论课
    </div>
    <div class="courseSelect">
      <span >课程 </span>
        <mu-select class="select" v-model="courseName">
          <mu-option v-for="option,index in courseList" :key="option.courseID" :label="option.courseName" :value="option.courseName"></mu-option>
        </mu-select>
    </div>

    <div class="courseCard">
      <mu-divider inset></mu-divider>
      <mu-list textline="three-line">
        <mu-sub-header >轮次</mu-sub-header>
        <mu-list-item avatar  :ripple="false" v-for="option,index in seminarList">
          <mu-list-item-action>
            <mu-avatar class="avatar"  color="blue" v-show="index%2==0">
              {{option.roundID}}
            </mu-avatar>
            <mu-avatar class="avatar" color="yellow" v-show="index%2==1">
              {{option.roundID}}
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{option.seminarTopic}}</mu-list-item-title>
            <mu-list-item-sub-title>报名情况：{{option.registerStatus}}</mu-list-item-sub-title>
            <mu-list-item-sub-title>报名起止日期：{{option.registerStartStopTime}}</mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-button icon>
              <mu-button flat color="success" @click="showDetails(option.roundID)">进入</mu-button>
            </mu-button>
          </mu-list-item-action>
        </mu-list-item>
      </mu-list>
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
          ],
          seminarList:[
            {
              roundID:1,
              seminarTopic:'业务流程',
              registerStatus:'1 / 6',
              registerStartStopTime:'2018.1.1—2018.2.2',
            },
            {
              roundID:2,
              seminarTopic:'关系模型',
              registerStatus:'1 / 6',
              registerStartStopTime:'2018.2.3—2018.3.3',
            }
          ]
        }
      },
      methods:{
          showDetails(roundID){
            this.$router.push('PcStuSeminarDetails');

          }
      }
    }
</script>

<style scoped>

</style>
