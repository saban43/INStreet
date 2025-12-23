<!-- CategoryBubbles - Kategori Baloncukları -->
<template>
  <div class="category-bubbles">
    <button
      v-for="category in categories"
      :key="category.id"
      class="bubble-item"
      @click="handleClick(category.id)"
    >
      <div class="bubble-circle">
        <img :src="category.image" :alt="category.name" />
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
const categories = [
  { id: 1, name: 'SANA ÖZEL', image: '/bubble-image/1-sanaozel.gif' },
  { id: 2, name: 'YILIN EN İYİLERİ', image: '/bubble-image/2-yilineniyileri.gif' },
  { id: 3, name: 'SÜPER FİYAT', image: '/bubble-image/3-superfiyat.webp' },
  { id: 4, name: 'MONT', image: '/bubble-image/4-mont.webp' },
  { id: 5, name: 'SWEATSHIRT', image: '/bubble-image/5-sweatshirt.webp' },
  { id: 6, name: 'POLAR', image: '/bubble-image/6-polar.webp' },
  { id: 7, name: 'EŞOFMAN', image: '/bubble-image/7-esofman.webp' },
  { id: 8, name: 'SNEAKER', image: '/bubble-image/8-sneaker.webp' },
  { id: 9, name: 'BOT', image: '/bubble-image/9-bot.webp' },
  { id: 10, name: 'SU GEÇİRMEZ', image: '/bubble-image/10-sugecirmez.webp' },
]

const handleClick = (categoryId: number) => {
  // Henüz bir işlem yapmayacak, daha sonra eklenecek
  console.log('Category clicked:', categoryId)
}
</script>

<style scoped>
.category-bubbles {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
  padding: 30px 20px;
  background: #f8f8f8;
  overflow-x: auto;
  white-space: nowrap;
}

.bubble-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
}

.bubble-circle {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.bubble-circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Scrollbar styling */
.category-bubbles::-webkit-scrollbar {
  height: 6px;
}

.category-bubbles::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.category-bubbles::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.category-bubbles::-webkit-scrollbar-thumb:hover {
  background: #999;
}

/* Responsive */
@media (max-width: 768px) {
  .category-bubbles {
    justify-content: flex-start;
    gap: 25px;
    padding: 20px 15px;
  }

  .bubble-circle {
    width: 60px;
    height: 60px;
  }
}
</style>
