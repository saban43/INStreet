// Kullanıcı durumu yönetimi - Kullanıcı bilgileri ve kimlik doğrulama
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from '@/firebase/firebaseConfig'
import { getUserData } from '@/firebase/auth'

export const useUserStore = defineStore('user', () => {
  // Durum değişkenleri
  const currentUser = ref<User | null>(null)
  const userData = ref<any>(null)
  const isLoading = ref(true)

  // Hesaplanan değerler
  const isAuthenticated = computed(() => !!currentUser.value)

  // Admin kontrolü - hem custom claim hem de Firestore role kontrolü
  const isAdmin = computed(() => {
    // Öncelik: Auth token'daki custom claim (Firebase Storage kuralları için)
    if (currentUser.value) {
      return (currentUser.value as any).reloadUserInfo?.customAttributes
        ? JSON.parse((currentUser.value as any).reloadUserInfo.customAttributes).admin === true
        : userData.value?.role === 'admin'
    }
    return userData.value?.role === 'admin'
  })

  const userName = computed(() => userData.value?.name || currentUser.value?.displayName || '')

  // Kullanıcı durumunu dinle
  const initializeAuth = () => {
    onAuthStateChanged(auth, async (user) => {
      currentUser.value = user

      if (user) {
        // Token'ı yenile (custom claim'leri almak için)
        await user.getIdToken(true)

        // Kullanıcı verilerini Firestore'dan getir
        const result = await getUserData(user.uid)
        if (result.success) {
          userData.value = result.data
        }
      } else {
        userData.value = null
      }

      isLoading.value = false
    })
  }

  // Kullanıcı verilerini güncelle
  const updateUserData = async (uid: string) => {
    const result = await getUserData(uid)
    if (result.success) {
      userData.value = result.data
    }
  }

  // Çıkış yapınca durumu temizle
  const clearUser = () => {
    currentUser.value = null
    userData.value = null
  }

  return {
    currentUser,
    userData,
    isLoading,
    isAuthenticated,
    isAdmin,
    userName,
    initializeAuth,
    updateUserData,
    clearUser,
  }
})
