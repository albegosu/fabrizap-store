<script setup>
defineProps({
  reviews: { type: Array, default: () => [] },
})

const tagLabels = {
  material: 'Material',
  talla: 'Talla',
  envío: 'Envío',
  combinación: 'Combinación',
  comodidad: 'Comodidad',
}

const tagIcons = {
  material: 'eco',
  talla: 'straighten',
  envío: 'local_shipping',
  combinación: 'styler',
  comodidad: 'spa',
}
</script>

<template>
  <section v-if="reviews.length">
    <h3 class="text-lg font-headline font-bold text-on-surface mb-4 underline decoration-primary decoration-4 underline-offset-4">
      Opiniones
    </h3>
    <div class="space-y-3">
      <div
        v-for="(review, idx) in reviews"
        :key="idx"
        class="rounded-sm bg-surface-container-lowest border-brutal shadow-brutal p-4 space-y-2.5"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-sm bg-primary-soft border-brutal flex items-center justify-center">
              <span class="material-symbols-outlined text-primary text-[16px]" style="font-variation-settings: 'FILL' 1">person</span>
            </div>
            <span class="font-label font-bold text-sm text-on-surface">{{ review.user }}</span>
          </div>
          <div class="flex items-center gap-0.5">
            <span
              v-for="star in 5"
              :key="star"
              class="material-symbols-outlined text-[14px]"
              :class="star <= review.rating ? 'text-amber-400' : 'text-outline-variant/30'"
              style="font-variation-settings: 'FILL' 1"
            >star</span>
          </div>
        </div>

        <p class="text-sm text-on-surface-variant leading-relaxed">{{ review.text }}</p>

        <div v-if="review.tag" class="flex items-center gap-1.5">
          <span
            class="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-secondary-flat text-on-secondary text-[10px] font-mono font-bold tracking-wider uppercase sticker-alt"
          >
            <span class="material-symbols-outlined text-[12px]">{{ tagIcons[review.tag] || 'check_circle' }}</span>
            {{ tagLabels[review.tag] || review.tag }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
