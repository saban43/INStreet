<!-- AdminView - Admin paneli -->
<template>
  <div class="admin-view">
    <h1>Admin Paneli</h1>

    <div class="admin-tabs">
      <button
        :class="['tab', { active: activeTab === 'products' }]"
        @click="activeTab = 'products'"
      >
        Ürün Yönetimi
      </button>
      <button :class="['tab', { active: activeTab === 'banners' }]" @click="activeTab = 'banners'">
        Banner Yönetimi
      </button>
    </div>

    <!-- Ürün Yönetimi -->
    <div v-if="activeTab === 'products'" class="tab-content">
      <div class="section-header">
        <h2>Ürünler</h2>
        <button @click="showProductForm = true" class="add-btn">Yeni Ürün Ekle</button>
      </div>

      <!-- Ürün Formu -->
      <div v-if="showProductForm" class="modal">
        <div class="modal-content">
          <AdminProductForm
            :product="selectedProduct"
            :isLoading="isLoading"
            @submit="handleProductSubmit"
            @cancel="cancelProductForm"
          />
        </div>
      </div>

      <!-- Ürün Listesi -->
      <div v-if="isLoadingProducts" class="loading">Yükleniyor...</div>
      <div v-else class="products-table">
        <table>
          <thead>
            <tr>
              <th>Görsel</th>
              <th>Ad</th>
              <th>Marka</th>
              <th>Kategori</th>
              <th>Fiyat</th>
              <th>Stok</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in allProducts" :key="product.id">
              <td><img :src="product.images?.[0]" alt="" class="product-thumb" /></td>
              <td>{{ product.name }}</td>
              <td>{{ product.brand }}</td>
              <td>{{ product.category }}</td>
              <td>{{ formatPrice(product.price) }}</td>
              <td>{{ product.stock }}</td>
              <td>
                <button @click="editProduct(product)" class="edit-btn">Düzenle</button>
                <button @click="deleteProduct(product)" class="delete-btn">Sil</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Banner Yönetimi -->
    <div v-if="activeTab === 'banners'" class="tab-content">
      <div class="section-header">
        <h2>Banner'lar</h2>
        <button @click="showBannerForm = true" class="add-btn">Yeni Banner Ekle</button>
      </div>

      <!-- Banner Formu -->
      <div v-if="showBannerForm" class="modal">
        <div class="modal-content">
          <div class="banner-form">
            <h3>{{ selectedBanner ? 'Banner Düzenle' : 'Yeni Banner' }}</h3>
            <form @submit.prevent="handleBannerSubmit">
              <div class="form-group">
                <label>Başlık</label>
                <input v-model="bannerForm.title" required class="form-input" />
              </div>
              <div class="form-group">
                <label>Link</label>
                <input v-model="bannerForm.link" required class="form-input" />
              </div>
              <div class="form-group">
                <label>
                  <input v-model="bannerForm.isActive" type="checkbox" />
                  Aktif
                </label>
              </div>
              <div class="form-group">
                <label>Görsel</label>
                <input
                  type="file"
                  @change="handleBannerFileChange"
                  accept="image/*"
                  class="form-input"
                />
              </div>
              <div class="form-actions">
                <button type="submit" :disabled="isLoading" class="submit-btn">
                  {{ isLoading ? 'İşleniyor...' : 'Kaydet' }}
                </button>
                <button type="button" @click="cancelBannerForm" class="cancel-btn">İptal</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Banner Listesi -->
      <div class="banners-grid">
        <div v-for="banner in banners" :key="banner.id" class="banner-card">
          <img :src="banner.imageUrl" :alt="banner.title" class="banner-image" />
          <div class="banner-info">
            <h3>{{ banner.title }}</h3>
            <p>{{ banner.link }}</p>
            <p :class="banner.isActive ? 'status-active' : 'status-inactive'">
              {{ banner.isActive ? 'Aktif' : 'Pasif' }}
            </p>
          </div>
          <div class="banner-actions">
            <button @click="editBanner(banner)" class="edit-btn">Düzenle</button>
            <button @click="deleteBanner(banner)" class="delete-btn">Sil</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useProducts } from '@/composables/useProducts'
import { useAdmin } from '@/composables/useAdmin'
import { formatPrice } from '@/utils/formatPrice'
import AdminProductForm from '@/components/AdminProductForm.vue'
import type { Product } from '@/store/products'

