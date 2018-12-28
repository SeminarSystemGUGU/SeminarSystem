<template>
  <div id="AppBar">
    <el-dialog title="选择课程" width="70%" :visible.sync="dialogFormVisible">
      <div class="dialog-title">
        <span>选择课程：</span>
      </div>
      <el-select v-model="courseSelected">
        <el-option v-for="item,index in options" :key="index" :value="item.id" :label="item.courseName"></el-option>
      </el-select>
      <div class="button-panel">
        <el-button type="text" @click="goToSeminars">确定</el-button>
        <el-button type="text" @click="dialogFormVisible=false">放弃</el-button>
      </div>
    </el-dialog>
    <div class="app-bar">
      <el-row class="app-row">
        <el-col class="content-col">
          <div class="title">
            <i @click="linkBack" class="el-icon-back" v-show="isBack" ></i>&nbsp;
            {{titleName}}
          </div>
        </el-col>
        <el-col class="button-col">
          <div class="col-menu">
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                <i class="el-icon-menu"/>
              </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">讨论课</el-dropdown-item>
              <el-dropdown-item command="2">新消息</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
    <div class="white-spaces"></div>
  </div>
</template>

<script>
    export default {
        name: "AppBar",
      props:['titleName','showMessages','showBack','backPath'],
      methods:{
          linkBack(){
            // history.back();
            // console.log(this.$props.backPath);
            this.$router.push(this.$props.backPath);
          },
          linkToMessage(){
            // console.log(1111);
            this.$router.push({path:'/TeacherMyMessage'});
          },
          handleCommand(command){
            if (command==='2'){
              this.linkToMessage();
            }else if(command==='1'){
              this.$data.dialogFormVisible=true;
            }
          },
        loadAllCourses(){
          let _this=this;
          this.$axios({
            method:'get',
            url:'/course'
          }).then(function (response) {
            _this.$data.options=response.data;
          })
        },
        goToSeminars(){
            if(this.$route.path==='/TeacherCourseRounds'){
              this.$router.push({path:'/TransitionPage',query:{courseId:this.$data.courseSelected}});
            }else {
              this.$router.push({path: '/TeacherCourseRounds', query: {courseId: this.$data.courseSelected}});
            }
            this.$data.dialogFormVisible=false;
        }
      },
      data(){
        return{
          isBack:true,
          options:[],
          courseSelected:'',
          dialogFormVisible:false,
        }
      },
      created(){
        this.loadAllCourses();
        console.log(this.$props.backPath);
       if(this.$props.showBack===false){
        this.$data.isBack=this.$props.showBack;
       }
      },
    }
</script>

<style scoped lang="less">
  .app-menu{
    fload:right;
    margin-right:0;
  }


  .dialog-title{
    text-align: left;
  }
  .button-panel{
    margin-top: 15px;
  }

  .white-spaces{
    height: 7vh;
    max-height: 50px;
  }

  .app-bar{
    border-bottom: 1px solid lightgray;
    background-color: white;
    padding: 3px;
    position: fixed;
    top:0;
    /*padding:1px;*/
    width: 100vw;
    height: 7vh;
    max-height: 50px;
    /*background-color: gray;*/
    text-align: left;
    /*position: fixed;*/
    /*top:0;*/
    z-index: 1000;

    .app-row{
      margin-top: 3px;
    }

    .content-col{
      width:70%;

      .title{
        height: 35px;
        .el-icon-back{
          color: dodgerblue;
        }
      }
    }

    .button-col{
      width:29%;
      float:right;
      .col-menu{
        float:right;
        margin-right:4vw;
      }
    }


    .el-icon-menu{
      display:inline-block;
      font-size:25px;
      color:dodgerblue;
      font-weight:bold;

      /*<!-- margin-top:7px;;*/
    }

    .el-dropdown-link{
      display:inline-block;
      height:35px;
      line-height:35px;
    }



  .title{
    display: inline-block;
    overflow: scroll;
    /*margin-top: 0vw;*/
    font-size: 20px;
    text-align: left;
    margin-left: 2vw;
    font-family: "等线 Light";
    font-weight: bold;
  }
  }
</style>
