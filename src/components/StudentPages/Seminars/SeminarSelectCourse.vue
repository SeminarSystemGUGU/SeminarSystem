<template>
  <div>
    <back-bar titleName="课程列表" :showMessages="true" :showBackBar="true" backUrl="/StuMainPage"></back-bar>

    <div  class="animated fadeInRight" align="left">
      <div class="container" v-for="option in courses">
            <div class="itemTitle" @click="linkToSeminars(option.id,option.klassId)">
              <i class="el-icon-document"/>
              {{option.courseName}}&emsp;
              <i class="el-icon-arrow-right" style="float: right;margin-right: 5vw;margin-top: 0.6vh "/>
            </div>
      </div>
    </div>

  </div>
</template>

<script>
  import BackBar from '../../ReuseComponents/BackBar'
    export default {
        name: "SeminarSelectCourse",
      components:{
        BackBar,
      },
      created(){
        let _this=this;
        this.$axios({
          method:'get',
          url:'/course',
        }).then(function(response){
          _this.$data.courses=response.data;
        },function(error){
          alert(error);
        });
      },
      data(){
        return{
          courses:[],
          title:"讨论课",
        }
      },

      methods:{
        linkToSeminars(courseId,klassId){
          this.$router.push({path:'/StuMainSeminars',query:{courseId:courseId,klassId:klassId}});
        }

      }
    }
</script>

<style scoped>

  .container  {
    width: 100%;
    /*height: 20vh;*/
    position: relative;
    border-radius: 5px;
    margin-top: 2vh;
  }
  .container:nth-child(1){
    margin-top: 10vh;
  }
  .itemTitle{
    /*padding-top: 10px;*/
    padding-left: 4vw;
    line-height: 7vh;
    width: 100%;
    height:7vh;
    font-size: 20px;
    box-shadow: 0 1px 0.2px 0 rgba(0, 0, 0, 0.2), 0 2px 20px 0 rgba(0, 0, 0, 0.1);

  }

  @media screen and (min-width: 481px ){
    .container:nth-child(1){
      margin-top: 13vh;
    }
    .itemTitle{
      /*padding-top: 13px;*/
      padding-left: 4vw;
      line-height: 6vh;
      height:6vh;
      font-size: 30px;
    }

  }
  @media screen and (min-width: 1024px ){
    .container:nth-child(1)  {
      margin-top: 13vh;
    }
    .itemTitle{
      /*padding-top: 10px;*/
      padding-left: 2vw;
      line-height: 7vh;
      width: 100%;
      height:7vh;
      font-size: 30px;
    }

  }
</style>
