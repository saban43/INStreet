<!-- Banner Bileşeni - Ana sayfadaki slider/carousel -->
<template>
  <div class="banner-container">
    <div v-if="activeBanners.length > 0 && activeBanners[currentIndex]" class="banner-slider">
      <!-- Aktif Banner -->
      <transition name="fade" mode="out-in">
        <div :key="currentIndex" class="banner-slide">
          <img
            :src="activeBanners[currentIndex]?.imageUrl || ''"
            :alt="activeBanners[currentIndex]?.title || ''"
            class="banner-image"
          />
          <div class="banner-content">
            <h2>{{ activeBanners[currentIndex]?.title || '' }}</h2>
            <router-link :to="activeBanners[currentIndex]?.link || '/'" class="banner-btn">
              Alışverişe Başla
            </router-link>
          </div>
        </div>
      </transition>

      <!-- Navigasyon Noktaları -->
      <div class="banner-dots">
        <button
          v-for="(banner, index) in activeBanners"
          :key="banner.id"
          :class="['dot', { active: index === currentIndex }]"
          @click="goToSlide(index)"
        ></button>
      </div>

      <!-- Önceki/Sonraki Butonları -->
      <button class="banner-nav prev" @click="prevSlide">‹</button>
      <button class="banner-nav next" @click="nextSlide">›</button>
    </div>

    <!-- Banner yoksa varsayılan gösterim -->
    <div v-else class="default-banner">
      <h1>IN<span>Street</span></h1>
      <p>En Yeni Spor Ayakkabı Koleksiyonları</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAdmin } from '@/composables/useAdmin'

const { banners, loadBanners } = useAdmin()

// Durum değişkenleri
const currentIndex = ref(0)
let autoPlayInterval: any = null

// Aktif banner'ları filtrele
const activeBanners = computed(() => {
  return banners.value.filter((banner: any) => banner.isActive)
})

// Sonraki slide
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % activeBanners.value.length
}

// Önceki slide
const prevSlide = () => {
  currentIndex.value =
    currentIndex.value === 0 ? activeBanners.value.length - 1 : currentIndex.value - 1
}

// Belirli bir slide'a git
const goToSlide = (index: number) => {
  currentIndex.value = index
}

// Otomatik geçiş başlat
const startAutoPlay = () => {
  autoPlayInterval = setInterval(nextSlide, 5000)
}

// Otomatik geçişi durdur
const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
  }
}

// Component mount olduğunda
onMounted(async () => {
  await loadBanners()
  if (activeBanners.value.length > 1) {
    startAutoPlay()
  }
})

// Component unmount olduğunda
onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
.banner-container {
  width: 100%;
  margin-bottom: 3rem;
}

.banner-slider {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  border-radius: 12px;
}

.banner-slide {
  position: relative;
  width: 100%;
  height: 100%;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-content {
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.banner-content h2 {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  font-weight: 800;
}

.banner-btn {
  display: inline-block;
  padding: 1rem 2.5rem;
  background: #ff7f00;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: background 0.3s;
}

.banner-btn:hover {
  background: #e67300;
}

.banner-dots {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: none;
  cursor: pointer;
  transition: background 0.3s;
}

.dot.active {
  background: white;
}

.banner-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 2rem;
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: background 0.3s;
}

.banner-nav:hover {
  background: rgba(0, 0, 0, 0.8);
}

.banner-nav.prev {
  left: 20px;
}

.banner-nav.next {
  right: 20px;
}

.default-banner {
  height: 400px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 12px;
}

.default-banner h1 {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.default-banner span {
  color: #ff7f00;
}

.default-banner p {
  font-size: 1.5rem;
}

/* Animasyonlar */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .banner-slider {
    height: 300px;
  }

  .banner-content h2 {
    font-size: 2rem;
  }

  .default-banner h1 {
    font-size: 2.5rem;
  }

  .default-banner p {
    font-size: 1.2rem;
  }
}
</style>
