<template>
  <div class="seminarBack animated fadeIn" align="left">
    <el-dialog :visible.sync="dialogVisible" width="24%" title="展示打分" :modal="false">
      <span class="give-score-span">为{{giveScoreTeamName}}组报告打分：</span>
      <el-form class="give-score-form" ref="formGiveScore" :model="formGiveScore" :rules="ruleFormScore">
        <el-form-item prop="score">
          <el-input class="give-score-input" placeholder="请输入分数" v-model="formGiveScore.score"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="confirmReportScore">确认</el-button>
      <el-button type="primary" @click="dialogVisible=false">取消</el-button>
    </el-dialog>
    <div class="titleBar">
      第{{roundDetails.roundSerial}}轮讨论课
    </div>
    <div class="contentCard">
      <div class="smallCard">
        {{seminarDetails.seminarName}}
      </div>
      <div class="nextCard">
        报名情况：{{attLength}}/{{seminarDetails.maxTeam}}
      </div>
      <div>
        <span class="subCon">报名起止日期：{{seminarDetails.enrollStartTime}}-{{seminarDetails.enrollEndTime}}</span><br/>
        <span class="subCon">报告提交截止日期：{{klassSeminarDetails.reportDDL}}</span><br/>
        <span class="subCon">要求：{{seminarDetails.introduction}}</span><br/>
      </div>
    </div>
    <div class="courseSelect">
      <span>班级</span>
      <mu-select class="select" v-model="classId" @change="changeClass">
        <mu-option v-for="option,index in classList" :key="index" :label="option.grade+'级'+option.klassSerial+'班'" :value="option.id"></mu-option>
      </mu-select>
    </div>
    <div class="lastCard">
      已报名小组
      <span v-if="klassSeminarDetails.status===0">（未开始）</span>
      <span v-if="klassSeminarDetails.status===1">（正在进行）</span>
      <span v-if="klassSeminarDetails.status===2">（已结束）</span>
    </div>
    <el-table  :data="attendanceDetails" stripe id="teamTable">
      <el-table-column prop="teamOrder" label="次序" width="100"></el-table-column>
      <el-table-column prop="teamName" label="组名" width="160"></el-table-column>
      <el-table-column prop="leaderId" label="组长学号" width="150"></el-table-column>
      <el-table-column prop="ppt" label="展示材料" width="150" v-if="klassSeminarDetails.status===0||klassSeminarDetails.status===1">
        <template slot-scope="scope">
          <a :href="attendanceDetails[scope.$index].pptUrl">{{attendanceDetails[scope.$index].pptName}}</a>
          <!--<img  v-if="seminar.registeredTeams[scope.$index].ppt=='已上传'" style="width: 30px;height: 30px;color:#67C23A;cursor: pointer" src="../../../assets/download.svg"/>-->
          <!--<span v-if="seminar.registeredTeams[scope.$index].ppt=='未上传'">{{seminar.registeredTeams[scope.$index].ppt}}</span>-->
        </template>
      </el-table-column>
      <el-table-column prop="ppt" label="课后报告" width="150" v-if="klassSeminarDetails.status===0||klassSeminarDetails.status===1">
        <template slot-scope="scope">
          <a :href="attendanceDetails[scope.$index].reportUrl">{{attendanceDetails[scope.$index].reportName}}</a>
          <!--<img  v-if="seminar.registeredTeams[scope.$index].ppt=='已上传'" style="width: 30px;height: 30px;color:#67C23A;cursor: pointer" src="../../../assets/download.svg"/>-->
          <!--<span v-if="seminar.registeredTeams[scope.$index].ppt=='未上传'">{{seminar.registeredTeams[scope.$index].ppt}}</span>-->
        </template>
      </el-table-column>
      <el-table-column label="打分" v-if="klassSeminarDetails.status===1">
        <template slot-scope="scope">
            <span v-if="!attendanceDetails[scope.$index].score">未打分</span>
            <span v-else>{{attendanceDetails[scope.$index].score}}</span>
            <el-button type="text" @click="giveScore(scope.$index)">打分</el-button>
            <!--<mu-button  flat :disabled="seminar.registeredTeams[scope.$index].teamID !=''" @click.native.prevent="updateHandle(scope.$index )" color="success"  >-->
              <!--可报名-->
            <!--</mu-button>-->

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "SeminarDetails",
    data(){
      let checkAge = (rule, value, callback) => {
        if(value===0){
          callback();
        }else {
          if (!value) {
            return callback(new Error('分数不能为空'));
          } else {
            // const pattern=/^[0-9]+[0-9]*]*$/;
            const pattern=/^[0-9]+(\.\d+)?$/;

            if (!pattern.test(value*10)) {
              callback(new Error('请输入数字！'))
            } else {
              callback();
            }
          }
        }

      };
      return{
        roundId:'',
        courseId:'',
        seminarId:'',
        seminarDetails:{
          seminarName:'',
          enrollStartTime:'',
          enrollEndTime:'',
          maxTeam:'',
          introduction:''
        },
        roundDetails:{
          id:'',
          roundSerial:''
        },
        classList:[
          {
            grade:'',
            klassSerial:'',
            klassTime:'',
            id:'',
            klassLocation:''
          }
        ],
        classId:'',
        klassSeminarDetails:{
          reportDDL:'',
          status:''
        },
        attendanceDetails:[

        ],
        giveScoreIndex:0,
        giveScoreTeamName:'',
        dialogVisible:false,
        formGiveScore:{
          score:'',
        },
        ruleFormScore:{
          score:[
            {required:true,validator:checkAge,trigger:'change'}
          ]
        }

      }
    },
    computed:{
      attLength(){
        return this.$data.attendanceDetails.length;
      }
    },
    created(){
      this.$data.courseId=this.$route.query.courseId;
      this.$data.roundId=this.$route.query.roundId;
      this.$data.seminarId=this.$route.query.seminarId;
      this.loadSeminarDetails();
      this.loadRoundDetails();
      this.loadAllClasses();
    },
    methods:{
      confirmReportScore(){
        let _this=this;
        this.$refs.formGiveScore.validate((valid)=>{
          if(valid){
            this.$axios({
              method:'put',
              url:'/course/'+this.$data.courseId+'/round/'+this.$data.roundId+'/team/'+
                this.$data.attendanceDetails[this.$data.giveScoreIndex].teamEntity.id+'/klassSeminar/'+
                this.$data.attendanceDetails[this.$data.giveScoreIndex].klassSeminarId+'/presentation',
              params:{
                score:this.$data.formGiveScore.score
              }
            }).then(function (response) {
              // if(response.data===true){
              _this.$message({
                type:'success',
                message:'打分成功！'
              })
              _this.$data.attendanceDetails[_this.$data.giveScoreIndex].score=_this.$data.formGiveScore.score;
              _this.$data.dialogVisible=false;
            }).catch(function (error) {
              _this.$message({
                type:'error',
                message:'打分失败！请检查一下~'
              })
            })
          }
        })

      },
      giveScore(index){
        this.$data.giveScoreIndex=index;
        this.$data.giveScoreTeamName=this.$data.attendanceDetails[index].teamName;
        this.$data.dialogVisible=true;
        this.$data.formGiveScore.score=this.$data.attendanceDetails[index].score;
      },
      loadPPTMaterial(){
        let _this=this;
        for(let index=0;index<this.$data.attendanceDetails.length;index++) {
          this.$axios({
            method: 'get',
            url:'/attendance/'+this.$data.attendanceDetails[index].id+'/ppt'
          }).then(function (response) {
            _this.$data.attendanceDetails[index].materialName=response.data.name;
            _this.$data.attendanceDetails[index].materialFile=response.data.file;
          })
        }
      },
      loadReports(){
        let _this=this;
        for(let index=0;index<this.$data.attendanceDetails.length;index++) {
          this.$axios({
            method: 'get',
            url:'/attendance/'+this.$data.attendanceDetails[index].id+'/report'
          }).then(function (response) {
            _this.$data.attendanceDetails[index].materialName=response.data.name;
            _this.$data.attendanceDetails[index].materialFile=response.data.file;
          })
        }

      },
      loadSeminarAttendance(){
        let _this=this;
        this.$axios({
          method:'get',
          url:'/attendance/'+this.$data.klassSeminarDetails.klassSeminarId
        }).then(function (response) {
          _this.$data.attendanceDetails=response.data;
          for(let index=0;index<_this.$data.attendanceDetails.length;index++){
            _this.$data.attendanceDetails[index].teamName=_this.$data.attendanceDetails[index].teamEntity.teamName;
            _this.$data.attendanceDetails[index].leaderId=_this.$data.attendanceDetails[index].teamEntity.leaderId;
            // _this.$data.attendanceDetails[index].reportScore='';
          }
          if(_this.$data.klassSeminarDetails.status===2){
            _this.loadReports();
          }else{
            _this.loadPPTMaterial();
          }
        })
      },
      changeClass(){
        let _this=this;
        this.$axios({
          method:'get',
          url:'/seminar/'+this.$data.seminarId+'/class/'+this.$data.classId
        }).then(function (response) {
          _this.klassSeminarDetails=response.data;
          _this.loadSeminarAttendance();
        })
      },
      loadAllClasses(){
        let _this=this;
        this.$axios({
          method:'get',
          url:'/seminar/'+this.$data.seminarId+'/class'
        }).then(function (response) {
          _this.$data.classList=response.data;
        })
      },
      loadRoundDetails(){
        let _this=this;
        this.$axios({
          method:'get',
          url:'/round/'+this.$data.roundId
        }).then(function (response) {
          _this.$data.roundDetails=response.data;
        })
      },
      loadSeminarDetails(){
        let _this=this;
        this.$axios({
          method:'get',
          url:'/seminar/'+this.$data.seminarId
        }).then(function (response) {
          _this.$data.seminarDetails=response.data;
          _this.$data.seminarDetails.enrollStartTime=_this.$data.seminarDetails.enrollStartTime.slice(0,10);
          _this.$data.seminarDetails.enrollEndTime=_this.$data.seminarDetails.enrollEndTime.slice(0,10);
        })
      },


    }
  }
</script>

<style scoped>

</style>
