<template>
    <div id="TeacherAfterSeminar">
      <!--<app-bar title-name="OOAD-讨论课报告" back-path="/TeacherSeminar"></app-bar>-->
      <div class="app-bar">
        <div :class="iconClass" ref="iconUse">
          <i class="el-icon-back" @click="linkBack"></i>
          <transition name="slide-fade" class="transition-box">
            <span class="title">讨论课</span>
          </transition>
          <span>&nbsp;&nbsp;</span>
        </div>
      </div>
      <div class="app-bar-blank"></div>
      <el-dialog :visible.sync="dialogVisible" width="60%" :modal="false">
        <span>为{{modifyName}}小组打分</span>
        <el-form :model="formModifyScore" :rules="rulesFormModify">
          <el-form-item prop="reportScore" label="展示分数">
            <el-input v-model="formModifyScore.reportScore"></el-input>
          </el-form-item>
          <el-button type="text" @click="useModify">确定</el-button>
          <el-button type="text" @click="dialogVisible=false;">放弃</el-button>
        </el-form>
      </el-dialog>
      <div class="main-content">
        <div class="seminar-title">
          <span>{{seminarName}}课后报告</span>
        </div>
        <div class="table-data">
          <el-table :data="reports">
            <el-table-column prop="teamSerial" label="小组序号">
            </el-table-column>
            <el-table-column prop="file" label="课后报告">
            </el-table-column>
            <el-table-column label="分数">
              <template slot-scope="scope">
                <span v-if="reports[scope.$index].score">{{reports[scope.$index].score}}</span>
                <span v-else>未打分</span>
                <el-button type="text"  @click="modifyScore(scope.$index)">打分</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
</template>

<script>
  import AppBar from '../../ReuseComponents/AppBar'
    export default {
        name: "TeacherAfterSeminar",
      components:{
          AppBar
      },
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
            iconClass:'back-icon-use',
            courseId:'',
            classId:'',
            seminarId:'',
            roundId:'',
            seminarName:'',
            classSerial:'',
            klassSeminarId:'',
            dialogVisible:false,
            formModifyScore:{
              reportScore:''
            },
            rulesFormModify:{
              reportScore:[
                {required:true,validator:checkAge,trigger:'change'}
              ]
            },
            modifyName:'',
            modifyIndex:'',
            reports:[
              // {
              //   groupName:'咕咕鸟',
              //   afterReport:'dwdwdw',
              //   reportGrade:'5'
              // },
              // {
              //   groupName:'咕咕鸟',
              //   afterReport:'dwdwdw',
              //   reportGrade:'5'
              // }
            ]
          }
      },
      created() {
          this.$data.seminarName=this.$route.query.seminarName;
          this.$data.roundId=this.$route.query.roundId;
          this.$data.courseId=this.$route.query.courseId;
          this.$data.klassSeminarId=this.$route.query.klassSeminarId;
          this.$data.classId=this.$route.query.classId;
          this.$data.seminarId=this.$route.query.seminarId;
          this.$data.classSerial=this.$route.query.classSerial;
          // this.loadAttendance();
          this.loadRoundTeams();
          // this.loadSeminarRepot();
      },
      methods:{
        useModify(){
          let _this=this;
          this.$axios({
            method:'put',
            url:'/course/'+this.$data.courseId+'/round/'+this.$data.roundId+'/team/'+this.$data.reports[this.$data.modifyIndex].teamEntity.id+'/klassSeminar/'+
              this.$data.klassSeminarId+'/report',
            params:{
              score:this.$data.formModifyScore.reportScore
            }
          }).then(function (response) {
            _this.$message({
              type:'success',
              message:'修改成功！'
            })
            _this.$data.reports[_this.$data.modifyIndex].score= _this.$data.formModifyScore.reportScore;
            _this.$data.dialogVisible=false;
          })

        },

        modifyScore(index){
          this.$data.modifyIndex=index;
          this.$data.formModifyScore.reportScore=this.$data.reports[this.$data.modifyIndex].score;
          this.$data.modifyName=this.$data.reports[this.$data.modifyIndex].teamSerial;
          this.$data.dialogVisible=true;
        },

        linkBack(){
          this.$router.push({path:'/TeacherSeminar',query:{klassSeminarId:this.$data.klassSeminarId,roundId:this.$data.roundId,
            courseId:this.$data.courseId,
            classId:this.$data.classId,
            seminarId:this.$data.seminarId,
            classSerial:this.$data.classSerial}})
        },
        loadAttendance(){
          let _this=this;
          this.$axios({
            method:'get',
            url:'/attendance/'+this.$data.klassSeminarId
          }).then(function (response) {

          })
        },
        loadRoundTeams(){
          let _this=this;
          this.$axios({
            method:'get',
            url:'/attendance/'+this.$data.klassSeminarId
          }).then(function (response) {
            // _this.$data.reports.splice(0,_this.$data.reports.length);
            _this.$data.reports=response.data;
            for(let index=0;index<_this.$data.reports.length;index++){
              _this.$data.reports[index].teamSerial=_this.$data.reports[index].teamEntity.klassSerial+'-'+_this.$data.reports[index].teamEntity.teamSerial;
              // _this.$data.reports[index].reportScore=_this.$data.reports[index].score;
            }
            _this.loadSeminarReport();
          })
        },
        loadSeminarReport(){
          for(let index=0;index<this.$data.reports.length;index++) {
            let _this = this;
            this.$axios({
              method: 'get',
              url: '/attendance/' + this.$data.reports[index].id + '/report'
            }).then(function (response) {
              _this.$data.reports[index].file=response.data.file;
              _this.$data.reports[index].path=response.data.path;
              // _this.$data.reports[index].reportScore=2;
              // _this.$data.reports[index].reportScore='';
            })
          }
          console.log(this.$data.reports);
        }
      }
    }
