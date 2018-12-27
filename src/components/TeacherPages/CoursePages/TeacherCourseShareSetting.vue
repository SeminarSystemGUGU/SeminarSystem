<template>
	<div id="TeacherCourseShareSetting">
		<app-bar titleName="OOAD-共享设置" :showMessages="true" backPath="/TeacherMyCourses"></app-bar>
		<div class="main-content" v-loading="isLoading">
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
					<el-button type="primary" @click="cancelShare(course)">取消共享</el-button>
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

    data(){
		  return{
        shareCourse:[
          {
            shareId:'',
            courseName:'',
            teacherName:'',
            shareType:'',
            shareStatus:'',
          }
        ],
        courseId:'',
        isLoading:true
      }
    },
    created(){
		  this.$data.courseId=this.$route.query.courseId;
		  console.log(this.$data.courseId);
		  this.loadCourseShareInfo();
    },
		methods:{
			linkNewShare(){
				this.$router.push({path:'/TeacherNewShare',query:{courseId:this.$data.courseId}});
			},
      //获取共享信息
      loadCourseShareInfo(){
        let _this=this;
        _this.$axios({
          method:'get',
          url:'/course/'+this.$data.courseId+'/share',
        }).then(function (response) {
          let resData=response.data;
          _this.$data.shareCourse=[];
          for(var i=0;i<resData.length;i++){
            _this.$data.shareCourse.push({
              shareId:resData[i].shareId,
              courseName:resData[i].courseName,
              teacherName:'',
              shareType:resData[i].shareType,
              shareStatus:resData[i].isMain,
            });
          }
          _this.$data.isLoading=false;
        })
      },

      //取消共享
      cancelShare(course){
        let _this=this;
        var type;
        if(course.shareType.toString()==="共享讨论课"){
          type=1;
        }
        else{
          type=0;
        }
        _this.$axios({
          method:'delete',
          url:'/course/'+this.$data.courseId+'/share/'+parseInt(course.shareId),
          params:{
            type:type
          }
        }).then(function (response) {
          console.log(response.data);
        })
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
