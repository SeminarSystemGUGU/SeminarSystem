<template>
	<div id="TeacherNewShare">
		<app-bar titleName="新建共享" :showMessages="false" backPath="/TeacherCourseShareSetting"></app-bar>
		<div class="main-content">
			<div class="col-content">
				<el-row>
					<el-col class="row-col">
						<span class="content-title">
							共享类型：
						</span>
					</el-col>
					<el-col class="row-col">
						<span class="content-input">
						<el-select>
							<el-option label="共享讨论课" value="共享讨论课"></el-option>
						</el-select>
						</span>
					</el-col>
				</el-row>
			</div>
			<div class="divider"></div>
			<div class="col-content">
				<el-row>
					<el-col class="row-col">
						<span class="content-title">
							共享对象：
						</span>
					</el-col>
					<el-col class="row-col">
						<span class="content-input">
						<el-select>
							<el-option label="共享讨论课" value="共享讨论课"></el-option>
						</el-select>
						</span>
					</el-col>
				</el-row>
			</div>
			
			<div class="col-content">
				<el-row>
					<el-col class="row-col">
						<span class="content-title">
							冲突课程：
						</span>
					</el-col>
					<el-col class="row-col">
						<span class="content-input">
						<el-select>
							<el-option label="共享讨论课" value="共享讨论课"></el-option>
						</el-select>
						</span>
					</el-col>
				</el-row>
			</div>
			<div class="button-panel">
				<el-button type="primary">新增共享对象</el-button>
			</div>
			<div class="divider"></div>
			<div class="button-panel another">
				<el-button type="primary" @click="confirm">确定提交</el-button>
			</div>
		</div>
	</div>
</template>
<script>
import AppBar from '../../components/ReuseComponents/AppBar'
	export default{
		name:'TeacherNewShare',
		components:{
			AppBar
		},
		methods:{
			confirm(){
				
			}
		}
	}
</script>
<style lang="less">
	#TeacherNewShare{
		.divider{
			margin-top:2vh;
			width:100%;
			height:1px;
			background-color:lightgray;
		}
		.main-content{
			margin-top:2vh;
			width:88%;
			margin-left:auto;
			margin-right:auto;

			.col-content{
				width:100%;
				margin-top:3vh;

				.content-title{
					float:left;
					font-size:18px;
					line-height:40px;

				}

			}

			.row-col{
				width:50%;
				height:40px;;
				line-height:40px;
			}

			.button-panel{
				margin-top:3vh;
				text-align:right;
			}

			.another{
				text-align:center;
			}
		}
	}
</style>