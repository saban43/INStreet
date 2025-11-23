<!-- ProfileView - Kullanıcı profil ve sipariş geçmişi -->
<template>
  <div class="profile-view">
    <div class="profile-container">
      <div class="profile-header">
        <h1>Profilim</h1>
        <button @click="handleLogout" class="logout-btn">Çıkış Yap</button>
      </div>

      <!-- Kullanıcı Bilgileri -->
      <div class="profile-section">
        <h2>Kullanıcı Bilgileri</h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">Ad Soyad:</span>
            <span class="value">{{ userName }}</span>
          </div>
          <div class="info-item">
            <span class="label">E-posta:</span>
            <span class="value">{{ currentUser?.email }}</span>
          </div>
          <div class="info-item">
            <span class="label">Rol:</span>
            <span class="value">{{ isAdmin ? 'Admin' : 'Kullanıcı' }}</span>
          </div>
        </div>
      </div>

      <!-- Sipariş Geçmişi -->
      <div class="profile-section">
        <h2>Sipariş Geçmişim</h2>

        <div v-if="isLoadingOrders" class="loading">Yükleniyor...</div>

        <div v-else-if="orders.length === 0" class="no-orders">
          <p>Henüz siparişiniz bulunmuyor</p>
          <router-link to="/" class="shop-btn">Alışverişe Başla</router-link>
        </div>

        <div v-else class="orders-list">
          <div v-for="order in orders" :key="order.id" class="order-card">
            <div class="order-header">
              <span class="order-id">Sipariş #{{ order.id.substring(0, 8) }}</span>
              <span :class="['order-status', getOrderStatus(order.orderStatus).color]">
                {{ getOrderStatus(order.orderStatus).text }}
              </span>
            </div>

            <div class="order-date">
              {{ formatDate(order.orderDate) }}
            </div>

            <div class="order-items">
              <div v-for="(item, index) in order.items" :key="index" class="order-item">
                <img :src="item.image" :alt="item.name" class="item-image" />
                <div class="item-info">
                  <p class="item-name">{{ item.name }}</p>
                  <p class="item-details">Beden: {{ item.size }} | Adet: {{ item.quantity }}</p>
                </div>
                <p class="item-price">{{ formatPrice(item.price * item.quantity) }}</p>
              </div>
            </div>

            <div class="order-total">
              <span>Toplam:</span>
              <span class="total-amount">{{ formatPrice(order.totalAmount) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useUserStore } from '@/store/user'
import { getAllDocuments, where } from '@/firebase/firestore'
import { formatPrice, formatDate, getOrderStatus } from '@/utils/formatPrice'

const { logout } = useAuth()
const userStore = useUserStore()

const currentUser = computed(() => userStore.currentUser)
const userName = computed(() => userStore.userName)
const isAdmin = computed(() => userStore.isAdmin)

const orders = ref<any[]>([])
const isLoadingOrders = ref(false)

const handleLogout = async () => {
  if (confirm('Çıkış yapmak istediğinize emin misiniz?')) {
    await logout()
  }
}

const loadOrders = async () => {
  if (!currentUser.value) return

  isLoadingOrders.value = true
  try {
    const result = await getAllDocuments('orders', [where('userId', '==', currentUser.value.uid)])
    if (result.success && result.data) {
      orders.value = result.data.sort((a: any, b: any) => {
        return b.orderDate?.toMillis() - a.orderDate?.toMillis()
      })
    }
  } catch (error) {
    console.error('Siparişler yüklenemedi:', error)
  } finally {
    isLoadingOrders.value = false
  }
}

onMounted(() => {
  loadOrders()
})
</script>

<style scoped>
.profile-view {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}
.profile-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}
.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}
.profile-header h1 {
  margin: 0;
  font-size: 2rem;
}
.logout-btn {
  padding: 0.75rem 1.5rem;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}
.logout-btn:hover {
  background: #d32f2f;
}
.profile-section {
  margin-bottom: 3rem;
}
.profile-section h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
}
.info-grid {
  display: grid;
  gap: 1rem;
}
.info-item {
  display: flex;
  padding: 1rem;
  background: #f8f8f8;
  border-radius: 8px;
}
.info-item .label {
  font-weight: 600;
  min-width: 120px;
  color: #666;
}
.info-item .value {
  color: #333;
}
.loading,
.no-orders {
  text-align: center;
  padding: 3rem 2rem;
  color: #666;
}
.shop-btn {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.75rem 2rem;
  background: #ff7f00;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
}
.orders-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.order-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 1.5rem;
}
.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}
.order-id {
  font-weight: 600;
  color: #333;
}
.order-status {
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}
.order-status.blue {
  background: #e3f2fd;
  color: #2196f3;
}
.order-status.orange {
  background: #fff3e0;
  color: #ff9800;
}
.order-status.green {
  background: #e8f5e9;
  color: #4caf50;
}
.order-status.red {
  background: #ffebee;
  color: #f44336;
}
.order-date {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}
.order-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
  padding: 1rem 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}
.order-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}
.item-info {
  flex: 1;
}
.item-name {
  font-weight: 600;
  margin: 0 0 0.25rem;
}
.item-details {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}
.item-price {
  font-weight: 600;
  color: #ff7f00;
}
.order-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 700;
  margin-top: 1rem;
}
.total-amount {
  color: #ff7f00;
}
</style>
