<template>
  <div>
    <back-bar :titleName="title" :showMessages="true" :showBackBar="true" :backUrl="{path:'/SeminarSelectCourse',query:{courseID:courseId,klassId:klassId}}"></back-bar>

    <div  class="animated fadeInRight" align="left">
      <div v-if="allRounds.length===0" class="con">&emsp;当前没有讨论课</div>
      <div class="con" >
        <div class="container" v-for="option,index in  allRounds" :key="index">
          <div :class="sp1[option.seminars.length]">
            <div>
              <div class="itemTitle"> 第{{index+1}}轮</div>
              <div :class="sp3[option.seminars.length]">
                <!-- Content  -->
                <div class="subList" @click="linkToDetails(item.id)" v-for="item,index in option.seminars" :key="index">
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
        let x;
        for(x=0;x<response.data.length;x++)
        {
          _this.$data.allRounds.push({
            round:response.data[x],
            seminars:'',
          });
        }
        let i;
        for(i=0;i<_this.$data.allRounds.length;i++)
        {
          let ax=i;
          let _ts=_this;    //根据roundId获取该课程seminar列表
          _this.$axios({
            method:'get',
            url:'/round/'+_ts.$data.allRounds[i].round.id+'/seminar',
          }).then(function(response){
            _ts.$data.allRounds[ax].seminars=response.data;
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
        rounds:[],  //发布的讨论课所在round
        sp1:['','parent11','parent12','parent13','parent14','parent15'],
        sp3:['','parent31','parent32','parent33','parent34','parent35'],
      }
    },
    methods:{
      linkToDetails(seminarId){
        this.$router.push({path:'/StuSeminarDetails',query:{ courseId:this.$data.courseId,seminarId:seminarId,klassId:this.$data.klassId} });
      },
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
    position: relative;
    border-radius: 5px;
  }
  .parent11,.parent12,.parent13,.parent14,.parent15    {
    height: 8vh;
    overflow: hidden;
    transition-property: height;
    transition-duration: 1s;
    perspective: 1000px;
    transform-style: preserve-3d;
  }
  .parent31,.parent32,.parent33,.parent34,.parent35    {
    height: 8vh;
    transition-property: all;
    transition-duration: 1s;
    transform: rotateX(-90deg);
    transform-origin: top;
  }
  .container:hover .parent11   {
    height:13vh;
  }
  .container:hover .parent31   {
    transform: rotateX(0deg);
    height:13vh;
  }
  .container:hover .parent12  {
    height:20vh;
  }
  .container:hover .parent32   {
    transform: rotateX(0deg);
    height:20vh;
  }
  .container:hover .parent13   {
    height:27vh;
  }
  .container:hover .parent33   {
    transform: rotateX(0deg);
    height:27vh;
  }
  .container:hover .parent14   {
    height:34vh;
  }
  .container:hover .parent34   {
    transform: rotateX(0deg);
    height:34vh;
  }
  .container:hover .parent15   {
    height:41vh;
  }
  .container:hover .parent35   {
    transform: rotateX(0deg);
    height:41vh;
  }

  .itemTitle{
    /*padding-top: 10px;*/
    padding-left: 4vw;
    width: 100%;
    height:7vh;
    line-height: 7vh;
    color: #000;
    font-size: 22px;
    box-shadow: 0 1px 0.2px 0 rgba(0, 0, 0, 0.2), 0 2px 20px 0 rgba(0, 0, 0, 0.1);

  }

  .subList {
    /*padding-top: 1vh;*/
    padding-left: 3vw;
    margin-top: 10px;
    width: 100%;
    height: 5vh;
    line-height: 5vh;
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
      /*padding-top: 20px;*/
      padding-left: 4vw;
      line-height: 7vh;
      height:7vh;
      font-size: 33px;
    }

    .subList {
      /*padding-top: 1vh;*/
      padding-left: 3vw;
      margin-top: 10px;
      width: 100%;
      line-height: 5vh;
      height: 5vh;
      /*background-color: #c7e1f0;*/
      border-radius: 5px;
    }
    .subItem{
      color:gray;
      font-size: 25px;
    }

  }
  @media screen and (min-width: 1024px ){
    .con  {
      margin-top: 7vh;
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
