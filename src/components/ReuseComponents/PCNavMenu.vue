<template>
    <div>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">
          <svg style="height: 60px;width: 400px;">
            <!-- Symbol-->
            <symbol id="s-text">
              <text style="font-size:40px;" text-anchor="middle" x="50%" y="50%" dy=".35em">讨论课管理系统</text>
            </symbol>
            <!-- Duplicate symbols-->
            <use class="text" xlink:href="#s-text"></use>
            <use class="text" xlink:href="#s-text"></use>
            <use class="text" xlink:href="#s-text"></use>
            <use class="text" xlink:href="#s-text"></use>
            <use class="text" xlink:href="#s-text"></use>
          </svg>
        </el-menu-item>
      <div class="line"></div>
      </el-menu>
    </div>
</template>

<script>
    export default {
        name: "PCNavMenu",
      data(){
          return{
            activeIndex:'1'
          }
      }
    }
</script>

<style>
  @import url(https://fonts.googleapis.com/css?family=Open+Sans:800);

  .text {
    fill: none;
    stroke-width: 2px;
    stroke-linejoin: round;
    stroke-dasharray: 70;
    stroke-dashoffset: 0;
    -webkit-animation: stroke 6s infinite linear;
    animation: stroke 6s infinite linear;
  }
  .text:nth-child(5n + 1) {
    stroke: #2a5caa;
    -webkit-animation-delay: -1.2s;
    animation-delay: -1.2s;
  }
  .text:nth-child(5n + 2) {
    stroke: #5d76ba;
    -webkit-animation-delay: -2.4s;
    animation-delay: -2.4s;
  }
  .text:nth-child(5n + 3) {
    stroke: #5d76ba;
    -webkit-animation-delay: -3.6s;
    animation-delay: -3.6s;
  }
  .text:nth-child(5n + 4) {
    stroke: #5d76ba;
    -webkit-animation-delay: -4.8s;
    animation-delay: -4.8s;
  }
  .text:nth-child(5n + 5) {
    stroke: #5d76ba;
    -webkit-animation-delay: -6s;
    animation-delay: -6s;
  }
  @-webkit-keyframes stroke {
    100% {
      stroke-dashoffset: -400;
    }
  }
  @keyframes stroke {
    100% {
      stroke-dashoffset: -400;
    }
  }
  svg {
    position: absolute;
    width: 800px;
    /*height: 100%;*/
  }
</style>
