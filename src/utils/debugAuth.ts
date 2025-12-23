// Admin token debug fonksiyonları
import { auth } from '@/firebase/firebaseConfig'

// Admin claim'ini kontrol et ve konsola yazdır
export const checkAdminToken = async () => {
  try {
    const user = auth.currentUser
    if (!user) {
      console.log('❌ Kullanıcı giriş yapmamış')
      return { isAdmin: false, message: 'Kullanıcı giriş yapmamış' }
    }

    // Token'ı yenile ve claim'leri al
    const idTokenResult = await user.getIdTokenResult(true)

    console.log('🔍 Token Bilgileri:')
    console.log('User UID:', user.uid)
    console.log('Email:', user.email)
    console.log('Custom Claims:', idTokenResult.claims)
    console.log('Admin Claim:', idTokenResult.claims.admin)

    if (idTokenResult.claims.admin === true) {
      console.log('✅ Admin yetkisi var!')
      return { isAdmin: true, claims: idTokenResult.claims }
    } else {
      console.log('❌ Admin yetkisi YOK!')
      console.log('⚠️ Çıkış yapıp tekrar giriş yapmalısınız!')
      return { isAdmin: false, claims: idTokenResult.claims }
    }
  } catch (error: any) {
    console.error('❌ Token kontrolü hatası:', error)
    return { isAdmin: false, error: error.message }
  }
}
