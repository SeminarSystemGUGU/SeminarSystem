<template>
  <div align="center">
    <back-bar titleName="我的成绩" :showMessages="true" :showBackBar="true" backUrl="/StuMyCourses"></back-bar>

    <div class="animated fadeInRight" style="z-index:1;" >
    <div class="panel-group " id="accordion" align="left" >
      <div class="title">
        我的成绩
      </div>
      <div class="panel panel-default">
        <div class="panel-heading" data-toggle="collapse" data-parent="#accordion"  href="#collapseOne"  onclick="">
          {{rounds[0].roundName}}
        </div>
        <div id="collapseOne" class="panel-collapse collapse in" >
          <div class="panel-body" style="padding:1vh 0;">
            <div class="subContent">
              <span class="subItem"  data-toggle="collapse"  data-target="#demo11"  onclick="">{{rounds[0].seminars[0].seminarTopic}}</span>
              <div id="demo11" class="collapse in" style="margin-top: 1vh;">
                <table class="table table-bordered">
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
                    <td>5</td>
                    <td>5</td>
                    <td>5</td>
                    <td>5.0</td>
                  </tr>

                  </tbody>
                </table>
              </div>
            </div>

            <div class="subContent">
              <span class="subItem"  data-toggle="collapse"  data-target="#demo12"  onclick="">{{rounds[0].seminars[1].seminarTopic}}</span>
              <div id="demo12" class="collapse in" style="margin-top: 1vh;">
                <table class="table table-bordered">
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
                    <td>5</td>
                    <td>5</td>
                    <td>5</td>
                    <td>5.0</td>
                  </tr>

                  </tbody>
                </table>


              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="panel panel-default" style="border: 0;">
        <div class="panel-heading" data-toggle="collapse" data-parent="#accordion"  href="#collapseTwo">
          {{rounds[1].roundName}}
        </div>
        <div id="collapseTwo" class="panel-collapse collapse">
          <div class="panel-body" style="padding:1vh 0;">
            <div class="subContent">
              <span class="subItem"  data-toggle="collapse"  data-target="#demo21"  onclick="">{{rounds[1].seminars[0].seminarTopic}}</span>
              <div id="demo21" class="collapse in">
                Nihil anim keffiyeh helvetica, craft beer labore wes anderson
                cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
                vice lomo.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

      <mu-button class="exportGrades" color="success" >导出成绩</mu-button>

    </div>
  </div>
</template>

<script>
  import BackBar from '../ReuseComponents/BackBar'
  export default {
    name: "MyGrades",
    components:{
      BackBar,
    },
    data(){
      return{
        title:"OOAD",
        round:"第一轮",
        rounds:[
          {
            roundName:'第一轮',
            roundId:1,
            seminars:[
              {
                seminarTopic:'业务流程',
                seminarId:'1',
              },
              {
                seminarTopic:'关系模型',
                seminarId:'2',
              }
            ]
          },
          {
            roundName:'第二轮',
            roundId:2,
            seminars:[
              {
                seminarTopic:'controller',
                seminarId:'3',
              },
              {
                seminarTopic:'XXXX',
                seminarId:'4',
              }
            ]
          }
        ],
        seminarName:"业务流程",
      }
    },
    methods:{
      backTo(){
        this.$router.push('/StuMyCourses')
      }

    }
  }
</script>

<style scoped>
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
  .exportGrades{
    font-size: 18px;
    margin-top: 10vh;
    width: 90%;
    height:6vh;
    opacity: 0.9;
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
    .exportGrades{
      font-size: 25px;
      margin-top: 10vh;
    }
    table{
      margin-left: 2vw;
      font-size: 20px;
    }

  }

</style>
