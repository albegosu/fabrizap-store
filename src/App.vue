<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import BottomNav from '@/components/layout/BottomNav.vue'
import FloatingCartButton from '@/components/layout/FloatingCartButton.vue'

const route = useRoute()
const showNav = computed(() => !route.meta.hideNav)
</script>

<template>
  <div class="min-h-dvh bg-surface flex justify-center">
    <div
      id="app-layout-column"
      class="app-max-width relative min-h-dvh flex flex-col"
    >
      <AppHeader v-if="showNav" />
      <main
        class="flex-1"
        :class="{ 'pt-16': showNav, 'pb-24': showNav }"
      >
        <router-view v-slot="{ Component, route: r }">
          <transition name="fade" mode="out-in">
            <component :is="Component" :key="r.path" />
          </transition>
        </router-view>
      </main>
      <BottomNav v-if="showNav" />
      <FloatingCartButton />
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
