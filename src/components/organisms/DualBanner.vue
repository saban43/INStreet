<!-- DualBanner - Yan Yana İki Banner Bileşeni -->
<template>
  <section class="dual-banner-section">
    <div class="section-header">
      <h2>{{ title }}</h2>
    </div>
    <div class="dual-banner-container">
      <!-- Sol Banner -->
      <a href="#" class="banner-item" @click.prevent="handleClick('left')">
        <img :src="leftImageSrc" :alt="leftAlt" class="banner-image" />
      </a>

      <!-- Sağ Banner -->
      <a href="#" class="banner-item" @click.prevent="handleClick('right')">
        <img :src="rightImageSrc" :alt="rightAlt" class="banner-image" />
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  title: string
  leftImageSrc: string
  rightImageSrc: string
  leftAlt?: string
  rightAlt?: string
}

defineProps<Props>()

const handleClick = (side: string) => {
  // Henüz bir yere gitmeyecek
  console.log(`${side} banner clicked`)
}
</script>

<style scoped>
.dual-banner-section {
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

.dual-banner-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  background: linear-gradient(to bottom, #d8d8d8 0%, #ffffff 100%);
  border-radius: 8px;
  padding: 15px;
}

.banner-item {
  display: block;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.banner-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.banner-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.banner-item:hover .banner-image {
  transform: scale(1.03);
}

/* Responsive */
@media (max-width: 768px) {
  .dual-banner-section {
    margin: 30px auto;
    padding: 0 15px;
  }

  .section-header h2 {
    font-size: 20px;
    padding: 8px 24px;
  }

  .dual-banner-container {
    grid-template-columns: 1fr;
    gap: 15px;
    padding: 12px;
  }
}
</style>