const { allProducts, loadProducts, isLoading: isLoadingProducts } = useProducts()
const {
  banners,
  loadBanners,
  createProduct,
  updateProduct,
  removeProduct,
  createBanner,
  updateBanner,
  removeBanner,
  isLoading,
} = useAdmin()

const activeTab = ref('products')
const showProductForm = ref(false)
const showBannerForm = ref(false)
const selectedProduct = ref<Product | null>(null)
const selectedBanner = ref<any>(null)

const bannerForm = ref({
  title: '',
  link: '',
  isActive: true,
  imageUrl: '',
})
const bannerFile = ref<File | null>(null)

onMounted(async () => {
  await loadProducts()
  await loadBanners()
})

// Ürün işlemleri
const handleProductSubmit = async (data: any, files: File[]) => {
  let result
  if (selectedProduct.value) {
    result = await updateProduct(selectedProduct.value.id, data, files)
  } else {
    result = await createProduct(data, files)
  }

  if (result.success) {
    alert(result.message)
    cancelProductForm()
    await loadProducts()
  } else {
    alert(result.message)
  }
}

const editProduct = (product: Product) => {
  selectedProduct.value = product
  showProductForm.value = true
}

const deleteProduct = async (product: Product) => {
  if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) return

  const result = await removeProduct(product.id, product.images)
  if (result.success) {
    alert(result.message)
    await loadProducts()
  } else {
    alert(result.message)
  }
}

const cancelProductForm = () => {
  showProductForm.value = false
  selectedProduct.value = null
}

// Banner işlemleri
const handleBannerFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    bannerFile.value = target.files[0]
  }
}

const handleBannerSubmit = async () => {
  if (!bannerFile.value && !selectedBanner.value) {
    alert('Lütfen bir görsel seçin')
    return
  }

  let result
  if (selectedBanner.value) {
    result = await updateBanner(
      selectedBanner.value.id,
      bannerForm.value,
      bannerFile.value || undefined,
    )
  } else {
    if (!bannerFile.value) {
      alert('Lütfen bir görsel seçin')
      return
    }
    result = await createBanner(bannerForm.value, bannerFile.value)
  }

  if (result.success) {
    alert(result.message)
    cancelBannerForm()
  } else {
    alert(result.message)
  }
}

const editBanner = (banner: any) => {
  selectedBanner.value = banner
  bannerForm.value = { ...banner }
  showBannerForm.value = true
}

const deleteBanner = async (banner: any) => {
  if (!confirm("Bu banner'ı silmek istediğinize emin misiniz?")) return

  const result = await removeBanner(banner.id, banner.imageUrl)
  if (result.success) {
    alert(result.message)
  } else {
    alert(result.message)
  }
}

const cancelBannerForm = () => {
  showBannerForm.value = false
  selectedBanner.value = null
  bannerForm.value = { title: '', link: '', isActive: true, imageUrl: '' }
  bannerFile.value = null
}
</script>

<style scoped>
.admin-view {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}
.admin-view h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
}
.admin-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}
.tab {
  padding: 1rem 2rem;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}
.tab.active {
  background: #ff7f00;
  color: white;
  border-color: #ff7f00;
}
.tab-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
.add-btn {
  padding: 0.75rem 1.5rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}
.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}
.products-table {
  overflow-x: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}
th {
  background: #f5f5f5;
  font-weight: 600;
}
.product-thumb {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}
.edit-btn,
.delete-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  margin-right: 0.5rem;
}
.edit-btn {
  background: #2196f3;
  color: white;
}
.delete-btn {
  background: #f44336;
  color: white;
}
.banners-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}
.banner-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
}
.banner-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.banner-info {
  padding: 1rem;
}
.banner-info h3 {
  margin: 0 0 0.5rem;
}
.banner-info p {
  margin: 0.25rem 0;
  color: #666;
}
.status-active {
  color: #4caf50;
  font-weight: 600;
}
.status-inactive {
  color: #f44336;
  font-weight: 600;
}
.banner-actions {
  padding: 1rem;
  border-top: 1px solid #e0e0e0;
}
.banner-form {
  padding: 2rem;
}
.banner-form h3 {
  margin: 0 0 1.5rem;
}
.form-group {
  margin-bottom: 1.5rem;
}
.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.form-actions {
  display: flex;
  gap: 1rem;
}
.submit-btn,
.cancel-btn {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
.submit-btn {
  background: #ff7f00;
  color: white;
}
.cancel-btn {
  background: #f5f5f5;
}
</style>
