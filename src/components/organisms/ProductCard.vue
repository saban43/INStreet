<!-- ProductCard - Organizma Bileşeni: Ürün kartı gösterimi -->
<template>
  <div class="product-card" @click="goToProduct">
    <!-- Ürün Görseli -->
    <div class="product-image">
      <img :src="product.images?.[0] || '/placeholder.jpg'" :alt="product.name" />

      <!-- İndirim Badge'i - Atom kullan -->
      <BaseBadge v-if="product.discount > 0" variant="primary" class="discount-badge">
        {{ discountPercentage }}% İndirim
      </BaseBadge>

      <!-- Stok Badge'i - Atom kullan -->
      <BaseBadge v-if="product.stock === 0" variant="danger" class="stock-badge">
        Stokta Yok
      </BaseBadge>
    </div>

    <!-- Ürün Bilgileri -->
    <div class="product-info">
      <p class="product-brand">{{ product.brand }}</p>
      <h3 class="product-name">{{ product.name }}</h3>

      <!-- Fiyat Molekülü kullan -->
      <PriceDisplay :price="product.price" :discount="product.discount" class="mb-1" />

      <!-- Sepete Ekle Butonu - Atom kullan -->
      <BaseButton
        v-if="product.stock > 0"
        variant="primary"
        size="md"
        @click.stop="addToCart"
        class="add-to-cart-btn"
      >
        Sepete Ekle
      </BaseButton>
      <BaseButton v-else variant="secondary" size="md" :disabled="true" class="add-to-cart-btn">
        Stokta Yok
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/store/cart'
import type { Product } from '@/store/products'
import BaseBadge from '@/components/atoms/BaseBadge.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'
import PriceDisplay from '@/components/molecules/PriceDisplay.vue'

// Props
const props = defineProps<{
  product: Product
}>()

const router = useRouter()
const cartStore = useCartStore()

// Hesaplanan değerler
const discountPercentage = computed(() => {
  return Math.round(props.product.discount * 100)
})

// Ürün detay sayfasına git
const goToProduct = () => {
  router.push(`/product/${props.product.id}`)
}

// Sepete ekle (varsayılan ilk beden ile)
const addToCart = () => {
  if (props.product.sizes && props.product.sizes.length > 0 && props.product.sizes[0]) {
    cartStore.addToCart(props.product, props.product.sizes[0], 1)
    alert('Ürün sepete eklendi!')
  } else {
    alert('Bu ürün için beden bilgisi bulunmuyor')
  }
}
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.product-image {
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
  background: #f5f5f5;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.discount-badge {
  position: absolute;
  top: 10px;
  right: 10px;
}

.stock-badge {
  position: absolute;
  bottom: 10px;
  left: 10px;
}

.product-info {
  padding: 1.25rem;
}

.product-brand {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.product-name {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1rem;
  color: #333;
  line-height: 1.4;
  height: 2.8em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.mb-1 {
  margin-bottom: 1rem;
}

.add-to-cart-btn {
  width: 100%;
}
</style>
