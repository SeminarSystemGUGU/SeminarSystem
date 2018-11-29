<template>
	<div id="TeacherNewCourse">
		<app-bar titleName="新建课程" :showMessages="true"></app-bar>
		<div class="main-content">
			<el-form :model="formNewCourse" ref="formNewCourse" class="new-course-form">
				<el-form-item>
					<el-input class="new-course-input" placeholder="请输入课程名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input class="new-course-input-textarea" type="textarea"  placeholder="请输入课程详情"></el-input>
				</el-form-item>
			</el-form>
      <div class="second-form-title">
        <span>成绩计算规则：</span>
      </div>
      <el-form :model="formNewCourse" ref="formNewCourse" class="course-grade-form">
        <el-form-item label="课堂展示：" class="form-item" label-width="120">
          <el-select size="small" class="the-select">
            <el-option v-for="i in 10" :key="i" :value="i*10+'%'"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课堂提问：" class="form-item">
          <el-select size="small" class="the-select">
            <el-option v-for="i in 10" :key="i" :value="i*10+'%'"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课后报告：" class="form-item">
          <el-select size="small" class="the-select">
            <el-option v-for="i in 10" :key="i" :value="i*10+'%'"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="second-form-title">
        <span>小组分组规则：</span>
      </div>
      <el-form :model="formNewCourse" ref="formNewCourse" class="team-rule-form" label-width="120px">
        <el-form-item label="小组人数上限：" class="form-item">
          <el-input-number size="small"></el-input-number>
        </el-form-item>
        <el-form-item label="小组人数下限：" class="form-item">
          <el-input-number size="small"></el-input-number>
        </el-form-item>
        <el-form-item label="组队开始时间：" class="form-item">
          <el-date-picker size="small"></el-date-picker>
        </el-form-item>
        <el-form-item label="组队截止时间：" class="form-item">
          <el-date-picker size="small"></el-date-picker>
        </el-form-item>
      </el-form>
      <div class="button-panel">
        <button class="new-course-button">提交</button>
      </div>
		</div>
	</div>
</template>
<script>
import AppBar from '../ReuseComponents/AppBar'
	export default{
		name:'TeacherNewCourse',
		components:{
			AppBar
		},
		data(){
			return{
				formNewCourse:{

				}
			}
		}
	}
</script>
<style lang="less">
#TeacherNewCourse{
	.main-content{
		width:88%;
		max-width:500px;
		margin-left:auto;
		margin-right:auto;
		margin-top:3vh;


    .button-panel{
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

      .el-input__inner{
        width: 120px;
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
        border:none;
        border-bottom:2px solid whitesmoke;
        border-radius:0;
        font-size:18px;
        transition: all 0.5s;
      }
      .el-input__inner:focus{
        border-bottom: 2px solid dodgerblue;

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
      border: none;
      border-bottom: 2px solid whitesmoke;
      transition: all 0.5s;
      border-radius: 0;
    }

    .el-textarea__inner:focus{
      border-bottom: 2px solid dodgerblue;
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
