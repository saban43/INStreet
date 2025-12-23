<!-- ProductView - Ürün detay sayfası -->
<template>
  <div class="product-view">
    <div v-if="isLoading" class="loading">Yükleniyor...</div>

    <div v-else-if="!product" class="not-found">
      <p>Ürün bulunamadı</p>
      <BaseButton variant="primary" size="md" @click="router.push('/')">
        Ana Sayfaya Dön
      </BaseButton>
    </div>

    <div v-else class="product-container">
      <!-- Ürün Görselleri -->
      <div class="product-gallery">
        <div class="main-image">
          <img :src="selectedImage || product.images[0]" :alt="product.name" />
        </div>
        <div class="thumbnail-list">
          <div
            v-for="(image, index) in product.images"
            :key="index"
            :class="['thumbnail', { active: selectedImage === image }]"
            @click="selectedImage = image"
          >
            <img :src="image" :alt="`${product.name} ${index + 1}`" />
          </div>
        </div>
      </div>

      <!-- Ürün Bilgileri -->
      <div class="product-details">
        <p class="product-brand">{{ product.brand }}</p>
        <h1 class="product-title">{{ product.name }}</h1>

        <!-- Fiyat Molekülü kullan -->
        <PriceDisplay :price="product.price" :discount="product.discount" class="mb-2" />

        <!-- Açıklama -->
        <p class="product-description">{{ product.description }}</p>

        <!-- Beden Seçici Molekülü kullan -->
        <SizeSelector :sizes="product.sizes" v-model="selectedSize" class="mb-2" />

        <!-- Stok Durumu Badge -->
        <BaseBadge
          :variant="stockStatus.color === 'green' ? 'success' : 'danger'"
          class="stock-badge mb-2"
        >
          {{ stockStatus.text }}
        </BaseBadge>

        <!-- Sepete Ekle Butonu -->
        <BaseButton
          v-if="product.stock > 0"
          @click="handleAddToCart"
          :disabled="!selectedSize"
          variant="primary"
          size="lg"
          class="add-to-cart-btn"
        >
          {{ selectedSize ? 'Sepete Ekle' : 'Lütfen Beden Seçin' }}
        </BaseButton>
        <BaseButton v-else variant="secondary" size="lg" :disabled="true" class="add-to-cart-btn">
          Stokta Yok
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProducts } from '@/composables/useProducts'
import { useCart } from '@/composables/useCart'
import { formatPrice, getStockStatus } from '@/utils/formatPrice'
import PriceDisplay from '@/components/molecules/PriceDisplay.vue'
import SizeSelector from '@/components/molecules/SizeSelector.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'
import BaseBadge from '@/components/atoms/BaseBadge.vue'

const route = useRoute()
const router = useRouter()
const { loadProduct, selectedProduct: product, isLoading } = useProducts()
const { addItem } = useCart()

const selectedImage = ref('')
const selectedSize = ref('')

const finalPrice = computed(() => {
  if (!product.value) return 0
  return product.value.price - product.value.price * product.value.discount
})

const discountPercentage = computed(() => {
  if (!product.value) return 0
  return Math.round(product.value.discount * 100)
})

const stockStatus = computed(() => {
  if (!product.value) return { text: '', color: '' }
  return getStockStatus(product.value.stock)
})

const handleAddToCart = () => {
  if (product.value && selectedSize.value) {
    addItem(product.value, selectedSize.value, 1)
    alert('Ürün sepete eklendi!')
  }
}

onMounted(async () => {
  const productId = route.params.id as string
  await loadProduct(productId)
  if (product.value && product.value.images.length > 0 && product.value.images[0]) {
    selectedImage.value = product.value.images[0]
  }
})
</script>

<style scoped>
.product-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
.loading,
.not-found {
  text-align: center;
  padding: 4rem 2rem;
  font-size: 1.2rem;
  color: #666;
}
.back-btn {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.75rem 2rem;
  background: #ff7f00;
  color: white;
  text-decoration: none;
  border-radius: 8px;
}
.product-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}
.product-gallery {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.main-image {
  width: 100%;
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
  background: #f5f5f5;
}
.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.thumbnail-list {
  display: flex;
  gap: 1rem;
}
.thumbnail {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
}
.thumbnail.active {
  border-color: #ff7f00;
}
.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.product-brand {
  color: #666;
  font-size: 1rem;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}
.product-title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}
.product-description {
  line-height: 1.6;
  color: #666;
  margin-bottom: 2rem;
}

.mb-2 {
  margin-bottom: 2rem;
}

.stock-badge {
  display: inline-block;
}

.add-to-cart-btn {
  width: 100%;
}

@media (max-width: 768px) {
  .product-container {
    grid-template-columns: 1fr;
  }
  .main-image {
    height: 300px;
  }
}
</style>
