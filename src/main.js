// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import ElementUI from 'element-ui'
import animate from 'animate.css'
import 'element-ui/lib/theme-chalk/index.css';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import $ from 'jquery';
import intro from 'intro.js'
import './assets/iconfont/iconfont.css'
import Author from '../src/components/ReuseComponents/Global'

import 'bootstrap3/dist/css/bootstrap.min.css';
import 'bootstrap3/dist/js/bootstrap.min.js';

let VueTouch = require('vue-touch');

Vue.prototype.$axios = axios;
Vue.prototype.$qs=qs;
Vue.prototype.global=Author;
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(MuseUI);
Vue.use(ElementUI);
Vue.config.productionTip = false;
import Toast from 'muse-ui-toast';

Vue.use(Toast);
Toast.config( {
  position: 'bottom',               // 弹出的位置
  time: 2000,                       // 显示的时长
  closeIcon: '',               // 关闭的图标
  close: false,                      // 是否显示关闭按钮
  successIcon: '',      // 成功信息图标
  infoIcon: '',                 // 信息信息图标
  warningIcon: '',     // 提醒信息图标
  errorIcon: ''              // 错误信息图标
});


new Vue({
  el: '#app',
  router,
  created () {
    this.$axios.defaults.withCredentials=true;
    // this.$axios.defaults.baseURL='http://47.94.174.82:8081';
    this.$axios.defaults.baseURL='http://tnq7wg.natappfree.cc';
    this.$axios.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      return Promise.reject(error);
    });
  },
  methods:{

  },
  components: { App },
  template: '<App/>'
})
