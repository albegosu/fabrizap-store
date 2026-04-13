<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import ThemeToggle from '@/components/common/ThemeToggle.vue'

const router = useRouter()
const cartStore = useCartStore()

function confirmOrder() {
  cartStore.confirmOrder()
}

function goHome() {
  cartStore.resetOrderConfirmation()
  router.push('/')
}
</script>

<template>
  <div class="min-h-dvh bg-surface flex flex-col">
    <!-- Header -->
    <header class="flex items-center gap-3 px-5 pt-5 pb-3">
      <button
        class="w-10 h-10 rounded-sm border-brutal flex items-center justify-center hover:bg-surface-container-high transition-colors"
        @click="router.back()"
      >
        <span class="material-symbols-outlined text-on-surface">arrow_back</span>
      </button>
      <h1 class="text-xl font-headline font-extrabold tracking-tight text-on-surface flex-1 min-w-0">
        Mi Carrito
      </h1>
      <ThemeToggle />
    </header>

    <!-- Order confirmed -->
    <div v-if="cartStore.orderConfirmed" class="flex-1 flex flex-col items-center justify-center px-8 gap-6">
      <div class="w-24 h-24 rounded-sm bg-secondary/10 border-brutal flex items-center justify-center">
        <span class="material-symbols-outlined text-secondary text-5xl" style="font-variation-settings: 'FILL' 1">check_circle</span>
      </div>
      <div class="text-center">
        <h2 class="text-2xl font-headline font-extrabold text-on-surface mb-2">Pedido confirmado</h2>
        <p class="text-sm text-on-surface-variant leading-relaxed">
          Tu pedido ha sido procesado correctamente. Recibirás un email con los detalles.
        </p>
      </div>
      <button
        class="w-full max-w-xs h-14 rounded-sm bg-primary-flat text-on-primary border-brutal-thick shadow-brutal font-headline font-bold uppercase tracking-wider active:translate-y-[2px] active:shadow-none transition-all"
        @click="goHome"
      >
        Volver al catálogo
      </button>
    </div>

    <!-- Cart items -->
    <main v-else class="flex-1 px-5 pb-32">
      <div v-if="cartStore.items.length === 0" class="flex flex-col items-center justify-center py-20 gap-4">
        <div class="w-20 h-20 rounded-sm bg-primary-soft border-brutal flex items-center justify-center">
          <span class="material-symbols-outlined text-primary text-4xl">shopping_bag</span>
        </div>
        <p class="text-on-surface-variant font-body text-sm text-center">Tu carrito está vacío</p>
        <button
          class="px-6 py-3 rounded-sm bg-primary-flat text-on-primary border-brutal shadow-brutal font-headline font-bold text-sm uppercase tracking-wider active:translate-y-[2px] active:shadow-none transition-all"
          @click="router.push('/')"
        >
          Explorar catálogo
        </button>
      </div>

      <div v-else class="space-y-4 mt-4">
        <div
          v-for="item in cartStore.items"
          :key="item.id"
          class="flex gap-4 p-4 rounded-sm bg-surface-container-lowest border-brutal shadow-brutal"
        >
          <div class="w-20 h-20 rounded-sm overflow-hidden bg-surface-container border-r-2 border-outline flex-none">
            <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="font-headline font-bold text-sm text-on-surface truncate">{{ item.name }}</h3>
            <p class="text-xs text-on-surface-variant font-mono mt-0.5">
              Talla: {{ item.size }} &middot;
              <span class="inline-block w-3 h-3 rounded-sm align-middle border border-outline" :style="{ backgroundColor: item.color }" />
            </p>
            <div class="flex items-center justify-between mt-2">
              <span class="font-mono font-bold text-base text-on-surface">
                {{ item.currency }}{{ (item.price * item.quantity).toFixed(2) }}
              </span>
              <div class="flex items-center gap-2">
                <button
                  class="w-8 h-8 rounded-sm border-brutal flex items-center justify-center hover:bg-surface-container-high transition-colors"
                  @click="cartStore.updateQuantity(item.id, item.quantity - 1)"
                >
                  <span class="material-symbols-outlined text-[16px]">remove</span>
                </button>
                <span class="text-sm font-mono font-bold w-6 text-center">{{ item.quantity }}</span>
                <button
                  class="w-8 h-8 rounded-sm border-brutal flex items-center justify-center hover:bg-surface-container-high transition-colors"
                  @click="cartStore.updateQuantity(item.id, item.quantity + 1)"
                >
                  <span class="material-symbols-outlined text-[16px]">add</span>
                </button>
              </div>
            </div>
          </div>
          <button
            class="self-start text-on-surface-variant hover:text-error transition-colors"
            @click="cartStore.removeItem(item.id)"
          >
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
      </div>
    </main>

    <!-- Sticky footer -->
    <div
      v-if="cartStore.items.length > 0 && !cartStore.orderConfirmed"
      class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full app-max-width px-5 pb-5 pt-3 bg-surface border-t-3 border-outline z-40 space-y-3"
    >
      <div class="flex items-baseline justify-between">
        <span class="text-sm text-on-surface-variant font-mono">Total ({{ cartStore.totalItems }} artículos)</span>
        <span class="text-xl font-mono font-extrabold text-on-surface">€{{ cartStore.totalPrice.toFixed(2) }}</span>
      </div>
      <button
        class="w-full h-14 rounded-sm bg-primary-flat text-on-primary border-brutal-thick shadow-brutal font-headline font-bold text-base uppercase tracking-wider flex items-center justify-center gap-2 active:translate-y-[2px] active:shadow-none transition-all"
        @click="confirmOrder"
      >
        Confirmar Pedido
        <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
      </button>
    </div>
  </div>
</template>
