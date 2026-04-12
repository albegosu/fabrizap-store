<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useCatalogStore } from '@/stores/catalogStore'
import { useWardrobeStore } from '@/stores/wardrobeStore'
import { useRouter } from 'vue-router'
import categories from '@/data/categories.json'

const router = useRouter()
const userStore = useUserStore()
const catalogStore = useCatalogStore()
const wardrobeStore = useWardrobeStore()

const editingPreferences = ref(false)
const editStyle = ref(userStore.stylePreference || '')
const editContexts = ref([...userStore.contexts])

const styles = categories.styles
const contexts = categories.contexts

function toggleEditPreferences() {
  if (editingPreferences.value) {
    userStore.setStylePreference(editStyle.value)
    userStore.setContexts(editContexts.value)
    editingPreferences.value = false
  } else {
    editStyle.value = userStore.stylePreference || ''
    editContexts.value = [...userStore.contexts]
    editingPreferences.value = true
  }
}

function cancelEdit() {
  editStyle.value = userStore.stylePreference || ''
  editContexts.value = [...userStore.contexts]
  editingPreferences.value = false
}

function toggleContext(id) {
  const idx = editContexts.value.indexOf(id)
  if (idx >= 0) {
    editContexts.value.splice(idx, 1)
  } else {
    editContexts.value.push(id)
  }
}

function resetProfile() {
  userStore.resetOnboarding()
  router.push('/onboarding')
}

const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : ''
</script>

<template>
  <div class="py-5 px-5 space-y-6">
    <!-- Avatar + Name -->
    <div class="flex flex-col items-center gap-4 py-6">
      <div class="w-20 h-20 rounded-full gradient-primary flex items-center justify-center shadow-primary-glow">
        <span class="material-symbols-outlined text-white text-4xl" style="font-variation-settings: 'FILL' 1">person</span>
      </div>
      <div class="text-center">
        <h1 class="text-xl font-headline font-extrabold text-on-surface">Mi Perfil</h1>
        <p class="text-sm text-on-surface-variant font-label mt-1">E&amp;E Calzados — FabriZap</p>
      </div>
    </div>

    <!-- Style preferences card -->
    <div class="rounded-2xl bg-surface-container-lowest shadow-ambient p-5 space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-[10px] font-label font-bold tracking-[0.15em] text-primary uppercase">Mis preferencias</h3>
        <button
          v-if="!editingPreferences"
          class="text-xs font-label font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
          @click="toggleEditPreferences"
        >
          <span class="material-symbols-outlined text-[14px]">edit</span>
          Editar
        </button>
      </div>

      <!-- READ MODE -->
      <template v-if="!editingPreferences">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl gradient-primary-soft flex items-center justify-center">
            <span class="material-symbols-outlined text-primary text-[20px]">apparel</span>
          </div>
          <div>
            <p class="text-xs font-label text-on-surface-variant">Estilo</p>
            <p class="font-headline font-bold text-sm text-on-surface">
              {{ capitalize(userStore.stylePreference) || 'No definido' }}
            </p>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <div class="w-10 h-10 rounded-xl gradient-primary-soft flex items-center justify-center flex-none">
            <span class="material-symbols-outlined text-primary text-[20px]">calendar_today</span>
          </div>
          <div>
            <p class="text-xs font-label text-on-surface-variant">Contextos</p>
            <div class="flex flex-wrap gap-1.5 mt-1">
              <span
                v-for="ctx in userStore.contexts"
                :key="ctx"
                class="px-3 py-1 rounded-full bg-surface-container text-xs font-label font-semibold text-on-surface-variant"
              >
                {{ capitalize(ctx) }}
              </span>
              <span v-if="!userStore.contexts.length" class="text-sm text-on-surface-variant">No definidos</span>
            </div>
          </div>
        </div>
      </template>

      <!-- EDIT MODE -->
      <template v-else>
        <div class="space-y-5">
          <!-- Style selector -->
          <div class="space-y-2">
            <p class="text-xs font-label font-bold tracking-[0.12em] text-on-surface-variant uppercase">Tu estilo</p>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="style in styles"
                :key="style.id"
                class="px-3 py-2.5 rounded-xl text-xs font-label font-semibold transition-all duration-200 active:scale-95 text-center"
                :class="editStyle === style.id
                  ? 'gradient-primary text-white shadow-primary-glow'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'"
                @click="editStyle = style.id"
              >
                <span class="material-symbols-outlined text-[18px] block mx-auto mb-1">{{ style.icon }}</span>
                {{ style.label }}
              </button>
            </div>
          </div>

          <!-- Context selector -->
          <div class="space-y-2">
            <p class="text-xs font-label font-bold tracking-[0.12em] text-on-surface-variant uppercase">Contextos de uso</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="ctx in contexts"
                :key="ctx.id"
                class="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-label font-semibold transition-all duration-200 active:scale-95"
                :class="editContexts.includes(ctx.id)
                  ? 'gradient-primary text-white shadow-primary-glow'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'"
                @click="toggleContext(ctx.id)"
              >
                <span class="material-symbols-outlined text-[16px]">{{ ctx.icon }}</span>
                {{ ctx.label }}
              </button>
            </div>
          </div>

          <!-- Action buttons -->
          <div class="flex gap-3 pt-2">
            <button
              class="flex-1 py-3 rounded-full bg-surface-container text-on-surface-variant font-label font-semibold text-sm hover:bg-surface-container-high transition-colors"
              @click="cancelEdit"
            >
              Cancelar
            </button>
            <button
              class="flex-1 py-3 rounded-full gradient-primary text-white font-label font-semibold text-sm shadow-primary-glow active:scale-[0.98] transition-transform"
              @click="toggleEditPreferences"
            >
              Guardar
            </button>
          </div>
        </div>
      </template>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-3 gap-3">
      <div class="p-4 rounded-2xl bg-surface-container-lowest shadow-ambient text-center">
        <p class="text-xl font-headline font-extrabold text-on-surface">{{ catalogStore.favorites.length }}</p>
        <p class="text-[10px] font-label font-bold tracking-wider text-on-surface-variant uppercase">Favoritos</p>
      </div>
      <div class="p-4 rounded-2xl bg-surface-container-lowest shadow-ambient text-center">
        <p class="text-xl font-headline font-extrabold text-on-surface">{{ wardrobeStore.totalItems }}</p>
        <p class="text-[10px] font-label font-bold tracking-wider text-on-surface-variant uppercase">Outfits</p>
      </div>
      <div class="p-4 rounded-2xl bg-surface-container-lowest shadow-ambient text-center">
        <p class="text-xl font-headline font-extrabold text-on-surface">{{ catalogStore.products.length }}</p>
        <p class="text-[10px] font-label font-bold tracking-wider text-on-surface-variant uppercase">Catálogo</p>
      </div>
    </div>

    <!-- Actions -->
    <div class="space-y-3">
      <button
        class="w-full p-4 rounded-2xl bg-surface-container-lowest shadow-ambient flex items-center gap-3 hover:bg-surface-container transition-colors text-left"
        @click="resetProfile"
      >
        <span class="material-symbols-outlined text-on-surface-variant">restart_alt</span>
        <span class="font-headline font-bold text-sm text-on-surface">Reiniciar perfil</span>
        <span class="material-symbols-outlined text-on-surface-variant ml-auto text-[18px]">chevron_right</span>
      </button>
    </div>

    <!-- Footer -->
    <p class="text-center text-[10px] font-label text-on-surface-variant/50 tracking-wider uppercase pt-4">
      &copy; 2024 E&amp;E Calzados — FabriZap MVP
    </p>
  </div>
</template>
