<template>
    <div>
      <back-bar :titleName="title" :showMessages="true" :showBackBar="true" backUrl="/StuMainSeminars"></back-bar>

      <div class="seminarDetailsBack animated fadeInRight" align="left" >
        <span style="margin-left: 2vw;font-size: 25px;">{{seminarDetails.name}}</span>
        <mu-list  toggle-nested class="infoList" style="border-bottom:5px solid  lightgray;">
          <mu-list-item avatar :ripple="false" button>
            <mu-list-item-content>
              <mu-list-item-title>轮次</mu-list-item-title>
              <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)"></mu-list-item-sub-title>
              <mu-list-item-sub-title>
                {{seminarDetails.roundID}}
              </mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider></mu-divider>

          <mu-list-item avatar :ripple="false" button>
            <mu-list-item-content>
              <mu-list-item-title>课次序号</mu-list-item-title>
              <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)"></mu-list-item-sub-title>
              <mu-list-item-sub-title>
                {{seminarDetails.classOrder}}
              </mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider></mu-divider>

          <mu-list-item  textline="two-line" button :ripple="false" nested :open="open === 'drafts'" @toggle-nested="open = arguments[0] ? 'drafts' : ''">
            <mu-list-item-title>课程要求</mu-list-item-title>
            <mu-list-item-action>
              <i class="el-icon-arrow-down"></i>
            </mu-list-item-action >
            <mu-list-item-content button :ripple="false" slot="nested" class="requirContent">
              <mu-list-item-content >{{seminarDetails.requiement}}</mu-list-item-content>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider></mu-divider>

          <mu-list-item avatar :ripple="false" button>
            <mu-list-item-content>
              <mu-list-item-title>报名情况</mu-list-item-title>
              <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)"></mu-list-item-sub-title>
              <mu-list-item-sub-title>
                {{seminarDetails.registerStatus}}
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-button flat color="success" @click="changeRegister">修改</mu-button>
          </mu-list-item>
          <mu-divider></mu-divider>

          <mu-list-item avatar :ripple="false" button>
            <mu-list-item-content>
              <mu-list-item-title>PPT</mu-list-item-title>
              <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)"></mu-list-item-sub-title>
              <mu-list-item-sub-title>
                {{seminarDetails.pptEndTime}}
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-button flat color="normal">{{seminarDetails.pptStatus}}</mu-button>
          </mu-list-item>
          <mu-divider></mu-divider>

          <mu-list-item avatar :ripple="false" button>
            <mu-list-item-content>
              <mu-list-item-title>报告</mu-list-item-title>
              <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)"></mu-list-item-sub-title>
              <mu-list-item-sub-title>
                {{seminarDetails.reportEndTime}}
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-button flat color="normal">{{seminarDetails.reportStatus}}</mu-button>
          </mu-list-item>

        </mu-list>

        <mu-button class="submit"  style="margin-top: 5vh;" color="success"  @click="submitReport">报告提交</mu-button>
        <mu-button class="submit" color="success"  @click="submitPPT">PPT提交</mu-button>

        <mu-button class="submit" color="success"  @click="showGrades">查看成绩</mu-button>
      </div>

      <mu-dialog title="上传PPT" width="360" :open.sync="pptFlag">

        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>

        <mu-button slot="actions" flat color="success" @click="pptFlag=!pptFlag">Sure</mu-button>
        <mu-button slot="actions" flat color="primary" @click="pptFlag=!pptFlag">Close</mu-button>
      </mu-dialog>

      <mu-dialog title="上传报告" width="360" :open.sync="reportFlag">

        <mu-button slot="actions" flat color="success" @click="reportFlag=!reportFlag">Sure</mu-button>
        <mu-button slot="actions" flat color="primary" @click="reportFlag=!reportFlag">Close</mu-button>
      </mu-dialog>


    </div>
</template>

<script>
  import BackBar from '../ReuseComponents/BackBar'
    export default {
        name: "RegisteredSeminarDetails",
      components:{
        BackBar,
      },
      data(){
          return{
            title:'OOAD-已报名',
            open:'send',
            reportFlag:false,
            pptFlag:false,
            seminarDetails:{
              title:"OOAD-讨论课",
              name:'业务流程分析',
              roundID:2,
              classOrder:'第二次',
              requiement:'不上课了 We should eat this: Grate, Squash, Corn, and tomatillo Tacos.sdasdasd',
              status:'正在进行',
              registerStatus:'2016(1)-第三组',
              pptStatus:'未提交',
              reportStatus:'未提交',
              pptEndTime:'距截止时间还有一天',
              reportEndTime:'距截止时间还有一天',
            },
            fileList: [{name: 'food.jpeg', url:[],}]

          }
      },
      methods:{
          changeRegister(){
            this.$router.push('/StuChangeRegister');
          },
          submitPPT(){
            this.$data.pptFlag=true;
          },
        showGrades(){
          this.$router.push('/StuCheckGrades');
        },

        submitReport(){
            this.$data.reportFlag=true;
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },
        handleExceed(files, fileList) {
          this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
          return this.$confirm(`确定移除 ${ file.name }？`);
        }
      }
    }
</script>

<style lang="less">
  .seminarDetailsBack{
    margin-top: 12vh;
  }
  .infoList{
    margin-top: 2vh;
    border-top:5px solid lightgray;
    border-bottom: 0.5px solid lightgray;
  }
  .submit{
    font-size: 18px;
    margin-top: 2vh;
    width: 100%;
    height:6vh;
    opacity: 0.9;
  }
  .requirContent{
    margin: 5px 20px;
    height:auto;
  }
  .mu-list-item:nth-child(even){
    background-color: black;

  }

</style>
