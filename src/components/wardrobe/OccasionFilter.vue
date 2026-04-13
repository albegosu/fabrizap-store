<script setup>
import { ref } from 'vue'

const occasions = [
  { id: 'oficina', label: 'Oficina', icon: 'work' },
  { id: 'eventos', label: 'Eventos', icon: 'celebration' },
  { id: 'diario', label: 'Diario', icon: 'sunny' },
  { id: 'cenas', label: 'Cenas', icon: 'restaurant' },
]

const active = ref(null)

function toggle(id) {
  active.value = active.value === id ? null : id
}
</script>

<template>
  <section class="px-5">
    <h3 class="text-lg font-headline font-bold text-on-surface mb-4 text-center">Organiza por Ocasión</h3>
    <div class="flex flex-wrap justify-center gap-2.5">
      <button
        v-for="occ in occasions"
        :key="occ.id"
        class="flex items-center gap-1.5 px-4 py-2.5 rounded-sm font-mono font-semibold text-sm transition-all active:translate-y-[1px] active:shadow-none"
        :class="active === occ.id
          ? 'bg-primary-flat text-on-primary border-brutal shadow-brutal-sm'
          : 'bg-surface border-brutal text-on-surface-variant hover:bg-surface-container-high'"
        @click="toggle(occ.id)"
      >
        <span class="material-symbols-outlined text-[16px]">{{ occ.icon }}</span>
        {{ occ.label }}
      </button>
    </div>
  </section>
</template>
