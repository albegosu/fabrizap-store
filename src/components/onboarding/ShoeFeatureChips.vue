<script setup>
import categories from '@/data/categories.json'

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
})
const emit = defineEmits(['update:modelValue'])

const shoeFeatures = categories.shoeFeatures

function toggle(id) {
  const current = [...props.modelValue]
  const idx = current.indexOf(id)
  if (idx >= 0) {
    current.splice(idx, 1)
  } else {
    current.push(id)
  }
  emit('update:modelValue', current)
}
</script>

<template>
  <div class="space-y-3">
    <label class="text-xs font-label font-bold tracking-[0.15em] text-primary uppercase ml-1">
      Características del Calzado
    </label>
    <div class="flex flex-wrap gap-3">
      <button
        v-for="feat in shoeFeatures"
        :key="feat.id"
        class="flex items-center gap-2 px-5 py-3 rounded-full font-label font-semibold text-sm transition-all duration-200 active:scale-95"
        :class="props.modelValue.includes(feat.id)
          ? 'gradient-primary text-white shadow-primary-glow'
          : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'"
        @click="toggle(feat.id)"
      >
        <span class="material-symbols-outlined text-[18px]">{{ feat.icon }}</span>
        {{ feat.label }}
      </button>
    </div>
  </div>
</template>
