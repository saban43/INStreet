<!-- Navbar Bileşeni - Üst navigasyon menüsü, logo, arama ve kullanıcı menüsü -->
<template>
  <header class="navbar">
    <div class="navbar-container">
      <!-- Logo -->
      <router-link to="/" class="navbar-logo">
        <h1>IN<span>Street</span></h1>
      </router-link>

      <!-- Ana Menü -->
      <nav class="navbar-menu">
        <router-link to="/" class="nav-link">Ana Sayfa</router-link>
        <a @click="filterByGender('Men')" class="nav-link">Erkek</a>
        <a @click="filterByGender('Women')" class="nav-link">Kadın</a>
        <a @click="filterByCategory('Sneakers')" class="nav-link">Spor Ayakkabı</a>
      </nav>

      <!-- Sağ Menü -->
      <div class="navbar-actions">
        <!-- Arama Butonu -->
        <button @click="toggleSearch" class="icon-btn" title="Ara">
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

        <!-- Kullanıcı Menüsü -->
        <router-link v-if="!isAuthenticated" to="/login" class="icon-btn" title="Giriş Yap">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </router-link>
        <router-link v-else to="/profile" class="icon-btn" title="Profilim">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span class="user-name">{{ userName }}</span>
        </router-link>

        <!-- Admin Paneli (sadece admin kullanıcılar için) -->
        <router-link v-if="isAdmin" to="/admin" class="icon-btn" title="Admin Panel">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="9" y1="9" x2="15" y2="9"></line>
            <line x1="9" y1="15" x2="15" y2="15"></line>
          </svg>
        </router-link>

        <!-- Sepet -->
        <router-link to="/cart" class="icon-btn cart-btn" title="Sepet">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span v-if="itemCount > 0" class="cart-badge">{{ itemCount }}</span>
        </router-link>
      </div>
    </div>

    <!-- Arama Çubuğu (toggle ile açılır) -->
    <transition name="slide-down">
      <div v-if="showSearch" class="search-bar">
        <div class="search-container">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Ürün, marka veya kategori ara..."
            @input="onSearch"
            @keyup.enter="performSearch"
            class="search-input"
          />
          <button @click="performSearch" class="search-btn">Ara</button>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { useCartStore } from '@/store/cart'
import { useProductsStore } from '@/store/products'

const router = useRouter()
const userStore = useUserStore()
const cartStore = useCartStore()
const productsStore = useProductsStore()

// Durum değişkenleri
const showSearch = ref(false)
const searchQuery = ref('')

// Hesaplanan değerler
const isAuthenticated = computed(() => userStore.isAuthenticated)
const isAdmin = computed(() => userStore.isAdmin)
const userName = computed(() => userStore.userName)
const itemCount = computed(() => cartStore.itemCount)

// Arama çubuğunu aç/kapat
const toggleSearch = () => {
  showSearch.value = !showSearch.value
  if (!showSearch.value) {
    searchQuery.value = ''
  }
}

// Anlık arama (yazarken)
const onSearch = () => {
  if (router.currentRoute.value.path !== '/') {
    router.push('/')
  }
  productsStore.updateFilters({ search: searchQuery.value })
}

// Arama yap (Enter tuşu veya buton)
const performSearch = () => {
  if (router.currentRoute.value.path !== '/') {
    router.push('/')
  }
  productsStore.updateFilters({ search: searchQuery.value })
  showSearch.value = false
}

// Filtreleme fonksiyonları
const filterByGender = (gender: string) => {
  router.push('/')
  productsStore.updateFilters({ gender, category: '', brand: '' })
}

const filterByCategory = (category: string) => {
  router.push('/')
  productsStore.updateFilters({ category, gender: '', brand: '' })
}
</script>

<style scoped>
.navbar {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.navbar-logo h1 {
  font-size: 1.8rem;
  font-weight: 800;
  color: #000;
  margin: 0;
}

.navbar-logo span {
  color: #ff7f00;
}

.navbar-menu {
  display: flex;
  gap: 2rem;
  flex: 1;
  justify-content: center;
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
  transition: all 0.3s;
  cursor: pointer;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #ff7f00;
  border-bottom-color: #ff7f00;
}

.navbar-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.icon-btn {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #333;
  text-decoration: none;
}

.icon-btn:hover {
  background: #f5f5f5;
}

.user-name {
  font-size: 0.9rem;
  font-weight: 500;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cart-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: #ff7f00;
  color: white;
  font-size: 0.7rem;
  padding: 0.15rem 0.4rem;
  border-radius: 10px;
  font-weight: 600;
}

.search-bar {
  background: #f8f8f8;
  padding: 1rem 2rem;
  border-top: 1px solid #e0e0e0;
}

.search-container {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  gap: 1rem;
}

.search-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.search-input:focus {
  outline: none;
  border-color: #ff7f00;
}

.search-btn {
  padding: 0.75rem 2rem;
  background: #ff7f00;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.search-btn:hover {
  background: #e67300;
}

/* Animasyonlar */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive */
@media (max-width: 768px) {
  .navbar-menu {
    display: none;
  }

  .navbar-container {
    padding: 1rem;
  }

  .user-name {
    display: none;
  }
}
</style>
