<template>
  <div id="TeacherCourseGrades">
    <app-bar titleName="学生成绩" :showMessages="true" backPath="/TeacherMyCourses"></app-bar>
    <mu-dialog title="修改小组分数" width="360" :open.sync="openModGrade">
      <div>
        <span>正在为小组修改分数：</span>
      </div>
      <el-form :model="formModGrade" ref="formModGrade" label-width="120px;" style="margin-top: 10px;" :rules="rulesFormModify">
        <el-form-item prop="preGrade" label="展示分数：">
          <el-input class="grade-input" v-model="formModGrade.preGrade" style="width: 50%"  placeholder="请输入展示分数"></el-input>
        </el-form-item>
        <el-form-item prop="queGrade" label="提问分数：">
          <el-input class="grade-input" v-model="formModGrade.queGrade" style="width: 50%"  placeholder="请输入提问分数"></el-input>
        </el-form-item>
        <el-form-item prop="repGrade" label="报告分数：">
          <el-input class="grade-input" v-model="formModGrade.repGrade" style="width: 50%" placeholder="请输入报告分数"></el-input>
        </el-form-item>
      </el-form>
      <mu-button slot="actions" flat color="primary" @click="confirmModify">确认修改</mu-button>
      <mu-button slot="actions" flat color="primary" @click="openModGrade=false">放弃</mu-button>
    </mu-dialog>
    <div class="main-content" v-loading="isLoading">
      <span class="no-item-message" v-show="noItem">当前暂无小组分数哦~</span>
      <mu-expansion-panel v-for="item1 in groupGrades" :key="item1.roundId" v-show="!noItem">
        <div slot="header" class="panel-header">第{{item1.roundSerial}}轮</div>
        <div class="divider"></div>
        <el-collapse v-model="activeNames" v-loading="item1.teamLoading">
          <el-collapse-item :name="index" v-for="(item,index) in item1.grades.teamScoreInRoundEntities" :key="index">
            <template slot="title">
              <div class="group-grades">
                <div class="left-grades">{{item.teamEntity.teamName}}</div>
                <span class="right-grades">总分：{{item.roundScoreEntity.totalScore}}</span>
              </div>
            </template>
            <!--<div class="divider"></div>-->
            <div class="group-seminar-grades" v-for="(it,i) in item.seminarScoreEntities" :key="i">
              <div class="seminar-name">
                <span>{{it.seminarEntity.seminarName}}</span>
              </div>
              <div class="seminar-grades">
                <el-row>
                  <el-col class="row-col">
                    <span>展示：</span><span class="grade-mark">{{it.presentationScore}}</span>
                  </el-col>
                  <el-col class="row-col">
                    <span>提问：</span><span class="grade-mark">{{it.questionScore}}</span>
                  </el-col>
                  <el-col class="row-col">
                    <span>报告：</span><span class="grade-mark">{{it.reportScore}}</span>
                  </el-col>
                </el-row>
                <div class="modify-button-panel">
                  <el-button type="primary" size="small" @click="modifyGrade(it,index,i,item)">修改成绩</el-button>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>

      </mu-expansion-panel>
    </div>
    <div style="height: 8vh"></div>
    <!--<div class="footer-new-course">-->
      <!--<mu-button class="new-course-button" color="info"><i class="el-icon-plus"/>新建课程</mu-button>-->
    <!--</div>-->
  </div>
</template>

