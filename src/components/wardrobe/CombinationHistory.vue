<script setup>
import { useRouter } from 'vue-router'
import { useWardrobeStore } from '@/stores/wardrobeStore'
import { useCatalogStore } from '@/stores/catalogStore'

const router = useRouter()
const wardrobeStore = useWardrobeStore()
const catalogStore = useCatalogStore()

function getShoe(shoeId) {
  return catalogStore.getProductById(shoeId)
}

const occasionIcons = {
  oficina: 'work',
  eventos: 'celebration',
  diario: 'sunny',
  viajes: 'flight',
  cenas: 'restaurant',
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
}
</script>

<template>
  <section v-if="wardrobeStore.combinationHistory.length" class="px-5">
    <div class="flex items-baseline justify-between mb-4">
      <h3 class="text-xl font-headline font-extrabold tracking-tight text-on-surface underline decoration-primary decoration-4 underline-offset-4">
        Histórico de combinaciones
      </h3>
      <span class="text-[10px] font-mono font-bold tracking-[0.1em] text-primary uppercase">
        {{ wardrobeStore.combinationHistory.length }} looks
      </span>
    </div>

    <div class="space-y-3">
      <div
        v-for="entry in wardrobeStore.combinationHistory"
        :key="entry.id"
        class="rounded-sm bg-surface-container-lowest border-brutal shadow-brutal overflow-hidden"
      >
        <div class="flex">
          <div class="w-24 h-28 flex-none relative">
            <img
              :src="entry.outfitImage"
              alt="Outfit"
              class="w-full h-full object-cover"
            />
            <span class="absolute bottom-1 left-1 text-[7px] font-mono font-bold text-white bg-on-surface/60 px-1.5 py-0.5 rounded-sm uppercase border border-outline">
              Outfit
            </span>
          </div>

          <div
            class="w-24 h-28 flex-none relative cursor-pointer border-l-2 border-outline"
            @click="router.push(`/producto/${entry.shoeId}`)"
          >
            <img
              :src="getShoe(entry.shoeId)?.image"
              :alt="getShoe(entry.shoeId)?.name"
              class="w-full h-full object-cover"
            />
            <span class="absolute bottom-1 left-1 text-[7px] font-mono font-bold text-on-secondary bg-secondary/70 px-1.5 py-0.5 rounded-sm uppercase border border-outline">
              Zapato
            </span>
          </div>

          <div class="flex-1 p-3 flex flex-col justify-between min-w-0">
            <div>
              <h4 class="font-headline font-bold text-sm text-on-surface leading-tight truncate">
                {{ entry.title }}
              </h4>
              <p class="text-[11px] text-on-surface-variant font-label mt-1 leading-snug line-clamp-2">
                {{ entry.note }}
              </p>
            </div>
            <div class="flex items-center justify-between mt-2">
              <div class="flex items-center gap-1.5">
                <span
                  v-if="entry.occasion"
                  class="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-sm border border-outline bg-surface text-[9px] font-mono font-semibold text-on-surface-variant uppercase tracking-wide"
                >
                  <span class="material-symbols-outlined text-[10px]">{{ occasionIcons[entry.occasion] || 'event' }}</span>
                  {{ entry.occasion }}
                </span>
                <span class="text-[9px] font-mono text-on-surface-variant/60">{{ formatDate(entry.date) }}</span>
              </div>
              <button
                class="w-7 h-7 rounded-sm flex items-center justify-center transition-colors"
                :class="entry.liked ? 'text-primary' : 'text-on-surface-variant/40 hover:text-primary/60'"
                @click="wardrobeStore.toggleHistoryLike(entry.id)"
              >
                <span
                  class="material-symbols-outlined text-[18px]"
                  :style="entry.liked ? 'font-variation-settings: \'FILL\' 1' : ''"
                >favorite</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
