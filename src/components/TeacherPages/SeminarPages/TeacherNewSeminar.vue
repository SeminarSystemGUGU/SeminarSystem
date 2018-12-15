<template>
  <div id="TeacherNewSeminar">
    <app-bar titleName="新建课程" :showMessages="true" backPath="/TeacherMyCourses"></app-bar>
    <div class="main-content animated bounceInUp">
      <el-form :model="formNewCourse" ref="formNewCourse" class="new-course-form">
        <el-form-item>
          <el-input class="new-course-input" placeholder="请输入讨论课名" v-model="formNewCourse.courseName" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input class="new-course-input-textarea" type="textarea"  placeholder="请输入讨论课详情" v-model="formNewCourse.courseDetails"></el-input>
        </el-form-item>
      </el-form>
      <div class="second-form-title">
        <span>讨论课基本设置：</span>
      </div>
      <el-form :model="formNewCourse" ref="formNewCourse" class="course-grade-form">
        <el-form-item label="所属轮次：" class="form-item" label-width="120">
          <el-select size="small" class="the-select" v-model="formNewCourse.scoreRate.preRate">
            <el-option v-for="i in 10" :key="i" :value="i*10+'%'"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课次序号：" class="form-item" label-width="120">
          <el-select size="small" class="the-select" v-model="formNewCourse.scoreRate.preRate">
            <el-option v-for="i in 10" :key="i" :value="i*10+'%'"></el-option>
          </el-select>
        </el-form-item>
      <!--</el-form>-->
      <!--<div class="second-form-title">-->
        <!--<span>讨论课是否可见：</span>-->
      <!--</div>-->
      <!--<el-form :model="formNewCourse" ref="formNewCourse" class="course-grade-form">-->
        <el-form-item label="是否可见：" class="form-item" label-width="120">
          <el-switch
            v-model="canBeSeen"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="可见"
            inactive-text="不可见">
          </el-switch>
        </el-form-item>
        <el-form-item label="上课时间：" class="form-item">
          <el-date-picker class="date-picker" size="small" v-model="formNewCourse.teamEndDate"></el-date-picker>
        </el-form-item>
      </el-form>
      <div class="second-form-title">
        <span>讨论课报名设置：</span>
      </div>
      <el-form :model="formNewCourse" ref="formNewCourse" class="team-rule-form" label-width="120px">
        <el-form-item label="报名小组数量：" class="form-item">
          <el-input-number size="small" v-model="formNewCourse.teamMaxNum"></el-input-number>
        </el-form-item>
        <el-form-item label="报名顺序自定：" class="form-item">
          <el-switch
            v-model="rounds"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="开启"
            inactive-text="关闭">
          </el-switch>
        </el-form-item>
        <el-form-item label="报名开始时间：" class="form-item">
          <el-date-picker size="small" v-model="formNewCourse.teamStartDate" ></el-date-picker>
        </el-form-item>
        <el-form-item label="报名截止时间：" class="form-item">
          <el-date-picker size="small" v-model="formNewCourse.teamEndDate"></el-date-picker>
        </el-form-item>
      </el-form>
      <div class="button-panel">
        <button class="new-course-button">提交</button>
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
      return{
        canBeSeen:false,
        rounds:false,
        formNewCourse:{
          courseName:'',
          courseDetails:'',
          scoreRate:{
            preRate:'',
            quesRate:'',
            repRate:'',
          },
          teamMinNum:0,
          teamMaxNum:0,
          teamStartDate:'',
          teamEndDate:'',
        }
      }
    }
  }
</script>
<style lang="less">
  #TeacherNewSeminar{

    .date-picker{
      width: 50%;
    }
    .main-content{
      width:88%;
      max-width:500px;
      margin-left:auto;
      margin-right:auto;
      margin-top:3vh;


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

        .el-input__inner{
          width: 120px;
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
          border:none;
          border-bottom:2px solid whitesmoke;
          border-radius:0;
          font-size:18px;
          transition: all 0.5s;
        }
        .el-input__inner:focus{
          border-bottom: 2px solid dodgerblue;

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
        border: none;
        border-bottom: 2px solid whitesmoke;
        transition: all 0.5s;
        border-radius: 0;
      }

      .el-textarea__inner:focus{
        border-bottom: 2px solid dodgerblue;
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
