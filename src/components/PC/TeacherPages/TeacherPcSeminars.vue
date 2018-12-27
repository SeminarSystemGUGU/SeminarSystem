<template>
  <div class="seminarBack" align="left" id="PcSeminars">
    <div class="titleBar">
      讨论课
    </div>
    <div class="courseSelect">
      <span>课程 </span>
      <mu-select class="select" v-model="courseId" @change="changeCourses">
        <mu-option v-for="option,index in courseList" :key="index" :label="option.courseName" :value="option.id"></mu-option>
      </mu-select>
    </div>
    <div class="roundSelect">
      <span>轮次</span>
      <mu-select class="select" v-model="roundId" @change="changeRounds">
        <mu-option v-for="option,index in roundList" :key="index" :label="'第'+option.roundSerial+'轮'" :value="option.id"></mu-option>
      </mu-select>
    </div>

    <div class="courseCard">
      <mu-divider inset></mu-divider>
      <mu-list textline="three-line">
        <mu-sub-header >轮次</mu-sub-header>
        <mu-list-item avatar  :ripple="false" v-for="option,index in seminarList" :key="index">
          <mu-list-item-action>
            <mu-avatar class="avatar"  color="blue" v-show="index%2==0">
              {{option.seminarSerial}}
            </mu-avatar>
            <mu-avatar class="avatar" color="yellow" v-show="index%2==1">
              {{option.seminarSerial}}
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{option.seminarName}}</mu-list-item-title>
            <mu-list-item-sub-title>报名情况：</mu-list-item-sub-title>
            <mu-list-item-sub-title>报名起止日期：{{option.enrollStartTime}}~{{option.enrollEndTime}}</mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-button icon>
              <mu-button flat color="success" @click="showDetails(option)">进入</mu-button>
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
        courseId:'',
        roundId:'',
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
        roundList:[

        ],
        seminarList:[
          // {
          //   roundID:1,
          //   seminarTopic:'业务流程',
          //   registerStatus:'3 / 6',
          //   registerStartStopTime:'2018.1.1—2018.2.2',
          // },
          // {
          //   roundID:2,
          //   seminarTopic:'关系模型',
          //   registerStatus:'3 / 6',
          //   registerStartStopTime:'2018.2.3—2018.3.3',
          // },
          // {
          //   roundID:3,
          //   seminarTopic:'什么模型',
          //   registerStatus:'3 / 6',
          //   registerStartStopTime:'2018.2.3—2018.3.3',
          // }
        ]
      }
    },
    created(){
      this.loadAllCourses();
    },
    methods:{
      changeCourses(){
        let _this=this;
        this.$axios({
          method:'get',
          url:'/course/'+this.$data.courseId+'/round'
        }).then(function (response) {
          _this.$data.roundList=response.data;

        })
      },
      changeRounds(){
        console.log('1111777')
        let _this=this;
        this.$axios({
          method:'get',
          url:'/round/'+this.$data.roundId+'/seminar'
        }).then(function (response) {
          _this.$data.seminarList=response.data;
          for(let index=0;index<_this.$data.seminarList.length;index++){
            _this.$data.seminarList[index].enrollStartTime=_this.$data.seminarList[index].enrollStartTime.slice(0,10);
            console.log(_this.$data.seminarList[index].enrollStartTime.slice(0,10));
            _this.$data.seminarList[index].enrollEndTime=_this.$data.seminarList[index].enrollEndTime.slice(0,10);
          }
        })
      },
      loadAllCourses(){
        let _this=this;
        this.$axios({
          method:'get',
          url:'/course'
        }).then(function (response) {
          _this.$data.courseList=response.data;

        })

      },
      showDetails(option){
        this.$router.push({path:'/PCTeacher/TeacherSeminarDetails',query:{roundId:this.$data.roundId,courseId:this.$data.courseId,seminarId:option.id}});

      }
    }
  }
</script>

<style lang="less">
#PcSeminars{

}
</style>
