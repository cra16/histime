import Vue from 'vue'
import VueRouter from 'vue-router'
import VueSession from 'vue-session'
import Login from '../components/Login'
import Show from '../components/Show'
import Make from '../components/Make'
import Copy from '../components/showpage/copy'
import Individual from '../components/Individual'
import Manual from '../components/Manual'
import Aboutus from '../components/Aboutus'
import NotFoundComponent from '../components/NotFound'

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
    { path: '/aboutus', name: 'aboutus', component: Aboutus},
    { path: '*', component: NotFoundComponent }
  ]
})
 
export default router