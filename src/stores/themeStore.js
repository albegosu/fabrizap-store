import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  THEME_STORAGE_KEY,
  readStoredThemeIsDark,
  applyDocumentTheme,
} from '@/theme/documentTheme'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(readStoredThemeIsDark())

  function setDark(value) {
    isDark.value = value
    try {
      localStorage.setItem(THEME_STORAGE_KEY, value ? 'dark' : 'light')
    } catch {
      /* ignore quota / private mode */
    }
    applyDocumentTheme(value)
  }

  function toggle() {
    setDark(!isDark.value)
  }

  return { isDark, setDark, toggle }
})
