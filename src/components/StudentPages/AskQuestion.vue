<template>
    <div>
      <back-bar :titleName="title" :showMessages="false" backUrl="/StuSeminarDetails"> </back-bar>

      <div class="statusDetailsBack animated fadeInRight" >
      <div class="titleN" align="left"> 当前展示小组 :&emsp; &emsp;{{currentTeam}}</div>
        <mu-paper :z-depth="1" class="demo-list-wrap">
          <mu-list v-for="option in registerOrder" :key = "option.teamid">
            <mu-list-item class="listItem" button ripple="true" style="font-size: 18px;">
              <mu-list-item-action>
                {{option.order}}
              </mu-list-item-action>
              <mu-list-item-title style="margin-left: 35%;font-size: 20px">{{option.teamid}}</mu-list-item-title>
            </mu-list-item>
          </mu-list>
          <mu-divider></mu-divider>
        </mu-paper>

        <mu-button class="askQ" color="success"  @click="askQuestion">发起提问</mu-button>

        <mu-dialog title="Dialog" width="360" :open.sync="questionFlag">
          <mu-button slot="actions" flat color="primary" @click="questionFlag=!questionFlag">Close</mu-button>
        </mu-dialog>

      </div>
    </div>
</template>

<script>
  import BackBar from '../ReuseComponents/BackBar'
  export default {
        name: "AskQuestion",
      components:{
          BackBar,
      },
      data() {
        return {
          title:'OOAD-讨论课',
          currentTeam:'第二组',
          questionFlag:false,
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
          ]


        }
      },
      methods:{
          askQuestion(){
            this.$data.questionFlag=true;
          }

      }
    }
</script>

<style scoped>
  .statusDetailsBack{
    margin-top: 12vh;
  }
  .titleN{
    padding-left: 3vw;
    font-size: 25px;
    box-shadow: 0 1px 0.2px 0 rgba(0, 0, 0, 0.2), 0 2px 20px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 2vh;
  }
  .askQ{
    font-size: 18px;
    margin-top: 12vh;
    width: 100%;
    height:6vh;
    opacity: 0.9;
  }



</style>
