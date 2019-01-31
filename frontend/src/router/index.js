import Vue from 'vue'
import VueRouter from 'vue-router'
import VueSession from 'vue-session'
import Toasted from 'vue-toasted'
import Login from '../components/Login'
import Show from '../components/Show'
import Make from '../components/Make'
import Copy from '../components/showpage/copy'
import Individual from '../components/Individual'
import Manual from '../components/Manual'
import Aboutus from '../components/Aboutus'

Vue.use(Toasted)
Vue.use(VueRouter)
Vue.use(VueSession)

const router = new VueRouter({
  mode: 'history',
  
  routes: [

    { path: '/', name: 'show', component: Show   } ,
    { path: '/make', name: 'make', component: Make },
    { path: '/login', name: 'login', component: Login },
    { path: '/show/copy_list', name: 'copy', component: Copy},
    { path: '/individual', name: 'individual', component: Individual},
    { path: '/manual', name: 'manual', component: Manual} ,
    { path: '/aboutus', name: 'aboutus', component: Aboutus} 
  ]
})

// Vue.toasted.register('already_add', '이미 즐겨찾기에 추가된 과목 입니다!', {
//   type : 'info',
//   theme: "bubble", 
//   position: "top-center", 
//   duration : 700,
//   fullWidth : false,
//   iconPack : 'fontawesome'
// })


 

  export default router