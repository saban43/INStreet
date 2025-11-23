<!-- CartItem Bileşeni - Sepetteki ürün gösterimi -->
<template>
  <div class="cart-item">
    <!-- Ürün Görseli -->
    <div class="item-image">
      <img :src="item.image || '/placeholder.jpg'" :alt="item.name" />
    </div>

    <!-- Ürün Bilgileri -->
    <div class="item-details">
      <h3 class="item-name">{{ item.name }}</h3>
      <p class="item-brand">{{ item.brand }}</p>
      <p class="item-size">Beden: {{ item.size }}</p>

      <!-- Fiyat Bilgisi -->
      <div class="item-price">
        <span v-if="item.discount > 0" class="original-price">
          {{ formatPrice(item.price) }}
        </span>
        <span class="final-price">
          {{ formatPrice(finalPrice) }}
        </span>
      </div>
    </div>

    <!-- Miktar Kontrolü -->
    <div class="item-quantity">
      <button @click="decreaseQuantity" class="qty-btn">-</button>
      <span class="qty-value">{{ item.quantity }}</span>
      <button @click="increaseQuantity" class="qty-btn">+</button>
    </div>

    <!-- Toplam Fiyat -->
    <div class="item-total">
      <p class="total-label">Toplam:</p>
      <p class="total-price">{{ formatPrice(totalPrice) }}</p>
    </div>

    <!-- Sil Butonu -->
    <button @click="removeItem" class="remove-btn" title="Sepetten Çıkar">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <polyline points="3 6 5 6 21 6"></polyline>
        <path
          d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore, type CartItem } from '@/store/cart'
import { formatPrice } from '@/utils/formatPrice'

// Props
const props = defineProps<{
  item: CartItem
}>()

const cartStore = useCartStore()

// Hesaplanan değerler
const finalPrice = computed(() => {
  return props.item.price - props.item.price * props.item.discount
})

const totalPrice = computed(() => {
  return finalPrice.value * props.item.quantity
})

// Miktar artır
const increaseQuantity = () => {
  cartStore.updateQuantity(props.item.id, props.item.quantity + 1)
}

// Miktar azalt
const decreaseQuantity = () => {
  if (props.item.quantity > 1) {
    cartStore.updateQuantity(props.item.id, props.item.quantity - 1)
  }
}

// Sepetten çıkar
const removeItem = () => {
  if (confirm('Bu ürünü sepetten çıkarmak istediğinize emin misiniz?')) {
    cartStore.removeFromCart(props.item.id)
  }
}
</script>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.item-image {
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
  background: #f5f5f5;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
}

.item-name {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  color: #333;
}

.item-brand {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 0.5rem;
  text-transform: uppercase;
}

.item-size {
  color: #999;
  font-size: 0.9rem;
  margin: 0 0 1rem;
}

.item-price {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.original-price {
  color: #999;
  text-decoration: line-through;
  font-size: 0.9rem;
}

.final-price {
  color: #ff7f00;
  font-size: 1.1rem;
  font-weight: 700;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1rem;
  background: #f5f5f5;
  border-radius: 8px;
}

.qty-btn {
  width: 30px;
  height: 30px;
  border: none;
  background: white;
  border-radius: 4px;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}

.qty-btn:hover {
  background: #e0e0e0;
}

.qty-value {
  font-weight: 600;
  min-width: 30px;
  text-align: center;
}

.item-total {
  text-align: right;
  min-width: 120px;
}

.total-label {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 0.5rem;
}

.total-price {
  color: #333;
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0;
}

.remove-btn {
  background: #f44336;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-btn:hover {
  background: #d32f2f;
}

@media (max-width: 768px) {
  .cart-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .item-total {
    width: 100%;
    text-align: left;
  }

  .remove-btn {
    width: 100%;
  }
}
</style>
