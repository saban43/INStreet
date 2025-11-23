<!-- ProductCard Bileşeni - Ürün kartı gösterimi -->
<template>
  <div class="product-card" @click="goToProduct">
    <!-- Ürün Görseli -->
    <div class="product-image">
      <img :src="product.images?.[0] || '/placeholder.jpg'" :alt="product.name" />

      <!-- İndirim Etiketi -->
      <div v-if="product.discount > 0" class="discount-badge">
        {{ discountPercentage }}% İndirim
      </div>

      <!-- Stok Durumu -->
      <div v-if="product.stock === 0" class="stock-badge out-of-stock">Stokta Yok</div>
    </div>

    <!-- Ürün Bilgileri -->
    <div class="product-info">
      <p class="product-brand">{{ product.brand }}</p>
      <h3 class="product-name">{{ product.name }}</h3>

      <!-- Fiyat -->
      <div class="product-price">
        <span v-if="product.discount > 0" class="original-price">
          {{ formatPrice(product.price) }}
        </span>
        <span class="final-price">
          {{ formatPrice(finalPrice) }}
        </span>
      </div>

      <!-- Sepete Ekle Butonu -->
      <button v-if="product.stock > 0" @click.stop="addToCart" class="add-to-cart-btn">
        Sepete Ekle
      </button>
      <button v-else class="add-to-cart-btn disabled" disabled>Stokta Yok</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/utils/formatPrice'
import type { Product } from '@/store/products'

// Props
const props = defineProps<{
  product: Product
}>()

const router = useRouter()
const cartStore = useCartStore()

// Hesaplanan değerler
const finalPrice = computed(() => {
  return props.product.price - props.product.price * props.product.discount
})

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
  background: #ff7f00;
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.stock-badge {
  position: absolute;
  bottom: 10px;
  left: 10px;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.out-of-stock {
  background: #f44336;
  color: white;
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
  -webkit-box-orient: vertical;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.original-price {
  color: #999;
  text-decoration: line-through;
  font-size: 0.95rem;
}

.final-price {
  color: #ff7f00;
  font-size: 1.3rem;
  font-weight: 700;
}

.add-to-cart-btn {
  width: 100%;
  padding: 0.75rem;
  background: #000;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.add-to-cart-btn:hover {
  background: #333;
}

.add-to-cart-btn.disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
