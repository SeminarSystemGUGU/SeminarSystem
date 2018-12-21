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


Vue.prototype.$axios = axios;
Vue.prototype.$qs=qs;
Vue.prototype.global=Author;

Vue.use(MuseUI);
Vue.use(ElementUI);
Vue.config.productionTip = false;
import Toast from 'muse-ui-toast';

Vue.use(Toast);

new Vue({
  el: '#app',
  router,
  created () {
    this.$axios.defaults.withCredentials=true;//让ajax携带cookie
    this.$axios.defaults.baseURL='http://kxp744.natappfree.cc';
    this.$axios.interceptors.response.use(function (response) {
      console.log(response);
      return response;
    }, function (error) {
      console.log(error.response);
      return Promise.reject(error);
    });
  },
  methods:{

  },
  components: { App },
  template: '<App/>'
})
