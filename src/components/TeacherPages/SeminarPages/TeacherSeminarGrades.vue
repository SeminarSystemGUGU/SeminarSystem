<template>
  <div id="TeacherSeminarGrades">
    <app-bar title-name="讨论课报告" back-path="/TeacherSeminar"></app-bar>
    <el-dialog :visible.sync="dialogVisible" title="修改成绩" width="80%">
      <div class="modify-message">
      <span>为{{formModifyScore.teamName}}组修改分数：</span><br/><br/>
      </div>
      <el-form :model="formModifyScore" ref="formModifyScore" :rules="rulesFormModify">
        <el-form-item prop="preScore" label="展示分：">
          <el-input v-model="formModifyScore.preScore"></el-input>
        </el-form-item>
        <el-form-item prop="quesScore" label="提问分：">
          <el-input v-model="formModifyScore.quesScore"></el-input>
        </el-form-item>
        <el-form-item prop="repScore" label="报告分：">
          <el-input v-model="formModifyScore.repScore"></el-input>
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
          <el-table-column label="小组名" prop="teamName">

          </el-table-column>
          <el-table-column label="展示" prop="preScore">

          </el-table-column>
          <el-table-column label="提问" prop="quesScore">

          </el-table-column>
          <el-table-column label="报告" prop="repScore">

          </el-table-column>
          <el-table-column label="总分" prop="total">

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
      <el-button type="primary">确认</el-button><br/>
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
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('分数不能为空'));
        } else {
          const pattern=/^[1-9]+[0-9]*]*$/;
          if(!pattern.test(value)){
            callback(new Error('请输入数字！'))
          }else{
            callback();
          }
        }

      };
      return{
        tableData:[
          {
            teamName:'咕咕鸟',
            preScore:5,
            quesScore:5,
            repScore:5,
            total:5,
          }
        ],
        modifyIndex:'',
        dialogVisible:false,
        formModifyScore:{
          teamName:'',
          preScore:0,
          quesScore:0,
          repScore:0
        },
        rulesFormModify:{
          preScore:[
            {required:true,validator:checkAge,message:'请输入正确的成绩',trigger:'change'}
          ],
          quesScore:[
            {required:true,validator:checkAge,message:'请输入正确的成绩',trigger:'change'}
          ],
          repScore:[
            {required:true,validator:checkAge,message:'请输入正确的成绩',trigger:'change'}
          ]
        }
      }
    },
    methods:{
      modifyScore(index){
        this.$data.dialogVisible=true;
        this.$data.modifyIndex=index;
        this.$data.formModifyScore.teamName=this.$data.tableData[index].teamName;
        this.$data.formModifyScore.preScore=this.$data.tableData[index].preScore;
        this.$data.formModifyScore.quesScore=this.$data.tableData[index].quesScore;
        this.$data.formModifyScore.repScore=this.$data.tableData[index].repScore;
      },
      confirmModify(){
        this.$refs.formModifyScore.validate((valid)=>{
          if(valid) {
            this.$data.tableData.splice(this.$data.modifyIndex, 1, this.$data.formModifyScore);
            this.$data.dialogVisible = false;
          }
        })

      }
    }
  }
</script>

<style lang="less">
  #TeacherSeminarGrades{
    padding: 1px;

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
