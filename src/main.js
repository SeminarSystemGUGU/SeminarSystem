// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import animate from 'animate.css'
import 'element-ui/lib/theme-chalk/index.css';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import $ from 'jquery';

import 'bootstrap3/dist/css/bootstrap.min.css';
import 'bootstrap3/dist/js/bootstrap.min.js';

Vue.prototype.$axios = axios;

Vue.use(MuseUI);
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$axios=axios

new Vue({
  el: '#app',
  router,
  created () {
    // this.$axios.defaults.baseURL='http://wxadra.natappfree.cc'
    // created(){
    this.$axios.defaults.baseURL = 'http://47.94.174.82:8081/';
  },
  // },
  components: { App },
  template: '<App/>'
})
