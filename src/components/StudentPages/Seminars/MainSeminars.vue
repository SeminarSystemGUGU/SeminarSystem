<template>
  <div>
    <back-bar :titleName="title" :showMessages="true" :showBackBar="true" :backUrl="{path:'/SeminarSelectCourse',query:{courseID:courseId,klassId:klassId}}"></back-bar>

    <div  class="animated fadeInRight" align="left" >
      <div class="con">
      <div class="container" v-for="option,index in  rounds">
        <div class="parent1">
          <div >
            <div class="itemTitle"> 第{{index+1}}轮</div>
            <div class="parent3">
              <!-- Content  -->
              <div class="subList" @click="linkToDetails(item.id)" v-for="item in option.seminars">
                <span class="subItem"  > <i class="el-icon-document"/>{{item.seminarName}}</span>
                <i style="float: right;margin-right: 5vw;margin-top: 1vh " class="el-icon-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>

  </div>
</template>

<script>
  import BackBar from '../../ReuseComponents/BackBar'
  export default {
    name: "MainSeminars",
    components:{
      BackBar,
    },
    created(){
      this.$data.courseId=this.$route.query.courseId;
      this.$data.klassId=this.$route.query.klassId;

      let _this=this;    //根据courseId获取该课程round列表
      this.$axios({
        method:'get',
        url:'/course/'+_this.$data.courseId+'/round',
      }).then(function(response){
        _this.$data.allRounds=response.data;

        let i;
        for(i=0;i<_this.$data.allRounds.length;i++)
        {
          let _ts=_this;    //根据roundId获取该课程seminar列表
          _this.$axios({
            method:'get',
            url:'/round/'+_ts.$data.allRounds[i].id+'/seminar',
          }).then(function(response){
            var tempRound= {
              // roundId: _ts.$data.allRounds[i].id,
              // roundName:'第'+_ts.$data.allRounds[i].id+'轮',
              seminars : response.data,
              };
            _ts.$data.rounds.push(tempRound);
          },function(error){
            alert("Seminar error！");
          });
        }
      },function(error){
        alert(error);
      });
    },
    data(){
      return{
        title:"讨论课",
        courseId:1,
        allRounds:[],    //当前课程下所有轮次
        klassId:-1,    //当前班级ID
        rounds:[
          // {
          //   roundName:'第一轮',
          //   roundId:1,
          //   seminars:[
          //     {
          //       seminarTopic:'业务流程',
          //       seminarID:1,
          //     },
          //     {
          //       seminarTopic:'关系模型',
          //       seminarID:2,
          //     }
          //   ]
          // },
          // {
          //   roundName:'第二轮',
          //   roundId:2,
          //   seminars:[
          //     {
          //       seminarTopic:'controller',
          //       seminarID:3,
          //     },
          //     {
          //       seminarTopic:'XXXX',
          //       seminarID:4,
          //     },
          //   ]
          // },
        ],  //发布的讨论课所在round
      }
    },
    methods:{
      linkToDetails(seminarId){
        this.$router.push({path:'/StuSeminarDetails',query:{ courseId:this.$data.courseId,seminarId:seminarId,klassId:this.$data.klassId} });
      },
      // linkToRegisteredDetails(){
      //   this.$router.push('/StuRegisteredSeminarDetails')
      // }
    }
  }
</script>

<style scoped>
  .con{
    color: grey;
    font-size: 20px;
    margin-top: 10vh;
  }
  .container  {
    width: 100%;
    /*height: 20vh;*/
    position: relative;
    border-radius: 5px;
  }
  .parent1    {
    height: 8vh;
    overflow: hidden;

    transition-property: height;
    transition-duration: 1s;
    perspective: 1000px;
    transform-style: preserve-3d;
  }
  .parent3    {
    height: 8vh;
    transition-property: all;
    transition-duration: 1s;
    transform: rotateX(-90deg);
    transform-origin: top;
  }
  .container:hover .parent1   {
    height: 21vh;
  }
  .container:hover .parent3   {
    transform: rotateX(0deg);
    height: 21vh;
  }

  .itemTitle{
    padding-top: 10px;
    padding-left: 4vw;
    width: 100%;
    height:7vh;
    color: #000;
    font-size: 22px;
    box-shadow: 0 1px 0.2px 0 rgba(0, 0, 0, 0.2), 0 2px 20px 0 rgba(0, 0, 0, 0.1);

  }

  .subList {
    padding-top: 1vh;
    padding-left: 3vw;
    margin-top: 10px;
    width: 100%;
    height: 5vh;
    /*background-color: #c7e1f0;*/
    border-radius: 5px;
  }
  .subItem{
    color:gray;
    font-size: 14px;
  }

  @media screen and (min-width: 481px ){
    .con  {
      margin-top: 10vh;
    }
    .itemTitle{
      padding-top: 20px;
      padding-left: 4vw;
      height:7vh;
      font-size: 33px;
    }

    .subList {
      padding-top: 1vh;
      padding-left: 3vw;
      margin-top: 10px;
      width: 100%;
      height: 5vh;
      /*background-color: #c7e1f0;*/
      border-radius: 5px;
    }
    .subItem{
      color:gray;
      font-size: 25px;
    }

  }

</style>
