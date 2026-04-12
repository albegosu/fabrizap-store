import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const routes = [
  {
    path: '/onboarding',
    name: 'Onboarding',
    component: () => import('@/views/OnboardingView.vue'),
    meta: { hideNav: true },
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/para-ti',
    name: 'Curated',
    component: () => import('@/views/CuratedView.vue'),
  },
  {
    path: '/producto/:id',
    name: 'Product',
    component: () => import('@/views/ProductView.vue'),
    props: true,
    meta: { hideNav: true },
  },
  {
    path: '/armario',
    name: 'Wardrobe',
    component: () => import('@/views/WardrobeView.vue'),
  },
  {
    path: '/favoritos',
    name: 'Favorites',
    component: () => import('@/views/FavoritesView.vue'),
  },
  {
    path: '/perfil',
    name: 'Profile',
    component: () => import('@/views/ProfileView.vue'),
  },
  {
    path: '/carrito',
    name: 'Cart',
    component: () => import('@/views/CartView.vue'),
    meta: { hideNav: true },
  },
]

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
