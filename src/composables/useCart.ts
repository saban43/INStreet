// Sepet composable - Sepet işlemleri için yardımcı fonksiyonlar
import { computed, ref } from 'vue'
import { useCartStore } from '@/store/cart'
import { useUserStore } from '@/store/user'
import { addDocument } from '@/firebase/firestore'

export const useCart = () => {
  const cartStore = useCartStore()
  const userStore = useUserStore()
  const isProcessing = ref(false)

  // Store verilerini dışa aktar
  const items = computed(() => cartStore.items)
  const itemCount = computed(() => cartStore.itemCount)
  const subtotal = computed(() => cartStore.subtotal)
  const totalDiscount = computed(() => cartStore.totalDiscount)
  const total = computed(() => cartStore.total)

  // Sepete ürün ekle
  const addItem = (product: any, size: string, quantity: number = 1) => {
    cartStore.addToCart(product, size, quantity)
    return { success: true, message: 'Ürün sepete eklendi' }
  }

  // Sepetten ürün çıkar
  const removeItem = (itemId: string) => {
    cartStore.removeFromCart(itemId)
    return { success: true, message: 'Ürün sepetten çıkarıldı' }
  }

  // Ürün miktarını güncelle
  const updateItemQuantity = (itemId: string, quantity: number) => {
    cartStore.updateQuantity(itemId, quantity)
    return { success: true }
  }

  // Sepeti temizle
  const clearCart = () => {
    cartStore.clearCart()
    return { success: true, message: 'Sepet temizlendi' }
  }

  // Sipariş oluştur
  const checkout = async (shippingAddress: any) => {
    if (!userStore.isAuthenticated) {
      return { success: false, message: 'Sipariş vermek için giriş yapmalısınız' }
    }

    if (items.value.length === 0) {
      return { success: false, message: 'Sepetiniz boş' }
    }

    isProcessing.value = true

    try {
      // Sipariş verilerini hazırla
      const orderData = {
        userId: userStore.currentUser?.uid,
        userEmail: userStore.currentUser?.email,
        userName: userStore.userName,
        items: items.value.map((item) => ({
          productId: item.productId,
          name: item.name,
          brand: item.brand,
          price: item.price,
          discount: item.discount,
          size: item.size,
          quantity: item.quantity,
          image: item.image,
        })),
        subtotal: subtotal.value,
        totalDiscount: totalDiscount.value,
        totalAmount: total.value,
        shippingAddress,
        paymentStatus: 'paid',
        orderStatus: 'processing',
        orderDate: new Date(),
      }

      // Siparişi Firestore'a kaydet
      const result = await addDocument('orders', orderData)

      if (result.success) {
        // Sepeti temizle
        clearCart()
        return {
          success: true,
          message: 'Siparişiniz başarıyla oluşturuldu',
          orderId: result.id,
        }
      } else {
        return { success: false, message: 'Sipariş oluşturulamadı' }
      }
    } catch (error: any) {
      console.error('Sipariş hatası:', error)
      return { success: false, message: 'Sipariş sırasında bir hata oluştu' }
    } finally {
      isProcessing.value = false
    }
  }

  // Sepette ürün var mı kontrol et
  const hasItems = computed(() => items.value.length > 0)

  // Ürün sepette mi kontrol et
  const isInCart = (productId: string, size: string) => {
    return items.value.some((item) => item.productId === productId && item.size === size)
  }

  return {
    items,
    itemCount,
    subtotal,
    totalDiscount,
    total,
    hasItems,
    isProcessing,
    addItem,
    removeItem,
    updateItemQuantity,
    clearCart,
    checkout,
    isInCart,
  }
}
