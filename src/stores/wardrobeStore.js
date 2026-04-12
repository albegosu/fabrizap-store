import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const defaultGarments = [
  {
    id: 'default-1',
    src: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=400&h=500&fit=crop',
    isDefault: true,
    createdAt: '2026-04-10T10:00:00.000Z',
  },
  {
    id: 'default-2',
    src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop',
    isDefault: true,
    createdAt: '2026-04-09T14:30:00.000Z',
  },
  {
    id: 'default-3',
    src: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=500&fit=crop',
    isDefault: true,
    createdAt: '2026-04-08T09:15:00.000Z',
  },
]

const defaultCombinationHistory = [
  {
    id: 'history-1',
    outfitImage: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=400&h=500&fit=crop',
    shoeId: 'oxford-elena',
    title: 'Look ejecutivo con Oxford',
    note: 'Blazer azul marino + pantalón recto',
    occasion: 'oficina',
    date: '2026-04-10',
    liked: true,
  },
  {
    id: 'history-2',
    outfitImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop',
    shoeId: 'heritage-low-top',
    title: 'Casual urbano con Heritage',
    note: 'Chinos beige + blusa de lino blanca',
    occasion: 'diario',
    date: '2026-04-09',
    liked: true,
  },
  {
    id: 'history-3',
    outfitImage: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=500&fit=crop',
    shoeId: 'riviera-espadrille',
    title: 'Brisa mediterránea',
    note: 'Vestido midi de flores + bolso de rafia',
    occasion: 'viajes',
    date: '2026-04-08',
    liked: false,
  },
]

export const useWardrobeStore = defineStore('wardrobe', () => {
  const outfitImages = ref(loadFromStorage('fz_wardrobe', []))
  const combinationHistory = ref(loadFromStorage('fz_combination_history', defaultCombinationHistory))

  const allOutfitImages = computed(() => {
    if (outfitImages.value.length === 0) return defaultGarments
    return outfitImages.value
  })

  const totalItems = computed(() => allOutfitImages.value.length)

  function addOutfitImage(imageData) {
    const entry = {
      id: Date.now().toString(),
      src: imageData,
      createdAt: new Date().toISOString(),
    }
    outfitImages.value.unshift(entry)
    saveToStorage('fz_wardrobe', outfitImages.value)
    return entry
  }

  function removeOutfitImage(id) {
    outfitImages.value = outfitImages.value.filter(img => img.id !== id)
    saveToStorage('fz_wardrobe', outfitImages.value)
  }

  function addCombinationToHistory(combination) {
    const entry = {
      id: Date.now().toString(),
      ...combination,
      date: new Date().toISOString().split('T')[0],
      liked: false,
    }
    combinationHistory.value.unshift(entry)
    saveToStorage('fz_combination_history', combinationHistory.value)
    return entry
  }

  function toggleHistoryLike(id) {
    const item = combinationHistory.value.find(h => h.id === id)
    if (item) {
      item.liked = !item.liked
      saveToStorage('fz_combination_history', combinationHistory.value)
    }
  }

  return {
    outfitImages,
    allOutfitImages,
    combinationHistory,
    totalItems,
    addOutfitImage,
    removeOutfitImage,
    addCombinationToHistory,
    toggleHistoryLike,
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
