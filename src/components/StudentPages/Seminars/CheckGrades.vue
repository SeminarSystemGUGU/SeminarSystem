<template>
    <div>
      <back-bar :titleName="title" :showMessages="true" :showBackBar="true" :backUrl="{path:'/StuSeminarDetails',query:{courseId:courseId,seminarId:seminarId,klassId:klassId}}"></back-bar>
      <div class="seminarDetailsBack animated fadeInRight" align="left" >
        <span style="margin-left: 2vw;font-size: 25px;">{{seminarEntity.seminarName}}</span>
        <mu-list  toggle-nested class="infoList" style="border-bottom:5px solid  lightgray;">
          <mu-list-item avatar :ripple="false" button>
            <mu-list-item-content>
              <mu-list-item-title>轮次</mu-list-item-title>
              <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)"></mu-list-item-sub-title>
              <mu-list-item-sub-title>
                {{seminarEntity.roundID}}
              </mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider></mu-divider>
          <mu-list-item avatar :ripple="false" button>
            <mu-list-item-content>
              <mu-list-item-title>课次序号</mu-list-item-title>
              <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)"></mu-list-item-sub-title>
              <mu-list-item-sub-title>
                {{seminarEntity.seminarSerial}}
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
              <mu-list-item-content >{{seminarEntity.introduction}}</mu-list-item-content>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider></mu-divider>

          <mu-list-item avatar :ripple="false" button>
            <mu-list-item-content>
              <mu-list-item-title>报名情况</mu-list-item-title>
              <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)"></mu-list-item-sub-title>
              <mu-list-item-sub-title>
                <!--{{seminarDetails.registerStatus}}-->
              </mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider></mu-divider>

          <mu-list-item  textline="two-line" button  nested >
            <mu-list-item-title>成绩</mu-list-item-title>
            <mu-list-item-action>
              <i class="el-icon-arrow-down"></i>
            </mu-list-item-action >
            <mu-list-item-content button :ripple="false" slot="nested" class="requirContent">
                <el-table :data="grades" style="width: 100%">
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
  import BackBar from '../../ReuseComponents/BackBar'
    export default {
        name: "CheckGrades",
      components:{
          BackBar,
      },
      created(){
        this.$data.courseId=this.$route.query.courseId;
        this.$data.seminarId=this.$route.query.seminarId;
        this.$data.klassId=this.$route.query.klassId;
        this.getCourseInfo();
      },
      data(){
          return{
            title:'OOAD-已报名',
            open:'send',
            courseId:-1,
            klassId:-1,
            klassSeminarId:-1,
            seminarId:-1,
            seminarEntity:'',
            myTeam:'',
            scoreEntity:'',
            grades:[],

            // seminarDetails:{
            //   title:"OOAD-讨论课",
            //   name:'业务流程分析',
            //   roundID:2,
            //   classOrder:'第二次',
            //   requiement:'不上课了 We should eat this: Grate, Squash, Corn, and tomatillo Tacos.sdasdasd',
            //   registerStatus:'2016(1)-第三组',
            //   grades:[
            //     {
            //       name:"Question",
            //       grade:5,
            //     },
            //     {
            //       name:"Report",
            //       grade:5
            //     },
            //     {
            //       name:"Presentation",
            //       grade:5,
            //     },
            //     {
            //       name:"Total",
            //       grade:5.0
            //     }
            //   ]
            // },
          }
      },
      methods:{
          getCourseInfo(){
            let tt=this;
            this.$axios({
              method:'get',
              url:'/course/'+tt.$data.courseId+'/team',
            }).then(function (response) {
              tt.$data.myTeam=response.data;
            });
            let _this=this;
            this.$axios({
              method:'get',
              url:'/seminar/'+_this.$data.seminarId+'/class/'+_this.$data.klassId,
            }).then(function(response){
              _this.$data.seminarEntity=response.data.seminarEntity;
              let t=_this;      //获取成绩
              _this.$axios({
                method:'get',
                url:'/seminar/'+t.$data.seminarId+'/team/'+t.$data.myTeam.teamId+'/senimarscore',
              }).then(function (response) {
                t.$data.scoreEntity=response.data;
                t.$data.grades.push({name:'Presentation',grade:''});
                t.$data.grades.push({name:'Question',grade:''});
                t.$data.grades.push({name:'Report',grade:''});
              });
            },function(error){
              alert(error);
            });
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
