<template>
	<div id="TeacherNewShare">
		<!--<app-bar titleName="新建共享" :showMessages="false" backPath="/TeacherCourseShareSetting"></app-bar>-->
    <div class="app-bar">
      <div :class="iconClass" ref="iconUse">
        <i class="el-icon-back" @click="linkBack"></i>
        <transition name="slide-fade" class="transition-box">
          <span class="title">讨论课</span>
        </transition>
        <span>&nbsp;&nbsp;</span>
      </div>
    </div>
    <div class="app-bar-blank"></div>
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
		    iconClass:'back-icon-use',
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
		  linkBack(){
		    let _this=this;
        _this.$router.push({path:'/TeacherCourseShareSetting',query:{courseId:_this.$data.courseId}});
      },
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
          _this.$router.push({path:'/TeacherCourseShareSetting',query:{courseId:_this.$data.courseId}});
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
        console.log(_this.$data.courseId);
        console.log(_this.$data.options);
        for(let index=0;index<_this.$data.options.length;index++){
          if(_this.$data.options[index].id==_this.$data.courseId){
            _this.$data.options.splice(index,1);
          }
        }
      })
    }
  }
</script>
<style lang="less">
	#TeacherNewShare{

    .app-bar-blank{
      height: 10vh;
      max-height: 60px;
    }


    .app-bar {
      padding: 0.1px;
      height: 10vh;
      max-height: 60px;
      position: fixed;
      z-index: 1000;
      .back-icon-use{
        border-bottom-right-radius: 20px;
        -moz-box-shadow:0px 0px 2px whitesmoke;
        -webkit-box-shadow:0px 0px 2px whitesmoke;
        box-shadow:0px 0px 2px whitesmoke;
        z-index: 1000;
        /*width: 40vw;*/
        /*height: 10vh;*/
        /*max-height: 60px;*/
        background-color: white;
        color: dodgerblue;
        padding-left: 4vw;
        font-size: 25px;
        padding-top: 1vh;
        line-height: 25px;
        padding-bottom:5px;

        .title{
          color: black;
          font-size: 20px;
          font-weight: bold;
          /*line-height: 25px;*/
        }
      }



      .back-icon {
        z-index: 1000;
        /*width: 40vw;*/
        /*height: 10vh;*/
        /*max-height: 60px;*/
        background-color: white;
        color: dodgerblue;
        padding-left: 4vw;
        font-size: 25px;
        padding-top: 1vh;
        line-height: 25px;
        padding-bottom:5px;


        .title{
          color: black;
          font-size: 20px;
          font-weight: bold;
          /*line-height: 25px;*/
        }
      }
    }

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
