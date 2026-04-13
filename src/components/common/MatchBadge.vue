<script setup>
defineProps({
  score: { type: Number, required: true },
  size: { type: String, default: 'sm' },
})
</script>

<template>
  <span
    class="inline-flex items-center font-mono font-bold tracking-wide uppercase rounded-sm"
    :class="[
      size === 'lg'
        ? 'px-3 py-1.5 text-xs'
        : 'px-2 py-1 text-[10px]',
      score >= 90
        ? 'sticker bg-primary-flat text-on-primary'
        : score >= 75
          ? 'border-brutal bg-secondary/20 text-on-surface'
          : 'border-brutal bg-surface-container text-on-surface-variant'
    ]"
  >
    {{ score }}% match
  </span>
</template>
