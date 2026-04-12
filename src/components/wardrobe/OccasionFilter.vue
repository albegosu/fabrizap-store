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
        class="flex items-center gap-1.5 px-4 py-2.5 rounded-full font-label font-semibold text-sm transition-all active:scale-95"
        :class="active === occ.id
          ? 'gradient-primary text-white shadow-primary-glow'
          : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'"
        @click="toggle(occ.id)"
      >
        <span class="material-symbols-outlined text-[16px]">{{ occ.icon }}</span>
        {{ occ.label }}
      </button>
    </div>
  </section>
</template>
