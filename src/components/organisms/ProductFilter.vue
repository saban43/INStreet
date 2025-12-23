<!-- ProductFilter - Organizma Bileşeni: Ürün filtreleme paneli -->
<template>
  <div class="product-filter">
    <h3>Filtrele</h3>

    <!-- Kategori Filtresi - Atom kullan -->
    <div class="filter-section">
      <h4>Kategori</h4>
      <BaseSelect v-model="localFilters.category" @update:model-value="applyFilters">
        <option value="">Tümü</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </BaseSelect>
    </div>

    <!-- Marka Filtresi - Atom kullan -->
    <div class="filter-section">
      <h4>Marka</h4>
      <BaseSelect v-model="localFilters.brand" @update:model-value="applyFilters">
        <option value="">Tümü</option>
        <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
      </BaseSelect>
    </div>

    <!-- Cinsiyet Filtresi - Atom kullan -->
    <div class="filter-section">
      <h4>Cinsiyet</h4>
      <BaseSelect v-model="localFilters.gender" @update:model-value="applyFilters">
        <option value="">Tümü</option>
        <option value="Men">Erkek</option>
        <option value="Women">Kadın</option>
        <option value="Unisex">Unisex</option>
      </BaseSelect>
    </div>

    <!-- Fiyat Aralığı - Atom kullan -->
    <div class="filter-section">
      <h4>Fiyat Aralığı</h4>
      <div class="price-range">
        <BaseInput
          v-model="localFilters.minPrice"
          type="number"
          placeholder="Min"
          @update:model-value="applyFilters"
        />
        <span>-</span>
        <BaseInput
          v-model="localFilters.maxPrice"
          type="number"
          placeholder="Max"
          @update:model-value="applyFilters"
        />
      </div>
    </div>

    <!-- Filtreleri Temizle - Atom kullan -->
    <BaseButton variant="secondary" size="md" @click="clearAllFilters" class="clear-btn">
      Filtreleri Temizle
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useProducts } from '@/composables/useProducts'
import BaseSelect from '@/components/atoms/BaseSelect.vue'
import BaseInput from '@/components/atoms/BaseInput.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'

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

.price-range {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.price-range span {
  color: #666;
}

.clear-btn {
  width: 100%;
}
</style>
