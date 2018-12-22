<template>
  <div id="TeacherNewSeminar">
    <div class="app-bar">
      <div :class="iconClass" ref="iconUse">
        <i class="el-icon-back" @click="linkBack"></i>
        <!--<span class="">轮次设置</span>-->
        <transition name="slide-fade" class="transition-box">
          <span class="title">新建讨论课</span>
        </transition>
        <span>&nbsp;&nbsp;</span>
      </div>
    </div>
    <div class="app-bar-blank"></div>
    <!--<app-bar titleName="新建讨论课" :showMessages="true" backPath="/TeacherMyCourses"></app-bar>-->
    <div class="main-content animated bounceInUp">
      <el-form :model="formNewSeminar" ref="formNewSeminar" class="new-course-form" :rules="rulesFormSeminar">
        <el-form-item prop="seminarName">
          <el-input class="new-course-input" placeholder="请输入讨论课名" v-model="formNewSeminar.seminarName" ></el-input>
        </el-form-item>
        <el-form-item prop="introduction">
          <el-input class="new-course-input-textarea" type="textarea"  placeholder="请输入讨论课详情" v-model="formNewSeminar.introduction"></el-input>
        </el-form-item>
      </el-form>
      <div class="second-form-title">
        <span>讨论课基本设置：</span>
      </div>
      <el-form :model="formNewSeminar" ref="formNewSeminar" class="course-grade-form" :rules="rulesFormSeminar">
        <el-form-item label="所属轮次：" class="form-item" label-width="120" prop="roundId">
          <el-select size="small" class="the-select" v-model="formNewSeminar.roundId">
            <el-option v-for="item in rounds" :key="item.id" :label="item.roundSerial" :value="item.id"></el-option>
            <el-option label="新建" :value="-1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课次序号：" class="form-item" label-width="120" prop="seminarSerial">
          <el-input-number size="small" class="the-select" :min="0" v-model="formNewSeminar.seminarSerial"></el-input-number>
          <!--<el-select size="small" class="the-select" v-model="formNewSeminar.seminarSerial">-->
            <!--<el-option v-for="i in 10" :key="i" :value="i*10+'%'"></el-option>-->
          <!--</el-select>-->
        </el-form-item>
        <el-form-item label="是否可见：" class="form-item" label-width="120" prop="isVisible">
          <el-switch
            v-model="formNewSeminar.isVisible"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="可见"
            inactive-text="不可见">
          </el-switch>
        </el-form-item>
        <!--<el-form-item label="上课时间：" class="form-item">-->
          <!--<el-date-picker class="date-picker" size="small" v-model="formNewSeminar"></el-date-picker>-->
        <!--</el-form-item>-->
      </el-form>
      <div class="second-form-title">
        <span>讨论课报名设置：</span>
      </div>
      <el-form :model="formNewSeminar" ref="formNewCourse" class="team-rule-form" label-width="120px" :rules="rulesFormSeminar">
        <el-form-item label="报名小组数量：" class="form-item" prop="maxTeam">
          <el-input-number size="small" :min="1" :max="30" v-model.number="formNewSeminar.maxTeam"></el-input-number>
        </el-form-item>
        <!--<el-form-item label="报名顺序自定：" class="form-item">-->
          <!--<el-switch-->
            <!--v-model="formNewSeminar"-->
            <!--active-color="#13ce66"-->
            <!--inactive-color="#ff4949"-->
            <!--active-text="开启"-->
            <!--inactive-text="关闭">-->
          <!--</el-switch>-->
        <!--</el-form-item>-->
        <el-form-item label="报名开始时间：" class="form-item" prop="start">
          <el-date-picker class="date-picker" type="datetime" value-format="yyyy-MM-dd hh:mm:ss" size="small" v-model="formNewSeminar.start" ></el-date-picker>
        </el-form-item>
        <el-form-item label="报名截止时间：" class="form-item" prop="end">
          <el-date-picker class="date-picker" type="datetime" value-format="yyyy-MM-dd hh:mm:ss" size="small" v-model="formNewSeminar.end"></el-date-picker>
        </el-form-item>
      </el-form>
      <div class="button-panel">
        <button class="new-course-button" @click="newSeminar">提交</button>
      </div>
    </div>
  </div>
