import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login'
import Show from '../components/Show'
import Make from '../components/Make'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    
    { path: '/', name: 'show', component: Show, meta: { requiresAuth: true }},
    { path: '/make', name: 'make', component: Make, meta: { requiresAuth: true} },
    { path: '/login', name: 'login', component: Login },
    

  ]
})

// router.beforeEach(function (to, from, next) {
//   // to: 이동할 url에 해당하는 라우팅 객체
//   if (to.matched.some(function(routeInfo) {
//     return routeInfo.meta.authRequired;
//   })) {
//     // 이동할 페이지에 인증 정보가 필요하면 경고 창을 띄우고 페이지 전환은 하지 않음
//     alert('Login Please!');
//   } else {
//     console.log("routing success : '" + to.path + "'");
//     next(); // 페이지 전환
//   };
// });



 

  export default router