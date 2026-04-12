<script setup>
import { useRouter } from 'vue-router'
import { useRecommendations } from '@/composables/useRecommendations'
import MatchBadge from '@/components/common/MatchBadge.vue'
import FavButton from '@/components/common/FavButton.vue'

const props = defineProps({
  product: { type: Object, required: true },
})

const router = useRouter()
const { calculateMatch } = useRecommendations()
const matchScore = calculateMatch(props.product)

function goToProduct() {
  router.push(`/producto/${props.product.id}`)
}
</script>

<template>
  <button
    class="text-left rounded-2xl overflow-hidden bg-surface-container-lowest shadow-ambient group cursor-pointer transition-all hover:shadow-lg active:scale-[0.97]"
    @click="goToProduct"
  >
    <div class="relative aspect-square overflow-hidden">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <MatchBadge :score="matchScore" class="absolute top-2.5 left-2.5" />
      <FavButton :product-id="product.id" class="absolute top-2.5 right-2.5" />
    </div>
    <div class="p-3.5">
      <h3 class="font-headline font-bold text-sm text-on-surface truncate">{{ product.name }}</h3>
      <div class="flex items-baseline justify-between mt-1.5">
        <div class="flex items-baseline gap-1.5">
          <span class="font-headline font-bold text-base text-on-surface">{{ product.currency }}{{ product.price.toFixed(2) }}</span>
          <span v-if="product.originalPrice" class="text-xs text-on-surface-variant line-through">
            {{ product.currency }}{{ product.originalPrice.toFixed(2) }}
          </span>
        </div>
        <span class="text-[10px] font-label font-semibold tracking-wider text-on-surface-variant uppercase">
          {{ product.context[0] }}
        </span>
      </div>
    </div>
  </button>
</template>
