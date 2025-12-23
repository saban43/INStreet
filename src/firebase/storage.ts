// Firebase Storage işlemleri - Dosya yükleme ve silme
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage, auth } from './firebaseConfig'

// Dosya yükle ve URL döndür
export const uploadFile = async (file: File, path: string) => {
  try {
    // Token'ı yenile (admin claim'i güncellemek için)
    const user = auth.currentUser
    if (user) {
      const token = await user.getIdToken(true) // true = force refresh
      const tokenResult = await user.getIdTokenResult()
      console.log('🔑 Token yenilendi')
      console.log('📧 User:', user.email)
      console.log('🎫 Admin claim:', tokenResult.claims.admin)
      console.log('📂 Upload path:', `${path}/${file.name}`)
    } else {
      console.error('❌ Kullanıcı giriş yapmamış!')
      return { success: false, error: 'Lütfen giriş yapın' }
    }

    // Benzersiz dosya adı oluştur
    const timestamp = Date.now()
    const fileName = `${timestamp}_${file.name}`
    const storageRef = ref(storage, `${path}/${fileName}`)

    // Dosyayı yükle
    console.log('📤 Dosya yükleniyor:', fileName)
    await uploadBytes(storageRef, file)

    // İndirme URL'ini al
    const downloadURL = await getDownloadURL(storageRef)
    console.log('✅ Dosya başarıyla yüklendi!')

    return { success: true, url: downloadURL, fileName }
  } catch (error: any) {
    console.error('❌ Dosya yükleme hatası:', error)
    console.error('Hata kodu:', error.code)
    console.error('Hata mesajı:', error.message)
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
