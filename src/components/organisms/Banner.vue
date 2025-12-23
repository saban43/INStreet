<!-- Banner - Organizma Bileşeni: Ana sayfadaki slider/carousel -->
<template>
  <div class="banner-container">
    <div class="banner-slider">
      <!-- Aktif Slide -->
      <transition :name="slideDirection">
        <div :key="currentIndex" class="banner-slide">
          <img
            :src="slides[currentIndex].image"
            :alt="`Slide ${currentIndex + 1}`"
            class="banner-image"
          />
        </div>
      </transition>

      <!-- Önceki Buton -->
      <button class="banner-nav prev" @click="prevSlide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <!-- Sonraki Buton -->
      <button class="banner-nav next" @click="nextSlide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <!-- Navigasyon Noktaları -->
      <div class="banner-dots">
        <button
          v-for="(slide, index) in slides"
          :key="index"
          :class="['dot', { active: index === currentIndex }]"
          @click="goToSlide(index)"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Slider görselleri (numara sırasına göre)
const slides = [
  { image: '/slider-image/1-2000-tl-indirim-slider.webp' },
  { image: '/slider-image/2-kisfirsatlari-yilbasi.jpg' },
  { image: '/slider-image/3-reebok_lp_anabanner_web.webp' },
  { image: '/slider-image/4-2outdoor.webp' },
  { image: '/slider-image/5-3adidasterrex.webp' },
  { image: '/slider-image/6-puma-web.webp' },
  { image: '/slider-image/7-4lumberjack.webp' },
  { image: '/slider-image/8-5giyim.webp' },
  { image: '/slider-image/9-nike.webp' },
]

// Durum değişkenleri
const currentIndex = ref(0)
const slideDirection = ref('slide-left')

// Sonraki slide
const nextSlide = () => {
  slideDirection.value = 'slide-left'
  currentIndex.value = (currentIndex.value + 1) % slides.length
}

// Önceki slide
const prevSlide = () => {
  slideDirection.value = 'slide-right'
  currentIndex.value = currentIndex.value === 0 ? slides.length - 1 : currentIndex.value - 1
}

// Belirli bir slide'a git
const goToSlide = (index: number) => {
  currentIndex.value = index
}
</script>

<style scoped>
.banner-container {
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
  padding: 0;
}

.banner-slider {
  position: relative;
  width: 100%;
  height: 550px;
  border-radius: 8px;
  overflow: hidden;
}

.banner-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Navigasyon Butonları */
.banner-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.6);
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  z-index: 10;
}

.banner-nav:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: translateY(-50%) scale(1.1);
}

.banner-nav.prev {
  left: 20px;
}

.banner-nav.next {
  right: 20px;
}

.banner-nav svg {
  width: 24px;
  height: 24px;
}

/* Navigasyon Noktaları */
.banner-dots {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 10;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  padding: 0;
}

.dot:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: scale(1.2);
}

.dot.active {
  background: rgba(255, 255, 255, 0.9);
  width: 32px;
  border-radius: 6px;
}

/* Animasyonlar - Sola Kayma */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.5s ease;
}

.slide-left-enter-from {
  transform: translateX(100%);
}

.slide-left-leave-to {
  transform: translateX(-100%);
}

/* Animasyonlar - Sağa Kayma */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s ease;
}

.slide-right-enter-from {
  transform: translateX(-100%);
}

.slide-right-leave-to {
  transform: translateX(100%);
}

/* Responsive */
@media (max-width: 1024px) {
  .banner-container {
    padding: 20px 40px;
  }

  .banner-slider {
    height: 380px;
  }
}

@media (max-width: 768px) {
  .banner-container {
    padding: 16px 20px;
  }

  .banner-slider {
    height: 280px;
    border-radius: 6px;
  }

  .banner-nav {
    width: 36px;
    height: 36px;
  }

  .banner-nav svg {
    width: 18px;
    height: 18px;
  }

  .banner-nav.prev {
    left: 12px;
  }

  .banner-nav.next {
    right: 12px;
  }

  .banner-dots {
    bottom: 16px;
    gap: 8px;
  }

  .dot {
    width: 8px;
    height: 8px;
  }

  .dot.active {
    width: 24px;
  }
}
</style>
