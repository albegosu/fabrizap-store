<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCatalogStore } from '@/stores/catalogStore'
import { useWardrobeStore } from '@/stores/wardrobeStore'
import combinationsData from '@/data/combinations.json'

const router = useRouter()
const catalogStore = useCatalogStore()
const wardrobeStore = useWardrobeStore()

const hasPics = computed(() => wardrobeStore.outfitImages.length > 0)
const latestImage = computed(() => wardrobeStore.outfitImages[0]?.src || null)

const combos = computed(() => combinationsData.slice(0, 3))

function getShoe(shoeId) {
  return catalogStore.getProductById(shoeId)
}
</script>

<template>
  <section class="px-5">
    <div class="flex items-baseline justify-between mb-4">
      <h3 class="text-xl font-headline font-extrabold tracking-tight text-on-surface">
        Combinaciones Sugeridas
      </h3>
      <button class="text-xs font-label font-semibold text-primary">Ver todas</button>
    </div>

    <div class="space-y-4">
      <div
        v-for="combo in combos"
        :key="combo.id"
        class="rounded-2xl bg-surface-container-lowest shadow-ambient p-4"
      >
        <div class="flex gap-3 mb-3">
          <!-- Outfit photo -->
          <div class="w-20 h-24 rounded-xl overflow-hidden bg-surface-container flex-none relative">
            <img
              :src="hasPics ? latestImage : combo.outfitImage"
              alt="Tu look"
              class="w-full h-full object-cover"
            />
            <span class="absolute top-1 left-1 text-[8px] font-label font-bold text-white bg-on-surface/60 px-1.5 py-0.5 rounded uppercase">
              Tu look
            </span>
          </div>
          <!-- Recommended shoe -->
          <div
            class="flex-1 rounded-xl overflow-hidden bg-surface-container relative cursor-pointer"
            @click="router.push(`/producto/${combo.shoeId}`)"
          >
            <img
              :src="getShoe(combo.shoeId)?.image"
              :alt="getShoe(combo.shoeId)?.name"
              class="w-full h-full object-cover"
            />
            <span class="absolute top-1 right-1 text-[8px] font-label font-bold text-white bg-primary/80 px-1.5 py-0.5 rounded uppercase">
              {{ combo.tag }}
            </span>
          </div>
        </div>
        <h4 class="font-headline font-bold text-sm text-on-surface">{{ combo.title }}</h4>
        <p class="text-xs text-on-surface-variant font-body mt-1 leading-relaxed line-clamp-2">
          {{ combo.description }}
        </p>
        <button
          class="mt-3 w-full py-2.5 rounded-full bg-surface-container text-on-surface font-label font-semibold text-sm hover:bg-surface-container-high transition-colors active:scale-[0.98]"
          @click="router.push(`/producto/${combo.shoeId}`)"
        >
          Ver Detalles del Zapato
        </button>
      </div>
    </div>
  </section>
</template>
