<!-- Navbar - Organizma Bileşeni: Üst navigasyon menüsü -->
<template>
  <header class="navbar">
    <div class="navbar-container">
      <!-- Logo -->
      <router-link to="/" class="navbar-logo">
        <img src="/instreet-logo.png" alt="INStreet" />
      </router-link>

      <!-- Arama Kutusu -->
      <div class="search-container">
        <div class="search-box">
          <SearchIcon :size="20" class="search-icon" />
          <input
            type="text"
            v-model="searchQuery"
            @keyup.enter="handleSearch(searchQuery)"
            placeholder="Aradığınız ürün, marka veya kategoriyi yazınız"
            class="search-input"
          />
        </div>
      </div>

      <!-- Sağ Menü -->
      <div class="navbar-actions">
        <!-- Giriş Yap Dropdown -->
        <div class="dropdown">
          <button class="dropdown-toggle">
            <UserIcon :size="18" />
            <span>{{ isAuthenticated ? userName || 'Hesabım' : 'Giriş Yap' }}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 9L1 4h10L6 9z" />
            </svg>
          </button>
          <div class="dropdown-menu" v-if="!isAuthenticated">
            <router-link to="/login" class="dropdown-item">Giriş Yap</router-link>
            <router-link to="/register" class="dropdown-item">Üye Ol</router-link>
          </div>
          <div class="dropdown-menu" v-else>
            <router-link to="/profile" class="dropdown-item">Profilim</router-link>
            <router-link to="/orders" class="dropdown-item">Siparişlerim</router-link>
            <a @click="handleLogout" class="dropdown-item">Çıkış Yap</a>
          </div>
        </div>

        <!-- Sepetim Dropdown -->
        <div class="dropdown">
          <router-link to="/cart" class="dropdown-toggle">
            <CartIcon :size="18" />
            <span>Sepetim</span>
            <BaseBadge v-if="itemCount > 0" class="cart-count">{{ itemCount }}</BaseBadge>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 9L1 4h10L6 9z" />
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { useCartStore } from '@/store/cart'
import { useProductsStore } from '@/store/products'
import { useAuth } from '@/composables/useAuth'
import SearchIcon from '@/components/atoms/icons/SearchIcon.vue'
import UserIcon from '@/components/atoms/icons/UserIcon.vue'
import CartIcon from '@/components/atoms/icons/CartIcon.vue'
import BaseBadge from '@/components/atoms/BaseBadge.vue'

const router = useRouter()
const userStore = useUserStore()
const cartStore = useCartStore()
const productsStore = useProductsStore()
const { logout } = useAuth()

// State
const searchQuery = ref('')

// Computed
const isAuthenticated = computed(() => userStore.isAuthenticated)
const userName = computed(() => userStore.userName)
const itemCount = computed(() => cartStore.itemCount)

// Methods
const handleSearch = (query: string) => {
  if (!query.trim()) return

  if (router.currentRoute.value.path !== '/') {
    router.push('/')
  }
  productsStore.updateFilters({ search: query })
}

const handleLogout = async () => {
  await logout()
}
</script>

<style scoped>
.navbar {
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px 110px;
  display: flex;
  align-items: center;
  gap: 90px;
}

/* Logo */
.navbar-logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.navbar-logo img {
  height: 45px;
  width: auto;
}

/* Arama Container */
.search-container {
  flex: 1;
  max-width: 750px;
}

.search-box {
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 12px 16px;
  gap: 12px;
}

.search-icon {
  color: #999;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  background: none;
  outline: none;
  font-size: 14px;
  color: #333;
}

.search-input::placeholder {
  color: #999;
}

/* Navbar Actions */
.navbar-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

/* Dropdown */
.dropdown {
  position: relative;
}

.dropdown-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: none;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  text-decoration: none;
  transition: all 0.2s;
  white-space: nowrap;
  position: relative;
}

.dropdown-toggle:hover {
  background: #f7f7f7;
  border-color: #ccc;
}

.dropdown-toggle svg {
  opacity: 0.6;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff7f00;
  color: white;
  font-size: 11px;
  font-weight: 600;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
}

/* Dropdown Menu */
.dropdown:hover .dropdown-menu {
  display: block;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 180px;
  overflow: hidden;
}

.dropdown-item {
  display: block;
  padding: 12px 16px;
  color: #333;
  text-decoration: none;
  font-size: 14px;
  transition: background 0.2s;
  cursor: pointer;
}

.dropdown-item:hover {
  background: #f7f7f7;
}

/* Responsive */
@media (max-width: 1024px) {
  .navbar-container {
    padding: 16px 20px;
    gap: 20px;
  }

  .search-container {
    max-width: 450px;
  }
}

@media (max-width: 768px) {
  .navbar-container {
    flex-wrap: wrap;
    padding: 12px 16px;
    gap: 12px;
  }

  .navbar-logo img {
    height: 38px;
  }

  .search-container {
    order: 3;
    flex: 1 1 100%;
    max-width: 100%;
  }

  .navbar-actions {
    order: 2;
    margin-left: auto;
    gap: 8px;
  }

  .dropdown-toggle span {
    display: none;
  }

  .dropdown-toggle {
    padding: 8px;
    min-width: 40px;
    justify-content: center;
  }

  .search-box {
    padding: 8px 12px;
  }

  .search-input {
    font-size: 13px;
  }
}
</style>
