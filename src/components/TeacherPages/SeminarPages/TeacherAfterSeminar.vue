<template>
    <div id="TeacherAfterSeminar">
      <!--<app-bar title-name="OOAD-讨论课报告" back-path="/TeacherSeminar"></app-bar>-->
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
      <div class="table-title">
        <span>对象模型课后报告</span>
      </div>
      <div class="main-content">
        <mu-paper :z-depth="1">
          <mu-data-table :columns="columns" :data="reports" stripe>
            <template slot-scope="scope">
              <td>{{classSerial+'-'+scope.row.teamEntity.teamSerial}}</td>
              <td style="text-align: left">{{scope.row.path}}</td>
              <td style="text-align: left">{{scope.row.reportGrade}}&nbsp;&nbsp;<el-button size="mini" type="text">修改</el-button> </td>
            </template>
          </mu-data-table>
        </mu-paper>
      </div>
      <div class="button-panel">
        <el-button type="primary">批量下载</el-button><br/>
        <el-button type="primary">确认修改</el-button>
      </div>
    </div>
</template>

<script>
  import AppBar from '../../ReuseComponents/AppBar'
    export default {
        name: "TeacherAfterSeminar",
      components:{
          AppBar
      },
      data(){
          return{
            iconClass:'back-icon-use',
            courseId:'',
            classId:'',
            seminarId:'',
            roundId:'',
            classSerial:'',
            klassSeminarId:'',
            columns:[
              {title:'小组名称',name:'groupName'},
              {title:'书面报告',name:'afterReport'},
              {title:'报告得分',name:'reportGrade'}
            ],
            reports:[
              {
                groupName:'咕咕鸟',
                afterReport:'dwdwdw',
                reportGrade:'5'
              },
              {
                groupName:'咕咕鸟',
                afterReport:'dwdwdw',
                reportGrade:'5'
              }
            ]
          }
      },
      created() {
          this.$data.roundId=this.$route.query.roundId;
          this.$data.courseId=this.$route.query.courseId;
          this.$data.klassSeminarId=this.$route.query.klassSeminarId;
          this.$data.classId=this.$route.query.classId;
          this.$data.seminarId=this.$route.query.seminarId;
          this.$data.classSerial=this.$route.query.classSerial;
          // this.loadAttendance();
          this.loadRoundTeams();
          // this.loadSeminarRepot();
      },
      methods:{
        linkBack(){
          this.$router.push({path:'/TeacherSeminar',query:{klassSeminarId:this.$data.klassSeminarId,roundId:this.$data.roundId,
            courseId:this.$data.courseId,
            classId:this.$data.classId,
            seminarId:this.$data.seminarId,
            classSerial:this.$data.classSerial}})
        },
        loadAttendance(){
          let _this=this;
          this.$axios({
            method:'get',
            url:'/attendance/'+this.$data.klassSeminarId
          }).then(function (response) {

          })
        },
        loadRoundTeams(){
          let _this=this;
          this.$axios({
            method:'get',
            url:'/attendance/'+this.$data.klassSeminarId
          }).then(function (response) {
            _this.$data.reports.splice(0,_this.$data.reports.length);
            _this.$data.reports=response.data;
            _this.loadSeminarRepot();
          })
        },
        loadSeminarRepot(){
          for(let index=0;index<this.$data.reports.length;index++) {
            let _this = this;
            this.$axios({
              method: 'get',
              url: '/attendance/' + this.$data.reports[index].id + '/report'
            }).then(function (response) {
              _this.$data.reports[index].file=response.data.file;
              _this.$data.reports[index].path=response.data.path;
              _this.$data.reports[index].reportScore='';
            })
          }
        }
      }
    }
</script>

<style lang="less">
#TeacherAfterSeminar{
  padding: 1px;


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



  .table-title{
    margin-top: 10px;
    text-align: left;
    font-size: 25px;
    margin-left: 4vw;
    /*color: dodgerblue;*/
    /*font-weight: bold;*/
  }

  .button-panel{
    margin-top: 3vh;
    width: 80%;
    margin-left: auto;
    margin-right: auto;

    .el-button{
      margin-top: 1vh;
      width: 100%;
    }
  }


  .main-content{
    margin-top: 10px;
  }
}
</style>
