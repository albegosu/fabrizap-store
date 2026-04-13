<script setup>
import categories from '@/data/categories.json'

const props = defineProps({
  modelValue: { type: String, default: '' },
})
const emit = defineEmits(['update:modelValue'])

const styles = categories.styles

const styleImages = {
  casual:
    'https://images.unsplash.com/photo-1534653299134-96a171b61581?w=400&h=300&fit=crop',
  sporty: '/images/zapatilla-beige.jpg',
  formal: 'https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=400&h=300&fit=crop',
}

function select(id) {
  emit('update:modelValue', id)
}
</script>

<template>
  <div class="space-y-3">
    <label class="text-xs font-label font-bold tracking-[0.15em] text-primary uppercase mb-2 ml-1">
      Tu estética preferida
    </label>
    <div class="grid grid-cols-2 gap-3">
      <button
        v-for="(style, idx) in styles"
        :key="style.id"
        class="relative overflow-hidden rounded-md transition-all duration-300 active:scale-[0.97]"
        :class="[
          props.modelValue === style.id
            ? 'ring-2 ring-primary shadow-primary-glow'
            : 'ring-1 ring-outline-variant/20 hover:ring-primary/40',
          idx === styles.length - 1 ? 'col-span-2' : ''
        ]"
        @click="select(style.id)"
      >
        <div class="relative aspect-[4/3]" :class="idx === styles.length - 1 ? 'aspect-[8/3]' : ''">
          <img
            :src="styleImages[style.id]"
            :alt="style.label"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div class="absolute bottom-0 left-0 p-4">
            <h3 class="text-white font-headline font-bold text-lg">{{ style.label }}</h3>
            <p class="text-white/70 text-xs font-label">{{ style.description }}</p>
          </div>
          <div
            v-if="props.modelValue === style.id"
            class="absolute top-3 right-3 w-7 h-7 rounded-full gradient-primary flex items-center justify-center"
          >
            <span class="material-symbols-outlined text-white text-[18px]">check</span>
          </div>
        </div>
      </button>
    </div>
  </div>
</template>
