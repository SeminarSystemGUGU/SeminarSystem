<template>
  <div align="center">
    <div class="bar animated bounce fadeIn">
      <div class="reset-app-bar">
        <div class="app-button" @click="backTo">
          <i class="el-icon-back"></i>
        </div>
        <div class="app-bar-title">
          <span>{{title}}</span>
        </div>
      </div>
    </div>

    <div class="animated bounceInRight">
    <div class="panel-group " id="accordion" align="left">
      <div class="title">
        我的成绩
      </div>
      <div class="panel panel-default">
        <div class="panel-heading" data-toggle="collapse" data-parent="#accordion"  href="#collapseOne">
          {{round}}
        </div>
        <div id="collapseOne" class="panel-collapse collapse in" >
          <div class="panel-body" style="padding:1vh 0;">
            <div class="subContent">
              <span class="subItem"  data-toggle="collapse"  data-target="#demo11">{{seminarName}}</span>
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
              <span class="subItem"  data-toggle="collapse"  data-target="#demo12">{{seminarName}}</span>
              <div id="demo12" class="collapse in" style="margin-top: 1vh;">
                Nihil anim keffiyeh helvetica, craft beer labore wes anderson
                cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
                vice lomo.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="panel panel-default" style="border: 0;">
        <div class="panel-heading" data-toggle="collapse" data-parent="#accordion"  href="#collapseTwo">
          {{round}}
        </div>
        <div id="collapseTwo" class="panel-collapse collapse">
          <div class="panel-body" style="padding:1vh 0;">
            <div class="subContent">
              <span class="subItem"  data-toggle="collapse"  data-target="#demo21">{{seminarName}}</span>
              <div id="demo21" class="collapse in">
                Nihil anim keffiyeh helvetica, craft beer labore wes anderson
                cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
                vice lomo.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading" data-toggle="collapse" data-parent="#accordion"  href="#collapseThree">
          {{round}}
        </div>
        <div id="collapseThree" class="panel-collapse collapse">
          <div class="panel-body" style="padding:1vh 0;">
            <div class="subContent">
              <span class="subItem"  data-toggle="collapse"  data-target="#demo31">{{seminarName}}</span>
              <div id="demo31" class="collapse in">
                Nihil anim keffiyeh helvetica, craft beer labore wes anderson
                cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
                vice lomo.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button class="exportGrades">导出成绩</button>

    </div>
  </div>
</template>

<script>


  export default {
    name: "MyGrades",
    components:{

    },
    data(){
      return{
        title:"OOAD",
        round:"第一轮",
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
    width:90%;
  }
  .title{
    width:31vw;
    color:#96c4e6;
    font-size: 30px;
    border-bottom: 1px solid #67C23A;
    margin-bottom: 2vh;
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
  .exportGrades{
    width:90%;
    height:6vh;
    color: white;
    opacity: 0.7;
    margin-top: 10vh;
    background-color: #67C23A;
    border: 0;
    border-radius: 5px;
    font-size: 22px;
  }
  @media screen and (min-width: 481px ){

  }

</style>
