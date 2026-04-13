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
      <h2 class="text-2xl font-headline font-extrabold tracking-tight text-on-surface underline decoration-primary decoration-4 underline-offset-4">
        Recomendado para ti
      </h2>
      <button class="text-xs font-mono font-bold text-primary border-brutal rounded-sm px-3 py-1 hover:bg-primary-soft transition-colors">
        Ver todo
      </button>
    </div>
    <div class="overflow-x-auto pb-2 hide-scrollbar snap-x snap-mandatory scroll-pl-5">
      <div class="flex gap-4 px-5">
        <button
          v-for="product in topRecommendations"
          :key="product.id"
          class="flex-none w-[260px] snap-start rounded-sm overflow-hidden border-brutal shadow-brutal bg-surface-container-lowest group cursor-pointer transition-all hover:shadow-brutal-lg hover:-translate-x-[1px] hover:-translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          @click="goToProduct(product.id)"
        >
          <div class="relative aspect-[4/3] overflow-hidden">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-x-0 bottom-0 bg-on-surface/80 px-4 py-3">
              <p class="text-[10px] font-mono font-semibold tracking-[0.1em] text-white/70 uppercase mb-0.5">
                {{ product.context[0] }}
              </p>
              <h3 class="text-lg font-headline font-bold text-white">{{ product.name }}</h3>
            </div>
            <MatchBadge
              :score="product.matchScore"
              size="lg"
              class="absolute top-3 left-3"
            />
          </div>
        </button>
      </div>
    </div>
  </section>
</template>
