<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'

const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()

const cartCount = computed(() => cartStore.totalItems)
const bump = ref(false)

const hiddenRoutes = ['/carrito', '/onboarding']
const isVisible = computed(() =>
  cartCount.value > 0 && !hiddenRoutes.includes(route.path)
)

const hasBottomNav = computed(() => !route.meta.hideNav)

watch(cartCount, (newVal, oldVal) => {
  if (newVal > oldVal) {
    bump.value = true
    setTimeout(() => { bump.value = false }, 350)
  }
})

function goToCart() {
  router.push('/carrito')
}
</script>

<template>
  <transition name="cart-fab">
    <button
      v-if="isVisible"
      class="fixed right-4 z-50 w-14 h-14 rounded-full gradient-primary shadow-primary-glow flex items-center justify-center transition-transform active:scale-90 cursor-pointer"
      :class="[
        bump ? 'animate-bump' : '',
        hasBottomNav ? 'bottom-24' : 'bottom-28'
      ]"
      aria-label="Ver carrito"
      @click="goToCart"
    >
      <span class="material-symbols-outlined text-white text-[24px]">shopping_bag</span>
      <span
        class="absolute -top-1 -right-1 min-w-[22px] h-[22px] px-1 rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center ring-2 ring-surface"
      >{{ cartCount > 99 ? '99+' : cartCount }}</span>
    </button>
  </transition>
</template>

<style scoped>
.cart-fab-enter-active {
  animation: fab-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.cart-fab-leave-active {
  animation: fab-out 0.2s ease-in forwards;
}

@keyframes fab-in {
  0% { opacity: 0; transform: scale(0.3) translateY(20px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes fab-out {
  0% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.3); }
}

.animate-bump {
  animation: bump 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes bump {
  0% { transform: scale(1); }
  40% { transform: scale(1.25); }
  100% { transform: scale(1); }
}
</style>
