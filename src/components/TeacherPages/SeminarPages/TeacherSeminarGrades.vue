<template>
  <div id="TeacherSeminarGrades">
    <!--<app-bar title-name="讨论课报告" back-path="/TeacherSeminar"></app-bar>-->
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
    <el-dialog :visible.sync="dialogVisible" title="修改成绩" width="80%">
      <div class="modify-message">
      <span>为{{formModifyScore.teamName}}组修改分数：</span><br/><br/>
      </div>
      <el-form :model="formModifyScore" ref="formModifyScore" :rules="rulesFormModify">
        <el-form-item prop="presentationScore" label="展示分：">
          <el-input v-model="formModifyScore.presentationScore"></el-input>
        </el-form-item>
        <el-form-item prop="questionScore" label="提问分：">
          <el-input v-model="formModifyScore.questionScore"></el-input>
        </el-form-item>
        <el-form-item prop="reportScore" label="报告分：">
          <el-input v-model="formModifyScore.reportScore"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="text" @click="confirmModify">提交</el-button>
      <el-button type="text" @click="dialogVisible=false">取消</el-button>
    </el-dialog>
    <div class="table-title">
      <span>对象模型成绩</span>
    </div>
    <div class="main-content">
      <mu-paper :z-depth="1">
        <el-table :data="tableData">
          <el-table-column label="小组名" prop="teamSerial">

          </el-table-column>
          <el-table-column label="展示" prop="presentationScore">

          </el-table-column>
          <el-table-column label="提问" prop="questionScore">

          </el-table-column>
          <el-table-column label="报告" prop="reportScore">

          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="modifyScore(scope.$index)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </mu-paper>
    </div>
    <div class="button-panel">
      <!--<el-button type="primary">确认修改</el-button><br/>-->
      <!--<el-button type="primary">确认修改</el-button>-->
    </div>
  </div>
</template>

<script>
  import AppBar from '../../ReuseComponents/AppBar'
  export default {
    name: "TeacherApplyInfo",
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
        courseId:'',
        iconClass:'back-icon-use',
        klassSeminarId:'',
        classSerial:'',
        seminarId:'',
        klassId:'',
        roundId:'',
        tableData:[
          {
            teamName:'',
            presentationScore:0,
            questionScore:0,
            reportScore:0,
            total:0,
          }
        ],
        modifyIndex:'',
        dialogVisible:false,
        formModifyScore:{

          presentationScore:0,
          questionScore:0,
          reportScore:0
        },
        rulesFormModify:{
          presentationScore:[
            {required:true,validator:checkAge,trigger:'change'}
          ],
          questionScore:[
            {required:true,validator:checkAge,trigger:'change'}
          ],
          reportScore:[
            {required:true,validator:checkAge,trigger:'change'}
          ]
        }
      }
    },
    methods:{
      linkBack(){
        this.$router.push({
          path:'/TeacherSeminar',
          query:{
            courseId:this.$data.courseId,
            classId:this.$data.classId,
            roundId:this.$data.roundId,
            seminarId:this.$data.seminarId,
          }
        })
      },
      modifyScore(index){
        this.$data.dialogVisible=true;
        this.$data.modifyIndex=index;
        this.$data.formModifyScore.presentationScore=this.$data.tableData[index].presentationScore;
        this.$data.formModifyScore.questionScore=this.$data.tableData[index].questionScore;
        this.$data.formModifyScore.reportScore=this.$data.tableData[index].reportScore;
        console.log(this.$data.formModifyScore);
      },
      confirmModify(){
        this.$refs.formModifyScore.validate((valid)=>{
          if(valid) {
            let _this=this;
            this.$axios({
              method:'put',
              url:'/seminar/'+this.$data.seminarId+'/team/'+this.$data.tableData[this.$data.modifyIndex].teamId+'/seminarscore',
              data:{
                totalScore:'',
                presentationScore:this.$data.formModifyScore.presentationScore,
                questionScore:this.$data.formModifyScore.questionScore,
                reportScore:this.$data.formModifyScore.reportScore,
              }
            }).then(function (response) {
              if(response.data===true){
                _this.$data.tableData[_this.$data.modifyIndex].questionScore=_this.$data.formModifyScore.questionScore;
                _this.$data.tableData[_this.$data.modifyIndex].reportScore=_this.$data.formModifyScore.reportScore;
                _this.$data.tableData[_this.$data.modifyIndex].presentationScore=_this.$data.formModifyScore.presentationScore;
                _this.$data.dialogVisible = false;
                _this.message({
                  type:'success',
                  message:'修改成功！'
                })
              }else{
                _this.message({
                  type:'error',
                  message:'修改成功！'
                })

              }
            })

          }
        })
      },
      loadStuScore(){
        let _this=this;
        this.$axios({
          method:'get',
          url:'/seminar/'+this.$data.seminarId+'/seminarscore',
          params:{
            classId:this.$data.klassId
          }
        }).then(function (response) {
          _this.$data.tableData=response.data;
          for(let index=0;index<_this.$data.tableData.length;index++){
            _this.$data.tableData[index].teamSerial=_this.$data.classSerial+'-'+_this.$data.tableData[index].teamEntity.teamSerial;
          }
        })
      }
    },
    created() {
      this.$data.klassId=this.$route.query.classId;
      this.$data.seminarId=this.$route.query.seminarId;
      this.$data.classSerial=this.$route.query.classSerial;
      this.$data.roundId=this.$route.query.roundId;
      this.$data.courseId=this.$route.query.courseId;
      this.$data.classId=this.$route.query.classId;


      this.loadStuScore();
    }
  }
</script>

<style lang="less">
  #TeacherSeminarGrades{
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


    .modify-message{
      text-align: left;
      font-size: 15px;
      font-weight: bold;
    }

    .el-input{
      width: 60%;
    }

    .table-title{
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


    .main-content{
      margin-top: 10px;
    }
  }
</style>
