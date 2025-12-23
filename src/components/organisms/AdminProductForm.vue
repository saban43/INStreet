<!-- AdminProductForm Bileşeni - Admin panelinde ürün ekleme/düzenleme formu -->
<template>
  <div class="admin-product-form">
    <h2>{{ isEditMode ? 'Ürün Düzenle' : 'Yeni Ürün Ekle' }}</h2>

    <form @submit.prevent="handleSubmit" class="form">
      <!-- Ürün Adı -->
      <div class="form-group">
        <label>Ürün Adı *</label>
        <input v-model="formData.name" type="text" required class="form-input" />
      </div>

      <!-- Marka -->
      <div class="form-group">
        <label>Marka *</label>
        <input v-model="formData.brand" type="text" required class="form-input" />
      </div>

      <!-- Kategori -->
      <div class="form-group">
        <label>Kategori *</label>
        <select v-model="formData.category" required class="form-input">
          <option value="">Seçiniz</option>
          <option value="Sneakers">Spor Ayakkabı</option>
          <option value="Running">Koşu Ayakkabısı</option>
          <option value="Basketball">Basketbol Ayakkabısı</option>
          <option value="Casual">Günlük Ayakkabı</option>
        </select>
      </div>

      <!-- Cinsiyet -->
      <div class="form-group">
        <label>Cinsiyet *</label>
        <select v-model="formData.gender" required class="form-input">
          <option value="">Seçiniz</option>
          <option value="Men">Erkek</option>
          <option value="Women">Kadın</option>
          <option value="Unisex">Unisex</option>
        </select>
      </div>

      <!-- Fiyat -->
      <div class="form-group">
        <label>Fiyat (TL) *</label>
        <input v-model.number="formData.price" type="number" required class="form-input" />
      </div>

      <!-- İndirim -->
      <div class="form-group">
        <label>İndirim (0-1 arası, örn: 0.15 = %15)</label>
        <input
          v-model.number="formData.discount"
          type="number"
          step="0.01"
          min="0"
          max="1"
          class="form-input"
        />
      </div>

      <!-- Stok -->
      <div class="form-group">
        <label>Stok Miktarı *</label>
        <input v-model.number="formData.stock" type="number" required class="form-input" />
      </div>

      <!-- Bedenler -->
      <div class="form-group">
        <label>Bedenler (virgülle ayırın, örn: 40,41,42)</label>
        <input v-model="sizesInput" type="text" placeholder="40,41,42,43" class="form-input" />
      </div>

      <!-- Açıklama -->
      <div class="form-group">
        <label>Açıklama</label>
        <textarea v-model="formData.description" rows="4" class="form-input"></textarea>
      </div>

      <!-- Görsel Yükleme -->
      <div class="form-group">
        <label>Ürün Görselleri *</label>
        <input
          type="file"
          @change="handleFileChange"
          multiple
          accept="image/*"
          class="form-input"
        />
        <div v-if="previewImages.length > 0" class="image-previews">
          <div v-for="(img, index) in previewImages" :key="index" class="preview-item">
            <img :src="img" alt="Preview" />
          </div>
        </div>
      </div>

      <!-- Butonlar -->
      <div class="form-actions">
        <button type="submit" :disabled="isLoading" class="submit-btn">
          {{ isLoading ? 'İşleniyor...' : isEditMode ? 'Güncelle' : 'Ekle' }}
        </button>
        <button type="button" @click="$emit('cancel')" class="cancel-btn">İptal</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { Product } from '@/store/products'

// Props
const props = defineProps<{
  product?: Product | null
  isLoading?: boolean
}>()

// Emits
const emit = defineEmits<{
  submit: [data: any, files: File[]]
  cancel: []
}>()

// Durum değişkenleri
const isEditMode = computed(() => !!props.product)
const formData = ref({
  name: '',
  brand: '',
  category: '',
  gender: '',
  price: 0,
  discount: 0,
  stock: 0,
  sizes: [] as string[],
  description: '',
  images: [] as string[],
})

const sizesInput = ref('')
const imageFiles = ref<File[]>([])
const previewImages = ref<string[]>([])

// Ürün verisi değiştiğinde formu doldur
watch(
  () => props.product,
  (newProduct) => {
    if (newProduct) {
      formData.value = {
        name: newProduct.name,
        brand: newProduct.brand,
        category: newProduct.category,
        gender: newProduct.gender,
        price: newProduct.price,
        discount: newProduct.discount,
        stock: newProduct.stock,
        sizes: newProduct.sizes || [],
        description: newProduct.description,
        images: newProduct.images || [],
      }
      sizesInput.value = newProduct.sizes?.join(',') || ''
      previewImages.value = newProduct.images || []
    }
  },
  { immediate: true },
)

// Dosya seçildiğinde
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (files) {
    imageFiles.value = Array.from(files)

    // Önizleme oluştur
    previewImages.value = []
    imageFiles.value.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        previewImages.value.push(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    })
  }
}

// Form gönder
const handleSubmit = () => {
  // Bedenleri diziye çevir
  formData.value.sizes = sizesInput.value
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s)

  emit('submit', formData.value, imageFiles.value)
}
</script>

<style scoped>
.admin-product-form {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.admin-product-form h2 {
  margin: 0 0 1.5rem;
  font-size: 1.8rem;
}

.form {
  display: grid;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #333;
}

.form-input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.form-input:focus {
  outline: none;
  border-color: #ff7f00;
}

.image-previews {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.preview-item {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
}

.preview-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.submit-btn,
.cancel-btn {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.submit-btn {
  background: #ff7f00;
  color: white;
}

.submit-btn:hover:not(:disabled) {
  background: #e67300;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.cancel-btn {
  background: #f5f5f5;
  color: #333;
}

.cancel-btn:hover {
  background: #e0e0e0;
}
</style>
