// Firebase Storage işlemleri - Dosya yükleme ve silme
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from './firebaseConfig'

// Dosya yükle ve URL döndür
export const uploadFile = async (file: File, path: string) => {
  try {
    // Benzersiz dosya adı oluştur
    const timestamp = Date.now()
    const fileName = `${timestamp}_${file.name}`
    const storageRef = ref(storage, `${path}/${fileName}`)

    // Dosyayı yükle
    await uploadBytes(storageRef, file)

    // İndirme URL'ini al
    const downloadURL = await getDownloadURL(storageRef)

    return { success: true, url: downloadURL, fileName }
  } catch (error: any) {
    console.error('Dosya yükleme hatası:', error)
    return { success: false, error: error.message }
  }
}

// Birden fazla dosya yükle
export const uploadMultipleFiles = async (files: File[], path: string) => {
  try {
    const uploadPromises = files.map((file) => uploadFile(file, path))
    const results = await Promise.all(uploadPromises)

    const urls = results.filter((result) => result.success).map((result) => result.url)

    return { success: true, urls }
  } catch (error: any) {
    console.error('Çoklu dosya yükleme hatası:', error)
    return { success: false, error: error.message }
  }
}

// Dosya sil
export const deleteFile = async (fileUrl: string) => {
  try {
    const fileRef = ref(storage, fileUrl)
    await deleteObject(fileRef)
    return { success: true }
  } catch (error: any) {
    console.error('Dosya silme hatası:', error)
    return { success: false, error: error.message }
  }
}
