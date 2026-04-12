<script setup>
import combinationsData from '@/data/combinations.json'
import { useCatalogStore } from '@/stores/catalogStore'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  productId: { type: String, required: true },
})

const router = useRouter()
const catalogStore = useCatalogStore()

const relatedCombinations = computed(() => {
  const direct = combinationsData.filter(c => c.shoeId === props.productId)
  if (direct.length > 0) return direct.slice(0, 3)
  return combinationsData.slice(0, 2)
})

function getShoe(shoeId) {
  return catalogStore.getProductById(shoeId)
}
</script>

<template>
  <section v-if="relatedCombinations.length">
    <h3 class="text-lg font-headline font-bold text-on-surface mb-4">
      Otros usuarios lo combinaron con...
    </h3>
    <div class="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
      <div
        v-for="combo in relatedCombinations"
        :key="combo.id"
        class="flex-none w-[140px] cursor-pointer group"
        @click="router.push(`/producto/${combo.shoeId}`)"
      >
        <div class="aspect-square rounded-2xl overflow-hidden bg-surface-container mb-2">
          <img
            :src="combo.outfitImage"
            :alt="combo.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <p class="text-xs font-label font-semibold text-on-surface truncate">{{ combo.title }}</p>
        <p class="text-[10px] font-label text-on-surface-variant uppercase tracking-wide">
          {{ getShoe(combo.shoeId)?.name || '' }}
        </p>
      </div>
    </div>
  </section>
</template>
