<script setup>
import { ref } from 'vue'

defineProps({
  sheet: { type: Object, required: true },
})

const isOpen = ref(false)

const labels = {
  capellada: 'Capellada',
  suela: 'Suela',
  construccion: 'Construcción',
}
</script>

<template>
  <section>
    <button
      class="w-full flex items-center justify-between py-3 border-b-2 border-outline"
      @click="isOpen = !isOpen"
    >
      <h3 class="text-[10px] font-mono font-bold tracking-[0.15em] text-primary uppercase">Ficha Técnica</h3>
      <span
        class="material-symbols-outlined text-on-surface-variant text-[20px] transition-transform duration-300"
        :class="{ 'rotate-180': isOpen }"
      >expand_more</span>
    </button>
    <transition name="accordion">
      <div v-if="isOpen" class="space-y-4 pb-2 pt-3 overflow-hidden">
        <div v-for="(value, key) in sheet" :key="key" class="border-b border-outline-variant/30 pb-3">
          <p class="text-[10px] font-mono font-bold tracking-[0.1em] text-on-surface-variant uppercase mb-1">
            {{ labels[key] || key }}
          </p>
          <p class="text-sm text-on-surface font-body leading-relaxed">{{ value }}</p>
        </div>
      </div>
    </transition>
  </section>
</template>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
  max-height: 300px;
}
.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
