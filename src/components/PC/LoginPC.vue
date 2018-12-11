<template>
  <div class="img4login" id="LogInPC">
    <div class="ndaw">
      <el-card class="log-card">
        <div class="card-title">
          <span>欢迎登陆讨论课管理系统</span>
        </div>
        <div class="form-content">
          <el-form :model="formData" :rules="rules" label-width="100px"  ref="formData" :status-icon="true">
            <el-form-item label="用户名：" prop="userName" style="" class="input1 input-form-item">
              <el-input class="input1 the-input" v-model="formData.userName" placeholder="用户名/UserName"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password" class="input1 input-form-item">
              <el-input class="input2 the-input" type="password" v-model="formData.password" placeholder="密码/Password"></el-input>
            </el-form-item>
            <el-button round class="login-button" >登陆</el-button>
          </el-form>
        </div>
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
  .card-title{
    margin-top: 20px;
    font-size: 23px;
    font-weight: bold;
    color: #122b40;
  }

  .login-button{
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    background-color: #6798d8;
    color: white;
    margin-top: 30px;
  }

  .form-content{
    margin-top: 40px;
    width: 90%;
    margin-right: auto;
    margin-left: auto;

  }

  .img4login{
    background: url('../../assets/timg1.jpg') center top no-repeat;
    background-size: 100%;
    width:100vw;
    height: 100vh;
    /*position:absolute;*/
  }

  .input1{
    /*width: 80%;*/
    transition: all 0.8s;
  }

  .input-form-item{
    margin-top: 30px;
  }

  .the-input{
    width: 230px;
  }
  .input1:hover{
    transform: scale(1.02);
  }
  .log-card{
    float: right;
    margin-top: 150px;
    margin-right: 100px;
    width: 450px;
    height: 400px;
  }


</style>
