<script setup>
defineProps({
  score: { type: Number, required: true },
  size: { type: String, default: 'sm' },
})
</script>

<template>
  <span
    class="inline-flex items-center font-label font-bold tracking-wide uppercase rounded-full"
    :class="size === 'lg'
      ? 'px-3 py-1.5 text-xs'
      : 'px-2 py-1 text-[10px]'"
    :style="{
      background: score >= 90
        ? 'linear-gradient(135deg, #baaee7, #b98bf8)'
        : score >= 75
          ? 'rgba(186,174,231,0.15)'
          : 'rgba(90,102,112,0.1)',
      color: score >= 90 ? '#fff' : score >= 75 ? '#8b6cc1' : '#5A6670'
    }"
  >
    {{ score }}% match
  </span>
</template>
