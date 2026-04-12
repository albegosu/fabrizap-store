/**
 * Única fuente de rutas: vue-router y scripts/screenshots.mjs derivan de aquí.
 * Para rutas con parámetros, `screenshotPath` es la URL concreta usada en capturas.
 */
export const appRoutes = [
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
    screenshotPath: '/producto/heritage-low-top',
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
