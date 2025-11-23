<!-- ProductSearch Bileşeni - Ürün arama -->
<template>
  <div class="product-search">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Ürün, marka veya kategori ara..."
      @input="onSearch"
      class="search-input"
    />
    <button @click="performSearch" class="search-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useProducts } from '@/composables/useProducts'

const { search } = useProducts()
const searchQuery = ref('')

// Anlık arama
const onSearch = () => {
  search(searchQuery.value)
}

// Arama yap
const performSearch = () => {
  search(searchQuery.value)
}
</script>

<style scoped>
.product-search {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.search-input {
  flex: 1;
  padding: 1rem 1.5rem;
  border: 2px solid #ddd;
  border-radius: 12px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #ff7f00;
}

.search-button {
  padding: 1rem 1.5rem;
  background: #ff7f00;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-button:hover {
  background: #e67300;
}
</style>
