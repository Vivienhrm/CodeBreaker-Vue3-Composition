import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameView from '../views/GameView.vue'
import StatsView from '../views/StatsView.vue'

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'home', component: HomeView },
    { path: '/game', name: 'game', component: GameView },
    { path: '/stats', name: 'stats', component: StatsView }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