<script>
  import AppBar from '../../ReuseComponents/AppBar'
  export default {
    name: "TeahcerMyCourses",
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
        isLoading:true,
        noItem:false,
        courseId:'',
        openModGrade:false,
        rulesFormModify:{
          preGrade:[
            {required:true,validator:checkAge,message:'请输入正确的成绩',trigger:'change'},
          ],
          repGrade:[
            {required:true,validator:checkAge,message:'请输入正确的成绩',trigger:'change'},
          ],
          queGrade:[
            {required:true,validator:checkAge,message:'请输入正确的成绩',trigger:'change'},
          ]
        },
        formModGrade:{

          preGrade:0,
          repGrade:0,
          queGrade:0,
        },
        seminarId:'',
        teamId:'',
        modifyIndex:'',
        modifyIndexInner:'',
        rounds:[],
        formTempGrade:{},
        activeNames:'1',
        groupGrades:[
          // {
          //   groupName:'小鸟 ',
          //   groupRoundScore:4,
          //   grades:[
          //     {
          //       index:0,
          //       seminarName:'用例分析',
          //       preGrade:4,
          //       queGrade:4,
          //       repGrade:4
          //     },
          //     {
          //       index:1,
          //       seminarName:'界面分析',
          //       preGrade:4,
          //       queGrade:4,
          //       repGrade:4
          //     }
          //   ]
          // }
        ],
        teams:[

        ]

      }
    },
    created(){
      this.$data.courseId=this.$route.query.courseId;
      this.loadCourseGrades();

    },
    methods:{
      confirmModify(){
        this.$refs.formModGrade.validate((valid)=>{
          if(valid){
            let _this=this;
            this.$axios({
              method:'put',
              url:'/seminar/'+this.$data.seminarId+'/team/'+this.$data.teamId+'/seminarscore',
              data:{
                totalScore:'',
                presentationScore:this.$data.formModGrade.preGrade,
                questionScore:this.$data.formModGrade.queGrade,
                reportScore:this.$data.formModGrade.repGrade
              }
            }).then(function (response) {
              _this.$message({
                type:'success',
                message:'修改成功！'
              })
              if(response.data===true){
                _this.$data.groupGrades[parseInt(_this.$data.activeNames)-1].grades.teamScoreInRoundEntities[_this.$data.modifyIndex].
                  seminarScoreEntities[_this.$data.modifyIndexInner].presentationScore=_this.$data.formModGrade.preGrade;
                _this.$data.groupGrades[parseInt(_this.$data.activeNames)-1].grades.teamScoreInRoundEntities[_this.$data.modifyIndex].
                  seminarScoreEntities[_this.$data.modifyIndexInner].questionScore=_this.$data.formModGrade.queGrade;
                _this.$data.groupGrades[parseInt(_this.$data.activeNames)-1].grades.teamScoreInRoundEntities[_this.$data.modifyIndex].
                  seminarScoreEntities[_this.$data.modifyIndexInner].reportScore=_this.$data.formModGrade.repGrade;
                _this.$data.openModGrade=false;
                _this.$data.openModGrade=false;
              }
            }).catch(function (error) {

            })
          }
        })
      },
      modifyGrade(it,index,i,item){
        console.log(it);
        this.$data.teamId=item.teamEntity.id;
        this.$data.seminarId=it.seminarEntity.id;
        this.$data.modifyIndex=index;
        this.$data.modifyIndexInner=i;
        this.$data.formModGrade.preGrade=it.presentationScore;
        this.$data.formModGrade.queGrade=it.questionScore;
        this.$data.formModGrade.repGrade=it.reportScore;
        console.log(this.$data.formModGrade);
        // this.$data.formModGrade.seminarName=it.seminarName;

        this.$data.openModGrade=true;
      },
      linkToGrades(item){
        this.$router.push('/TeacherMyCourses');
      },

      loadCourseGrades(){
        let _this=this;
        this.$axios({
          method:'get',
          url:'/course/'+this.$data.courseId+'/round'
        }).then(function (response) {
          if(response.data.length===0){
            _this.$data.noItem=true;
          }else{
            for(let index=0;index<response.data.length;index++){
              _this.$data.groupGrades.push({
                roundId:response.data[index].id,
                courseId:response.data[index].courseId,
                roundSerial:response.data[index].roundSerial,
                grades:[],
                teamLoading:true,
              })
            }
            console.log(_this.$data.groupGrades);
            _this.loadGroupRoundGrades();
          }
          _this.$data.isLoading=false;
        })
      },
      loadGroupRoundGrades(){
        let _this=this;
        for(let index=0;index<this.$data.groupGrades.length;index++){
            this.$axios({
              method:'get',
              url:'/course/'+this.$data.courseId+'/round/'+this.$data.groupGrades[index].roundId
            }).then(function (response) {
              _this.$data.groupGrades[index].grades=response.data;
              _this.$data.groupGrades[index].teamLoading=false;
            })

        }
      }
    }
  }
</script>

<style scoped lang="less">
  #TeacherCourseGrades{
    width: 100vw;


    .no-item-message{
      font-size: 18px;
      font-weight: bold;
    }


   .grade-input{
     width: 50%;
   }


    .modify-button-panel{
      margin-top: 1.5vh;
    }

    .divider{
      margin-top: 1.5vh;
      width: 100%;
      height: 3px;
      background-color: lightgray;
    }


    .title{
      margin-top: 20px;
      text-align: left;
      font-size: 20px;
      margin-left: 25px;
      font-weight: bold;
    }

    .divider{
      width:100%;
      height: 2px;
      background-color: whitesmoke
    }

    .main-content{
      margin-top: 3vh;
      .panel-header{
        font-size: 20px;
      }

      .group-seminar-grades{
        margin-top: 1.5vh;
        .seminar-name{
          font-size: 16px;
          font-weight: bold;
        }
        .seminar-grades{
          margin-top: 3vh;
          .row-col{
            width: 30%;
            font-size: 16px;
            .grade-mark{
              color: dodgerblue;
              font-weight: bold;
            }
          }

        }
      }

      .group-grades{
        width: 80%;
        margin-left: 0;
        font-size: 18px;

        .left-grades{
          text-align: left;
          width: 60%;
          overflow-x: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          float: left;
          margin-left: 5%
        }

        .right-grades{
          float: right;
        }
      }

      .table-item{
        height: 8vh;
        line-height: 8vh;
        font-size: 20px;
        text-align: left;

        .item-title{
          margin-left: 6vw;
        }
        .item-arrow{
          float: right;
        }
      }
    }
    .footer-new-course{
      position: fixed;
      width:100vw;
      height: 7vh;
      bottom: 0;
      background-color: dodgerblue;

      .new-course-button{
        width: 100%;
        height: 7vh;
        font-size: 20px;

      }
    }
  }
</style>
