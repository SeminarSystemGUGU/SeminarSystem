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

axios.defaults.withCredentials=true;//让ajax携带cookie


Vue.prototype.$axios = axios;

Vue.use(MuseUI);
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$axios=axios

new Vue({
  el: '#app',
  router,
  created () {
    this.$axios.defaults.baseURL='http://yr3mr9.wxadra.natappfree.cc'
  },
  // },
  components: { App },
  template: '<App/>'
})
