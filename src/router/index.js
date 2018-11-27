import Vue from 'vue'
import Router from 'vue-router'
import NewLogIn from '../components/NewLogIn'
import ConfirmAccount from '../components/ConfrimAccount'
import ForgetPassword from '../components/ForgetPassword'
import ForgetPasswordSet from '../components/ForgetPasswordSet'
import TeacherMainPage from '../components/TeacherPages/MainPage'
import MyAccount from '../components/TeacherPages/MyAccount'
import ResetPassword from '../components/TeacherPages/ResetPassword'
import ResetEmail from '../components/TeacherPages/ResetEmail'
import TeacherStuTeams from '../components/TeacherPages/TeacherStuTeams'
import TeacherMyCourses from '../components/TeacherPages/TeahcerMyCourses'
import TeacherCourseGrades from '../components/TeacherPages/TeacherCourseGrades'
import TeacherCourseDetails from '../components/TeacherPages/TeacherCourseDetails'

import StuMyCourses from '../components/StudentPages/MyCourses'
import StuMainSeminars from '../components/Studentpages/MainSeminars'
import StuMyGrades from '../components/Studentpages/MyGrades'
import StuMyTeam from '../components/Studentpages/MyTeam'
import StuMainPage from '../components/StudentPages/StuMainPage'
import SeminarSelectCourse from '../components/StudentPages/SeminarSelectCourse'
import CreateTeam from '../components/StudentPages/CreateTeam'

import TeacherMyCourses from '../components/TeacherPages/TeahcerMyCourses'
import TeacherCourseGrades from '../components/TeacherPages/TeacherCourseGrades'


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
    },
    {
      path:'/ResetPassword',
      component:ResetPassword
    },
    {
      path:'/ResetEmail',
      component:ResetEmail
    },
    {
      path:'/TeacherMyCourses',
      component:TeacherMyCourses
    },
    {
      path:'/TeacherCourseGrades',
      component:TeacherCourseGrades
    },
    {
      path:'/TeacherStuTeams',
      component:TeacherStuTeams
    },
    {
      path:'/TeacherCourseDetails',
      component:TeacherCourseDetails
    },

    //学生端组件
    {
      path:'/StuMyCourses',
      component:StuMyCourses
    },
    {
      path:'/StuMainSeminars',
      component:StuMainSeminars,
    },
    {
      path:'/StuMyGrades',
      component:StuMyGrades
    },
    {
      path:'/StuMyTeam',
      component:StuMyTeam,
    },
    {
      path:'/StuMainPage',
      component:StuMainPage
    },
    {
      path:'/SeminarSelectCourse',
      component:SeminarSelectCourse
    },
    {
      path:'/CreateTeam',
      component:CreateTeam
    }


  ]
})
