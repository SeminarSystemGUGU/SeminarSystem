<template>
  <div id="PCMenuTeacher">
    <el-menu  :default-active="activeIndex" class="el-menu-demo" @select="handleSelect"
              text-color="#ffffff"
              background-color="#001C31"
              active-text-color='#ffffff'
              active-background-color="#dd5347"
              >
      <el-menu-item index="3"  class="item4menu item1-menu" >
        <div class="item-content">
          <div class="item-img">
            <img src="../../assets/添加用户.png" class="nav-img"/>
          </div>
          <div class="item-title" >
            <span slot="title" class="title-content">导入学生名单</span>
          </div>
        </div>
      </el-menu-item>
      <el-menu-item index="5"   class="item4menu item2-menu">
        <div class="item-content" >
          <div class="item-img">
            <img src="../../assets/清单.png" class="nav-img"/>
          </div>
          <div class="item-title">
            <span  slot="title" class="title-content">讨论课</span>
          </div>
        </div>
      </el-menu-item>
      <el-menu-item index="4"   class="item4menu item2-menu">
        <div class="item-content">
          <div class="item-img">
            <img src="../../assets/提取流量.png" class="nav-img"/>
          </div>
          <div class="item-title">
            <span  slot="title" class="title-content">导出成绩</span>
          </div>
        </div>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
  export default{
    name: 'AdminMenu',

    mounted(){
      // switch(this.$route.path){
      //   case '/Authority':
      //     this.$data.activeIndex = '4'
      //     break
      //   case '/Release':
      //     this.$data.activeIndex = '3'
      //     break
      //   case '/History':
      //     this.$data.activeIndex = '2'
      //     break
      //   case '/MessageCenter':
      //     this.$data.activeIndex = '5'
      //   default:
      //
      // }
    },
    watch: {
      $route(to, from) {
        // switch(to.path){
        //   case '/Now':
        //     this.$data.activeIndex = '1'
        //     break
        //   case '/Authority':
        //     this.$data.activeIndex = '4'
        //     break
        //   case '/Release':
        //     this.$data.activeIndex = '3'
        //     break
        //   case '/History':
        //     this.$data.activeIndex = '2'
        //     break
        //   default:
        //
        // }
      }
    },
    data () {
      return {
        activeIndex: '3',
        document:null
      }
    },
    methods:{
      handleSelect (key, keyPath) {
        switch(key){
          case '3':
            this.$router.push('/PCTeacher/TeacherAddStu');
            break;
          case '4':
            this.$router.push('/PCTeacher/TeacherOutGrade');
            break;
          case '5':
            this.$router.push('/PCTeacher/TeacherSeminar');
        }
      },
    }
  }
</script>
<style lang="less">
  #PCMenuTeacher {
    display: block;
    height: 100%;
    position:absolute;
    min-width: 150px;
    top:0;
    left:0;
    width: 100%;

    .item-img{
      margin-bottom: 20px;
      margin-top: 10px;
    }

    .item-content{
      width: 100%;
      height: 100%;
      padding:1px;
    }

    .item-title{
      height: 40px;

      .title-content{
        display: block;
      }

    }

    .item1-menu{
      border: none;
      margin-top: 30px;
    }
    .item2-menu{
      border:none;
    }

    .el-menu-demo{
      font-size: 16px;
      display: inline-block;
      margin: 0 auto;
      height: 100%;
      width: 90%;
      z-index: 0;
    }

    .nav-img{
      width: 20%;
      height: 45%
    }


    .iconfont{
      font-size: 50px !important;
    }
    .el-menu-item, .el-submenu__title{
      line-height: 1.4;
    }
    .item4menu {
      background: #001c31 !important;
      height: 100px !important;
      text-align: center;
      font-size: 17px;
      width: 100%;
      transition: all 0.3s;
      box-sizing: border-box;
      z-index: 0;
    }

    .item4menu:hover {
      background:#dd5347 !important;
      color: #ffffff !important;

    }
    .item4menu.is-active {
      background:#dd5347 !important;
      color: #ffffff !important;
      width: 110%;
      box-sizing: border-box;
    }
  }
</style>
