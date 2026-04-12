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
  <nav class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-surface border-t border-outline-variant/10">
    <div class="flex justify-around items-end px-1 pb-5 pt-1.5 relative">
      <template v-for="tab in tabs" :key="tab.name">
        <!-- Center FabriZap button -->
        <button
          v-if="tab.isCenter"
          class="flex flex-col items-center justify-center -mt-5 relative"
          @click="navigate(tab)"
        >
          <div
            class="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90"
            :class="activeTab === tab.name
              ? 'gradient-primary shadow-primary-glow'
              : 'bg-surface-container-lowest shadow-ambient ring-1 ring-outline-variant/15'"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              class="w-6 h-6"
              :fill="activeTab === tab.name ? '#FFFFFF' : '#baaee7'"
            >
              <path d="M32,144a95.28,95.28,0,0,1,37.53,7.67,4,4,0,0,1,2.47,3.7V192a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V148a4,4,0,0,1,4-4Zm199,12.19L180,144.71,69.66,34.34a8,8,0,0,0-11.56.26C36.11,58.64,24,89,24,120a8,8,0,0,0,8,8,111.2,111.2,0,0,1,63.34,19.7,112.45,112.45,0,0,1,40.55,50.39A15.9,15.9,0,0,0,150.72,208H240a16,16,0,0,0,16-16v-4.73A31.72,31.72,0,0,0,231,156.19Z"/>
            </svg>
          </div>
          <span
            class="text-[9px] font-label font-bold tracking-wider uppercase mt-1 transition-colors"
            :class="activeTab === tab.name ? 'text-primary' : 'text-on-surface-variant/50'"
          >{{ tab.label }}</span>
        </button>

        <!-- Regular tab -->
        <button
          v-else
          class="flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-2xl transition-all min-w-[56px]"
          :class="activeTab === tab.name
            ? 'text-primary'
            : 'text-on-surface-variant/50 hover:text-on-surface-variant'"
          @click="navigate(tab)"
        >
          <span
            class="material-symbols-outlined text-[22px] transition-all"
            :style="activeTab === tab.name ? 'font-variation-settings: \'FILL\' 1' : ''"
          >{{ tab.icon }}</span>
          <span class="text-[9px] font-label font-bold tracking-wider uppercase">{{ tab.label }}</span>
        </button>
      </template>
    </div>
  </nav>
</template>
