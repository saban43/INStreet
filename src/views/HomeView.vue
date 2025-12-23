<!-- HomeView - Ana sayfa görünümü -->
<template>
  <div class="home-view">
    <Banner />
    <CategoryBubbles />
    <ProductBanner
      title="Futbol Ürünleri"
      imageSrc="/Banners/futbol-urunleri/futbol-urunleri-in-25.webp"
    />
    <DualBanner
      title="Yılbaşı Hediyeleri"
      leftImageSrc="/Banners/yilbaşi-hediyeleri/yilbasi_hediyeleri_web_kadin.webp"
      rightImageSrc="/Banners/yilbaşi-hediyeleri/yilbasi_hediyeleri_web_erkek.webp"
      leftAlt="Kadın Yılbaşı Hediyeleri"
      rightAlt="Erkek Yılbaşı Hediyeleri"
    />
    <ProductBanner title="Nike" imageSrc="/Banners/nike/2nike.webp" />
    <ProductBanner
      title="Tarzına Uygun Botlar"
      imageSrc="/Banners/tarzina-uygun-botlar/1bot.webp"
    />
    <ProductBanner title="Skechers" imageSrc="/Banners/skechers/4skechers.webp" />
    <ProductBanner title="Çocuk" imageSrc="/Banners/cocuk/5cocuk.webp" />
    <ProductBanner
      title="Soğuğa Meydan Oku"
      imageSrc="/Banners/soguga-meydan-oku/6global_outdoor.webp"
    />
    <DualBanner
      title="Tommy Hilfiger - Calvin Klein - Vans - Converse"
      leftImageSrc="/Banners/iyi-markalar/1-tommyck.webp"
      rightImageSrc="/Banners/iyi-markalar/2-vansconverse.webp"
      leftAlt="Tommy Hilfiger - Calvin Klein"
      rightAlt="Vans - Converse"
    />
    <ProductBanner title="DC Shoes" imageSrc="/Banners/Dc-shoes/dc_shoes_tekli.gif" />
    <ProductBanner
      title="Jack Jones - Only - Only Sons - JJXX"
      imageSrc="/Banners/pahali-markalar/7jjxxonlysons.webp"
    />
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
import Banner from '@/components/organisms/Banner.vue'
import CategoryBubbles from '@/components/organisms/CategoryBubbles.vue'
import ProductBanner from '@/components/organisms/ProductBanner.vue'
import DualBanner from '@/components/organisms/DualBanner.vue'
import ProductFilter from '@/components/organisms/ProductFilter.vue'
import ProductCard from '@/components/organisms/ProductCard.vue'

const { products, isLoading, loadProducts } = useProducts()

onMounted(async () => {
  await loadProducts()
})
</script>

<style scoped>
.home-view {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 100px;
}
.content-container {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
  margin-top: 1rem;
  padding: 0 2rem;
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
