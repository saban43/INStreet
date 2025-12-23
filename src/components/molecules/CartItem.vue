<!-- CartItem - Molekül Bileşeni: Sepetteki ürün gösterimi -->
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

      <!-- Fiyat Molekülü kullan -->
      <PriceDisplay :price="item.price" :discount="item.discount" />
    </div>

    <!-- Miktar Seçici Molekülü kullan -->
    <QuantitySelector :model-value="item.quantity" @update:model-value="updateQuantity" />

    <!-- Toplam Fiyat -->
    <div class="item-total">
      <p class="total-label">Toplam:</p>
      <p class="total-price">{{ formatPrice(totalPrice) }}</p>
    </div>

    <!-- Sil Butonu - Atom kullan -->
    <BaseButton variant="danger" size="sm" @click="removeItem" title="Sepetten Çıkar">
      <TrashIcon :size="18" />
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore, type CartItem } from '@/store/cart'
import { formatPrice } from '@/utils/formatPrice'
import PriceDisplay from '@/components/molecules/PriceDisplay.vue'
import QuantitySelector from '@/components/molecules/QuantitySelector.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'
import TrashIcon from '@/components/atoms/icons/TrashIcon.vue'

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

// Miktar güncelle
const updateQuantity = (newQuantity: number) => {
  cartStore.updateQuantity(props.item.id, newQuantity)
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

.item-total {
  text-align: right;
  min-width: 120px;
}

.total-label {
  font-size: 0.875rem;
  color: #666;
  margin: 0 0 0.25rem;
}

.total-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #ff7f00;
  margin: 0;
}

@media (max-width: 768px) {
  .cart-item {
    flex-wrap: wrap;
    gap: 1rem;
  }

  .item-image {
    width: 80px;
    height: 80px;
  }

  .item-total {
    width: 100%;
    text-align: left;
  }
}
</style>
