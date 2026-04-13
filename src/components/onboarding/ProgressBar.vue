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
      class="h-2 rounded-none transition-all duration-500"
      :class="step === currentStep
        ? 'w-16 bg-primary-flat border border-outline'
        : step < currentStep
          ? 'w-12 bg-primary/50 border border-outline'
          : 'w-12 bg-surface-container border border-outline'"
    />
    <span class="ml-auto text-[10px] font-mono font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
      Paso {{ currentStep }} de {{ totalSteps }}
    </span>
  </div>
</template>
