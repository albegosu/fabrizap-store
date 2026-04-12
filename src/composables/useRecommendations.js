import { computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useCatalogStore } from '@/stores/catalogStore'

export function useRecommendations() {
  const userStore = useUserStore()
  const catalogStore = useCatalogStore()

  function calculateMatch(product) {
    let score = 50
    const userStyle = userStore.stylePreference
    const userContexts = userStore.contexts
    const userShoeFeatures = userStore.shoeFeatures

    if (userStyle && product.style.includes(userStyle)) {
      score += 20
    }

    if (userContexts.length > 0) {
      const contextMatches = product.context.filter(c => userContexts.includes(c)).length
      score += Math.min(15, contextMatches * 10)
    }

    if (userShoeFeatures.length > 0 && product.shoeFeatures) {
      const featureMatches = product.shoeFeatures.filter(f => userShoeFeatures.includes(f)).length
      score += Math.min(15, featureMatches * 5)
    }

    const jitter = ((product.id.charCodeAt(0) + product.id.charCodeAt(1)) % 11) - 5
    score = Math.max(60, Math.min(99, score + jitter))
    return score
  }

  const recommendedProducts = computed(() => {
    return catalogStore.products
      .map(p => ({ ...p, matchScore: calculateMatch(p) }))
      .sort((a, b) => b.matchScore - a.matchScore)
  })

  const topRecommendations = computed(() =>
    recommendedProducts.value.slice(0, 6)
  )

  return {
    calculateMatch,
    recommendedProducts,
    topRecommendations,
  }
}
