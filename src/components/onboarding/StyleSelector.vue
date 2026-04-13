<script setup>
import categories from '@/data/categories.json'

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
})
const emit = defineEmits(['update:modelValue'])

const styles = categories.styles

const styleImages = {
  casual:
    'https://images.unsplash.com/photo-1534653299134-96a171b61581?w=400&h=300&fit=crop',
  sporty: '/images/zapatilla-beige.jpg',
  formal: 'https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=400&h=300&fit=crop',
}

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
    <div class="mb-2 ml-1 space-y-1">
      <label class="text-xs font-mono font-bold tracking-[0.15em] text-primary uppercase block">
        Tu estética preferida
      </label>
      <p class="text-[11px] text-on-surface-variant font-label leading-snug">
        Elige uno o varios estilos.
      </p>
    </div>
    <div class="grid grid-cols-2 gap-3">
      <button
        v-for="(style, idx) in styles"
        :key="style.id"
        class="relative overflow-hidden rounded-sm transition-all duration-300 active:translate-y-[1px]"
        :class="[
          props.modelValue.includes(style.id)
            ? 'border-brutal-thick shadow-brutal-primary'
            : 'border-brutal hover:shadow-brutal-sm',
          idx === styles.length - 1 ? 'col-span-2' : ''
        ]"
        @click="toggle(style.id)"
      >
        <div class="relative aspect-[4/3]" :class="idx === styles.length - 1 ? 'aspect-[8/3]' : ''">
          <img
            :src="styleImages[style.id]"
            :alt="style.label"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-x-0 bottom-0 bg-surface-bright/90 backdrop-blur-sm px-4 py-3 border-t border-outline/10">
            <h3 class="text-inverse-surface font-headline font-bold text-lg">{{ style.label }}</h3>
            <p class="text-inverse-surface/70 text-xs font-label">{{ style.description }}</p>
          </div>
          <div
            v-if="props.modelValue.includes(style.id)"
            class="absolute top-3 right-3 w-7 h-7 rounded-sm bg-primary-flat border-brutal flex items-center justify-center"
          >
            <span class="material-symbols-outlined text-white text-[18px]">check</span>
          </div>
        </div>
      </button>
    </div>
  </div>
</template>
