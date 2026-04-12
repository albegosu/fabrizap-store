<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import { computed } from 'vue'
import { FABRIZAP_LOGO_URL } from '@/constants/brand'
import ThemeToggle from '@/components/common/ThemeToggle.vue'

const router = useRouter()
const cartStore = useCartStore()
const cartCount = computed(() => cartStore.totalItems)
</script>

<template>
  <header
    class="app-top-header fixed top-0 left-1/2 -translate-x-1/2 w-full app-max-width z-50 glass flex justify-between items-center px-5 h-16 border-b border-outline-variant/10"
  >
    <button
      class="flex items-center gap-1 cursor-pointer"
      @click="router.push('/')"
    >
      <img :src="FABRIZAP_LOGO_URL" alt="FabriZap" class="h-9 w-auto" />
    </button>
    <div class="flex items-center gap-1">
      <ThemeToggle />
      <button
        class="relative h-10 w-10 shrink-0 inline-flex items-center justify-center rounded-full hover:bg-surface-container-high/60 transition-colors"
        @click="router.push('/carrito')"
      >
        <span class="material-symbols-outlined text-on-surface-variant text-[22px]">shopping_bag</span>
        <span
          v-if="cartCount > 0"
          class="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full gradient-primary text-white text-[10px] font-bold flex items-center justify-center"
        >{{ cartCount }}</span>
      </button>
    </div>
  </header>
</template>
