<template>
	<div id="TeacherCourseRounds">
		<app-bar titleName="OOAD-讨论课" :showMessages="true" backPath="/TeacherMyCourses"></app-bar>
		<div class="main-content">
			<mu-expansion-panel>
    			<div slot="header" class="panel-title">第一轮</div>
    			<div class="setting">
    				<span class="setting-panel"><i class="el-icon-setting"></i>&nbsp;讨论课轮次设置</span>
    				<span class="setting-icon"><i class="el-icon-arrow-right"></i></span>
    			</div>
    			<!-- <div class="divider"></div> -->
    			<div class="round-class">
					<el-collapse accordion>
  						<el-collapse-item>
  							<!--讨论课名称-->
    						<template slot="title">
      							<span class="seminar-title">业务流程分析</span>
    						</template>
    						<div class="divider"></div>
    						<!--班级信息-->
    						<div class="class-panel">
    							<span class="class-title">2016级1班</span>
    							<span class="class-icon"><i class="el-icon-arrow-right"/></span>
    						</div>
    						<div class="divider"></div>
  						</el-collapse-item>
					</el-collapse>
    			</div>
    		</mu-expansion-panel>
  		</div>
	</div>
</template>

<script>
import AppBar from '../../components/ReuseComponents/AppBar'
    export default {
        name: "TeacherCourseRounds",
        components:{
        	AppBar
        }
    }
</script>

<style scoped  lang="less">
#TeacherCourseRounds{
	width:100vw;
	padding:1px;

	.main-content{

		.divider{
			margin-top:1vh;
			width:100%;
			height:2px;
			/*background-color:lightgray;*/
		}

		margin-top:3vw;
		.panel-title{
			font-size:20px;
		}

		.setting{
			text-align:left;
			font-size:18px;
			font-weight:bold;

			.setting-panel{

			}

			.setting-icon{
				float:right;
			}
		}

		.round-class{
			margin-top:1vh;
			text-align:left;

			.seminar-title{
				font-size:18px;
				margin-left:3vw;
			}

			.class-panel{
				margin-top:1.4vh;
			}
			.class-title{
				font-size:18px;
				margin-left:4vw;
			}
			.class-icon{
				float:right;
			}
		}


	}


}
</style>
