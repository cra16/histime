import Vue from 'vue'
import VueRouter from 'vue-router'
import VueSession from 'vue-session'
import Login from '../components/Login'
import Show from '../components/Show'
import Make from '../components/Make'


Vue.use(VueRouter)
Vue.use(VueSession)
const router = new VueRouter({
  mode: 'history',
  
  routes: [

    { path: '/', name: 'show', component: Show   } ,
    { path: '/make', name: 'make', component: Make },
    { path: '/login', name: 'login', component: Login }
  ]
})


// router.beforeEach((to, from, next) => {
//   this.$session.exists();
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if ( this.$session.exists()) {
//       alert("로그인이 필요합니다.");
//       next({name : 'login'})
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })





 

  export default router