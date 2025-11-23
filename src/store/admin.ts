// Admin durumu yönetimi - Ürün ve banner yönetimi
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { addDocument, updateDocument, deleteDocument, getAllDocuments } from '@/firebase/firestore'
import { uploadFile, uploadMultipleFiles, deleteFile } from '@/firebase/storage'

export interface Banner {
  id: string
  title: string
  imageUrl: string
  link: string
  isActive: boolean
}

export const useAdminStore = defineStore('admin', () => {
  // Durum değişkenleri
  const banners = ref<Banner[]>([])
  const isLoading = ref(false)

  // Banner'ları getir
  const fetchBanners = async () => {
    isLoading.value = true
    try {
      const result = await getAllDocuments('banners')
      if (result.success) {
        banners.value = result.data as Banner[]
      }
    } catch (error) {
      console.error("Banner'lar getirilemedi:", error)
    } finally {
      isLoading.value = false
    }
  }

  // Yeni ürün ekle
  const addProduct = async (productData: any, imageFiles: File[]) => {
    isLoading.value = true
    try {
      // Önce resimleri yükle
      const uploadResult = await uploadMultipleFiles(imageFiles, 'products')
      if (!uploadResult.success) {
        throw new Error('Resimler yüklenemedi')
      }

      // Ürün verisini Firestore'a ekle
      const result = await addDocument('products', {
        ...productData,
        images: uploadResult.urls,
      })

      if (result.success) {
        return { success: true, message: 'Ürün başarıyla eklendi' }
      } else {
        throw new Error(result.error)
      }
    } catch (error: any) {
      console.error('Ürün ekleme hatası:', error)
      return { success: false, message: error.message }
    } finally {
      isLoading.value = false
    }
  }

  // Ürün güncelle
  const updateProduct = async (productId: string, productData: any, newImageFiles?: File[]) => {
    isLoading.value = true
    try {
      let imageUrls = productData.images

      // Yeni resimler varsa yükle
      if (newImageFiles && newImageFiles.length > 0) {
        const uploadResult = await uploadMultipleFiles(newImageFiles, 'products')
        if (uploadResult.success && uploadResult.urls) {
          imageUrls = [...imageUrls, ...uploadResult.urls]
        }
      }

      // Ürün verisini güncelle
      const result = await updateDocument('products', productId, {
        ...productData,
        images: imageUrls,
      })

      if (result.success) {
        return { success: true, message: 'Ürün başarıyla güncellendi' }
      } else {
        throw new Error(result.error)
      }
    } catch (error: any) {
      console.error('Ürün güncelleme hatası:', error)
      return { success: false, message: error.message }
    } finally {
      isLoading.value = false
    }
  }

  // Ürün sil
  const deleteProduct = async (productId: string, imageUrls: string[]) => {
    isLoading.value = true
    try {
      // Önce resimleri sil
      for (const url of imageUrls) {
        await deleteFile(url)
      }

      // Sonra ürünü sil
      const result = await deleteDocument('products', productId)

      if (result.success) {
        return { success: true, message: 'Ürün başarıyla silindi' }
      } else {
        throw new Error(result.error)
      }
    } catch (error: any) {
      console.error('Ürün silme hatası:', error)
      return { success: false, message: error.message }
    } finally {
      isLoading.value = false
    }
  }

  // Banner ekle
  const addBanner = async (bannerData: any, imageFile: File) => {
    isLoading.value = true
    try {
      // Önce resmi yükle
      const uploadResult = await uploadFile(imageFile, 'banners')
      if (!uploadResult.success) {
        throw new Error('Banner resmi yüklenemedi')
      }

      // Banner verisini Firestore'a ekle
      const result = await addDocument('banners', {
        ...bannerData,
        imageUrl: uploadResult.url,
      })

      if (result.success) {
        await fetchBanners() // Banner listesini güncelle
        return { success: true, message: 'Banner başarıyla eklendi' }
      } else {
        throw new Error(result.error)
      }
    } catch (error: any) {
      console.error('Banner ekleme hatası:', error)
      return { success: false, message: error.message }
    } finally {
      isLoading.value = false
    }
  }

  // Banner güncelle
  const updateBanner = async (bannerId: string, bannerData: any, newImageFile?: File) => {
    isLoading.value = true
    try {
      let imageUrl = bannerData.imageUrl

      // Yeni resim varsa yükle
      if (newImageFile) {
        const uploadResult = await uploadFile(newImageFile, 'banners')
        if (uploadResult.success) {
          // Eski resmi sil
          await deleteFile(bannerData.imageUrl)
          imageUrl = uploadResult.url
        }
      }

      // Banner verisini güncelle
      const result = await updateDocument('banners', bannerId, {
        ...bannerData,
        imageUrl,
      })

      if (result.success) {
        await fetchBanners()
        return { success: true, message: 'Banner başarıyla güncellendi' }
      } else {
        throw new Error(result.error)
      }
    } catch (error: any) {
      console.error('Banner güncelleme hatası:', error)
      return { success: false, message: error.message }
    } finally {
      isLoading.value = false
    }
  }

  // Banner sil
  const deleteBanner = async (bannerId: string, imageUrl: string) => {
    isLoading.value = true
    try {
      // Önce resmi sil
      await deleteFile(imageUrl)

      // Sonra banner'ı sil
      const result = await deleteDocument('banners', bannerId)

      if (result.success) {
        await fetchBanners()
        return { success: true, message: 'Banner başarıyla silindi' }
      } else {
        throw new Error(result.error)
      }
    } catch (error: any) {
      console.error('Banner silme hatası:', error)
      return { success: false, message: error.message }
    } finally {
      isLoading.value = false
    }
  }

  return {
    banners,
    isLoading,
    fetchBanners,
    addProduct,
    updateProduct,
    deleteProduct,
    addBanner,
    updateBanner,
    deleteBanner,
  }
})
