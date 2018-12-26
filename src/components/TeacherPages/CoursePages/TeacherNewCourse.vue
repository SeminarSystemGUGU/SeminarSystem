<template>
	<div id="TeacherNewCourse">
		<app-bar titleName="新建课程" :showMessages="true" backPath="/TeacherMyCourses"></app-bar>
		<div class="main-content animated bounceInUp">
			<el-form :model="formNewCourse" ref="formNewCourse" class="new-course-form" :rules="rulesNewCourse">
				<el-form-item prop="courseName">
					<el-input class="new-course-input" ref="courseInputName" placeholder="请输入课程名" v-model="formNewCourse.courseName" ></el-input>
				</el-form-item>
				<el-form-item prop="courseDetails">
					<el-input class="new-course-input-textarea" type="textarea"  placeholder="请输入课程详情" v-model="formNewCourse.courseDetails"></el-input>
				</el-form-item>
			</el-form>
      <div class="second-form-title">
        <span>成绩计算规则：</span>
      </div>
      <el-form :model="scoreRate" ref="scoreRate" class="course-grade-form" :rules="rulesScoreRate">
        <el-form-item label="课堂展示：" class="form-item" label-width="120" prop="preRate">
          <el-select size="small" class="the-select" v-model="scoreRate.preRate">
            <el-option v-for="i in 10" :key="i" :value="i" :label="i*10+'%'"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课堂提问：" class="form-item" prop="quesRate">
          <el-select size="small" class="the-select" v-model="scoreRate.quesRate">
            <el-option v-for="i in 10" :key="i" :value="i" :label="i*10+'%'"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课后报告：" class="form-item" prop="repRate">
          <el-select size="small" class="the-select" v-model="scoreRate.repRate">
            <el-option v-for="i in 10" :key="i" :value="i" :label="i*10+'%'"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="blank-spaces"></div>
      <div class="second-form-title">
        <span>组队基本要求：</span>
      </div>
      <el-form :model="formTeamRules" ref="formTeamRules" class="team-rule-form" label-width="120px" :rules="rulesFormTeam">
        <el-form-item label="组队开始时间：" class="form-item" prop="teamStartDate">
          <el-date-picker size="middle" class="date-picker" type="datetime"  value-format="yyyy-MM-dd HH:mm:ss" v-model="formTeamRules.teamStartDate" ></el-date-picker>
        </el-form-item>
        <el-form-item label="组队截止时间：" class="form-item" prop="teamEndDate">
          <el-date-picker size="middle" class="date-picker" type="datetime"  value-format="yyyy-MM-dd HH:mm:ss" v-model="formTeamRules.teamEndDate"></el-date-picker>
        </el-form-item>
        <el-form-item label="小组人数上限：" class="form-item" prop="teamMaxNum">
          <el-input-number size="small" v-model="formTeamRules.teamMaxNum"></el-input-number>
        </el-form-item>
        <el-form-item label="小组人数下限：" class="form-item" prop="teamMinNum">
          <el-input-number size="small" v-model="formTeamRules.teamMinNum" ></el-input-number>
        </el-form-item>
      </el-form>
      <div class="blank-spaces"></div>
      <div class="second-form-title">
        <span>组内选修课程人数：</span><el-button type="primary" @click="newCourseSelect">新增</el-button>
      </div>
      <div class="tooltip1">
        <span>均满足指选课人数均需达到要求，满足其一指任意选课人数满足即可</span>
      </div>
      <el-form :model="item" v-for="item ,index in formTeamRules.teamSelectNumber" ref="formTeamRules" class="team-rule-form" label-width="140px" :key="index"
        :rules="rulesFormTeam">
        <el-form-item label="课程：" prop="courseId">
          <el-select placeholder="请选择课程" size="small" v-model="item.courseId" class="form-item">
            <el-option v-for="course,index in courseList" :key="index" :value="course.id" :label="course.courseName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="该课程人数上限：" prop="teamSelectMaxNum">
          <el-input-number size="small" v-model="item.teamSelectMaxNum"></el-input-number>
        </el-form-item>
        <el-form-item label="该课程人数下限：" prop="teamSelectMinNum">
          <el-input-number size="small" v-model="item.teamSelectMinNum"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="danger" @click="deleteCourseSelect(index)">删除该要求</el-button>
        </el-form-item>
      </el-form>
      <el-form :model="formTeamRules" ref="formTeamRules" class="team-rule-form">
        <el-form-item prop="orAnd" label="选修课人数要求：">
          <el-switch active-color="#13ce66"
                     inactive-color="#ff4949"
                     active-text="均满足"
                     inactive-text="满足其一"
                     v-model="formTeamRules.orAnd"></el-switch>
        </el-form-item>

      </el-form>
      <div class="blank-spaces"></div>
      <div class="second-form-title">
        <span>冲突课程：</span><el-button type="primary" @click="newConflictCourse">新增</el-button><br/>
      </div>
      <div class="tooltip1">
        <span>选修了不同冲突课程的学生不可同组，同课程名不同教师也为不同课程</span>
      </div>
      <el-form :model="item" v-for="item,index in formTeamRules.teamConflict" :key="index" ref="formTeamRules" label-width="100px" class="team-rule-form" :rules="rulesFormTeam">
        <el-form-item prop="courseId" label="冲突课程：" >
          <el-select size="small" class="form-item1" v-model="item.courseId">
            <el-option v-for="course in courseList" :value="course.id" :label="course.courseName"></el-option>
          </el-select>&nbsp;<el-button size="small" type="danger" @click.prevent="deleteConflictCourse(index)">删除</el-button>
        </el-form-item>
      </el-form>
      <div class="special-team-rules">
        <div class="special-team-form">

          <!--<el-button type="primary"></el-button>-->
        </div>
      </div>
      <div class="button-panel">
        <mu-button class="new-course-button" @click="newCourse">确认新建</mu-button>
      </div>
		</div>

	</div>
