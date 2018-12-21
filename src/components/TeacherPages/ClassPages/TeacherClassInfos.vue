<template>
    <div id="TeacherClassInfos">
      <app-bar :show-messages="true" title-name="OOAD-班级信息" backPath="/TeacherMyCourses"></app-bar>
      <div class="main-content">
        <el-collapse v-model="activeName">
          <el-collapse-item  :name="index" v-for="item,index in classes" :title="item.grade+'级'+item.klassSerial+'班'" :key="item.id">
            <div class="item-content">
              <div class="class-info">
                <el-row :gutter="10">
                  <el-col class="row-col-left">
                    <span>讨论课时间：</span>
                  </el-col>
                  <el-col class="row-col-right">
                    <span>{{item.klassTime}}</span>
                  </el-col>
                </el-row>
              </div>
              <div class="class-info">
                <el-row :gutter="10">
                  <el-col class="row-col-left">
                    <span>讨论课地点：</span>
                  </el-col>
                  <el-col class="row-col-right">
                    <span>{{item.klassLocation}}</span>
                  </el-col>
                </el-row>
              </div>
              <div class="class-info">
                <el-row :gutter="10">
                  <el-col class="row-col-left">
                    <span>上传学生名单：</span>
                  </el-col>
                  <el-col class="row-col-right">
                    <el-upload
                      class="upload-demo"
                      :with-credentials="true"
                      :action="'http://kxp744.natappfree.cc/class/'+item.id"
                      name="fileUpload"
                      :limit="1"
                      :file-list="fileList">
                      <el-button size="small" type="primary">点击上传</el-button>
                      <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                    </el-upload>
                    <!--<form :action="'http://kxp744.natappfree.cc/class/'+item.id" method="post" runat="server"  enctype="multipart/form-data" target="nm_iframe">-->
                      <!--<input name="fileUpload" type="file" />-->
                      <!--<input type="submit"  value="提交"/>-->

                    <!--</form>-->
                    <!--<iframe id="id_iframe" name="nm_iframe" style="display:none;"></iframe>-->
                    <!--<el-button type="text" size="small" class="choose-file-button">选择文件</el-button>-->
                  </el-col>
                </el-row>
              </div>
              <div class="button-panel">
                <el-button class="the-button" @click="delClass(item,index)">删除班级</el-button>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="new-button-panel">
        <mu-button color="primary" class="new-button" @click="linkToNewClass">新建班级</mu-button>
      </div>
    </div>
</template>

<script>
  import AppBar from '../../ReuseComponents/AppBar'
    export default {
        name: "TeacherClassInfos",
      components:{
          AppBar
      },
      data(){
          return{
            courseId:'',
            fileList:[],
            activeName:'1',
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
      },
      created(){
        this.$data.courseId=this.$route.query.courseId;
        this.loadCourseClass();
      },
      methods:{
          delClass(item,index){
            let _this=this;
            this.$axios({
              method:'delete',
              url:'/class/'+item.id,
            }).then(function (response) {
              if(response.data===true){
                _this.$data.classes.splice(index,1);
                _this.$message({
                  type:'success',
                  message:'删除成功！'
                })
              }else{
                _this.$message({
                  type:'error',
                  message:'删除失败！'
                })
              }
            }).catch(function (error) {
              _this.$message({
                type:'error',
                message:'删除失败！'
              })
            })
          },
          loadCourseClass(){
            let _this=this;
            this.$axios({
              method:'get',
              url:'/course/'+this.$data.courseId+'/class',
            }).then(function (response) {
              // console.log(response);
              _this.$data.classes=response.data;
            })
          },
          linkToNewClass(){
            this.$router.push({path:'/NewClass',query:{courseId:this.$data.courseId}});
          }
      }
    }
</script>

<style lang="less">

#TeacherClassInfos{
  width: 100vw;

  .upload-demo{
    .el-upload__input{
      display: none;
    }

  }

  .el-collapse-item__header{
    font-size: 18px;
    /*background-color: orange;*/
    font-weight: bold;
  }

  .new-button-panel{
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 7vh;

    .new-button{
      width: 100%;
      height: 6.8vh;

    }

  }


  .main-content{
    margin-top: 3vh;

    .choose-file-button{
      /*background-color: white;*/
      /*border-color: dodgerblue;*/
      /*color: dodgerblue;*/
    }

    .item-content{
      margin-top: 3vh;
      width: 80%;
      margin-right: auto;
      margin-left: auto;

      .link-class{
        color: dodgerblue;
        font-weight: normal;
      }

      .button-panel{
        margin-top: 3vh;

      }
      .the-button{
        width: 160px;
        height: 40px;
        /*background-color: orangered;*/
        border-color: orangered;
        color: orangered;
      }
      .row-col-left{
        width: 50%;
        font-size: 17px;
        text-align: right;
        /*font-weight: bold;*/
      }

      .row-col-right{
        text-align: left;
        width: 50%;
        font-size: 14px;
        font-weight: bold;
      }

    }
  }

}
</style>
