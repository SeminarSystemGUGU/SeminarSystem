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
import TeacherNewSminar from '../components/TeacherPages/SeminarPages/TeacherNewSeminar'
import TeacherSeminarIng from '../components/TeacherPages/SeminarPages/TeacherSeminarIng'
import TeacherModifySeminar from '../components/TeacherPages/SeminarPages/TeacherModifySeminar'
import TransitionBox from '../components/ReuseComponents/TransitionPage'

import PCMainPage from '../components/PC/PCMainPage'
import PCTeacherMainPage from '../components/PC/PCTeacherMainPage'
import TeacherAddStus from '../components/PC/TeacherPages/TeacherAddStu'
import TeacherOutGrades from '../components/PC/TeacherPages/TeacherOutGrades'
import TeacherPcSeminar from '../components/PC/TeacherPages/TeacherPcSeminars'
import TeacherSeminarDetails from '../components/PC/TeacherPages/TeacherSeminarDetails'
import TeacherMyMessage from '../components/TeacherPages/MyInfoPages/MyMessage'


import StuMyCourses from '../components/StudentPages/MyCourses/MyCourses'
import StuMainSeminars from '../components/StudentPages/Seminars/MainSeminars'
import StuMyGrades from '../components/StudentPages/MyCourses/MyGrades'
import StuMyTeam from '../components/StudentPages/MyCourses/MyTeam'
import StuMainPage from '../components/StudentPages/StuMainPage'
import SeminarSelectCourse from '../components/StudentPages/Seminars/SeminarSelectCourse'
import CreateTeam from '../components/StudentPages/MyCourses/CreateTeam'
import StuSeminarDetails from '../components/StudentPages/Seminars/SeminarDetails'
import StuMyAccount from '../components/StudentPages/Account/StuMyAccount'
import StuStatusDetails from '../components/StudentPages/Seminars/StatusDetails'
import StuResetEmail from '../components/StudentPages/Account/ResetEmail'
import StuResetPassword from '../components/StudentPages/Account/ResetPassword'
import StuAskQuestion from '../components/StudentPages/Seminars/AskQuestion'
import StuCheckGrades from '../components/StudentPages/Seminars/CheckGrades'
import StuCourseInfo from '../components/StudentPages/MyCourses/CourseInfo'
import StuConfirmAccount from '../components/StudentPages/Account/ConfrimAccount'
import StuMyTeamDetails from '../components/StudentPages/MyCourses/MyTeamDetails'
import StuTeamRequire from '../components/StudentPages/MyCourses/TeamRequire'





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
      path:'/TransitionPage',
      component:TransitionBox
    },
    {
      path:'/ConfirmAccount',
      component:ConfirmAccount
    },
    {
      path:'/TeacherModifySeminar',
      component:TeacherModifySeminar
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
      path:'/TeacherMyMessage',
      component:TeacherMyMessage
    },
    {
      path:'/TeacherNewSeminar',
      component:TeacherNewSminar
    },
    {
      path:'/LoginPc',
      component:PcLogin
    },
    {
      path:'/TeacherSeminarIng',
      component:TeacherSeminarIng
    },

    //学生端组件
    {
      path:'/StuMyCourses',
      component:StuMyCourses
    },
    {
      path:'/StuMyTeamDetails',
      component:StuMyTeamDetails,
    },
    {
      path:'/StuTeamRequire',
      component:StuTeamRequire
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
      path:'/StuConfirmAccount',
      component:StuConfirmAccount
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
      path:'/StuCourseInfo',
      component:StuCourseInfo,
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
      path:'/StuCheckGrades',
      component:StuCheckGrades
    },
    {
      path:'/PCTeacher',
      component:PCTeacherMainPage,
      children:[
        {
          path:'/PCTeacher/TeacherAddStu',
          component:TeacherAddStus
        },
        {
          path:'/PCTeacher/TeacherOutGrade',
          component:TeacherOutGrades
        },
        {
          path:'/PCTeacher/TeacherSeminar',
          component:TeacherPcSeminar
        },
        {
          path:'/PCTeacher/TeacherSeminarDetails',
          component:TeacherSeminarDetails
        }
      ]
    },
    {
      path:'/PCStudent/',
      component:PCMainPage,
      children: [
        //PC端学生
        {
          path: '/PCStudent/',
          component: PcStuSeminars
        },
        {
          path: '/PCStudent/PcStuGrades',
          component: PcStuGrades
        },
        {
          path: '/PCStudent/PcStuSeminarDetails',
          component: PcStuSeminarDetails
        }
      ]

    }


  ]
})
