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



 

  export default router