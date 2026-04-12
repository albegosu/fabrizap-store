<script setup>
const props = defineProps({
  sizes: { type: Array, required: true },
  modelValue: { type: Number, default: null },
})
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <section>
    <div class="flex items-baseline justify-between mb-3">
      <h3 class="text-[10px] font-label font-bold tracking-[0.15em] text-on-surface-variant uppercase">Seleccionar talla</h3>
      <button class="text-[10px] font-label font-semibold text-primary hover:text-secondary transition-colors uppercase tracking-wide">
        Guía de tallas
      </button>
    </div>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="size in sizes"
        :key="size"
        class="w-12 h-12 rounded-xl font-headline font-bold text-sm flex items-center justify-center transition-all active:scale-90"
        :class="props.modelValue === size
          ? 'gradient-primary text-white shadow-primary-glow'
          : 'bg-surface-container text-on-surface hover:bg-surface-container-high'"
        @click="emit('update:modelValue', size)"
      >
        {{ size }}
      </button>
    </div>
  </section>
</template>
