<script setup>
import { useCatalogStore } from '@/stores/catalogStore'
import RecommendedCarousel from '@/components/catalog/RecommendedCarousel.vue'
import FilterChips from '@/components/catalog/FilterChips.vue'
import ProductGrid from '@/components/catalog/ProductGrid.vue'

const catalogStore = useCatalogStore()
</script>

<template>
  <div class="pb-4">
    <RecommendedCarousel />
    <FilterChips />
    <ProductGrid :products="catalogStore.filteredProducts" />
  </div>
</template>
