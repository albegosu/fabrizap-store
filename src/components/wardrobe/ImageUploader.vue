<script setup>
import { ref } from 'vue'
import { useWardrobeStore } from '@/stores/wardrobeStore'

const wardrobeStore = useWardrobeStore()
const fileInput = ref(null)
const isDragging = ref(false)

function triggerUpload() {
  fileInput.value?.click()
}

function handleFile(event) {
  const file = event.target.files?.[0]
  if (file) processFile(file)
}

function handleDrop(event) {
  isDragging.value = false
  const file = event.dataTransfer?.files?.[0]
  if (file) processFile(file)
}

function processFile(file) {
  if (!file.type.startsWith('image/')) return
  const reader = new FileReader()
  reader.onload = (e) => {
    wardrobeStore.addOutfitImage(e.target.result)
  }
  reader.readAsDataURL(file)
}
</script>

<template>
  <section class="px-5">
    <div class="text-center mb-6">
      <h2 class="text-2xl font-headline font-extrabold tracking-tight text-on-surface mb-2">
        Sube tu look del día
      </h2>
      <p class="text-sm text-on-surface-variant font-body leading-relaxed">
        Convierte tu armario en una galería personal. Sube una foto y encontraremos el calzado perfecto para ti.
      </p>
    </div>
    <button
      class="w-full p-8 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center gap-3 cursor-pointer active:scale-[0.98]"
      :class="isDragging
        ? 'border-primary bg-primary/5'
        : 'border-outline-variant/30 bg-surface-container hover:border-primary/50 hover:bg-surface-container-high'"
      @click="triggerUpload"
      @dragover.prevent="isDragging = true"
      @dragleave="isDragging = false"
      @drop.prevent="handleDrop"
    >
      <div class="w-16 h-16 rounded-2xl gradient-primary-soft flex items-center justify-center">
        <span class="material-symbols-outlined text-primary text-3xl">photo_camera</span>
      </div>
      <span class="font-headline font-bold text-sm text-on-surface">Subir Foto de Outfit</span>
      <span class="text-[10px] font-label text-on-surface-variant uppercase tracking-wider">
        JPG, PNG hasta 10MB
      </span>
    </button>
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      class="hidden"
      @change="handleFile"
    />
  </section>
</template>
