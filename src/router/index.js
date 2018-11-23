import Vue from 'vue'
import Router from 'vue-router'
import NewLogIn from '../components/NewLogIn'
import ConfirmAccount from '../components/ConfrimAccount'
import ForgetPassword from '../components/ForgetPassword'
import ForgetPasswordSet from '../components/ForgetPasswordSet'
import TeacherMainPage from '../components/MainPage'
import MyAccount from '../components/MyAccount'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: NewLogIn
    },
    {
      path:'/ConfirmAccount',
      component:ConfirmAccount
    },
    {
      path:'/ForgetPassword',
      component:ForgetPassword
    },
    {
      path:'/ForgetPasswordSet',
      component:ForgetPasswordSet
    },
    {
      path:'/TeacherMainPage',
      component:TeacherMainPage
    },
    {
      path:'/MyAccount',
      component:MyAccount
    }
  ]
})
