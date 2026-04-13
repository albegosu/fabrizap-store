<script setup>
import { useCatalogStore } from '@/stores/catalogStore'
import categories from '@/data/categories.json'

const catalogStore = useCatalogStore()
const contexts = categories.contexts
</script>

<template>
  <section class="mb-6 px-5">
    <p class="text-[10px] font-mono font-bold tracking-[0.15em] text-on-surface-variant uppercase mb-3">
      Filtrar por necesidad
    </p>
    <div class="flex gap-2.5 overflow-x-auto hide-scrollbar pb-1">
      <button
        v-for="ctx in contexts"
        :key="ctx.id"
        class="flex-none flex items-center gap-1.5 px-4 py-2.5 rounded-sm font-mono font-semibold text-sm transition-all duration-200 active:translate-y-[1px] active:shadow-none whitespace-nowrap"
        :class="catalogStore.activeFilter === ctx.id
          ? 'bg-primary-flat text-on-primary border-brutal shadow-brutal-sm'
          : 'bg-surface border-brutal text-on-surface-variant hover:bg-surface-container-high'"
        @click="catalogStore.setFilter(ctx.id)"
      >
        <span class="material-symbols-outlined text-[16px]">{{ ctx.icon }}</span>
        {{ ctx.label }}
      </button>
    </div>
  </section>
</template>
