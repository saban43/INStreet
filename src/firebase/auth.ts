// Firebase Authentication işlemleri - Kullanıcı giriş, kayıt ve çıkış fonksiyonları
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from './firebaseConfig'

// Kullanıcı kayıt işlemi
export const registerUser = async (email: string, password: string, name: string) => {
  try {
    // Yeni kullanıcı oluştur
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Kullanıcı profilini güncelle
    await updateProfile(user, { displayName: name })

    // Firestore'da kullanıcı bilgilerini kaydet
    await setDoc(doc(db, 'users', user.uid), {
      name,
      email,
      role: 'user',
      address: '',
      phone: '',
      createdAt: new Date(),
    })

    return { success: true, user }
  } catch (error: any) {
    console.error('Kayıt hatası:', error)
    return { success: false, error: error.message }
  }
}

// Kullanıcı giriş işlemi
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { success: true, user: userCredential.user }
  } catch (error: any) {
    console.error('Giriş hatası:', error)
    return { success: false, error: error.message }
  }
}

// Kullanıcı çıkış işlemi
export const logoutUser = async () => {
  try {
    await signOut(auth)
    return { success: true }
  } catch (error: any) {
    console.error('Çıkış hatası:', error)
    return { success: false, error: error.message }
  }
}

// Kullanıcı bilgilerini Firestore'dan getir
export const getUserData = async (uid: string) => {
  try {
    const docRef = doc(db, 'users', uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() }
    } else {
      return { success: false, error: 'Kullanıcı bulunamadı' }
    }
  } catch (error: any) {
    console.error('Kullanıcı bilgisi getirme hatası:', error)
    return { success: false, error: error.message }
  }
}

// Admin custom claim kontrolü
export const checkAdminClaim = async () => {
  try {
    const user = auth.currentUser
    if (!user) {
      return { isAdmin: false }
    }

    // Token'ı yenile ve custom claim'leri al
    const idTokenResult = await user.getIdTokenResult()
    return {
      isAdmin: idTokenResult.claims.admin === true,
      claims: idTokenResult.claims,
    }
  } catch (error: any) {
    console.error('Admin claim kontrol hatası:', error)
    return { isAdmin: false, error: error.message }
  }
}
