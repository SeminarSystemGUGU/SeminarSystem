<template>
  <div>
    <back-bar :titleName="title":showMessages="true" :showBackBar="true" backUrl="/StuSeminarDetails"></back-bar>

    <div class="changeRegisterBack animated fadeInRight" >
      <mu-paper :z-depth="1" class="demo-list-wrap" >
        <mu-list v-for="option in registerOrder" :key = "option.order">
          <mu-list-item class="listItem" button :ripple="false" style="font-size: 18px;">
            <mu-list-item-action>
              {{option.order}}
            </mu-list-item-action>
            <mu-list-item-title style="margin-left: 35%;font-size: 20px">
              {{option.teamid}}  <mu-button flat color="success" v-if="option.teamid==''" class="btR" @click="changeFlag=!changeFlag">可报名</mu-button>
            </mu-list-item-title>
          </mu-list-item>
        </mu-list>
        <mu-divider></mu-divider>
      </mu-paper>

      <mu-button class="cancleR" slot="actions" color="error" @click="cancleFlag=!cancleFlag">取消报名</mu-button>

      <mu-dialog title="确认报名" width="360" :open.sync="changeFlag">
        {{title}}&emsp;&emsp;{{registerOrder[0].order}}
        <mu-button slot="actions" flat color="success" @click="changeFlag=!changeFlag">Sure</mu-button>
        <mu-button slot="actions" flat color="primary" @click="changeFlag=!changeFlag">Close</mu-button>
      </mu-dialog>

      <mu-dialog title="取消报名" width="360" :open.sync="cancleFlag">
        <mu-button slot="actions" flat color="success" @click="cancleFlag=!cancleFlag">Sure</mu-button>
        <mu-button slot="actions" flat color="primary" @click="cancleFlag=!cancleFlag">Close</mu-button>
      </mu-dialog>

    </div>

  </div>
</template>

<script>
  import BackBar from '../../ReuseComponents/BackBar'
    export default {
        name: "ChangeRegister",
      components:{
        BackBar,
      },
      data(){
          return {
            changeFlag:false,
            cancleFlag:false,
            title:'OOAD-讨论课',
            registerOrder:[
              {
                order:"第一组",
                teamid:"1-1",
              },
              {
                order:"第二组",
                teamid:"",
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
            ],

          }
      }
    }
</script>

<style scoped>
  .changeRegisterBack{
    margin-top: 12vh;
  }
  .btR{
    margin-left: -24px;
    margin-top: -5px;
  }
  .cancleR{
    font-size: 18px;
    margin-top: 8vh;
    width: 100%;
    height:6vh;
    opacity: 0.9;
  }

</style>
