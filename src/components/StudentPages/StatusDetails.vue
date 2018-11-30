<template>
  <div >
    <back-bar titleName="OOAD-讨论课" :showMessages="false" backUrl="/StuSeminarDetails"></back-bar>

    <div class="statusDetailsBack animated fadeInRight" >
      <mu-paper :z-depth="1" class="demo-list-wrap" v-if="false">
        <mu-list v-for="option in registerOrder" :key = "option.teamid">
          <mu-list-item class="listItem" button ripple="true" style="font-size: 18px;">
            <mu-list-item-action>
              {{option.order}}
            </mu-list-item-action>
            <mu-list-item-title style="margin-left: 20%;font-size: 20px">{{option.teamid}}</mu-list-item-title>
          </mu-list-item>
        </mu-list>
        <mu-divider></mu-divider>
      </mu-paper>


      <mu-paper :z-depth="1" class="demo-list-wrap">
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

    </div>
  </div>
</template>

<script>
  import BackBar from '../ReuseComponents/BackBar'
    export default {
        name: "StatusDetails",
      components:{
        BackBar,
      },
      data(){
          return {
            downloadFlag:false,
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
            ]

          }
      },
      methods: {
          download(){
            this.$data.downloadFlag=true;
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
