<script setup>
import { useRouter } from 'vue-router'
import { useRecommendations } from '@/composables/useRecommendations'
import MatchBadge from '@/components/common/MatchBadge.vue'

const router = useRouter()
const { topRecommendations } = useRecommendations()

function goToProduct(id) {
  router.push(`/producto/${id}`)
}
</script>

<template>
  <section class="mb-6">
    <div class="flex items-baseline justify-between px-5 mb-4">
      <h2 class="text-2xl font-headline font-extrabold tracking-tight text-on-surface">
        Recomendado para ti
      </h2>
      <button class="text-xs font-label font-semibold text-primary hover:text-secondary transition-colors">
        Ver todo
      </button>
    </div>
    <div class="flex gap-4 overflow-x-auto px-5 pb-2 hide-scrollbar snap-x snap-mandatory">
      <button
        v-for="product in topRecommendations"
        :key="product.id"
        class="flex-none w-[260px] snap-start rounded-2xl overflow-hidden shadow-ambient bg-surface-container-lowest group cursor-pointer transition-all hover:shadow-lg active:scale-[0.98]"
        @click="goToProduct(product.id)"
      >
        <div class="relative aspect-[4/3] overflow-hidden">
          <img
            :src="product.image"
            :alt="product.name"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <MatchBadge
            :score="product.matchScore"
            size="lg"
            class="absolute top-3 left-3"
          />
          <div class="absolute bottom-0 left-0 p-4">
            <p class="text-[10px] font-label font-semibold tracking-[0.1em] text-white/70 uppercase mb-1">
              {{ product.context[0] }}
            </p>
            <h3 class="text-lg font-headline font-bold text-white">{{ product.name }}</h3>
          </div>
        </div>
      </button>
    </div>
  </section>
</template>
