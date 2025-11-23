// Kimlik doğrulama composable - Giriş, kayıt ve çıkış işlemleri
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { registerUser, loginUser, logoutUser } from '@/firebase/auth'
import { useUserStore } from '@/store/user'

export const useAuth = () => {
  const router = useRouter()
  const userStore = useUserStore()
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Kullanıcı kaydı
  const register = async (email: string, password: string, name: string) => {
    isLoading.value = true
    error.value = null

    try {
      const result = await registerUser(email, password, name)

      if (result.success) {
        // Kullanıcı verilerini güncelle
        if (result.user) {
          await userStore.updateUserData(result.user.uid)
        }
        // Profil sayfasına yönlendir
        router.push('/profile')
        return { success: true }
      } else {
        error.value = getErrorMessage(result.error)
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = 'Kayıt sırasında bir hata oluştu'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  // Kullanıcı girişi
  const login = async (email: string, password: string) => {
    isLoading.value = true
    error.value = null

    try {
      const result = await loginUser(email, password)

      if (result.success) {
        // Kullanıcı verilerini güncelle
        if (result.user) {
          await userStore.updateUserData(result.user.uid)
        }
        // Ana sayfaya yönlendir
        router.push('/')
        return { success: true }
      } else {
        error.value = getErrorMessage(result.error)
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = 'Giriş sırasında bir hata oluştu'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  // Kullanıcı çıkışı
  const logout = async () => {
    isLoading.value = true
    error.value = null

    try {
      const result = await logoutUser()

      if (result.success) {
        userStore.clearUser()
        // Giriş sayfasına yönlendir
        router.push('/login')
        return { success: true }
      } else {
        error.value = 'Çıkış sırasında bir hata oluştu'
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = 'Çıkış sırasında bir hata oluştu'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  // Hata mesajlarını Türkçeleştir
  const getErrorMessage = (error: string) => {
    const errorMessages: Record<string, string> = {
      'auth/email-already-in-use': 'Bu e-posta adresi zaten kullanımda',
      'auth/invalid-email': 'Geçersiz e-posta adresi',
      'auth/operation-not-allowed': 'İşlem izin verilmedi',
      'auth/weak-password': 'Şifre çok zayıf (en az 6 karakter olmalı)',
      'auth/user-disabled': 'Bu kullanıcı hesabı devre dışı bırakılmış',
      'auth/user-not-found': 'Kullanıcı bulunamadı',
      'auth/wrong-password': 'Hatalı şifre',
      'auth/too-many-requests': 'Çok fazla başarısız deneme. Lütfen daha sonra tekrar deneyin',
    }

    return errorMessages[error] || 'Bir hata oluştu'
  }

  return {
    isLoading,
    error,
    register,
    login,
    logout,
  }
}
