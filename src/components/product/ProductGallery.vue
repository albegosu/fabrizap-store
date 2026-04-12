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
    <div class="aspect-[4/3] bg-surface-container overflow-hidden">
      <img
        :src="images[activeIndex]"
        :alt="`Product image ${activeIndex + 1}`"
        class="w-full h-full object-cover"
      />
    </div>
    <span
      v-if="badge"
      class="absolute top-4 right-4 px-4 py-1.5 rounded-full bg-on-surface text-surface text-xs font-label font-bold tracking-wide uppercase"
    >
      {{ badge }}
    </span>
    <div v-if="images.length > 1" class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
      <button
        v-for="(_, idx) in images"
        :key="idx"
        class="w-2 h-2 rounded-full transition-all"
        :class="idx === activeIndex ? 'bg-primary w-6' : 'bg-on-surface/30'"
        @click="activeIndex = idx"
      />
    </div>
  </div>
</template>
