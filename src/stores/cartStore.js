import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref(loadFromStorage('fz_cart', []))
  const orderConfirmed = ref(false)

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  function addItem(product, size, color) {
    const existing = items.value.find(
      i => i.productId === product.id && i.size === size && i.color === color
    )
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({
        id: Date.now().toString(),
        productId: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        currency: product.currency,
        size,
        color,
        quantity: 1,
      })
    }
    saveToStorage('fz_cart', items.value)
  }

  function removeItem(id) {
    items.value = items.value.filter(i => i.id !== id)
    saveToStorage('fz_cart', items.value)
  }

  function updateQuantity(id, qty) {
    const item = items.value.find(i => i.id === id)
    if (item) {
      item.quantity = Math.max(1, qty)
      saveToStorage('fz_cart', items.value)
    }
  }

  function clearCart() {
    items.value = []
    localStorage.removeItem('fz_cart')
  }

  function confirmOrder() {
    orderConfirmed.value = true
    clearCart()
  }

  function resetOrderConfirmation() {
    orderConfirmed.value = false
  }

  return {
    items,
    orderConfirmed,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    confirmOrder,
    resetOrderConfirmation,
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
