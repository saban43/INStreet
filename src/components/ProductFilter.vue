<!-- ProductFilter Bileşeni - Ürün filtreleme paneli -->
<template>
  <div class="product-filter">
    <h3>Filtrele</h3>

    <!-- Kategori Filtresi -->
    <div class="filter-section">
      <h4>Kategori</h4>
      <select v-model="localFilters.category" @change="applyFilters" class="filter-select">
        <option value="">Tümü</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>

    <!-- Marka Filtresi -->
    <div class="filter-section">
      <h4>Marka</h4>
      <select v-model="localFilters.brand" @change="applyFilters" class="filter-select">
        <option value="">Tümü</option>
        <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
      </select>
    </div>

    <!-- Cinsiyet Filtresi -->
    <div class="filter-section">
      <h4>Cinsiyet</h4>
      <select v-model="localFilters.gender" @change="applyFilters" class="filter-select">
        <option value="">Tümü</option>
        <option value="Men">Erkek</option>
        <option value="Women">Kadın</option>
        <option value="Unisex">Unisex</option>
      </select>
    </div>

    <!-- Fiyat Aralığı -->
    <div class="filter-section">
      <h4>Fiyat Aralığı</h4>
      <div class="price-range">
        <input
          v-model.number="localFilters.minPrice"
          type="number"
          placeholder="Min"
          @change="applyFilters"
          class="price-input"
        />
        <span>-</span>
        <input
          v-model.number="localFilters.maxPrice"
          type="number"
          placeholder="Max"
          @change="applyFilters"
          class="price-input"
        />
      </div>
    </div>

    <!-- Filtreleri Temizle -->
    <button @click="clearAllFilters" class="clear-btn">Filtreleri Temizle</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useProducts } from '@/composables/useProducts'

const { brands, categories, setFilters, clearFilters } = useProducts()

// Lokal filtre durumu
const localFilters = ref({
  category: '',
  brand: '',
  gender: '',
  minPrice: 0,
  maxPrice: 10000,
})

// Filtreleri uygula
const applyFilters = () => {
  setFilters(localFilters.value)
}

// Filtreleri temizle
const clearAllFilters = () => {
  localFilters.value = {
    category: '',
    brand: '',
    gender: '',
    minPrice: 0,
    maxPrice: 10000,
  }
  clearFilters()
}
</script>

<style scoped>
.product-filter {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 100px;
}

.product-filter h3 {
  margin: 0 0 1.5rem;
  font-size: 1.4rem;
}

.filter-section {
  margin-bottom: 1.5rem;
}

.filter-section h4 {
  margin: 0 0 0.75rem;
  font-size: 1rem;
  color: #666;
}

.filter-select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

.filter-select:focus {
  outline: none;
  border-color: #ff7f00;
}

.price-range {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.price-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.price-input:focus {
  outline: none;
  border-color: #ff7f00;
}

.clear-btn {
  width: 100%;
  padding: 0.75rem;
  background: #f5f5f5;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.clear-btn:hover {
  background: #e0e0e0;
}
</style>
