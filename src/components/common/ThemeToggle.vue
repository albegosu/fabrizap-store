<script setup>
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/themeStore'

const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)
</script>

<template>
  <button
    type="button"
    class="h-10 w-10 shrink-0 inline-flex items-center justify-center rounded-full hover:bg-surface-container-high/60 transition-colors text-on-surface-variant"
    :aria-label="isDark ? 'Activar modo claro' : 'Activar modo oscuro'"
    :aria-pressed="isDark"
    @click="themeStore.toggle()"
  >
    <span v-if="isDark" class="material-symbols-outlined text-[22px]">wb_sunny</span>
    <span v-else class="material-symbols-outlined text-[22px]">dark_mode</span>
  </button>
</template>
