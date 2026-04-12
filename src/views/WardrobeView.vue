<script setup>
import ImageUploader from '@/components/wardrobe/ImageUploader.vue'
import OutfitCombinations from '@/components/wardrobe/OutfitCombinations.vue'
import CombinationHistory from '@/components/wardrobe/CombinationHistory.vue'
import WardrobeStats from '@/components/wardrobe/WardrobeStats.vue'
import OccasionFilter from '@/components/wardrobe/OccasionFilter.vue'
import { useWardrobeStore } from '@/stores/wardrobeStore'

const wardrobeStore = useWardrobeStore()
</script>

<template>
  <div class="py-5 space-y-8">
    <ImageUploader />
    <OutfitCombinations v-if="wardrobeStore.outfitImages.length > 0" />
    <CombinationHistory />
    <WardrobeStats />
    <OccasionFilter />
  </div>
</template>
