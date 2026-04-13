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
    class="rounded-sm border-brutal flex items-center justify-center transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
    :class="[
      size === 'lg' ? 'w-11 h-11' : 'w-9 h-9',
      catalogStore.isFavorite(productId)
        ? 'bg-primary/10 shadow-brutal-sm'
        : 'bg-surface-container-lowest'
    ]"
    @click="toggle"
  >
    <span
      class="material-symbols-outlined transition-colors"
      :class="size === 'lg' ? 'text-[22px]' : 'text-[20px]'"
      :style="{
        color: catalogStore.isFavorite(productId) ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
        fontVariationSettings: catalogStore.isFavorite(productId) ? '\'FILL\' 1' : '\'FILL\' 0',
      }"
    >favorite</span>
  </button>
</template>
