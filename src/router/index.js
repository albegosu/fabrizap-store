import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { appRoutes } from './routes.config.js'

const routes = appRoutes.map(({ screenshotPath: _screenshotPath, ...route }) => route)

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  const userStore = useUserStore()
  if (!userStore.hasCompletedOnboarding && to.name !== 'Onboarding') {
    return { name: 'Onboarding' }
  }
})

export default router
