<template>
	<div id="TeacherNewCourse">
		<app-bar titleName="新建课程" :showMessages="true"></app-bar>
		<div class="main-content">
			<el-form :model="formNewCourse" ref="formNewCourse" class="new-course-form">
				<el-form-item>
					<el-input class="new-course-input" placeholder="请输入课程名"></el-input>
				</el-form-item>
			</el-form>
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

		.el-input__inner{
			border:none;
			border-bottom:1px solid whitesmoke;
			border-radius:0;
			font-size:18px;
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

		
	}		
}
</style>