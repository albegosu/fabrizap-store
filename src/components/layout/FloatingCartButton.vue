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
    <div
      v-if="isVisible"
      class="fixed inset-x-0 bottom-0 z-50 flex justify-center pointer-events-none"
    >
      <div
        class="w-full app-max-width flex justify-end px-4 pointer-events-none"
        :class="hasBottomNav ? 'pb-24' : 'pb-28'"
      >
        <button
          class="app-floating-cart pointer-events-auto relative w-14 h-14 rounded-sm bg-primary-flat border-brutal-thick shadow-brutal flex items-center justify-center shrink-0 transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer"
          :class="bump ? 'animate-bump' : ''"
          aria-label="Ver carrito"
          @click="goToCart"
        >
          <span class="material-symbols-outlined text-white text-[24px]">shopping_bag</span>
          <span
            class="absolute -top-2 -right-2 min-w-[22px] h-[22px] px-1 rounded-sm bg-secondary-flat text-on-secondary text-[11px] font-mono font-bold flex items-center justify-center border border-outline"
          >{{ cartCount > 99 ? '99+' : cartCount }}</span>
        </button>
      </div>
    </div>
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
  0% { opacity: 0; transform: translateY(16px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes fab-out {
  0% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(10px); }
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
