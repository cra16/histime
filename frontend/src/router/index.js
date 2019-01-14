import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login'
import Show from '../components/Show'
import Make from '../components/Make'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  
  routes: [
  
    { path: '/', name: 'show', component: Show,  meta : {requiresAuth: true} } ,
    { path: '/make', name: 'make', component: Make, meta: { requiresAuth: true }  },
    { path: '/login', name: 'login', component: Login }
    

  ]
})

//아래는 사용자 검증, url 보안에 관련된 함수 입니다.
//페이지를 이동할때 마다 아래 함수를 사용합니다.
//requiresAuth: true 로 표시된 함수에 대해 검증된 사용자인지 검사를 합니다.
//검증된 사용자가 아니면 로그인이 필요하다는 경고메세지를 띄우고 로그인 페이지로 넘어갑니다.
//검증된 사용자 이거나, 검증이 필요없는 페이지(예를 들어 로그인 페이지)인 경우에는 바로 페이지를 보여줍니다.
//검증과 관련된 변수는 localStorage.auth에 string type으로 저장되어있습니다 (boolean 아닌것에 주의)
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log(to.fullPath + 'auth : ' + localStorage.auth)
    if ( localStorage.auth=='false' ) {
      alert("로그인이 필요합니다.");
      next({name : 'login'})
    } else {
      next()
    }
  } else {
    next()
  }
})





 

  export default router