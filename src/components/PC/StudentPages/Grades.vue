<template>
  <div class="seminarBack animated slideInUp" align="left">
    <div class="titleBar">
      查看成绩
    </div>
    <div class="courseSelect">
      <span >课程 </span>
      <mu-select class="select" v-model="courseId" @change="selectCourse">
        <mu-option v-for="option,index in courses" :key="index" :label="option.courseName" :value="option.id"></mu-option>
      </mu-select>
    </div>

    <el-table :data="scoreEntities"  id="gradesTable"  :default-sort = "{prop: 'round'}">
      <el-table-column prop="round" label="轮次" width="120" sortable> </el-table-column>
      <el-table-column prop="entity.seminarEntity.seminarName" label="参与讨论课主题" width="150"></el-table-column>
      <el-table-column label="成绩">
        <el-table-column prop="entity.presentationScore" label="展示" width="70"></el-table-column>
        <el-table-column prop="entity.reportScore" label="报告" width="70"></el-table-column>
        <el-table-column prop="entity.questionScore" label="提问" width="70"></el-table-column>
      </el-table-column>
      <el-table-column prop="totalScore" label="总分" ></el-table-column>
    </el-table>

    <mu-button color="success" class="exportGrade">导出成绩</mu-button>


  </div>
</template>

<script>
    export default {
        name: "Grades",
      created(){

        let _this=this;
        this.$axios({
          method:'get',
          url:'/course',
        }).then(function (response) {
          _this.$data.courses=response.data;
        })
      },
      data(){
          return{
            courses: [],
            courseId: '',
            allRounds: [],    //当前课程下所有轮次
            scoreEntities:[],
          }
      },
      methods:{
        selectCourse(){
          this.$data.scoreEntities=[];
          let tt=this;
          this.$axios({
            method:'get',
            url:'/course/'+tt.$data.courseId+'/team',
          }).then(function (response) {
            tt.$data.teamId = response.data.teamId;
            if (tt.$data.teamId === ''||tt.$data.teamId ===null) {
              tt.$data.state=0;
              tt.$toast.error("未组队，还没有成绩");
            }
            else{
              tt.$data.state=1;
              let _this = tt;
              tt.$axios({
                method: 'get',
                url: '/course/' + _this.$data.courseId + '/round',
              }).then(function (response) {
                let i;
                for (i = 0; i < response.data.length; i++) {
                  let round= '第'+response.data[i].roundSerial+ '轮';
                  let t = _this;
                  _this.$axios({
                    method: 'get',
                    url: '/round/' + response.data[i].id + '/team/' + t.$data.teamId + '/roundscore',
                    params: {
                      courseId: t.$data.courseId,
                    }
                  }).then(function (response) {
                    let x;
                    for(x=0;x<response.data.seminarScoreEntities.length;x++)
                      t.$data.scoreEntities.push({round:round,entity:response.data.seminarScoreEntities[x]});
                    // _this.$data.rounds[i].scoreEntities = response.data.seminarScoreEntities;
                  });
                }
              })
            }
          });

        },
        exportGrades(){

        },
      }
    }
</script>

<style scoped>

</style>
