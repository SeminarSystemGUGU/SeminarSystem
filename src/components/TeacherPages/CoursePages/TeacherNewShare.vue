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
						<el-select v-model="formNewShare.type">
							<el-option label="共享讨论课" :value="1"></el-option>
              <el-option label="共享分组" :value="2"></el-option>
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
						<el-select multiple v-model="formNewShare.shareCourses">
							<el-option v-for="item in options" :label="item.courseName" :value="item.id" :key="item.id"></el-option>
						</el-select>
						</span>
					</el-col>
				</el-row>
			</div>

			<!--<div class="divider"></div>-->

		</div>
    <div class="button-panel">
      <el-button class="confirm-button" type="primary" @click="confirmShare">确认共享</el-button>
    </div>
	</div>
</template>
<script>
import AppBar from '../../ReuseComponents/AppBar'
	export default{
		name:'TeacherNewShare',
		components:{
			AppBar
		},
    data(){
		  return{
		    formNewShare:{
          type:1,
          shareCourses:[],
        },
        options:[

        ],
		    courseId:''
      }
    },
		methods:{
			confirmShare(){
        console.log(this.$data.formNewShare);
        let _this=this;
        this.$axios({
          method:'post',
          url:'/course/'+this.$data.courseId+'/application',
          data:{
            subCourseId:this.$data.formNewShare.shareCourses,
            type:this.$data.formNewShare.type
          }
        }).then(function (response) {
          _this.$message({
            type:'success',
            message:'成功发送申请！'
          });
        }).catch(function (error) {
          _this.$message({
            type:'error',
            message:'该共享已经实现！'
          })
        })
			}
		},
    created() {
      this.$data.courseId=this.$route.query.courseId;
      let _this=this;
      this.$axios({
        method:'get',
        url:'/course/allcourse'
      }).then(function (response) {
        _this.$data.options=response.data;
        console.log(_this.$data.options);
      })
    }
  }
</script>
<style lang="less">
	#TeacherNewShare{

    .confirm-button{
      width: 100vw;
    }

    .el-select__tags {
      max-width: 150px!important;
      overflow: scroll;
      white-space: nowrap;
    }


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



			.another{
				text-align:center;
			}
		}
    .button-panel{
      width: 100%;
      position: fixed;
      bottom: 0;
      margin-left: 0;
      /*padding: 0;*/
      text-align:right;
    }
	}
</style>
