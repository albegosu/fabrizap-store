<script setup>
import categories from '@/data/categories.json'

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
})
const emit = defineEmits(['update:modelValue'])

const contexts = categories.contexts

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
    <label class="text-xs font-mono font-bold tracking-[0.15em] text-primary uppercase ml-1">
      Contexto de Uso
    </label>
    <div class="flex flex-wrap gap-3">
      <button
        v-for="ctx in contexts"
        :key="ctx.id"
        class="flex items-center gap-2 px-5 py-3 rounded-sm font-label font-semibold text-sm transition-all duration-200 active:translate-y-[1px] active:shadow-none"
        :class="props.modelValue.includes(ctx.id)
          ? 'bg-primary-flat text-on-primary border-brutal shadow-brutal-sm'
          : 'bg-surface border-brutal text-on-surface-variant hover:bg-surface-container-high'"
        @click="toggle(ctx.id)"
      >
        <span class="material-symbols-outlined text-[18px]">{{ ctx.icon }}</span>
        {{ ctx.label }}
      </button>
    </div>
  </div>
</template>
