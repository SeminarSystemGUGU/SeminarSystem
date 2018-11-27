<template>
  <div>
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


    <div class="animated bounceInRight" style="margin-top: 10vh;width:90%;">
      <mu-text-field v-model="teamName" label="小组名" ></mu-text-field>


    </div>

  </div>
</template>

<script>
    export default {
        name: "CreateTeam",
      data(){
        return{
          title:"创建小组",
          teamName:"",
        }
      },
      methods:{
        backTo(){
          this.$router.push('/StuMyTeam');
        },
      }
    }
</script>

<style scoped>

</style>
