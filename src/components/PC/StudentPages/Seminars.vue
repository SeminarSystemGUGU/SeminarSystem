<template>
  <div class="seminarBack animated slideInDown" align="left">
    <div class="titleBar">
      讨论课
    </div>
    <div class="courseSelect">
      <span >课程 </span>
        <mu-select class="select" v-model="courseId" @change="selectCourse">
          <mu-option v-for="option,index in courses" :key="index" :label="option.courseName" :value="option.id"></mu-option>
        </mu-select>
    </div>

    <div class="courseCard">
      <mu-divider inset></mu-divider>
      <mu-list textline="two-line">
        <mu-sub-header v-if="seminars.length!==0">轮次</mu-sub-header>
        <mu-sub-header v-if="seminars.length===0">列表为空</mu-sub-header>
        <mu-list-item avatar  :ripple="false" v-for="option,index in seminars" :key="index">
          <mu-list-item-action>
            <mu-avatar class="avatar" style="margin-top: 0.5vh;" color="blue" v-show="option.roundId%2===0">
              {{option.roundId}}
            </mu-avatar>
            <mu-avatar class="avatar" style="margin-top: 0.5vh;"  color="orange" v-show="option.roundId%2===1">
              {{option.roundId}}
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>第{{option.seminarSerial}}次讨论课——{{option.seminarName}}</mu-list-item-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-button icon>
              <mu-button flat color="success" @click="showDetails(option.id,option.klassId)">进入</mu-button>
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
      created(){
        let _this=this;
        this.$axios({
          method:'get',
          url:'/course',
        }).then(function (response) {
          _this.$data.courses=response.data;
        })
      },
      data() {
        return {
          courseName: 'OOAD',

          courses: [],
          courseId: '',
          allRounds: [],    //当前课程下所有轮次
          rounds: [],  //发布的讨论课所在round
          seminars: [],
          klassId:-1,
        }
      },
      methods:{
        showDetails(seminarId){
          this.$router.push({path:'/PCStudent/PcStuSeminarDetails',query:{courseId:this.$data.courseId,seminarId:seminarId,klassId:this.$data.klassId}});
        },
        selectCourse(){
          this.$data.seminars=[];
          let j;
          for(j=0;j<this.$data.courses.length;j++)
          {
            if(this.$data.courses[j].id=this.$data.courseId) {
              this.$data.klassId = this.$data.courses[j].klassId;
              break;
            }
          }

          let _this=this;    //根据courseId获取该课程round列表
          this.$axios({
            method:'get',
            url:'/course/'+_this.$data.courseId+'/round',
          }).then(function(response){
            _this.$data.allRounds=response.data;

            let i;
            for(i=0;i<_this.$data.allRounds.length;i++)
            {
              let _ts=_this;    //根据roundId获取该课程seminar列表
              _this.$axios({
                method:'get',
                url:'/round/'+_ts.$data.allRounds[i].id+'/seminar',
              }).then(function(response){
               let i;
               for(i=0;i<response.data.length;i++)
                _ts.$data.seminars.push(response.data[i]);
              },function(error){
                alert("Seminar error！");
              });
            }
          },function(error){
            alert(error);
          });

        },
      }
    }
</script>

<style scoped>

</style>
