import Vue from 'vue'
import Router from 'vue-router'

const Dashboard = resolve => {
  require.ensure(['@/dashboard/Dashboard'], () => {
    resolve(require('@/dashboard/Dashboard'));
  }, 'dashboard');
}
const Validations = resolve => {
  require.ensure(['@/review-pages/Validations'], () => {
    resolve(require('@/review-pages/Validations'));
  }, 'pages');
}
const Referentials = resolve => {
  require.ensure(['@/review-pages/Referentials'], () => {
    resolve(require('@/review-pages/Referentials'));
  }, 'pages');
}
const Clinics = resolve => {
  require.ensure(['@/review-pages/Clinics'], () => {
    resolve(require('@/review-pages/Clinics'));
  }, 'pages');
}
const Tasks = resolve => {
  require.ensure(['@/tasks/Tasks'], () => {
    resolve(require('@/tasks/Tasks'));
  }, 'tasks');
}
const Login = resolve => {
  require.ensure(['@/user/Login'], () => {
    resolve(require('@/user/Login'));
  }, 'user');
}
const Profile = resolve => {
  require.ensure(['@/user/Profile'], () => {
    resolve(require('@/user/Profile'));
  }, 'user');
}
import AuthGuard from '@/user/auth-guard'

Vue.use(Router)

const routes = [
  { path: '', name: 'Dashboard', component: Dashboard },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/validations', name: 'Validations', component: Validations },
  { path: '/referentials', name: 'Referentials', component: Referentials },
  { path: '/clinics', name: 'Clinics', component: Clinics },
  { path: '/tasks', name: 'Tasks', component: Tasks, 
    beforeEnter: (to, from, next) => {
      if (AuthGuard.canActivate()) {
        next()
      } else {
        next({ path: `/login?returnUrl=${to.path}&prompt=Team Tasks` })
      }
    } 
  },
  { path: '/login', name: 'Login', component: Login },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '*', redirect: '/' },
]

const router = new Router({
  routes,
  mode: 'history'
})

export default router
