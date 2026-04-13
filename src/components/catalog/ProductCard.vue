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
    class="text-left rounded-sm overflow-hidden bg-surface-container-lowest border-brutal shadow-brutal group cursor-pointer transition-all hover:shadow-brutal-lg hover:-translate-x-[1px] hover:-translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
    @click="goToProduct"
  >
    <div class="relative aspect-square overflow-hidden">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover"
      />
      <MatchBadge :score="matchScore" class="absolute top-2.5 left-2.5" />
      <FavButton :product-id="product.id" class="absolute top-2.5 right-2.5" />
    </div>
    <div class="p-3 border-t-2 border-outline">
      <h3 class="font-headline font-bold text-sm text-on-surface truncate">{{ product.name }}</h3>
      <div class="flex items-baseline justify-between mt-1.5">
        <div class="flex items-baseline gap-1.5">
          <span class="font-mono font-bold text-base text-on-surface">{{ product.currency }}{{ product.price.toFixed(2) }}</span>
          <span v-if="product.originalPrice" class="text-xs text-on-surface-variant line-through font-mono">
            {{ product.currency }}{{ product.originalPrice.toFixed(2) }}
          </span>
        </div>
        <span class="text-[10px] font-mono font-semibold tracking-wider text-on-surface-variant uppercase">
          {{ product.context[0] }}
        </span>
      </div>
    </div>
  </button>
</template>
