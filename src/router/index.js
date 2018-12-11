import Vue from 'vue'
import Router from 'vue-router'
import NewLogIn from '../components/NewLogIn'
import ConfirmAccount from '../components/TeacherPages/BeforeLogIn/ConfrimAccount'
import ForgetPassword from '../components/TeacherPages/BeforeLogIn/ForgetPassword'
import ForgetPasswordSet from '../components/TeacherPages/BeforeLogIn/ForgetPasswordSet'
import TeacherMainPage from '../components/TeacherPages/MainPage'
import MyAccount from '../components/TeacherPages/MyInfoPages/MyAccount'
import ResetPassword from '../components/TeacherPages/MyInfoPages/ResetPassword'
import ResetEmail from '../components/TeacherPages/MyInfoPages/ResetEmail'
import TeacherStuTeams from '../components/TeacherPages/CoursePages/TeacherStuTeams'
import TeacherMyCourses from '../components/TeacherPages/CoursePages/TeahcerMyCourses'
import TeacherCourseGrades from '../components/TeacherPages/CoursePages/TeacherCourseGrades'
import TeacherCourseDetails from '../components/TeacherPages/CoursePages/TeacherCourseDetails'
import TeacherClassInfos from '../components/TeacherPages/ClassPages/TeacherClassInfos'
import NewClassPage from '../components/TeacherPages/ClassPages/NewClassPage'
import TeacherCourseRounds from '../components/TeacherPages/SeminarPages/TeacherCourseRounds'
import TeacherCourseShareSetting from '../components/TeacherPages/CoursePages/TeacherCourseShareSetting'
import TeacherNewShare from '../components/TeacherPages/CoursePages/TeacherNewShare'
import TeacherNewCourse from '../components/TeacherPages/CoursePages/TeacherNewCourse'
import TeacherSeminar from '../components/TeacherPages/SeminarPages/TeacherSeminar'
import TeacherRoundSetting from '../components/TeacherPages/SeminarPages/TeacherRoundSetting'
import TeacherAfterSeminar from '../components/TeacherPages/SeminarPages/TeacherAfterSeminar'
import TeacherApplyInfo from '../components/TeacherPages/SeminarPages/TeacherApplyInfo'
import TeacherSeminarGrades from '../components/TeacherPages/SeminarPages/TeacherSeminarGrades'

import PCMainPage from '../components/PC/PCMainPage'

import StuMyCourses from '../components/StudentPages/MyCourses'
import StuMainSeminars from '../components/Studentpages/MainSeminars'
import StuMyGrades from '../components/Studentpages/MyGrades'
import StuMyTeam from '../components/Studentpages/MyTeam'
import StuMainPage from '../components/StudentPages/StuMainPage'
import SeminarSelectCourse from '../components/StudentPages/SeminarSelectCourse'
import CreateTeam from '../components/StudentPages/CreateTeam'
import StuSeminarDetails from '../components/StudentPages/SeminarDetails'
import StuMyAccount from '../components/StudentPages/StuMyAccount'
import StuStatusDetails from '../components/StudentPages/StatusDetails'
import StuResetEmail from '../components/StudentPages/ResetEmail'
import StuResetPassword from '../components/StudentPages/ResetPassword'
import StuAskQuestion from '../components/StudentPages/AskQuestion'
import StuRegisteredSeminarDetails from '../components/StudentPages/RegisteredSeminarDetails'
import StuChangeRegister from '../components/StudentPages/ChangeRegister'
import StuCheckGrades from '../components/StudentPages/CheckGrades'



import PcLogin from '../components/PC/LoginPC'

import PcStuSeminars from '../components/PC/StudentPages/Seminars'
import PcStuSeminarDetails from '../components/PC/StudentPages/SeminarDetails'
import PcStuGrades from '../components/PC/StudentPages/Grades'


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
    {
      path:'/TeacherClassInfos',
      component:TeacherClassInfos
    },
    {
      path:'/NewClass',
      component:NewClassPage
    },
    {
      path:'/TeacherCourseRounds',
      component:TeacherCourseRounds
    },
    {
      path:'/TeacherCourseShareSetting',
      component:TeacherCourseShareSetting
    },
    {
      path:'/TeacherNewShare',
      component:TeacherNewShare
    },
    {
      path:'/TeacherSeminar',
      component:TeacherSeminar
    },
    {
      path:'/TeacherNewCourse',
      component:TeacherNewCourse
    },
    {
      path:'/TeacherRoundSetting',
      component:TeacherRoundSetting
    },
    {
      path:'/TeacherAfterSeminar',
      component:TeacherAfterSeminar
    },
    {
      path:'/TeacherApplyInfo',
      component:TeacherApplyInfo
    },
    {
      path:'/TeacherSeminarGrades',
      component:TeacherSeminarGrades
    },
    {
      path:'/LoginPc',
      component:PcLogin
    },

    //学生端组件
    {
      path:'/StuMyCourses',
      component:StuMyCourses
    },
    {
      path:'/CreateTeam',
      component:CreateTeam
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
      path:'/StuSeminarDetails',
      component:StuSeminarDetails
    },
    {
      path:'/StuMyAccount',
      component:StuMyAccount
    },
    {
      path:'/StuStatusDetails',
      component:StuStatusDetails,
    },
    {
      path:'/StuResetEmail',
      component:StuResetEmail
    },
    {
      path:'/StuResetPassword',
      component:StuResetPassword
    },
    {
      path:'/StuAskQuestion',
      component:StuAskQuestion
    },
    {
      path:'/StuRegisteredSeminarDetails',
      component:StuRegisteredSeminarDetails,
    },
    {
      path:'/StuChangeRegister',
      component:StuChangeRegister
    },
    {
      path:'/StuCheckGrades',
      component:StuCheckGrades
    },
    {
      path:'/PCPages',
      component:PCMainPage,
      children: [
        {
          path:'/PcLogin',
          component:PcLogin
        },

        //PC端学生
        {
          path: '/PcStuSeminars',
          component: PcStuSeminars
        },
        {
          path: '/PcStuGrades',
          component: PcStuGrades
        },
        {
          path: '/PcStuSeminarDetails',
          component: PcStuSeminarDetails
        }
      ]

    }


  ]
})