</script>

<style lang="less">
#TeacherAfterSeminar{
  padding: 1px;


  .app-bar-blank{
    height: 10vh;
    max-height: 60px;
  }


  .app-bar {
    padding: 0.1px;
    height: 10vh;
    max-height: 60px;
    position: fixed;
    z-index: 1000;
    .back-icon-use{
      border-bottom-right-radius: 20px;
      -moz-box-shadow:0px 0px 2px whitesmoke;
      -webkit-box-shadow:0px 0px 2px whitesmoke;
      box-shadow:0px 0px 2px whitesmoke;
      z-index: 1000;
      /*width: 40vw;*/
      /*height: 10vh;*/
      /*max-height: 60px;*/
      background-color: white;
      color: dodgerblue;
      padding-left: 4vw;
      font-size: 25px;
      padding-top: 1vh;
      line-height: 25px;
      padding-bottom:5px;

      .title{
        color: black;
        font-size: 20px;
        font-weight: bold;
        /*line-height: 25px;*/
      }
    }



    .back-icon {
      z-index: 1000;
      /*width: 40vw;*/
      /*height: 10vh;*/
      /*max-height: 60px;*/
      background-color: white;
      color: dodgerblue;
      padding-left: 4vw;
      font-size: 25px;
      padding-top: 1vh;
      line-height: 25px;
      padding-bottom:5px;


      .title{
        color: black;
        font-size: 20px;
        font-weight: bold;
        /*line-height: 25px;*/
      }
    }
  }



  .seminar-title{
    margin-top: 10px;
    text-align: left;
    font-size: 25px;
    margin-left: 4vw;
    /*color: dodgerblue;*/
    /*font-weight: bold;*/
  }

  .button-panel{
    margin-top: 3vh;
    width: 80%;
    margin-left: auto;
    margin-right: auto;

    .el-button{
      margin-top: 1vh;
      width: 100%;
    }
  }


}
</style>
