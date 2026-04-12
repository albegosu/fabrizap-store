<script setup>
defineProps({
  currentStep: { type: Number, required: true },
  totalSteps: { type: Number, default: 3 },
})
</script>

<template>
  <div class="flex gap-2 items-center">
    <div
      v-for="step in totalSteps"
      :key="step"
      class="h-1.5 rounded-full transition-all duration-500"
      :class="step === currentStep
        ? 'w-16 gradient-primary shadow-primary-glow'
        : step < currentStep
          ? 'w-12 bg-primary/40'
          : 'w-12 bg-outline-variant/30'"
    />
    <span class="ml-auto text-[10px] font-label font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
      Paso {{ currentStep }} de {{ totalSteps }}
    </span>
  </div>
</template>
