<template>
  <div class="img4login">
    <div class="ndaw">
      <el-card class="kkk3">
        <el-form :model="formData" :rules="rules" label-width="100px" style="margin-top: 70px;width: 90%" ref="formData" :status-icon="true">
          <el-form-item label="团队用户名" prop="userName" style="margin-bottom: 50px;width: 300px" class="input1">
            <el-input class="input1" v-model="formData.userName" placeholder="用户名/UserName" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" style="margin-bottom: 50px;width: 300px;" class="input1">
            <el-input class="input2" type="password" v-model="formData.password" placeholder="密码/Password" style="width: 200px;background: rgba(255,255,255,0.8)"></el-input>
          </el-form-item>
          <el-button round style="width: 50%;margin-left: 10%;background-color: #6798d8;color: white" >登陆</el-button>
        </el-form>
      </el-card>
    </div>
  </div>
  <!--</div>-->
</template>
<script>
  export default {
    data() {
      return {
        input: '',
        formData:{
          userName:'',
          password:''
        },
        rules:{
          password:[
            {required:true,message:'请输入密码',trigger:'blur'}
          ],
          userName:[
            {required:true,message:'请输入用户名',trigger:'blur'}
          ]
        }
      }
    },
    methods:{
      linkto(){
        this.$refs['formData'].validate((valid)=>{
          if(valid){
            let _this=this;
            // console.log(this.$data.formData);
            this.$axios({
              method:'get',
              url:'/formalTeam/login',
              params:{
                account:this.$data.formData.userName,
                password:this.$data.formData.password
              }
            }).then(function (response) {
              if(response.data===true){
                _this.$message({
                  type:'success',
                  message:'登录成功！'
                })
                _this.$router.push({path:'/TeamInfo',query:{id:_this.$data.formData.userName}});
              }else{
                _this.$message({
                  type:'error',
                  message:'登录失败！请检查密码和账号是否错误'
                })
              }
            })
          }
        })

      }
    }
  }
</script>
<style>
  /*@import url("//unpkg.com/element-ui@2.4.4/lib/theme-chalk/index.css");*/
  .img4login{
    background: url('../../assets/timg1.jpg') center top no-repeat;
    background-size: 100%;
    width:100vw;
    height: 100vh;
    /*position:absolute;*/
  }

  .input1{
    transition: all 0.8s;
  }

  .input1:hover{
    transform: scale(1.05);
  }
  .kkk3{
    float: right;
    margin-top: 150px;
    margin-right: 100px;
    width: 450px;
    height: 400px;
  }


</style>
