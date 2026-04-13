<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { FABRIZAP_LOGO_URL } from '@/constants/brand'
import { useUserStore } from '@/stores/userStore'
import ProgressBar from '@/components/onboarding/ProgressBar.vue'
import StyleSelector from '@/components/onboarding/StyleSelector.vue'
import ContextChips from '@/components/onboarding/ContextChips.vue'
import ShoeFeatureChips from '@/components/onboarding/ShoeFeatureChips.vue'
import ThemeToggle from '@/components/common/ThemeToggle.vue'

const router = useRouter()
const userStore = useUserStore()

const step = ref(1)
const selectedStyle = ref(userStore.stylePreference || '')
const selectedContexts = ref([...userStore.contexts])
const selectedShoeFeatures = ref([...userStore.shoeFeatures])

function nextStep() {
  if (step.value < 3) {
    step.value++
  }
}

function prevStep() {
  if (step.value > 1) {
    step.value--
  }
}

function finish() {
  userStore.setStylePreference(selectedStyle.value)
  userStore.setContexts(selectedContexts.value)
  userStore.setShoeFeatures(selectedShoeFeatures.value)
  userStore.completeOnboarding()
  router.push('/')
}

function skip() {
  userStore.completeOnboarding()
  router.push('/')
}
</script>

<template>
  <div class="min-h-dvh bg-surface flex flex-col">
    <!-- Header -->
    <header class="flex justify-between items-center px-5 pt-5 pb-2 gap-2">
      <div class="flex items-center min-w-0">
        <img :src="FABRIZAP_LOGO_URL" alt="FabriZap" class="h-9 w-auto" />
      </div>
      <div class="flex items-center gap-0.5 shrink-0">
        <ThemeToggle />
        <button
          class="text-sm font-label font-semibold text-on-surface-variant hover:text-primary transition-colors px-2 py-2"
          @click="skip"
        >
          SKIP
        </button>
      </div>
    </header>

    <main class="flex-1 px-5 pb-8 flex flex-col">
      <!-- Progress -->
      <div class="mb-8 mt-2">
        <ProgressBar :current-step="step" :total-steps="3" />
      </div>

      <!-- Step 1: Welcome -->
      <transition name="slide" mode="out-in">
        <div v-if="step === 1" key="step1" class="flex-1 flex flex-col">
          <div class="mb-8">
            <h1 class="text-4xl font-headline font-extrabold leading-tight tracking-tight text-on-surface mb-3">
              Bienvenida a<br />
              <span class="text-gradient-primary">FabriZap</span>
            </h1>
            <p class="text-on-surface-variant text-base leading-relaxed max-w-[320px]">
              Tu asesor de calzado personal. Te ayudamos a encontrar el zapato perfecto para cada ocasión.
            </p>
          </div>

          <div class="flex-1 flex items-center justify-center">
            <div class="relative w-full max-w-[300px] aspect-square">
              <div class="absolute inset-0 gradient-primary-soft rounded-3xl" />
              <img
                src="https://images.unsplash.com/photo-1575131141058-dccffccceec9?w=500&h=500&fit=crop"
                alt="Calzado elegante"
                class="relative w-full h-full object-cover rounded-3xl shadow-ambient"
              />
              <div class="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl gradient-primary flex items-center justify-center shadow-primary-glow">
                <span class="material-symbols-outlined text-white text-4xl">auto_awesome</span>
              </div>
            </div>
          </div>

          <div class="mt-auto pt-8 space-y-3">
            <p class="text-center text-xs text-on-surface-variant font-label">
              Personaliza tu experiencia en 2 pasos
            </p>
            <button
              class="w-full h-14 rounded-full gradient-primary text-white font-headline font-bold text-base tracking-tight flex items-center justify-center gap-2 shadow-primary-glow active:scale-[0.98] transition-transform"
              @click="nextStep"
            >
              Empezar
              <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </transition>

      <!-- Step 2: Preferences -->
      <transition name="slide" mode="out-in">
        <div v-if="step === 2" key="step2" class="flex-1 flex flex-col">
          <div class="mb-8">
            <h1 class="text-3xl font-headline font-extrabold leading-tight tracking-tight text-on-surface mb-2">
              Personaliza tu estilo
            </h1>
            <p class="text-on-surface-variant text-sm leading-relaxed">
              Ayúdanos a entender tu ritmo de vida para personalizar tu galería.
            </p>
          </div>

          <div class="space-y-8 flex-1 overflow-y-auto">
            <StyleSelector v-model="selectedStyle" />
            <ContextChips v-model="selectedContexts" />
            <ShoeFeatureChips v-model="selectedShoeFeatures" />
          </div>

          <div class="mt-auto pt-8 flex items-center gap-4">
            <button
              class="text-sm font-label font-semibold text-on-surface-variant hover:text-primary transition-colors"
              @click="prevStep"
            >
              Volver
            </button>
            <button
              class="flex-1 h-14 rounded-full gradient-primary text-white font-headline font-bold text-base tracking-tight flex items-center justify-center gap-2 shadow-primary-glow active:scale-[0.98] transition-transform"
              @click="nextStep"
            >
              Siguiente
              <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </transition>

      <!-- Step 3: Confirmation -->
      <transition name="slide" mode="out-in">
        <div v-if="step === 3" key="step3" class="flex-1 flex flex-col">
          <div class="mb-8">
            <h1 class="text-3xl font-headline font-extrabold leading-tight tracking-tight text-on-surface mb-2">
              Todo listo
            </h1>
            <p class="text-on-surface-variant text-sm leading-relaxed">
              Tu perfil de estilo está configurado. Estás a un paso de descubrir tu galería editorial personalizada.
            </p>
          </div>

          <div class="flex-1 flex flex-col items-center justify-center gap-6">
            <div class="w-24 h-24 rounded-full gradient-primary flex items-center justify-center shadow-primary-glow">
              <span class="material-symbols-outlined text-white text-5xl" style="font-variation-settings: 'FILL' 1">check_circle</span>
            </div>

            <div class="text-center space-y-4">
              <div v-if="selectedStyle" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary font-label font-semibold text-sm">
                <span class="material-symbols-outlined text-[18px]">apparel</span>
                Estilo: {{ selectedStyle.charAt(0).toUpperCase() + selectedStyle.slice(1) }}
              </div>
              <div v-if="selectedContexts.length" class="flex flex-wrap justify-center gap-2">
                <span
                  v-for="ctx in selectedContexts"
                  :key="ctx"
                  class="px-4 py-2 rounded-full bg-surface-container text-on-surface-variant font-label text-xs font-semibold"
                >
                  {{ ctx.charAt(0).toUpperCase() + ctx.slice(1) }}
                </span>
              </div>
              <div v-if="selectedShoeFeatures.length" class="flex flex-wrap justify-center gap-2 mt-3">
                <span
                  v-for="feat in selectedShoeFeatures"
                  :key="feat"
                  class="px-4 py-2 rounded-full bg-primary/10 text-primary font-label text-xs font-semibold"
                >
                  {{ feat.charAt(0).toUpperCase() + feat.slice(1).replace('-', ' ') }}
                </span>
              </div>
            </div>
          </div>

          <div class="mt-auto pt-8 space-y-3">
            <button
              class="w-full h-14 rounded-full gradient-primary text-white font-headline font-bold text-base tracking-tight flex items-center justify-center gap-2 shadow-primary-glow active:scale-[0.98] transition-transform"
              @click="finish"
            >
              Continuar a Editorial
              <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
            <button
              class="w-full py-3 text-sm font-label font-semibold text-on-surface-variant hover:text-primary transition-colors text-center"
              @click="prevStep"
            >
              Volver a editar
            </button>
          </div>
        </div>
      </transition>
    </main>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
