// Router yapılandırması - Sayfa yönlendirmeleri ve route guard'ları
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { title: 'Ana Sayfa' },
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import('@/views/ProductView.vue'),
      meta: { title: 'Ürün Detay' },
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/CartView.vue'),
      meta: { title: 'Sepet' },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { title: 'Giriş Yap', requiresGuest: true },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
      meta: { title: 'Kayıt Ol', requiresGuest: true },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
      meta: { title: 'Profilim', requiresAuth: true },
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/AdminView.vue'),
      meta: { title: 'Admin Panel', requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
      meta: { title: 'Hakkımızda' },
    },
  ],
})

// Navigation Guard - Kimlik doğrulama kontrolü
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  // Sayfa başlığını güncelle
  document.title = `${to.meta.title || 'INStreet'} - INStreet`

  // Giriş yapmış kullanıcılar login/register sayfalarına giremez
  if (to.meta.requiresGuest && userStore.isAuthenticated) {
    next('/')
    return
  }

  // Giriş gerektiren sayfalar
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next('/login')
    return
  }

  // Admin gerektiren sayfalar
  if (to.meta.requiresAdmin && !userStore.isAdmin) {
    next('/')
    return
  }

  next()
})

export default router
