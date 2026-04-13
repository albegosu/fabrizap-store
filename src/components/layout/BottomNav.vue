<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()

const tabs = [
  { name: 'Home', icon: 'home', route: '/', label: 'Home' },
  { name: 'Wardrobe', icon: 'checkroom', route: '/armario', label: 'Armario' },
  { name: 'Curated', icon: null, route: '/para-ti', label: 'Para ti', isCenter: true },
  { name: 'Favorites', icon: 'favorite', route: '/favoritos', label: 'Favoritos' },
  { name: 'Profile', icon: 'person', route: '/perfil', label: 'Perfil' },
]

const activeTab = computed(() => {
  return tabs.find(t => t.route === route.path)?.name || 'Home'
})

function navigate(tab) {
  router.push(tab.route)
}
</script>

<template>
  <nav
    class="app-bottom-nav fixed bottom-0 left-1/2 -translate-x-1/2 w-full app-max-width z-50 bg-surface border-t-3 border-outline"
  >
    <div class="flex justify-around items-end px-1 pb-5 pt-1.5 relative">
      <template v-for="tab in tabs" :key="tab.name">
        <!-- Center FabriZap button -->
        <button
          v-if="tab.isCenter"
          class="flex flex-col items-center justify-center -mt-5 relative"
          @click="navigate(tab)"
        >
          <div
            class="w-14 h-14 rounded-sm flex items-center justify-center transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            :class="activeTab === tab.name
              ? 'bg-primary-flat border-brutal-thick shadow-brutal-primary text-white'
              : 'bg-surface-container-lowest border-brutal'"
          >
            <img
              src="/shoe-logo.png"
              alt=""
              width="24"
              height="24"
              class="w-6 h-6 object-contain transition-[filter,opacity] pointer-events-none"
              :class="activeTab === tab.name
                ? 'brightness-0 invert opacity-100'
                : 'opacity-95'"
            />
          </div>
          <span
            class="text-[9px] font-mono font-bold tracking-wider uppercase mt-1 transition-colors"
            :class="activeTab === tab.name ? 'text-primary' : 'text-on-surface-variant/50'"
          >{{ tab.label }}</span>
        </button>

        <!-- Regular tab -->
        <button
          v-else
          class="flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-sm transition-all min-w-[56px]"
          :class="activeTab === tab.name
            ? 'text-primary'
            : 'text-on-surface-variant/50 hover:text-on-surface-variant'"
          @click="navigate(tab)"
        >
          <span
            class="material-symbols-outlined text-[22px] transition-all"
            :style="activeTab === tab.name ? 'font-variation-settings: \'FILL\' 1' : ''"
          >{{ tab.icon }}</span>
          <span class="text-[9px] font-mono font-bold tracking-wider uppercase">{{ tab.label }}</span>
        </button>
      </template>
    </div>
  </nav>
</template>
