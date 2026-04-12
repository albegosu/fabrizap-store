<script setup>
const props = defineProps({
  colors: { type: Array, required: true },
  modelValue: { type: String, default: null },
})
const emit = defineEmits(['update:modelValue'])

function isLight(hex) {
  const c = hex.replace('#', '')
  const r = parseInt(c.substring(0, 2), 16)
  const g = parseInt(c.substring(2, 4), 16)
  const b = parseInt(c.substring(4, 6), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 155
}
</script>

<template>
  <section>
    <h3 class="text-[10px] font-label font-bold tracking-[0.15em] text-on-surface-variant uppercase mb-3">Seleccionar color</h3>
    <div class="flex gap-3">
      <button
        v-for="color in colors"
        :key="color"
        class="w-10 h-10 rounded-full transition-all active:scale-90 flex items-center justify-center"
        :class="props.modelValue === color ? 'ring-2 ring-primary ring-offset-2 ring-offset-surface' : ''"
        :style="{ backgroundColor: color, border: color === '#FFFFFF' ? '1px solid #E0DDDA' : 'none' }"
        @click="emit('update:modelValue', color)"
      >
        <span
          v-if="props.modelValue === color"
          class="material-symbols-outlined text-[16px]"
          :style="{ color: isLight(color) ? '#1B2631' : '#FFFFFF' }"
        >check</span>
      </button>
    </div>
  </section>
</template>
