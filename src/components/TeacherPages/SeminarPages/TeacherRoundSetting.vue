<template>
    <!--讨论课轮次设置界面-->
    <div id="TeacherRoundSetting">
      <div class="app-bar">
        <div :class="iconClass" ref="iconUse">
          <i class="el-icon-back" @click="linkBack"></i>
          <!--<span class="">轮次设置</span>-->
          <transition name="slide-fade" class="transition-box">
            <span class="title">轮次设置</span>
          </transition>
          <span>&nbsp;&nbsp;</span>
        </div>
      </div>
      <div class="app-bar-blank"></div>
      <div class="main-content" ref="viewBox" v-loading="roundInfoLoading">
        <div class="round-seminars">
          <!--本轮次所含讨论课-->
          <div class="round-seminars-title">
            <!--<div class="square"></div>-->
            <span>本轮次所含讨论课：</span>
          </div>
          <div class="round-seminars-class">
            <el-row class="row-class">
              <el-col class="row-col" v-for="item,index in seminars" :key="index">
                <seminar-card :isMainCourse="isMainCourse" :seminarName="item.seminarName" :endTime="item.enrollEndTime" :courseId="courseId" :seminarId="item.id" :index="index" @deleteSeminar="deleteSeminar"></seminar-card>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="round-grade-setting">
          <!--讨论课每轮成绩设置-->
          <div class="round-grade-setting-title">
            <span>成绩设置：</span>
          </div>
          <div class="round-grade-setting-form">
            <el-form class="round-grade-form">
              <el-form-item label="展示：">
                <el-select :disabled="!isMainCourse" class="the-select" v-model="formRoundInfos.presentationScoreMethod" size="small">
                  <el-option :value="1" label="最高分"></el-option>
                  <el-option :value="0" label="平均分"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="提问：">
                <el-select :disabled="!isMainCourse" class="the-select" v-model="formRoundInfos.questionScoreMethod" size="small">
                  <el-option :value="1" label="最高分"></el-option>
                  <el-option :value="0" label="平均分"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="报告：">
                <el-select :disabled="!isMainCourse" class="the-select" v-model="formRoundInfos.reportScoreMethod" size="small">
                  <el-option :value="1" label="最高分"></el-option>
                  <el-option :value="0" label="平均分"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="round-grade-setting">
          <!--讨论课每轮成绩设置-->
          <div class="round-grade-setting-title">
            <span>本次讨论课报名次数：</span>
          </div>
          <div class="round-grade-setting-form">
            <el-form class="round-grade-form">
              <!--<el-form-item label="一班：">-->
                <!--<el-select class="the-select" size="small"></el-select>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="二班：">-->
                <!--<el-select class="the-select" size="small"></el-select>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="三班：">-->
                <!--<el-select class="the-select" size="small"></el-select>-->
              <!--</el-form-item>-->
            </el-form>
          </div>
        </div>
      </div>
      <div style="height: 300px;"></div>
      <div class="button-panel">
        <el-button type="primary" v-show="isMainCourse" @click="confirmMethod">确定修改</el-button>
      </div>
      <!--</v-touch>-->
    </div>
</template>

<script>
  import SeminarCard from '../../ReuseComponents/SeminarCard'
  import AppBar from '../../ReuseComponents/AppBar'
    export default {
        name: "TeacherRoundSetting",
      components:{
          AppBar,SeminarCard
      },
      data(){
          return{
            isMainCourse:false,
            seminarId:'',
            roundInfoLoading:true,
            option1:1,
            option2:0,
            iconClass:'back-icon-use',
            iconClassUse:'back-icon-use',
            titleShow:false,
            formRoundInfos: {
              courseId: '',
              roundId: '',
              presentationScoreMethod: '',
              questionScoreMethod: '',
              reportScoreMethod: '',
              roundSerial: '',
            },
            seminars:[

            ],
            courseId:''
          }
      },
      created() {
          this.$data.courseId=this.$route.query.courseId;
          this.$data.roundId=this.$route.query.roundId;
          this.loadCourseRound();
          this.loadIfMainCourse();
      },
      methods:{
        loadIfMainCourse(){
          let _this=this;
          this.$axios({
            method:'get',
            url:'/course/'+this.$data.courseId+'/isMainSeminar'
          }).then(function (response) {
            if(response.data===true){
              _this.$data.isMainCourse=true;
            }else{
              _this.$data.isMainCourse=false;
            }
          })
        },
        confirmMethod(){
          let _this=this;
          // console.log(this.$data.formRoundInfos.reportScoreMethod);
          this.$axios({
            method:'put',
            url:'/round/'+this.$data.formRoundInfos.id,
            data:{
              calculatePreType:this.$data.formRoundInfos.presentationScoreMethod,
              calculateQueType:this.$data.formRoundInfos.questionScoreMethod,
              calculateRepType:this.$data.formRoundInfos.reportScoreMethod
            }
          }).then(function (response) {
            _this.$message({
              type:'success',
              message:'修改成功！'
            })
            _this.linkBack();
          }).catch(function (error) {
            _this.$message({
              type:'error',
              message:'修改失败！'
            })
          })
        },
        linkBack(){
          this.$router.push({path:'/TeacherCourseRounds',query:{courseId:this.$data.courseId}});
        },
        loadCourseRound(){
          let _this=this;
          this.$axios({
            method:'get',
            url:'/round/'+this.$data.roundId
          }).then(function (response) {
            _this.$data.formRoundInfos=response.data;
            _this.loadRoundSeminars();
            _this.$data.roundInfoLoading=false;
          })
        },
        loadRoundSeminars(){
          let _this=this;

          this.$axios({
            method:'get',
            url:'/round/'+this.$data.formRoundInfos.id+'/seminar'
          }).then(function (response) {
            _this.$data.seminars=response.data;
          })

        },
        deleteSeminar(data){
          this.$data.seminars.splice(data.index,1);
          this.$message({
            type:'success',
            message:'删除成功！'
          })
        }
      }
    }
</script>

<style lang="less">
#TeacherRoundSetting{
  text-align: left;

  .app-bar-blank{
    height: 10vh;
    max-height: 60px;
  }

  .transition-box{
    transition: all 0.8s;
  }

  .row-col{
    width: 150px;
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

  .button-panel{
    width: 100%;
    position: fixed;
    bottom: 0;

    .el-button{
      width: 100%;
    }
  }

  .main-content{
    /*margin-top: 1.5vh;*/

    .the-select{
      width: 60%;
    }

    .round-grade-setting{
      margin-top: 3vh;
      margin-left: 3vw;
      font-size: 20px;
      font-weight: bold;


      .round-grade-setting-form{
        margin-top: 2vh;
        width: 50%;
        margin-left: auto;
        margin-right: auto;
      }
    }


    .round-seminars{
      margin-left: 3vw;
      font-size: 20px;
      font-weight: bold;

      .square{
        width: 3vw;
        height: 20px;
        background-color: dodgerblue;
        display: inline-block;
      }


      .round-seminars-class{
        margin-top: 1.5vh;
        overflow-y: hidden;
        overflow-wrap: normal;
        white-space: nowrap;
        width: 100%;
        overflow-x: scroll;
        text-align: center;


        .row-class{
          width: 200vw;
        }
      }

    }


  }

}

</style>
