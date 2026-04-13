<script setup>
import { useWardrobeStore } from '@/stores/wardrobeStore'
import { computed } from 'vue'

const wardrobeStore = useWardrobeStore()

const ideasToday = computed(() => Math.max(3, Math.floor(Math.random() * 12) + 5))
</script>

<template>
  <section class="px-5">
    <div class="grid grid-cols-2 gap-3">
      <div class="p-5 rounded-sm bg-surface-container-lowest border-brutal shadow-brutal">
        <div class="w-10 h-10 rounded-sm bg-primary-soft border-brutal flex items-center justify-center mb-3">
          <span class="material-symbols-outlined text-primary text-[20px]">checkroom</span>
        </div>
        <p class="text-2xl font-mono font-extrabold text-on-surface">{{ wardrobeStore.totalItems }}</p>
        <p class="text-[10px] font-mono font-bold tracking-[0.1em] text-on-surface-variant uppercase">Prendas totales</p>
      </div>
      <div class="p-5 rounded-sm bg-surface-container-lowest border-brutal shadow-brutal">
        <div class="w-10 h-10 rounded-sm bg-primary-soft border-brutal flex items-center justify-center mb-3">
          <span class="material-symbols-outlined text-primary text-[20px]">auto_awesome</span>
        </div>
        <p class="text-2xl font-mono font-extrabold text-on-surface">{{ ideasToday }}</p>
        <p class="text-[10px] font-mono font-bold tracking-[0.1em] text-on-surface-variant uppercase">Ideas de hoy</p>
      </div>
    </div>
  </section>
</template>
