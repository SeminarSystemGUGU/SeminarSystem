<template>
  <div align="center">
    <back-bar titleName="我的成绩" :showMessages="true" :showBackBar="true" backUrl="/StuMyCourses"></back-bar>

    <div class="contenT animated fadeInRight" style="z-index:1;max-width: 600px;" >
      <div class="panel-group "  id="accordion" align="left" >
        <div class="title">
          我的成绩  <span v-if="state===0">(未组队)</span>
        </div>
        <!--<div class="panel panel-default"  v-for="option,index in rounds" :key="index">-->
          <!--<div class="panel-heading" data-toggle="collapse" data-parent="#accordion"    onclick="">-->
            <!--{{option.roundName}}-->
            <!--<span v-if="option.scoreEntities===null">当前成绩为空</span>-->
          <!--</div>-->
          <!--<div  class="panel-collapse collapse in" >-->
            <!--<div class="panel-body" style="padding:1vh 0;">-->
              <!--<div class="subContent" v-for="item,index in option.scoreEntities" :key="index">-->
                <!--<span class="subItem"  data-toggle="collapse"  data-target="#demo11"  onclick="">{{item.seminarEntity.seminarName}}</span>-->
                <!--<div id="demo11" class="collapse in" style="margin-top: 1vh;">-->
                  <!--<table class="table table-bordered">-->
                    <!--<thead>-->
                    <!--<tr>-->
                      <!--<th>展示</th>-->
                      <!--<th>提问</th>-->
                      <!--<th>报告</th>-->
                      <!--<th>本轮成绩</th>-->
                    <!--</tr>-->
                    <!--</thead>-->
                    <!--<tbody>-->
                    <!--<tr>-->
                      <!--<td>{{item.presentationScore}}</td>-->
                      <!--<td>{{item.questionScore}}</td>-->
                      <!--<td>{{item.reportScore}}</td>-->
                      <!--<td>{{item.totalScore}}</td>-->
                    <!--</tr>-->
                    <!--</tbody>-->
                  <!--</table>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      </div>
      <el-collapse v-model="activeName" accordion align="left"  v-if="state===1">
        <el-collapse-item :title="'第'+option.roundSerial+'轮'" :name="index"  v-for="option,index in rounds" :key="index">
          <el-collapse v-model="active" accordion align="left" style="width: 90%;margin-left: 3vw;">
            <span v-if="option.scoreEntities===''">当前成绩为空</span>
            <el-collapse-item :title="item.seminarEntity.seminarName"    v-for="item,index in option.scoreEntities" :key="index">
              <div  style="margin-top: 1vh;">
                <table class="table " style="width:90%;margin-left:3vw;">
                  <thead>
                  <tr>
                    <th>展示</th>
                    <th>提问</th>
                    <th>报告</th>
                    <th>本轮成绩</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>{{item.presentationScore}}</td>
                    <td>{{item.questionScore}}</td>
                    <td>{{item.reportScore}}</td>
                    <td>{{item.totalScore}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-collapse-item>
      </el-collapse>

    </div>
  </div>
</template>

<script>
  import BackBar from '../../ReuseComponents/BackBar'
  export default {
    name: "MyGrades",
    components:{
      BackBar,
    },
    created(){
      this.$data.courseId=this.$route.query.courseId;

      let tt=this;
      this.$axios({
        method:'get',
        url:'/course/'+tt.$data.courseId+'/team',
      }).then(function (response) {
        tt.$data.teamId = response.data.teamId;
        if (tt.$data.teamId === ''||tt.$data.teamId ===null) {
          tt.$data.state=0;
          tt.$toast.error("未组队，还没有成绩");
        }
        else{
          tt.$data.state=1;
          let _this = tt;
          tt.$axios({
            method: 'get',
            url: '/course/' + _this.$data.courseId + '/round',
          }).then(function (response) {
            let i;
            for (i = 0; i < response.data.length; i++) {
              _this.$data.rounds.push({
                roundSerial: response.data[i].roundSerial,
                roundId: response.data[i].id,
                scoreEntities: '',
              });
            }
            let j;
            for (j = 0; j < response.data.length; j++) {
              let x=j;
              let t = _this;
              _this.$axios({
              method: 'get',
              url: '/round/' + response.data[x].id + '/team/' + t.$data.teamId + '/roundscore',
              params: {
                courseId: t.$data.courseId,
              }
              }).then(function (response) {
                t.$data.rounds[x].scoreEntities = response.data.seminarScoreEntities;
              })
           }
            console.log(_this.$data.rounds);
          })
      }
      });
    },
    data(){
      return{
        // title:"",
        teamId:-1,
        state:'',
        courseId:-1,
        rounds:[],
        activeName:'',
        active:'',
      }
    },
    methods:{
      backTo(){
        this.$router.push('/StuMyCourses')
      }

    }
  }
</script>

<style lang="less">
  #accordion{
    margin-top: 13vh;
    width:100%;
  }
  .title{
    font-size: 22px;
    /*border-bottom: 1px solid ;*/
    margin-bottom: 2vh;
    margin-left:3vw ;
  }
  .panel-heading{
    /*border-radius: 10px;*/
    border-bottom: 0.5px solid gray;
    width: 100%;
    height:6vh;
    font-size: 20px;
    background-color: white;
  }
  .panel-body{
    border:0;
  }
  .panel{
    border:0;
  }
  .subContent{
    width:90%;
    margin-top: 1vh;
    padding: 2vh 3vw 1px;
    width: 100%;
    /*background-color: #c7e1f0;*/
    border-radius: 5px;
    min-height: 6vh;
  }
  .subItem{
    color:gray;
    font-size: 14px;
  }
  .el-collapse-item__header{
    padding-left: 3vw;
    font-size: 18px;

  }

  @media screen and (min-width: 481px ){
    .title{
      font-size: 30px;
    }
    .panel-heading{
      font-size: 25px;
      padding-left: 4vw;
    }
    .subItem{
      font-size: 20px;
      margin-left: 1vw;
    }
    table{
      margin-left: 2vw;
      font-size: 20px;
    }

  }
  @media screen and (min-width: 1024px ){
    .contenT {
      margin-top: 13vh;
    }
  }

</style>
