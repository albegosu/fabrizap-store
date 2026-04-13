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
      <h3 class="text-[10px] font-mono font-bold tracking-[0.15em] text-on-surface-variant uppercase">Seleccionar talla</h3>
      <button class="text-[10px] font-mono font-semibold text-primary border-b-2 border-primary hover:text-secondary transition-colors uppercase tracking-wide">
        Guía de tallas
      </button>
    </div>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="size in sizes"
        :key="size"
        class="w-12 h-12 rounded-sm font-mono font-bold text-sm flex items-center justify-center transition-all active:translate-y-[1px] active:shadow-none"
        :class="props.modelValue === size
          ? 'bg-primary-flat text-on-primary border-brutal shadow-brutal-sm'
          : 'bg-surface border-brutal text-on-surface hover:bg-surface-container-high'"
        @click="emit('update:modelValue', size)"
      >
        {{ size }}
      </button>
    </div>
  </section>
</template>