</template>
<script>
  import AppBar from '../../ReuseComponents/AppBar'
  export default{
    name:'TeacherNewCourse',
    components:{
      AppBar
    },
    data(){
      let validateDate=(rule, value, callback)=>{
        console.log(value);
        if(this.$data.formNewSeminar.start!==''&&this.$data.formNewSeminar.end!==''){
          if(this.$data.formNewSeminar.start<this.$data.formNewSeminar.end){
            callback();
          }else{
            callback(new Error('结束日期要晚于开始日期'));
          }
        }else{
          callback();
        }
      };
      return{
        canBeSeen:false,
        iconClass:'back-icon',
        iconClassUse:'back-icon-use',
        titleShow:false,
        rulesFormSeminar:{
          seminarName:[
            {required:true,message:'请输入讨论课名称',trigger:'change'},
          ],
          introduction:[
            {required:true,message:'请输入讨论课要求',trigger:'change'}
          ],
          maxTeam:[
            {required:true,message:'数量应大于零',trigger:'change'}
          ],
          isVisible:[

          ],
          seminarSerial:[
            {required:true,message:'请选择课次序号',trigger:'change'}
          ],
          roundId:[
            {required:true,message:'请输入所属轮次',trigger:'change'}
          ],
          start:[
            {required:true,message:'请选择开始日期',trigger:'change'},
            {validator:validateDate,trigger:'change'}
          ],
          end:[
            {required:true,message:'请选择结束日期',trigger:'change'},
            {validator:validateDate,trigger:'change'}
          ]
        },
        formNewSeminar:{
          roundId:'',
          seminarName:'',
          introduction:'',
          maxTeam:1,
          isVisible:false,
          seminarSerial:'',
          start:'',
          end:'',
          courseId:''
        },
        courseId:'',
        rounds:[

        ]
      }
    },
    created(){
      this.$data.courseId=this.$route.query.courseId;
      this.loadCourseRounds();

    },
    mounted(){
      this.box = this.$refs.viewBox
      // 监听这个dom的scroll事件
      window.addEventListener('scroll', () => {
        this.$data.titleShow=true;
        this.$data.iconClass=this.$data.iconClassUse;
        // console.log(" scroll " + this.$refs.viewBox.scrollTop)
        //以下是我自己的需求，向下滚动的时候显示“我是有底线的（类似支付宝）”
        // this.isScroll=this.$refs.viewBox.scrollTop>0
      }, true)
    },
    methods:{
      loadCourseRounds(){
        let _this=this;
        this.$axios({
          method:'get',
          url:'/course/'+this.$data.courseId+'/round'
        }).then(function (response) {
          _this.$data.rounds=response.data;
        })
      },
      linkBack(){
        this.$router.push({path:'/TeacherCourseRounds',query:{courseId:this.$data.courseId}});
      },

      newSeminar(){
        let _this=this;
        this.$data.formNewSeminar.courseId=parseInt(this.$data.courseId);
        if(this.$data.formNewSeminar.isVisible===false){
          this.$data.formNewSeminar.isVisible=0;
        }else{
          this.$data.formNewSeminar.isVisible=1;
        }
        if(this.$data.formNewSeminar.seminarSerial===-1){
          this.$data.formNewSeminar.seminarSerial=this.$data.rounds.length+1;
        }

        console.log(this.$data.formNewSeminar);
      //   this.$axios({
      //     method:'post',
      //     url:'/seminar',
      //     data:this.$data.formNewSeminar
      //   }).then(function (response) {
      //     if(response.data){
      //       _this.$message({
      //         type:'success',
      //         message:'创建成功！'
      //       })
      //       _this.linkBack();
      //     }
      //   }).catch(function (error) {
      //     _this.$message({
      //       type:'error',
      //       message:'创建失败！'
      //     })
      //   })
      //
      }
    }
  }
</script>
<style lang="less">
  #TeacherNewSeminar{

    .app-bar-blank{
      height: 10vh;
      max-height: 60px;
    }

    .transition-box{
      transition: all 0.8s;
    }

    .row-col{
      width: 40%;
    }

    .app-bar {
      padding: 0.1px;
      height: 10vh;
      max-height: 60px;
      position: fixed;
      z-index: 1000;
      .back-icon-use{
        border-bottom-right-radius: 20px;
        -moz-box-shadow:0px 0px 2px #333333;
        -webkit-box-shadow:0px 0px 2px #333333;
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

    .date-picker{
      width: 50%;
    }
    .main-content{
      width:88%;
      max-width:500px;
      margin-left:auto;
      margin-right:auto;
      /*margin-top:3vh;*/


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

        .date-picker{
          width: 140px;
        }

        .el-input__inner{
          /*width: 120px;*/
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
          border-top:none;
          border-left: none;
          border-right: none;
          border-bottom-width:2px;
          border-radius:0;
          font-size:18px;
          transition: all 0.5s;
        }
        .el-input__inner:focus{
          /*border-bottom: 2px solid dodgerblue;*/

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
        border-top:none;
        border-left: none;
        border-right: none;
        border-bottom-width: 2px;
        transition: all 0.5s;
        border-radius: 0;
      }

      .el-textarea__inner:focus{
        /*border-bottom: 2px solid dodgerblue;*/
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
