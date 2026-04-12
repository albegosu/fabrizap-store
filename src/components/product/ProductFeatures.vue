<script setup>
defineProps({
  features: { type: Array, required: true },
})
</script>

<template>
  <section>
    <h3 class="text-lg font-headline font-bold text-on-surface mb-4">Lo que te encantará</h3>
    <div class="space-y-3">
      <div
        v-for="feature in features"
        :key="feature.title"
        class="flex items-center gap-4 p-4 rounded-2xl bg-surface-container"
      >
        <div class="w-11 h-11 rounded-xl gradient-primary-soft flex items-center justify-center flex-none">
          <span class="material-symbols-outlined text-primary text-[22px]">{{ feature.icon }}</span>
        </div>
        <div>
          <h4 class="font-headline font-bold text-sm text-on-surface">{{ feature.title }}</h4>
          <p class="text-xs text-on-surface-variant font-label">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
