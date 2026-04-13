<script setup>
import { ref } from 'vue'

const props = defineProps({
  images: { type: Array, required: true },
  badge: { type: String, default: null },
})

const activeIndex = ref(0)
</script>

<template>
  <div class="relative">
    <div class="aspect-[4/3] bg-surface-container overflow-hidden border-b-3 border-outline">
      <img
        :src="images[activeIndex]"
        :alt="`Product image ${activeIndex + 1}`"
        class="w-full h-full object-cover"
      />
    </div>
    <span
      v-if="badge"
      class="absolute top-4 right-[7.5rem] z-20 px-4 py-1.5 rounded-sm bg-secondary-flat text-on-secondary text-xs font-mono font-bold tracking-wide uppercase sticker"
    >
      {{ badge }}
    </span>
    <div v-if="images.length > 1" class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
      <button
        v-for="(_, idx) in images"
        :key="idx"
        class="h-2 rounded-none transition-all"
        :class="idx === activeIndex ? 'bg-primary w-6' : 'bg-on-surface/30 w-2'"
        @click="activeIndex = idx"
      />
    </div>
  </div>
</template>
