<!-- HomeView - Ana sayfa görünümü -->
<template>
  <div class="home-view">
    <Banner />
    <ProductSearch />
    <div class="content-container">
      <aside class="sidebar">
        <ProductFilter />
      </aside>
      <main class="main-content">
        <div v-if="isLoading" class="loading">Yükleniyor...</div>
        <div v-else-if="products.length === 0" class="no-products">
          <p>Ürün bulunamadı</p>
        </div>
        <div v-else class="products-grid">
          <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useProducts } from '@/composables/useProducts'
import Banner from '@/components/Banner.vue'
import ProductSearch from '@/components/ProductSearch.vue'
import ProductFilter from '@/components/ProductFilter.vue'
import ProductCard from '@/components/ProductCard.vue'

const { products, isLoading, loadProducts } = useProducts()

onMounted(async () => {
  await loadProducts()
})
</script>

<style scoped>
.home-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
.content-container {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
  margin-top: 2rem;
}
.sidebar {
  height: fit-content;
}
.loading,
.no-products {
  text-align: center;
  padding: 4rem 2rem;
  font-size: 1.2rem;
  color: #666;
}
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}
@media (max-width: 968px) {
  .content-container {
    grid-template-columns: 1fr;
  }
  .sidebar {
    order: 2;
  }
}
</style>
