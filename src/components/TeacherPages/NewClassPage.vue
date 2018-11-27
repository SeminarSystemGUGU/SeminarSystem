<template>
  <div id="NewClassPage">
    <div class="title">
      <i class="el-icon-back" @click="linkBack">
      </i>
      <span>新建班级</span>
    </div>
    <div class="main-content">
     <div class="new-class-form">
       <el-row>
         <el-col class="row-col-left">
          <span>班级名称：</span>
         </el-col>
         <el-col class="row-col-right">
          <input class="new-class-input"/>
           <span>年级</span>
           <input class="new-class-input"/>
           <span>班</span>
         </el-col>
       </el-row>
     </div>
      <div class="new-class-form">
        <el-row>
          <el-col class="row-col-left">
            <span>讨论课时间：</span>
          </el-col>
          <el-col class="row-col-right">
            <span>{{address[0]+''+address[1]}}</span>
            <el-button size="small" type="primary" @click="dialogVisible=!dialogVisible">选择时间</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="new-class-form">
        <el-row>
          <el-col class="row-col-left">
            <span>上课地点：</span>
          </el-col>
          <el-col class="row-col-right">
            <input class="new-class-input-address"/>
          </el-col>
        </el-row>
      </div>
      <div class="new-class-form">
        <el-row>
          <el-col class="row-col-left">
            <span>学生名单：</span>
          </el-col>
          <el-col class="row-col-right">
            <span class="tooltips">尚未上传文件</span>
            <el-button type="primary" size="mini">上传名单</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="button-panel">
        <el-row :gutter="50">
          <el-col class="row-col">
            <mu-button color="primary">确定</mu-button>
          </el-col>
          <el-col class="row-col">
            <mu-button color="primary">放弃</mu-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" title="请选择上课时间" class="dialog" width="80%">
      <mu-slide-picker :slots="addressSlots" :visible-item-count="7" @change="addressChange" :values="address"></mu-slide-picker>
      <div class="button-panel">
        <el-row :gutter="0">
          <el-col class="row-col">
            <el-button type="text">确定</el-button>
          </el-col>
          <el-col class="row-col">
            <el-button type="text">放弃</el-button>
          </el-col>

        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  const address = {
    '周一': ['1-2节','3-4节','5-6节','7-8节','9-11节'],
    '周二': ['1-2节','3-4节','5-6节','7-8节','9-11节'],
    '周三': ['1-2节','3-4节','5-6节','7-8节','9-11节'],
    '周四': ['1-2节','3-4节','5-6节','7-8节','9-11节'],
    '周五': ['1-2节','3-4节','5-6节','7-8节','9-11节'],
    '周六': ['1-2节','3-4节','5-6节','7-8节','9-11节'],
    '周日': ['1-2节','3-4节','5-6节','7-8节','9-11节'],
  }
    export default {
        name: "NewClassPage",
      data(){
          return{
            dialogVisible:false,
            formNewClass:{

            },
            addressSlots: [
              {
                width: '100%',
                textAlign: 'right',
                values: Object.keys(address)
              }, {
                width: '100%',
                textAlign: 'left',
                values: ['周一']
              }
            ],
            address: ['周一', '1-2节'],
            addressProvince: '北京',
            addressCity: '北京'
          }

      },
      methods: {
        linkBack(){
          this.$router.push('/TeacherClassInfos')
        },
        addressChange (value, index) {
          switch (index) {
            case 0:
              this.addressProvince = value
              const arr = address[value]
              this.addressSlots[1].values = arr
              this.addressCity = arr[0]
              break
            case 1:
              this.addressCity = value
              break
          }
          this.address = [this.addressProvince, this.addressCity]
        }
      }
    }
</script>

<style scoped lang="less">
#NewClassPage{
  width: 100vw;

  .button-panel{
    width: 80%;
    text-align: center;
    margin-right: auto;
    margin-left: auto;
    margin-top: 10vh;
    .row-col{
      width: 50%;
    }

  }

  .dialog{
    .button-panel{
      margin-top: 30px;
    }
    /*width: 300px;*/
  }

  .title{
    .el-icon-back{
      color: dodgerblue;
    }

    margin-top: 2vh;
    font-size: 20px;
    font-weight: bold;
    text-align: left;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }

  .new-class-form{
    margin-top: 5vh;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    font-size: 18px;


    .tooltips{
      font-size: 16px;
      color: orangered;
    }


    .row-col-left{
      text-align: right;
      width: 35%;
    }
    .row-col-right{
      width: 63%;
    }

    .new-class-input{
      width: 50px;
      outline: none;
      border: none;
      border-bottom: 1px solid black;
    }
    .new-class-input-address{
      width: 170px;
      outline: none;
      border: none;
      border-bottom: 1px solid black;
    }
  }

}
</style>
