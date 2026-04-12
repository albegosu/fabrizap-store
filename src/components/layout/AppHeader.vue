<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import { computed } from 'vue'

const router = useRouter()
const cartStore = useCartStore()
const cartCount = computed(() => cartStore.totalItems)
</script>

<template>
  <header class="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 glass flex justify-between items-center px-5 h-16 border-b border-outline-variant/10">
    <button
      class="flex items-center gap-1 cursor-pointer"
      @click="router.push('/')"
    >
      <img
        src="https://lh3.googleusercontent.com/aida/ADBb0ui9sR3ypBKWQZwZbPXBwrXG9FzUt4HaGob2GnYi0d5-jYny441ry7kKYtz5vVhm9TaxoCFBsqdmjJVZFjvoweeYxiuZyRp9G0ifflazG7tZU8OeeFSLfhgrAQ74g19zGsFOaLumZ4lAix-PCJItU-TVIdb2EMAfPw2y3S-7g4HkqiVKcgrtLbO-bzFYpX2pUSPAnwcmp5weK5Vv4LAPTHK5va047bYzC-zvFHdoXRbhMLUVov-2qkxtVxA7Re2FSXWF8PnxbCYMgw"
        alt="FabriZap"
        class="h-9 w-auto"
      />
    </button>
    <div class="flex items-center gap-2">
      <button
        class="relative p-2 rounded-full hover:bg-surface-container-high/60 transition-colors"
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
