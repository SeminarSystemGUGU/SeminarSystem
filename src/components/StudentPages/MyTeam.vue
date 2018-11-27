<template>
  <div align="center">
    <back-bar titleName="我的组队" :showMessages="false" backUrl="/StuMyCourses"></back-bar>

    <div class="animated fadeInRight">
    <div class="panel-group" id="accordion" align="left" >
      <div class="title">
        我的队伍
      </div>
      <div v-if="!createFlag">当前未组队</div>
      <div class="panel panel-default" v-if="createFlag">
        <div class="panel-heading" data-toggle="collapse" data-parent="#accordion"  href="#collapseOne">
          {{teamName}}
        </div>
        <div id="collapseOne" class="panel-collapse collapse in" >
          <div class="panel-body" style="padding:1vh 0;">
            <div class="subContent">
              <span class="subItem"  data-toggle="collapse"  data-target="#demo11"></span>
              <div id="demo11" class="collapse in" style="margin-top: 1vh;">
                <table class="table table-bordered">
                  <thead>
                  <tr>
                    <th></th>
                    <th>学号</th>
                    <th>姓名</th>
                    <th>相关课程</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>组长</td>
                    <td>{{leaderID}}</td>
                    <td>{{leaderName}}</td>
                    <td>J2EE</td>
                  </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--其他队伍-->
      <div class="title" style="border-bottom: 1px solid palegoldenrod;">
        其他队伍
      </div>
      <div class="panel panel-default" style="border: 0;">
        <div class="panel-heading" data-toggle="collapse" data-parent="#accordion"  href="#collapseTwo">
          {{teamName}}
        </div>
        <div id="collapseTwo" class="panel-collapse collapse">
          <div class="panel-body" style="padding:1vh 0;">
            <div class="subContent">
              <span class="subItem"  data-toggle="collapse"  data-target="#demo21"></span>
              <div id="demo21" class="collapse in">
                Nihil anim keffiyeh helvetica, craft beer labore wes anderson
                cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
                vice lomo.
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--未组队学生-->
      <div class="title" style="width:40vw;border-bottom: 1px solid coral;">
        未组队学生
      </div>


      <div class="subContent">
        <span class="subItem"  data-toggle="collapse"  data-target="#demo31">asdasdas</span>
        <div id="demo31" class="collapse in">
          Nihil anim keffiyeh helvetica, craft beer labore wes anderson
          cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
          vice lomo.
        </div>
      </div>

      <mu-button class="butnCT" color="success" @click="createTeam">创建小组<i class="el-icon-circle-plus-outline" style="margin-left: 3vw;"/></mu-button>
    </div>

   </div>
  </div>
</template>

<script>
  import BackBar from '../ReuseComponents/BackBar'
  export default {
    name: "MyTeam",
    components:{
      BackBar,
    },
    data(){
      return{
        title:"OOAD",
        createFlag:false,    //是否有组
        teamName:"1-6  咕咕鸟",
        leaderName:'Li',
        leaderID:'110',
      }
    },
    methods:{
      createTeam(){
        this.$router.push('/CreateTeam');
      }
    }
  }
</script>

<style scoped>
  #accordion{
    margin-top: 13vh;
    width:90%;
  }
  .title{
    width:31vw;
    color:#96c4e6;
    font-size: 22px;
    border-bottom: 1px solid #67C23A;
    margin-bottom: 2vh;
    margin-top: 1vh;
  }
  .panel-heading{
    border-radius: 5px;
    width: 100%;
    height:6vh;
    font-size: 20px;
    background-color:#96c4e6;
  }
  .panel-body{
    border:0;
  }
  .panel{
    border:0;
    margin-bottom: 2vh ;
  }
  .subContent{
    margin-top: 1vh;
    padding: 2vh 3vw 1px;
    width: 100%;
    background-color: #c7e1f0;
    border-radius: 5px;
    min-height: 6vh;
  }
  .subItem{
    color:gray;
    font-size: 14px;
  }
  .butnCT{
    font-size: 18px;
    margin-top: 10vh;
    width: 100%;
    height:6vh;
    opacity: 0.9;
  }
  @media screen and (min-width: 481px ){

  }

</style>
