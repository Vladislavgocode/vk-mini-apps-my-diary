import { createRouter , createWebHistory } from 'vue-router';
import AboutUs from './components/AboutUs.vue'
import Diary from './components/Diary.vue'
import Calendar from './components/Calendar.vue'
const router = createRouter({
    history : createWebHistory(),
    routes : 
    [
        
        {path: '/', redirect : "/diary"},
        {path: '/about-us', component: AboutUs},
        {path: '/diary', component: Diary},
        {path: '/calendar', component: Calendar},
        
    ]
})

export default router