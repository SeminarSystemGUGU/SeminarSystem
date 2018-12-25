<template>
	<div id="TeacherCourseRounds">
		<app-bar titleName="讨论课" :showMessages="true" backPath="/TeacherMyCourses"></app-bar>
		<div class="main-content" >
      <span v-show="noItem" class="no-item-message">当前暂无讨论课信息哦~</span>
			<mu-expansion-panel v-for="item, index in rounds" :key="item.id" v-loading="roundLoading">
    			<div slot="header" class="panel-title">第{{item.roundSerial}}轮</div>
    			<div class="setting" @click="linkToSetting(item.id)">
    				<span class="setting-panel"><i class="el-icon-setting"></i>&nbsp;讨论课轮次设置</span>
    				<span class="setting-icon"><i class="el-icon-arrow-right"></i></span>
    			</div>
    			<!-- <div class="divider"></div> -->
    			<div class="round-class">
					<el-collapse accordion>
  						<el-collapse-item v-for="it, i in item.seminars" :key="it.id">
  							<!--讨论课名称-->
    						<template slot="title">
                  <div class="seminar-title" style="width: 80%;overflow-x: hidden;text-overflow: ellipsis;white-space: nowrap"><i class="el-icon-edit" @click="linkToModify(it.id,courseId)"></i>{{it.seminarName}}&nbsp;&nbsp;</div>
    						</template>
                <div v-for="c, k in it.classes" :key="c.id">
    						  <div class="divider"></div>
    						  <!--班级信息-->
    						  <div class="class-panel" @click="linkTo(c.id,it.id,item.id)">
    							  <span class="class-title">{{c.grade}}级{{c.klassSerial}}班</span>
                    <span class="class-icon" ><i  class="el-icon-arrow-right"></i></span>
    						  </div>
                </div>
    						<div class="divider"></div>
  						</el-collapse-item>
					</el-collapse>
    			</div>
    		</mu-expansion-panel>
        <div class="bottom-blank"></div>
  		</div>
    <div class="footer-new-course">
      <mu-button class="new-course-button" @click="linkToNewSeminar" color="info"><i class="el-icon-plus"/>新建讨论课</mu-button>
    </div>

	</div>
</template>

<script>
import AppBar from '../../ReuseComponents/AppBar'
    export default {
        name: "TeacherCourseRounds",
        components:{
        	AppBar
        },
      data(){
        return{
          noItem:false,
          courseId:'',
          roundLoading:true,
          rounds:[
            {
              id:'',
              presentationScoreMethod: '',
              questionScoreMethod: '',
              reportScoreMethod:'',
              roundSerial:'',
              seminars:[
                {
                  courseId:'',
                  enrollETime:'',
                  enrollEndTime:'',
                  enrollSTime:'',
                  enrollStartTime:'',
                  id:'',
                  introduction:'',
                  isVisible:'',
                  maxTeam:'',
                  roundId:'',
                  seminarName:'',
                  seminarSerial:'',
                  classes:[
                    {
                      courseId:'',
                      grade:'',
                      id:'',
                      klassLocation:'',
                      klassSerial:'',
                      klassTime:''
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      created(){
        this.$data.courseId=this.$route.query.courseId;
        this.loadCourseRounds();
      },

      methods:{
        loadCourseRounds(){
         let _this=this;
         this.$axios({
           method:'get',
           url:'/course/'+this.$data.courseId+'/round'
         }).then(function (response) {
           console.log(response.data.length);
           _this.$data.noItem = response.data.length === 0;
           _this.$data.rounds.splice(0,_this.$data.rounds.length);
            for(let index=0;index<response.data.length;index++){
              _this.$data.rounds.push({
                seminars:[],
                id:response.data[index].id,
                presentationScoreMethod:response.data[index].presentationScoreMethod,
                questionScoreMethod:response.data[index].questionScoreMethod,
                reportScoreMethod:response.data[index].reportScoreMethod,
                roundSerial:response.data[index].roundSerial,
                courseId:response.data[index].courseId
              })
              console.log('kkk');
            }
           _this.loadRoundSeminars();
         })
        },
        loadRoundSeminars(){
          console.log('11111');
          let _this=this;
          for(let index=0;index<this.$data.rounds.length;index++){
            console.log(this.$data.rounds.length);
            this.$axios({
              method:'get',
              url:'/round/'+this.$data.rounds[index].id+'/seminar'
            }).then(function (response) {
              for(let i=0;i<response.data.length;i++){
                _this.$data.rounds[index].seminars.push({
                  courseId:response.data[i].courseId,
                  enrollETime:response.data[i].enrollETime,
                  enrollEndTime:response.data[i].enrollEndTime,
                  enrollSTime:response.data[i].enrollSTime,
                  enrollStartTime:response.data[i].enrollStartTime,
                  id:response.data[i].id,
                  introduction:response.data[i].introduction,
                  isVisible:response.data[i].isVisible,
                  maxTeam:response.data[i].maxTeam,
                  roundId:response.data[i].roundId,
                  seminarName:response.data[i].seminarName,
                  seminarSerial:response.data[i].seminarSerial,
                  classes:[]
                  })
                _this.loadSeminarClasses(response.data[i].id,index,i);
              }

              _this.$data.roundLoading=false;

            })
          }
        },
        loadSeminarClasses(i,index,t){
          let _this=this;
          this.$axios({
            method:'get',
            url:'/seminar/'+i+'/class'
          }).then(function (response) {
            console.log(_this.$data.rounds[index].seminars[t]);
            _this.$data.rounds[index].seminars[t].classes=response.data;
          })

        },
        linkToSetting(id){
            this.$router.push({path:'/TeacherRoundSetting',query:{courseId:this.$data.courseId,roundId:id}});
        },
        linkTo(classId,seminarId,roundId){
            this.$router.push({path:'/TeacherSeminar',query:{courseId:this.$data.courseId,classId:classId,seminarId:seminarId,roundId:roundId}});
        },
        linkToNewSeminar(){
            this.$router.push({path:'/TeacherNewSeminar',query:{courseId:this.$data.courseId}});
        },
        linkToModify(seminarId,courseId){
          this.$router.push({path:'/TeacherModifySeminar',query:{courseId:courseId,seminarId:seminarId}})
        }
      }
    }
</script>

<style scoped  lang="less">
#TeacherCourseRounds{
	width:100vw;
	padding:1px;

  .no-item-message{
    font-size: 18px;
    font-weight: bold;
  }

  .bottom-blank{
    height: 200px;
  }


  .el-icon-edit{
    color: dodgerblue;
  }


  .footer-new-course{
    position: fixed;
    width:100vw;
    height: 8vh;
    bottom: 0;
    /*background-color: dodgerblue;*/

    .new-course-button{
      margin-top: 1vh;
      width: 100%;
      height: 7vh;
      font-size: 20px;
    }
  }


  .running-seminars{
    position: fixed;
    bottom:12vh;
    right: 0;
    width: 30vw;
    height: 18vh;
    background-color: dodgerblue;
  }

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
				font-size:16px;
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
