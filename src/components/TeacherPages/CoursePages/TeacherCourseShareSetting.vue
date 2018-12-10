<template>
	<div id="TeacherCourseShareSetting">
		<app-bar titleName="OOAD-共享设置" :showMessages="true" backPath="/TeacherMyCourses"></app-bar>
		<div class="main-content">
			<el-card class="course-share-card" v-for="(course,index) in shareCourse" :key="index">
				<template slot="header">
					<span class="share-course-title">{{course.courseName}}</span>
					<span class="share-course-teacher">{{course.teacherName}}</span>
				</template>
				<div class="course-share-card-content">
					<el-row class="content-row">
						<el-col class="row-col">
							<span class="col-title">共享类型：</span>
						</el-col>
						<el-col class="row-col">
							<span class="col-content">{{course.shareType}}</span>
						</el-col>
					</el-row>
					<el-row class="content-row">
						<el-col class="row-col">
							<span class="col-title">共享情况：</span>
						</el-col>
						<el-col class="row-col">
							<span class="col-content">{{course.shareStatus}}</span>
						</el-col>
					</el-row>
				</div>
				<div class="card-button-panel">
					<el-button type="primary">取消共享</el-button>
				</div>
			</el-card>
		</div>
		<div class="new-share-button-panel">
			<mu-button class="the-button" color="primary" @click="linkNewShare">新建共享</mu-button>
		</div>
	</div>
</template>
<script>
import AppBar from '../../ReuseComponents/AppBar'
	export default{
		name:'TeacherCourseShareSetting',
		components:{
			AppBar
		},
    created(){
		  this.loadCourseShareInfo();
    },
    data(){
		  return{
        shareCourse:[
          {
            courseName:'',
            teacherName:'',
            shareType:'',
            shareStatus:'',
          }
        ]
      }
    },
		methods:{
			linkNewShare(){
				this.$router.push('/TeacherNewShare');
			},
      //获取共享信息
      loadCourseShareInfo(){
        let _this=this;
        _this.$axios({
          method:'get',
          url:'/course/1/shareCourse',
        }).then(function (response) {
          console.log(response.data);
          _this.$data.shareCourse=[];//先清空静态数据
          let responseData=response.data;
          for(var i=0;i<responseData.length;i++){
            _this.$data.shareCourse.push({
              courseName:responseData[i].courseName,
              teacherName:responseData[i].teacherName,
              shareType:responseData[i].shareType,
              shareStatus:(responseData[i].shareSituation.toString()==="1")?"主课程":"从课程",
            })
          }
        }).catch(function (error) {
          console.log(error.response.data);
        });
      }
		}
	}
</script>
<style lang="less">
#TeacherCourseShareSetting{
	width:100vw;

	.new-share-button-panel{
		position:fixed;
		width:100vw;
		bottom:0;

		.the-button{
			width:100%;
			height:7vh;
		}
	}

	.card-button-panel{
		margin-top:3vh;
		width:30%;
		float:right;
		height:10vh;


	}

	.main-content{
		margin-top:2vh;
		width:88%;
		margin-left:auto;
		margin-right:auto;

		.course-share-card{
      margin-top: 1.3vh;
			text-align:left;
			.share-course-title{
				font-size:20px;
				font-weight:bold;
			}
			.share-course-teacher{
				float:right;
				font-size:20px;
				color:#708090;
			}

			.course-share-card-content{
				/*margin-top: 1.5vh;*/
        width:100%;

				.content-row{
					margin-top:2vh;
				}

				.row-col{
					width:50%;
					.col-title{
						float:left;
						font-size:17px;
						color:dodgerblue
					}
					.col-content{
						font-size:17px;

					}
				}

			}
		}



	}
}

</style>
