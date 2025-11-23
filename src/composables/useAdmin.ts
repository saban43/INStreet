// Admin composable - Admin panel işlemleri için yardımcı fonksiyonlar
import { computed } from 'vue'
import { useAdminStore } from '@/store/admin'
import { useUserStore } from '@/store/user'

export const useAdmin = () => {
  const adminStore = useAdminStore()
  const userStore = useUserStore()

  // Store verilerini dışa aktar
  const banners = computed(() => adminStore.banners)
  const isLoading = computed(() => adminStore.isLoading)
  const isAdmin = computed(() => userStore.isAdmin)

  // Banner'ları yükle
  const loadBanners = async () => {
    await adminStore.fetchBanners()
  }

  // Yeni ürün ekle
  const createProduct = async (productData: any, imageFiles: File[]) => {
    if (!isAdmin.value) {
      return { success: false, message: 'Bu işlem için admin yetkisi gerekli' }
    }

    return await adminStore.addProduct(productData, imageFiles)
  }

  // Ürün güncelle
  const updateProduct = async (productId: string, productData: any, newImageFiles?: File[]) => {
    if (!isAdmin.value) {
      return { success: false, message: 'Bu işlem için admin yetkisi gerekli' }
    }

    return await adminStore.updateProduct(productId, productData, newImageFiles)
  }

  // Ürün sil
  const removeProduct = async (productId: string, imageUrls: string[]) => {
    if (!isAdmin.value) {
      return { success: false, message: 'Bu işlem için admin yetkisi gerekli' }
    }

    return await adminStore.deleteProduct(productId, imageUrls)
  }

  // Banner ekle
  const createBanner = async (bannerData: any, imageFile: File) => {
    if (!isAdmin.value) {
      return { success: false, message: 'Bu işlem için admin yetkisi gerekli' }
    }

    return await adminStore.addBanner(bannerData, imageFile)
  }

  // Banner güncelle
  const updateBanner = async (bannerId: string, bannerData: any, newImageFile?: File) => {
    if (!isAdmin.value) {
      return { success: false, message: 'Bu işlem için admin yetkisi gerekli' }
    }

    return await adminStore.updateBanner(bannerId, bannerData, newImageFile)
  }

  // Banner sil
  const removeBanner = async (bannerId: string, imageUrl: string) => {
    if (!isAdmin.value) {
      return { success: false, message: 'Bu işlem için admin yetkisi gerekli' }
    }

    return await adminStore.deleteBanner(bannerId, imageUrl)
  }

  // Aktif banner'ları getir
  const getActiveBanners = computed(() => {
    return banners.value.filter((banner: any) => banner.isActive)
  })

  return {
    banners,
    isLoading,
    isAdmin,
    getActiveBanners,
    loadBanners,
    createProduct,
    updateProduct,
    removeProduct,
    createBanner,
    updateBanner,
    removeBanner,
  }
}
