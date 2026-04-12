<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'

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
        class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-container-high transition-colors"
        @click="router.back()"
      >
        <span class="material-symbols-outlined text-on-surface">arrow_back</span>
      </button>
      <h1 class="text-xl font-headline font-extrabold tracking-tight text-on-surface">
        Mi Carrito
      </h1>
    </header>

    <!-- Order confirmed -->
    <div v-if="cartStore.orderConfirmed" class="flex-1 flex flex-col items-center justify-center px-8 gap-6">
      <div class="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center">
        <span class="material-symbols-outlined text-green-500 text-5xl" style="font-variation-settings: 'FILL' 1">check_circle</span>
      </div>
      <div class="text-center">
        <h2 class="text-2xl font-headline font-extrabold text-on-surface mb-2">Pedido confirmado</h2>
        <p class="text-sm text-on-surface-variant leading-relaxed">
          Tu pedido ha sido procesado correctamente. Recibirás un email con los detalles.
        </p>
      </div>
      <button
        class="w-full max-w-xs h-14 rounded-full gradient-primary text-white font-headline font-bold shadow-primary-glow active:scale-[0.98] transition-transform"
        @click="goHome"
      >
        Volver al catálogo
      </button>
    </div>

    <!-- Cart items -->
    <main v-else class="flex-1 px-5 pb-32">
      <div v-if="cartStore.items.length === 0" class="flex flex-col items-center justify-center py-20 gap-4">
        <div class="w-20 h-20 rounded-2xl gradient-primary-soft flex items-center justify-center">
          <span class="material-symbols-outlined text-primary text-4xl">shopping_bag</span>
        </div>
        <p class="text-on-surface-variant font-body text-sm text-center">Tu carrito está vacío</p>
        <button
          class="px-6 py-3 rounded-full gradient-primary text-white font-headline font-bold text-sm shadow-primary-glow active:scale-[0.98] transition-transform"
          @click="router.push('/')"
        >
          Explorar catálogo
        </button>
      </div>

      <div v-else class="space-y-4 mt-4">
        <div
          v-for="item in cartStore.items"
          :key="item.id"
          class="flex gap-4 p-4 rounded-2xl bg-surface-container-lowest shadow-ambient"
        >
          <div class="w-20 h-20 rounded-xl overflow-hidden bg-surface-container flex-none">
            <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="font-headline font-bold text-sm text-on-surface truncate">{{ item.name }}</h3>
            <p class="text-xs text-on-surface-variant font-label mt-0.5">
              Talla: {{ item.size }} &middot;
              <span class="inline-block w-3 h-3 rounded-full align-middle" :style="{ backgroundColor: item.color, border: item.color === '#FFFFFF' ? '1px solid #ddd' : 'none' }" />
            </p>
            <div class="flex items-center justify-between mt-2">
              <span class="font-headline font-bold text-base text-on-surface">
                {{ item.currency }}{{ (item.price * item.quantity).toFixed(2) }}
              </span>
              <div class="flex items-center gap-2">
                <button
                  class="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-container-high transition-colors"
                  @click="cartStore.updateQuantity(item.id, item.quantity - 1)"
                >
                  <span class="material-symbols-outlined text-[16px]">remove</span>
                </button>
                <span class="text-sm font-headline font-bold w-6 text-center">{{ item.quantity }}</span>
                <button
                  class="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-container-high transition-colors"
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
      class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5 pb-5 pt-3 glass z-40 space-y-3"
    >
      <div class="flex items-baseline justify-between">
        <span class="text-sm text-on-surface-variant font-label">Total ({{ cartStore.totalItems }} artículos)</span>
        <span class="text-xl font-headline font-extrabold text-on-surface">€{{ cartStore.totalPrice.toFixed(2) }}</span>
      </div>
      <button
        class="w-full h-14 rounded-full gradient-primary text-white font-headline font-bold text-base tracking-tight flex items-center justify-center gap-2 shadow-primary-glow active:scale-[0.98] transition-transform"
        @click="confirmOrder"
      >
        Confirmar Pedido
        <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
      </button>
    </div>
  </div>
</template>
