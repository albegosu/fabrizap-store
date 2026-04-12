<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useCatalogStore } from '@/stores/catalogStore'
import { useWardrobeStore } from '@/stores/wardrobeStore'
import { useRecommendations } from '@/composables/useRecommendations'
import ProductCard from '@/components/catalog/ProductCard.vue'

const userStore = useUserStore()
const catalogStore = useCatalogStore()
const wardrobeStore = useWardrobeStore()
const { recommendedProducts } = useRecommendations()

const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : ''

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Buenos días'
  if (hour < 20) return 'Buenas tardes'
  return 'Buenas noches'
})

const topPicks = computed(() => recommendedProducts.value.slice(0, 8))

const hasData = computed(() =>
  userStore.stylePreference ||
  userStore.contexts.length > 0 ||
  userStore.shoeFeatures.length > 0 ||
  catalogStore.favorites.length > 0 ||
  wardrobeStore.totalItems > 0
)
</script>

<template>
  <div class="py-5 space-y-7">
    <!-- Greeting -->
    <div class="px-5">
      <p class="text-sm font-label font-semibold text-primary">{{ greeting }}</p>
      <h1 class="text-2xl font-headline font-extrabold tracking-tight text-on-surface mt-1">
        Para ti
      </h1>
      <p class="text-sm text-on-surface-variant font-body mt-1 leading-relaxed">
        Elegida especialmente para ti según tus gustos, favoritos y estilo de vida.
      </p>
    </div>

    <!-- Profile summary chips -->
    <div v-if="hasData" class="px-5">
      <div class="flex flex-wrap gap-2">
        <span
          v-if="userStore.stylePreference"
          class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full gradient-primary-soft text-primary font-label font-semibold text-xs"
        >
          <span class="material-symbols-outlined text-[14px]">apparel</span>
          {{ capitalize(userStore.stylePreference) }}
        </span>
        <span
          v-for="ctx in userStore.contexts"
          :key="ctx"
          class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-surface-container text-on-surface-variant font-label font-semibold text-xs"
        >
          {{ capitalize(ctx) }}
        </span>
        <span
          v-for="feat in userStore.shoeFeatures"
          :key="feat"
          class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-primary/10 text-primary font-label font-semibold text-xs"
        >
          <span class="material-symbols-outlined text-[14px]">footprint</span>
          {{ capitalize(feat.replace('-', ' ')) }}
        </span>
        <span
          v-if="catalogStore.favorites.length > 0"
          class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-surface-container text-on-surface-variant font-label font-semibold text-xs"
        >
          <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1">favorite</span>
          {{ catalogStore.favorites.length }} favoritos
        </span>
        <span
          v-if="wardrobeStore.totalItems > 0"
          class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-surface-container text-on-surface-variant font-label font-semibold text-xs"
        >
          <span class="material-symbols-outlined text-[14px]">checkroom</span>
          {{ wardrobeStore.totalItems }} prendas
        </span>
      </div>
    </div>

    <!-- Curated picks -->
    <section class="px-5">
      <div class="flex items-baseline justify-between mb-4">
        <h2 class="text-lg font-headline font-extrabold tracking-tight text-on-surface">
          Pensado para ti
        </h2>
        <span class="text-[10px] font-label font-bold tracking-[0.1em] text-primary uppercase">
          {{ topPicks.length }} selecciones
        </span>
      </div>
      <div class="grid grid-cols-2 gap-3.5">
        <ProductCard
          v-for="product in topPicks"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>

    <!-- Tip -->
    <div class="px-5">
      <div class="p-5 rounded-2xl gradient-primary-soft">
        <div class="flex items-start gap-3">
          <span class="material-symbols-outlined text-primary text-[24px] flex-none mt-0.5">auto_awesome</span>
          <div>
            <h3 class="font-headline font-bold text-sm text-on-surface mb-1">Mejora tus sugerencias</h3>
            <p class="text-xs text-on-surface-variant font-body leading-relaxed">
              Sube fotos de tus outfits al armario, marca favoritos y completa tu perfil para obtener recomendaciones cada vez más precisas.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
