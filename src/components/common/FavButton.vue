<script setup>
import { useCatalogStore } from '@/stores/catalogStore'

const props = defineProps({
  productId: { type: String, required: true },
  size: { type: String, default: 'md' },
})

const catalogStore = useCatalogStore()

function toggle(e) {
  e.preventDefault()
  e.stopPropagation()
  catalogStore.toggleFavorite(props.productId)
}
</script>

<template>
  <button
    class="rounded-full flex items-center justify-center transition-all active:scale-90"
    :class="size === 'lg'
      ? 'w-11 h-11'
      : 'w-9 h-9'"
    :style="{
      backgroundColor: catalogStore.isFavorite(productId) ? 'rgba(186,174,231,0.15)' : 'rgba(244,241,238,0.8)',
    }"
    @click="toggle"
  >
    <span
      class="material-symbols-outlined transition-colors"
      :class="size === 'lg' ? 'text-[22px]' : 'text-[20px]'"
      :style="{
        color: catalogStore.isFavorite(productId) ? '#b98bf8' : '#948DA2',
        fontVariationSettings: catalogStore.isFavorite(productId) ? '\'FILL\' 1' : '\'FILL\' 0',
      }"
    >favorite</span>
  </button>
</template>
