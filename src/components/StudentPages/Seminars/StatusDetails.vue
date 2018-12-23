<template>
  <div >
    <back-bar titleName="OOAD-讨论课" :showMessages="true" :showBackBar="true" :backUrl="{path:'/StuSeminarDetails',query:{courseId:courseId,seminarId:seminarId,klassId:klassId}}"></back-bar>

    <div class="statusDetailsBack animated fadeInRight" >
      <!--讨论课已经结束-->
      <mu-paper :z-depth="1" class="demo-list-wrap" v-if="status==3">
        <mu-list v-for="option in registerOrder" :key = "option.teamid">
          <mu-list-item class="listItem" button :ripple="true" style="font-size: 18px;">
            <mu-list-item-action>
              {{option.order}}
            </mu-list-item-action>
            <mu-list-item-title style="margin-left: 20%;font-size: 20px">{{option.teamid}}</mu-list-item-title>
          </mu-list-item>
        </mu-list>
        <mu-divider></mu-divider>
      </mu-paper>

      <!--正在进行讨论课-->
      <mu-paper :z-depth="1" class="demo-list-wrap" v-if="status==2">
        <mu-list v-for="option in ppt" :key = "option.order">
          <mu-list-item class="listItem" button :ripple="false" style="font-size: 18px;">
            <mu-list-item-action>
              {{option.order}}
            </mu-list-item-action>
            <mu-list-item-title style="margin-left: 20%;font-size: 20px;height:8vh;">
              <mu-button flat color="success" style="margin-top: 1vh;"large @click="download">{{option.pptName}}</mu-button>
            </mu-list-item-title>
          </mu-list-item>
        </mu-list>
        <mu-divider></mu-divider>
      </mu-paper>
      <mu-dialog title="提示" width="360" :open.sync="downloadFlag">
        是否下载该PPT!
        <mu-button slot="actions" flat color="success" @click="downloadFlag=!downloadFlag">Sure</mu-button>
        <mu-button slot="actions" flat color="primary" @click="downloadFlag=!downloadFlag">Close</mu-button>
      </mu-dialog>

      <!--报名阶段-->
      <mu-paper :z-depth="1" class="demo-list-wrap" v-if="status==1">
        <mu-list v-for="option in registerOrder" :key = "option.order">
          <mu-list-item class="listItem" button :ripple="false" style="font-size: 18px;">
            <mu-list-item-action>
              {{option.order}}
            </mu-list-item-action>
            <mu-list-item-title style="margin-left:35%;font-size: 20px;">{{option.teamid}}
              <mu-button flat color="success" style="margin-top:-2vh;margin-left: -10%;"large @click="register" v-if="option.teamid==''">可报名</mu-button>
            </mu-list-item-title>
          </mu-list-item>
        </mu-list>
        <mu-divider></mu-divider>
      </mu-paper>

      <mu-dialog title="提示" width="360" :open.sync="registerFlag">
        确认报名？
        <mu-button slot="actions" flat color="success" @click="enroll">Sure</mu-button>
        <mu-button slot="actions" flat color="primary" @click="registerFlag=!registerFlag">Close</mu-button>
      </mu-dialog>



    </div>
  </div>
</template>

<script>
  import BackBar from '../../ReuseComponents/BackBar'
    export default {
        name: "StatusDetails",
      components:{
        BackBar,
      },
      created(){
        this.$data.klassId=this.$route.query.klassId;
        this.$data.seminarId=this.$route.query.seminarId;

        let _this=this;    //根据courseId获取该课程讨论课列表
        this.$axios({
          method:'get',
          url:'/seminar/'+_this.$data.seminarId+'/class/'+_this.$data.klassId,
        }).then(function(response){
          _this.$data.courseId=response.data.seminarEntity.courseId;
          _this.$data.klassSeminarId=response.data.klassSeminarId;

          let t=_this;           //报名情况
          _this.$axios({
            method:'get',
            url:'/attendance/'+t.$data.klassSeminarId,
          }).then(function (response) {
            t.$data.enrollTeams=response.data;
          })
        });
      },
      data(){
          return {
            status:1,
            courseId:-1,
            klassId:-1,
            seminarId:-1,
            klassSeminarId:-1,

            enrollTeams:[],   //报名情况

            downloadFlag:false,
            registerFlag:false,
            registerOrder:[
              {
                order:"第一组",
                teamid:"1-1",
              },
              {
                order:"第二组",
                teamid:"1-2",
              },
              {
                order:"第三组",
                teamid:"1-3",
              },
              {
                order:"第四组",
                teamid:"1-4",
              },
              {
                order:"第五组",
                teamid:"1-5",
              },
              {
                order:"第六组",
                teamid:"1-6",
              },
            ],
            ppt:[
              {
                order:"第一组",
                pptName:"1-1业务流程.ppt",
              },
              {
                order:"第二组",
                pptName:"1-2业务流程.ppt",
              },
              {
                order:"第三组",
                pptName:"1-3业务流程.ppt",
              },
              {
                order:"第四组",
                pptName:"1-4业务流程.ppt",
              },
              {
                order:"第五组",
                pptName:"1-5业务流程.ppt",
              },
              {
                order:"第六组",
                pptName:"1-6业务流程.ppt",
              },
            ],
            registerOrder:[
              {
                order:"第一组",
                teamid:"",
              },
              {
                order:"第二组",
                teamid:"1-2",
              },
              {
                order:"第三组",
                teamid:"1-3",
              },
              {
                order:"第四组",
                teamid:"1-4",
              },
              {
                order:"第五组",
                teamid:"",
              },
              {
                order:"第六组",
                teamid:"1-6",
              },
            ]

          }
      },
      methods: {
          download(){
            this.$data.downloadFlag=true;
          },
          register(){
            this.$data.registerFlag=true;
          },
        enroll(){
            this.$axios({
              method:'post',
              url:'/attendance',
              data:{
                klassSeminarId:this.$data.klassSeminarId,
                teamId:1,
                teamOrder:1,
              }
            }).then(function (response) {
            });
            this.$data.registerFlag=!this.$data.registerFlag;
        }

      }

    }
</script>

<style lang="less">
  .statusDetailsBack{
    margin-top: 12vh;
  }
  /*.listItem:nth-child(even){*/
    /*background-color: burlywood;*/
  /*}*/

</style>
