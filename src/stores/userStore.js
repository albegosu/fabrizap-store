import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const stylePreference = ref(normalizeStylePreference(loadFromStorage('fz_style', [])))
  const contexts = ref(loadFromStorage('fz_contexts', []))
  const shoeFeatures = ref(loadFromStorage('fz_shoe_features', []))
  const onboardingCompleted = ref(loadFromStorage('fz_onboarded', false))

  const hasCompletedOnboarding = computed(() => onboardingCompleted.value)

  function setStylePreference(styles) {
    const next = Array.isArray(styles) ? [...styles] : normalizeStylePreference(styles)
    stylePreference.value = next
    saveToStorage('fz_style', next)
  }

  function toggleContext(ctx) {
    const idx = contexts.value.indexOf(ctx)
    if (idx >= 0) {
      contexts.value.splice(idx, 1)
    } else {
      contexts.value.push(ctx)
    }
    saveToStorage('fz_contexts', contexts.value)
  }

  function setContexts(ctxList) {
    contexts.value = [...ctxList]
    saveToStorage('fz_contexts', contexts.value)
  }

  function toggleShoeFeature(feature) {
    const idx = shoeFeatures.value.indexOf(feature)
    if (idx >= 0) {
      shoeFeatures.value.splice(idx, 1)
    } else {
      shoeFeatures.value.push(feature)
    }
    saveToStorage('fz_shoe_features', shoeFeatures.value)
  }

  function setShoeFeatures(featureList) {
    shoeFeatures.value = [...featureList]
    saveToStorage('fz_shoe_features', shoeFeatures.value)
  }

  function completeOnboarding() {
    onboardingCompleted.value = true
    saveToStorage('fz_onboarded', true)
  }

  function resetOnboarding() {
    stylePreference.value = []
    contexts.value = []
    shoeFeatures.value = []
    onboardingCompleted.value = false
    localStorage.removeItem('fz_style')
    localStorage.removeItem('fz_contexts')
    localStorage.removeItem('fz_shoe_features')
    localStorage.removeItem('fz_onboarded')
  }

  return {
    stylePreference,
    contexts,
    shoeFeatures,
    onboardingCompleted,
    hasCompletedOnboarding,
    setStylePreference,
    toggleContext,
    setContexts,
    toggleShoeFeature,
    setShoeFeatures,
    completeOnboarding,
    resetOnboarding,
  }
})

function normalizeStylePreference(raw) {
  if (Array.isArray(raw)) {
    return raw.filter((id) => typeof id === 'string' && id)
  }
  if (typeof raw === 'string' && raw) {
    return [raw]
  }
  return []
}

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
