import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import productsData from '@/data/products.json'

export const useCatalogStore = defineStore('catalog', () => {
  const products = ref(productsData)
  const activeFilter = ref(null)
  const favorites = ref(loadFromStorage('fz_favorites', []))

  const filteredProducts = computed(() => {
    if (!activeFilter.value) return products.value
    return products.value.filter(p =>
      p.context.includes(activeFilter.value)
    )
  })

  const favoriteProducts = computed(() =>
    products.value.filter(p => favorites.value.includes(p.id))
  )

  function setFilter(filter) {
    activeFilter.value = activeFilter.value === filter ? null : filter
  }

  function toggleFavorite(productId) {
    const idx = favorites.value.indexOf(productId)
    if (idx >= 0) {
      favorites.value.splice(idx, 1)
    } else {
      favorites.value.push(productId)
    }
    saveToStorage('fz_favorites', favorites.value)
  }

  function isFavorite(productId) {
    return favorites.value.includes(productId)
  }

  function getProductById(id) {
    return products.value.find(p => p.id === id) || null
  }

  return {
    products,
    activeFilter,
    favorites,
    filteredProducts,
    favoriteProducts,
    setFilter,
    toggleFavorite,
    isFavorite,
    getProductById,
  }
})

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw !== null ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
