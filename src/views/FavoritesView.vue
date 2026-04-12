<script setup>
import { useCatalogStore } from '@/stores/catalogStore'
import ProductCard from '@/components/catalog/ProductCard.vue'

const catalogStore = useCatalogStore()
</script>

<template>
  <div class="py-5">
    <div class="px-5 mb-6">
      <h1 class="text-2xl font-headline font-extrabold tracking-tight text-on-surface">
        Tus Favoritos
      </h1>
      <p class="text-sm text-on-surface-variant font-body mt-1">
        {{ catalogStore.favoriteProducts.length }} productos guardados
      </p>
    </div>

    <div v-if="catalogStore.favoriteProducts.length === 0" class="flex flex-col items-center justify-center py-20 gap-4 px-8">
      <div class="w-20 h-20 rounded-2xl gradient-primary-soft flex items-center justify-center">
        <span class="material-symbols-outlined text-primary text-4xl">favorite</span>
      </div>
      <p class="text-on-surface-variant font-body text-sm text-center">
        Aún no has guardado ningún favorito. Explora el catálogo y marca los que te gusten.
      </p>
    </div>

    <div v-else class="px-5">
      <div class="grid grid-cols-2 gap-3.5">
        <ProductCard
          v-for="product in catalogStore.favoriteProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>
