<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCatalogStore } from '@/stores/catalogStore'
import { useCartStore } from '@/stores/cartStore'
import ProductGallery from '@/components/product/ProductGallery.vue'
import ProductFeatures from '@/components/product/ProductFeatures.vue'
import TechnicalSheet from '@/components/product/TechnicalSheet.vue'
import SizeSelector from '@/components/product/SizeSelector.vue'
import ColorSelector from '@/components/product/ColorSelector.vue'
import CombinationSuggestions from '@/components/product/CombinationSuggestions.vue'
import ProductReviews from '@/components/product/ProductReviews.vue'
import FavButton from '@/components/common/FavButton.vue'
import ThemeToggle from '@/components/common/ThemeToggle.vue'

const route = useRoute()
const router = useRouter()
const catalogStore = useCatalogStore()
const cartStore = useCartStore()

const product = computed(() => catalogStore.getProductById(route.params.id))

const selectedSize = ref(null)
const selectedColor = ref(null)
const addedToCart = ref(false)

function addToCart() {
  if (!product.value) return
  cartStore.addItem(
    product.value,
    selectedSize.value || product.value.sizes[0],
    selectedColor.value || product.value.colors[0]
  )
  addedToCart.value = true
  setTimeout(() => { addedToCart.value = false }, 2000)
}
</script>

<template>
  <div v-if="product" class="pb-24">
    <!-- Back + Fav header -->
    <div class="absolute top-0 left-0 w-full z-30 flex items-center justify-between px-4 pt-4">
      <button
        class="w-10 h-10 rounded-sm bg-surface border-brutal shadow-brutal-sm flex items-center justify-center"
        @click="router.back()"
      >
        <span class="material-symbols-outlined text-on-surface">arrow_back</span>
      </button>
      <div class="flex items-center gap-2">
        <ThemeToggle />
        <FavButton :product-id="product.id" size="lg" />
      </div>
    </div>

    <!-- Gallery -->
    <ProductGallery :images="product.images" :badge="product.badge" />

    <!-- Content -->
    <div class="px-5 pt-5 space-y-6">
      <!-- Category -->
      <p class="text-[10px] font-mono font-bold tracking-[0.15em] text-on-surface-variant uppercase">
        {{ product.category }}
      </p>

      <!-- Title + Price -->
      <div>
        <h1 class="text-3xl font-headline font-extrabold tracking-tight text-on-surface leading-tight">
          {{ product.name }}
        </h1>
        <p class="text-on-surface-variant text-sm mt-2 leading-relaxed">{{ product.description }}</p>
        <div class="flex items-baseline gap-3 mt-3">
          <span class="text-2xl font-mono font-extrabold text-on-surface">
            {{ product.currency }}{{ product.price.toFixed(2) }}
          </span>
          <span v-if="product.originalPrice" class="text-base text-on-surface-variant line-through font-mono">
            {{ product.currency }}{{ product.originalPrice.toFixed(2) }}
          </span>
        </div>
      </div>

      <!-- Features -->
      <ProductFeatures :features="product.features" />

      <!-- Technical Sheet -->
      <TechnicalSheet :sheet="product.technicalSheet" />

      <!-- Quote -->
      <div v-if="product.quote" class="p-5 rounded-sm bg-primary-soft border-brutal-thick border-l-[6px] border-l-primary">
        <p class="text-base font-headline font-bold text-on-surface leading-relaxed italic">
          "{{ product.quote }}"
        </p>
      </div>

      <!-- Sizes -->
      <SizeSelector v-model="selectedSize" :sizes="product.sizes" />

      <!-- Colors -->
      <ColorSelector v-model="selectedColor" :colors="product.colors" />

      <!-- Reviews -->
      <ProductReviews :reviews="product.reviews" />

      <!-- Combinations -->
      <CombinationSuggestions :product-id="product.id" />

      <!-- Shipping note -->
      <div class="border-brutal rounded-sm bg-surface-container p-3 text-left">
        <p class="text-xs text-on-surface-variant font-mono">
          <span class="material-symbols-outlined text-[14px] align-middle mr-1">local_shipping</span>
          Envío express gratuito en pedidos superiores a 100€
        </p>
      </div>
    </div>

    <!-- Sticky CTA -->
    <div class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full app-max-width z-40">
      <div class="px-5 pb-6 pt-4 bg-surface border-t-3 border-outline">
        <button
          class="w-full h-14 rounded-sm font-headline font-bold text-base uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:translate-y-[2px] active:shadow-none"
          :class="addedToCart
            ? 'bg-secondary-flat text-on-secondary border-brutal-thick shadow-brutal-secondary'
            : 'bg-primary-flat text-on-primary border-brutal-thick shadow-brutal'"
          @click="addToCart"
        >
          <span class="material-symbols-outlined text-[20px]">{{ addedToCart ? 'check' : 'shopping_bag' }}</span>
          {{ addedToCart ? 'Añadido al carrito' : 'Añadir al carrito' }}
        </button>
      </div>
    </div>
  </div>

  <div v-else class="flex items-center justify-center min-h-[60vh]">
    <p class="text-on-surface-variant">Producto no encontrado</p>
  </div>
</template>
