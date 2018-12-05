<template>
    <div>
      <back-bar :titleName="title" :showMessages="true" :showBackBar="true" backUrl="/StuRegisteredSeminarDetails"></back-bar>

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
            <!--<mu-button flat color="success" @click="changeRegister">修改</mu-button>-->
          </mu-list-item>
          <mu-divider></mu-divider>

          <mu-list-item  textline="two-line" button  nested >
            <mu-list-item-title>成绩</mu-list-item-title>
            <mu-list-item-action>
              <i class="el-icon-arrow-down"></i>
            </mu-list-item-action >
            <mu-list-item-content button :ripple="false" slot="nested" class="requirContent">
                <el-table :data="seminarDetails.grades" style="width: 100%">
                  <el-table-column
                    prop="name"
                    label="得分项目"
                    width="200">
                  </el-table-column>
                  <el-table-column
                    prop="grade"
                    label="分数"
                    width="200">
                  </el-table-column>
                </el-table>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider></mu-divider>



        </mu-list>

      </div>

    </div>
</template>

<script>
  import BackBar from '../ReuseComponents/BackBar'
    export default {
        name: "CheckGrades",
      components:{
          BackBar,
      },
      data(){
          return{
            title:'OOAD-已报名',
            open:'send',
            seminarDetails:{
              title:"OOAD-讨论课",
              name:'业务流程分析',
              roundID:2,
              classOrder:'第二次',
              requiement:'不上课了 We should eat this: Grate, Squash, Corn, and tomatillo Tacos.sdasdasd',
              registerStatus:'2016(1)-第三组',
              grades:[
                {
                  name:"Question",
                  grade:5,
                },
                {
                  name:"Report",
                  grade:5
                },
                {
                  name:"Presentation",
                  grade:5,
                },
                {
                  name:"Total",
                  grade:5.0
                }
              ]
            },
          }
      }
    }
</script>

<style scoped>
  .seminarDetailsBack{
    margin-top: 12vh;
  }
  .infoList{
    margin-top: 2vh;
    border-top:5px solid lightgray;
    border-bottom: 0.5px solid lightgray;
  }
  .requirContent{
    margin: 5px 20px;
    height:auto;
  }

</style>