</template>
<script>
import AppBar from '../../ReuseComponents/AppBar'
	export default{
		name:'TeacherNewCourse',
		components:{
			AppBar
		},
		data(){
      let validateRate = (rule, value, callback) => {
        // console.log(value);
        if(this.$data.scoreRate.preRate&&this.$data.scoreRate.quesRate&&this.$data.scoreRate.repRate) {
          let a=parseInt(this.$data.scoreRate.preRate);
          let b=parseInt(this.$data.scoreRate.quesRate);
          let c=parseInt(this.$data.scoreRate.repRate);
          let total=a+b+c;
          if (total === 10) {
            callback();
          } else {
            callback(new Error('比例和要为100%'))
          }
        }else{
          callback();
        }
      };
      let validateDate=(rule, value, callback)=>{
        console.log(value);
        if(this.$data.formTeamRules.teamStartDate!==''&&this.$data.formTeamRules.teamEndDate!==''){
          if(this.$data.formTeamRules.teamStartDate<this.$data.formTeamRules.teamEndDate){
            callback();
          }else{
            callback(new Error('结束日期要晚于开始日期'));
          }
        }else{

          callback();
        }
      };
      let validateTeam=(rule,value,callback)=>{
        if(this.$data.formTeamRules.teamMaxNum<this.$data.formTeamRules.teamMinNum){
          callback(new Error('人数上限达能小于下限！'));
        }else{
          callback();
        }
      }
			return{
			  rulesFormTeam:{
			    courseId:[
            {required:true,message:'请选择课程！',trigger:'change'}
          ],
			    teamMaxNum:[
            {required:true,message:'请输入最大组队人数',trigger:'change'},
            {validator:validateTeam,trigger:'change'}
          ],
          teamMinNum:[
            {required:true,message:'请输入最小组队人数',trigger:'change'},
            {validator:validateTeam,trigger:'change'}
          ],
          teamStartDate:[
            {required:true,message:'请选择开始组队日期',trigger:'blur'},
            {validator:validateDate,trigger:'blur'}
          ],
          teamEndDate:[
            {required:true,message:'请选择结束组队日期',trigger:'blur'},
            {validator:validateDate,trigger:'blur'}
          ]
        },
			  rulesNewCourse:{
			    courseName:[
            {required:true,message:'请输入课程名',trigger:'change'},
            {max:20,message:'课程名长度不能超过20',trigger:'change'}
          ],
          courseDetails:[
            {required:true,message:'请输入课程详情',trigger:'change'}
          ],
        },
        rulesScoreRate:{
			    preRate:[
            {required:true,message:'请选择分数比例',trigger:'change'},
            {validator:validateRate,trigger:'change'}
          ],
          quesRate:[
            {required:true,message:'请选择分数比例',trigger:'change'},
            {validator:validateRate,trigger:'change'}
          ],
          repRate:[
            {required:true,message:'请选择分数比例',trigger:'change'},
            {validator:validateRate,trigger:'change'}
          ]
        },
				formNewCourse:{
          courseName:'',
          courseDetails:'',
				},
        formTeamRules:{
          teamMinNum:0,
          teamMaxNum:0,
          teamStartDate:'',
          teamEndDate:'',
          orAnd:false,
          teamSelectNumber:[
            // {
            //   courseId:'',
            //   teamSelectMinNum:0,
            //   teamSelectMaxNum:0
            // }
          ],
          teamConflict:[
            {
              courseId:'',
              name:''
            },
          ]
        },
        scoreRate:{
          preRate:'',
          quesRate:'',
          repRate:'',
        },
        courseList:[],
			}
		},
    watch:{

    },
    created(){
		  this.loadCourse();
    },
    methods:{
		  deleteConflictCourse(index){
		    this.$data.formTeamRules.teamConflict.splice(index,1);
      },
		  newConflictCourse(){
        this.$data.formTeamRules.teamConflict.push({
          courseId:''
        })
      },
		  deleteCourseSelect(index){
		    this.$data.formTeamRules.teamSelectNumber.splice(index,1);
      },
		  newCourseSelect(){
		    this.$data.formTeamRules.teamSelectNumber.push({
          courseId:'',
          teamSelectMaxNum:'',
          teamSelectMinNum:''
        })
      },

      loadCourse(){
		    let _this=this;
        this.$axios({
          method: 'get',
          url: '/course/allcourse',
          withCredentials: true,
        }).then(function (response) {
          _this.$data.courseList=response.data;
          console.log(_this.$data.courseList);
        }).catch(function (error) {

        })
      },

      /**
       * 提交课程
       */
      newCourse() {
        console.log(this.$data.formTeamRules.teamStartDate);
        let _this = this;
        let preScore = parseInt(this.$data.scoreRate.preRate);
        let quesScore = parseInt(this.$data.scoreRate.quesRate);
        let repScore = parseInt(this.$data.scoreRate.repRate);

        let form1 = false;
        let form2 = false;
        let form3 = false;

        this.$refs['scoreRate'].validate((valid) => {
          if (valid) {
            form1=true
          }
        });
        // this.$refs['formTeamRules'].validate((valid2)=>{
        //   if(valid2){
        //     form2=true
        //   }
        // })

        this.$refs['formNewCourse'].validate((valid3)=>{
          if(valid3){
            form3=true
          }
        })


        if (form1 === true && form2 === true && form3 === true) {
          this.$axios({
            method: 'post',
            url: '/course',
            withCredentials: true,
            data: {
              teacherId:'',
              courseName: this.$data.formNewCourse.courseName,
              introduction: this.$data.formNewCourse.courseDetails,
              presentationPercentage: preScore * 10,
              questionPercentage: quesScore * 10,
              reportPercentage: repScore * 10,
              teamStartTime: this.$data.formTeamRules.teamStartDate,
              teamEndTime: this.$data.formTeamRules.teamEndDate,
              maxMember: this.$data.formTeamRules.teamMaxNum,
              minMember: this.$data.formTeamRules.teamMinNum,
              courseMemberLimitStrategyList: this.$data.formTeamRules.teamSelectNumber,
              isAnd: this.$data.formTeamRules.orAnd,
              conflictCourseList:this.$data.formTeamRules.teamConflict
            }
          }).then(function (response) {
            if (response.data) {
              _this.$message({
                type:'success',
                message:'创建成功！'
              });
              _this.$router.push('/TeacherMyCourses');
            }
          }).catch(function (error) {
            _this.$message({
              type:'error',
              message:'创建失败！'
            })
          })
        }
      }
    }
	}
