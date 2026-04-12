import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const stylePreference = ref(loadFromStorage('fz_style', ''))
  const contexts = ref(loadFromStorage('fz_contexts', []))
  const onboardingCompleted = ref(loadFromStorage('fz_onboarded', false))

  const hasCompletedOnboarding = computed(() => onboardingCompleted.value)

  function setStylePreference(style) {
    stylePreference.value = style
    saveToStorage('fz_style', style)
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

  function completeOnboarding() {
    onboardingCompleted.value = true
    saveToStorage('fz_onboarded', true)
  }

  function resetOnboarding() {
    stylePreference.value = ''
    contexts.value = []
    onboardingCompleted.value = false
    localStorage.removeItem('fz_style')
    localStorage.removeItem('fz_contexts')
    localStorage.removeItem('fz_onboarded')
  }

  return {
    stylePreference,
    contexts,
    onboardingCompleted,
    hasCompletedOnboarding,
    setStylePreference,
    toggleContext,
    setContexts,
    completeOnboarding,
    resetOnboarding,
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
