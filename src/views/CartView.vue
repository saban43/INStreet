<!-- CartView - Sepet sayfası -->
<template>
  <div class="cart-view">
    <h1>Sepetim</h1>

    <div v-if="!hasItems" class="empty-cart">
      <p>Sepetiniz boş</p>
      <router-link to="/" class="shop-btn">Alışverişe Başla</router-link>
    </div>

    <div v-else class="cart-container">
      <!-- Sepet Öğeleri -->
      <div class="cart-items">
        <CartItem v-for="item in items" :key="item.id" :item="item" />
      </div>

      <!-- Sepet Özeti -->
      <div class="cart-summary">
        <h2>Sipariş Özeti</h2>

        <div class="summary-line">
          <span>Ara Toplam:</span>
          <span>{{ formatPrice(subtotal) }}</span>
        </div>

        <div v-if="totalDiscount > 0" class="summary-line discount">
          <span>İndirim:</span>
          <span>-{{ formatPrice(totalDiscount) }}</span>
        </div>

        <div class="summary-line total">
          <span>Toplam:</span>
          <span>{{ formatPrice(total) }}</span>
        </div>

        <!-- Teslimat Adresi -->
        <div v-if="isAuthenticated" class="shipping-section">
          <h3>Teslimat Adresi</h3>
          <textarea
            v-model="shippingAddress"
            placeholder="Teslimat adresinizi girin..."
            rows="4"
            class="address-input"
          ></textarea>
        </div>

        <!-- Satın Al Butonu -->
        <button
          v-if="isAuthenticated"
          @click="handleCheckout"
          :disabled="isProcessing || !shippingAddress"
          class="checkout-btn"
        >
          {{ isProcessing ? 'İşleniyor...' : 'Satın Al' }}
        </button>
        <router-link v-else to="/login" class="checkout-btn">
          Satın Almak İçin Giriş Yapın
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '@/composables/useCart'
import { useUserStore } from '@/store/user'
import { formatPrice } from '@/utils/formatPrice'
import CartItem from '@/components/CartItem.vue'

const router = useRouter()
const { items, hasItems, subtotal, totalDiscount, total, checkout, isProcessing } = useCart()
const userStore = useUserStore()

const isAuthenticated = userStore.isAuthenticated
const shippingAddress = ref('')

const handleCheckout = async () => {
  if (!shippingAddress.value.trim()) {
    alert('Lütfen teslimat adresinizi girin')
    return
  }

  const result = await checkout({
    address: shippingAddress.value,
    phone: userStore.userData?.phone || '',
    name: userStore.userName,
  })

  if (result.success) {
    alert('Siparişiniz başarıyla oluşturuldu!')
    router.push('/profile')
  } else {
    alert(result.message || 'Sipariş oluşturulamadı')
  }
}
</script>

<style scoped>
.cart-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.cart-view h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

.empty-cart {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-cart p {
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 2rem;
}

.shop-btn {
  display: inline-block;
  padding: 1rem 2.5rem;
  background: #ff7f00;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: background 0.3s;
}

.shop-btn:hover {
  background: #e67300;
}

.cart-container {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
}

.cart-summary {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 100px;
}

.cart-summary h2 {
  margin: 0 0 1.5rem;
  font-size: 1.5rem;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.summary-line.discount {
  color: #4caf50;
}

.summary-line.total {
  font-size: 1.3rem;
  font-weight: 700;
  border-bottom: none;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #333;
}

.shipping-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #f0f0f0;
}

.shipping-section h3 {
  margin: 0 0 1rem;
  font-size: 1.2rem;
}

.address-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
}

.address-input:focus {
  outline: none;
  border-color: #ff7f00;
}

.checkout-btn {
  width: 100%;
  padding: 1.25rem;
  background: #ff7f00;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: block;
  margin-top: 1.5rem;
  transition: background 0.3s;
}

.checkout-btn:hover:not(:disabled) {
  background: #e67300;
}

.checkout-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

@media (max-width: 968px) {
  .cart-container {
    grid-template-columns: 1fr;
  }

  .cart-summary {
    position: static;
  }
}
</style>
