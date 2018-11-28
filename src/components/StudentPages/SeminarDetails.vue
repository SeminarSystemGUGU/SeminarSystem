<template>
    <div>
      <back-bar :titleName="seminarDetails.title" :showMessages="false" backUrl="/StuMainSeminars"></back-bar>

      <div class="seminarDetailsBack animated fadeInRight" align="left">
        <span style="margin-left: 2vw;font-size: 25px;">{{seminarDetails.name}}</span>
        <mu-list  toggle-nested class="infoList">
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

          <mu-divider class="" style="height: 5px;"></mu-divider>
          <mu-list-item avatar :ripple="false" button>
            <mu-list-item-content >
              <mu-list-item-title>课程情况</mu-list-item-title>
              <mu-list-item-sub-title >
                {{seminarDetails.status}}
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-button flat color="success" @click="showStatusDetails">查看详情</mu-button>
          </mu-list-item>
        </mu-list>

        <mu-button class="inSeminar" color="success"  @click="inSeminar">进入讨论课</mu-button>
      </div>
    </div>
</template>

<script>
  import BackBar from '../ReuseComponents/BackBar'
    export default {
        name: "SeminarDetails",
      components:{
          BackBar,
      },
      data(){
          return{
            open:'send',
              seminarDetails:{
                title:"OOAD-讨论课",
                name:'业务流程分析',
                roundID:2,
                classOrder:'第二次',
                requiement:'不上课了 We should eat this: Grate, Squash, Corn, and tomatillo Tacos.sdasdasd',
                status:'正在进行',

              }
          }
      },
      methods:{
          showStatusDetails(){
            this.$router.push('/StuStatusDetails');
          },
        inSeminar(){
            this.$router.push('/StuAskQuestion');
        }
      }
    }
</script>

<style lang="less">
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
  .inSeminar{
    font-size: 18px;
    margin-top: 22vh;
    width: 100%;
    height:6vh;
    opacity: 0.9;
  }

</style>
