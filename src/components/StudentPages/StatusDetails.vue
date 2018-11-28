<template>
  <div >
    <back-bar titleName="OOAD-讨论课" :showMessages="false" backUrl="/StuMainSeminars"></back-bar>

    <div class="statusDetailsBack animated fadeInRight" >
      <mu-paper :z-depth="1" class="demo-list-wrap">
        <mu-list v-for="option,index in registerOrder">
          <mu-list-item class="listItem" button ripple="true" style="font-size: 18px;">
            <mu-list-item-action>
              {{option.order}}
            </mu-list-item-action>
            <mu-list-item-title style="margin-left: 20%;font-size: 20px">{{option.teamid}}</mu-list-item-title>
          </mu-list-item>
        </mu-list>
        <mu-divider></mu-divider>
      </mu-paper>

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
      methods: {

      }

    }
</script>

<style scoped>
  .statusDetailsBack{
    margin-top: 12vh;
  }
  /*mu-list-item:nth-child(even){*/
    /*background-color: burlywood;*/
  /*}*/

</style>
