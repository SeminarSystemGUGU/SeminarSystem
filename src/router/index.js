import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/LogIn'
import ConfirmLogin from '../components/BeforeConfirm/ConfirmLogin'
import AppBar from '../components/AppBar'
import FindPassword from '../components/BeforeConfirm/FindPassword'
import SetPassword from '../components/BeforeConfirm/SetPassword'
import MainPage from '../components/MainPage'
import AccountSetting from '../components/AccountSetting'
import Setting from '../components/Setting'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path:'/Setting',
      component:Setting
    },
    {
      path:'/AccountSetting',
      component:AccountSetting
    },
    {
      path:'/MainPage',
      component:MainPage
    },
    {
      path:'/SetPassword',
      component:SetPassword
    },
    {
      path:'/FindPassword',
      component:FindPassword
    },
    {
      path:'/AppBar',
      component:AppBar
    },
    {
      path:'/ConfirmLogin',
      component:ConfirmLogin
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: Login
    }
  ]
})
