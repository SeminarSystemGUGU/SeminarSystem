<template>
  <div id="SeminarCard">
    <el-card :class="seminarClass" :body-style="{'padding':'0'}">
      <div class="card-title">
        <p class="title-wid">{{seminarName}}</p>
      </div>
      <div class="back-image">
        <i class="el-icon-loading" v-if="status==='1'"></i>
        <img v-if="status==='2'" class="smile-img" src="../../assets/smile.png"/>
      </div>
      <div class="status-text">
        <span v-if="status==='1'">正在进行</span>
        <span v-if="status==='2'">已完成</span>
      </div>
      <div class="edit-panel">
        <i v-show="isMainCourse" class="el-icon-edit" @click="linkToModify"></i>
      </div>
      <div class="close-panel">
        <i v-show="isMainCourse" class="el-icon-close" @click="deleteSeminar"></i>
      </div>
    </el-card>
    <!--</div>-->
  </div>
</template>
<script>
    export default {
        name: "SeminarCard",
      props:['seminarName','endTime','seminarId','index','courseId','isMainCourse'],
      data(){
          return{
            // seminarName:'对象模型',
            status:'1',
            courseid:'',
            seminarClass:'seminar-card-doing',
            seminarClassFinished:'seminar-card-finished'
          }
      },
      created() {
          let date=new Date();
          let strDate=date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate();
          let compDate=this.$props.endTime.slice(0,10);
          if(strDate>compDate){
            this.$data.status='2';
          }
          console.log(this.$props.courseId);


          // console.log(compDate);
          // console.log(strDate);
      },
      mounted() {
        if(this.$data.status==='2'){
          this.$data.seminarClass=this.$data.seminarClassFinished
        }
      },
      methods:{
        deleteSeminar(){
          let _this=this;
          this.$axios({
            method:'delete',
            url:'/seminar/'+this.$props.seminarId
          }).then(function (response) {
            if(response.data===true){
              let data={
                index:_this.$props.index
              };
              _this.$emit('deleteSeminar',data);
            }
          })
        },
        linkToModify(){
          this.$router.push({path:'/TeacherModifySeminar',query:{courseId:this.$props.courseId,seminarId:this.$props.seminarId}})
        }

      },
    }
</script>

<style lang="less">
#SeminarCard{
  /*display: inline-block;*/
  .el-card{
    display: inline-block;
  }

  .title-wid{
    width: 95%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .seminar-card-doing{
    display: inline-block;
    /*background: -webkit-linear-gradient(right, #00b2ee, #63b8ff); !* Safari 5.1 - 6.0 *!*/
    /*background: -o-linear-gradient(right, #00b2ee, #63b8ff); !* Opera 11.1 - 12.0 *!*/
    /*backgr/ound: -moz-linear-gradient(right, #00b2ee, #63b8ff); !* Firefox 3.6 - 15 *!*/
    /*background: linear-gradient(right, #00B2EE , 	#63B8FF); !* 标准的语法（必须放在最后） *!*/
    /*background: linear-gradient(right, #9ACD32, #76EE00); !* 标准的语法（必须放在最后） *!*/
    background-color: #63b8ff;
    margin-top: 1vh;
    width: 90%;
    /*height: 20vh;*/
    /*background-color: dodgerblue;*/
    border-radius: 10px;
  }
  .seminar-card-finished {
    display: inline-block;
    /*background: -webkit-linear-gradient(right, #9acd32, #76ee00); !* Safari 5.1 - 6.0 *!*/
    /*background: -o-linear-gradient(right, #9acd32, #76ee00); !* Opera 11.1 - 12.0 *!*/
    /*background: -moz-linear-gradient(right, #9acd32, #76ee00); !* Firefox 3.6 - 15 *!*/
    /*background: linear-gradient(right, #9ACD32, #76EE00); !* 标准的语法（必须放在最后） *!*/
    background-color: #76ee00;
    margin-top: 1vh;
    width: 90%;
    /*height: 20vh;*/
    /*background-color: dodgerblue;*/
    border-radius: 10px;
    /*font-size: 15px;*/
    /*margin-left: auto;*/
    /*margin-right: auto;*/
  }
    .card-title{
      font-size: 20px;
      color: white;
      font-weight: normal;
      overflow: hidden;
    }

    .back-image{
      margin-top: 0.8vh;
      color: white;
      font-size: 35px;
    }

    .status-text{
      margin-top: 0.8vh;
      color: white;
      font-weight: normal;
      font-size: 14px;
    }

    .smile-img{
      width: 40px;
      height: 40px;
    }

    .edit-panel{
      margin-top: 0.2vh;
      margin-left: 2vw;
      font-size: 20px;
      color: white;
      float: left;
    }
    .close-panel{
      font-size: 22px;
      margin-right: 2vw;
      float: right;
      color: white;
      /*font-size: 20px;*/
    }





}
</style>
