<!-- ProductBanner - Ürün Kategorisi Banner Bileşeni -->
<template>
  <section class="product-banner-section">
    <div class="section-header">
      <h2>{{ title }}</h2>
    </div>
    <div class="banner-container">
      <a href="#" class="banner-link" @click.prevent="handleClick">
        <img :src="imageSrc" :alt="title" class="banner-image" />
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  title: string
  imageSrc: string
}

defineProps<Props>()

const handleClick = () => {
  // Henüz bir yere gitmeyecek
  console.log('Banner clicked')
}
</script>

<style scoped>
.product-banner-section {
  width: 100%;
  max-width: 1600px;
  margin: 40px auto;
  padding: 0 20px;
}

.section-header {
  text-align: center;
  margin-bottom: 20px;
}

.section-header h2 {
  font-size: 24px;
  font-weight: 700;
  color: #666;
  background: #e8e8e8;
  display: inline-block;
  padding: 10px 30px;
  border-radius: 20px;
}

.banner-container {
  width: 100%;
  background: linear-gradient(to bottom, #d8d8d8 0%, #ffffff 100%);
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.banner-container:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.banner-link {
  display: block;
  width: 100%;
  cursor: pointer;
  overflow: hidden;
}

.banner-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.banner-link:hover .banner-image {
  transform: scale(1.05);
}

/* Responsive */
@media (max-width: 768px) {
  .product-banner-section {
    margin: 30px auto;
    padding: 0 15px;
  }

  .section-header h2 {
    font-size: 20px;
    padding: 8px 24px;
  }
}
</style>
