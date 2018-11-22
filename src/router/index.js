import Vue from 'vue'
import Router from 'vue-router'
import NewLogIn from '../components/NewLogIn'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: NewLogIn
    }
  ]
})