</script>
<style lang="less">
#TeacherNewCourse{

  .blank-spaces{
    height: 5vh;
  }

  .tooltip1{
    margin-top: 1vh;
    font-size: 12px;
    color: darkgrey;
    text-align: left;
  }


	.main-content{
		width:88%;
		max-width:500px;
		margin-left:auto;
		margin-right:auto;
		margin-top:3vh;





    .form-item1{
      text-align: left;
      margin-left: 0;
      width: 50%;
    }




    .button-panel{
      margin-top: 20px;
      margin-bottom: 60px;


      .new-course-button{
        width: 200px;
        height: 40px;
        color: white;
        background-color: dodgerblue;
        outline: none;
        border-radius: 3px;
        border: none;
        margin-left: auto;
        margin-right: auto;
      }
    }

    .team-rule-form{
      margin-top: 2vh;

      .date-picker{
        width: 180px;
      }

      .el-input__inner{
        /*width: 120px;*/
        /*margin-left: 1vw;*/
      }

      .form-item{
        text-align: center;
        width: 80%;
        margin-left: auto;
        margin-right: auto;
      }
    }

		.new-course-form{
      .el-input__inner{
        border-top:none;
        border-left: none;
        border-right: none;
        border-bottom-width: 2px;
        border-radius:0;
        font-size:18px;
        transition: all 0.5s;
      }
      .el-input__inner:focus{
        /*border-bottom: 2px solid dodgerblue;*/
      }
    }

    .course-grade-form{
      margin-top: 3vh;

      .form-item{
        text-align: center;
        width: 70%;
        margin-left: auto;
        margin-right: auto;
      }


      .the-select{
        width: 120px;
      }
    }

    .el-textarea__inner{
      font-size: 18px;
      border-top:none;
      border-left: none;
      border-right: none;
      border-bottom-width: 2px;
      transition: all 0.5s;
      border-radius: 0;
    }

    .el-textarea__inner:focus{
      /*border-bottom: 2px solid dodgerblue;*/
    }
		.el-input::-webkit-input-placeholder {

    		color:gray;
		}
		.input:-moz-placeholder {
    		font-size:20px;
		}
		.input:-ms-input-placeholder {
    		color: red;
		}

    .second-form-title{
      margin-top: 2vh;
      text-align: left;
      font-size: 20px;
      font-weight: bold;
    }


	}
}
</style>
