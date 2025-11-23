// Sepet durumu yönetimi - Ürünleri sepete ekleme, çıkarma ve toplam hesaplama
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface CartItem {
  id: string
  productId: string
  name: string
  brand: string
  price: number
  discount: number
  size: string
  quantity: number
  image: string
}

export const useCartStore = defineStore('cart', () => {
  // Sepet öğeleri - LocalStorage'dan yüklenir
  const items = ref<CartItem[]>([])

  // LocalStorage'dan sepeti yükle
  const loadCart = () => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      items.value = JSON.parse(savedCart)
    }
  }

  // Sepeti LocalStorage'a kaydet
  const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(items.value))
  }

  // Hesaplanan değerler
  const itemCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const subtotal = computed(() => {
    return items.value.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0)
  })

  const totalDiscount = computed(() => {
    return items.value.reduce((total, item) => {
      return total + item.price * item.discount * item.quantity
    }, 0)
  })

  const total = computed(() => {
    return subtotal.value - totalDiscount.value
  })

  // Sepete ürün ekle
  const addToCart = (product: any, size: string, quantity: number = 1) => {
    // Aynı ürün ve beden varsa miktarı artır
    const existingItem = items.value.find(
      (item) => item.productId === product.id && item.size === size,
    )

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      // Yeni ürün ekle
      items.value.push({
        id: `${product.id}_${size}_${Date.now()}`,
        productId: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        discount: product.discount || 0,
        size,
        quantity,
        image: product.images?.[0] || '',
      })
    }

    saveCart()
  }

  // Sepetten ürün çıkar
  const removeFromCart = (itemId: string) => {
    items.value = items.value.filter((item) => item.id !== itemId)
    saveCart()
  }

  // Ürün miktarını güncelle
  const updateQuantity = (itemId: string, quantity: number) => {
    const item = items.value.find((item) => item.id === itemId)
    if (item) {
      item.quantity = Math.max(1, quantity)
      saveCart()
    }
  }

  // Sepeti temizle
  const clearCart = () => {
    items.value = []
    saveCart()
  }

  // Başlangıçta sepeti yükle
  loadCart()

  return {
    items,
    itemCount,
    subtotal,
    totalDiscount,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }
})
