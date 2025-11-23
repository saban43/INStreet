// Firestore veritabanı işlemleri - CRUD operasyonları
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  type QueryConstraint,
} from 'firebase/firestore'
import { db } from './firebaseConfig'

// Koleksiyondan tüm dokümanları getir
export const getAllDocuments = async (
  collectionName: string,
  constraints: QueryConstraint[] = [],
) => {
  try {
    const q =
      constraints.length > 0
        ? query(collection(db, collectionName), ...constraints)
        : collection(db, collectionName)

    const querySnapshot = await getDocs(q)
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return { success: true, data: documents }
  } catch (error: any) {
    console.error('Dokümanları getirme hatası:', error)
    return { success: false, error: error.message }
  }
}

// Tek bir doküman getir
export const getDocument = async (collectionName: string, documentId: string) => {
  try {
    const docRef = doc(db, collectionName, documentId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return { success: true, data: { id: docSnap.id, ...docSnap.data() } }
    } else {
      return { success: false, error: 'Doküman bulunamadı' }
    }
  } catch (error: any) {
    console.error('Doküman getirme hatası:', error)
    return { success: false, error: error.message }
  }
}

// Yeni doküman ekle
export const addDocument = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
    })
    return { success: true, id: docRef.id }
  } catch (error: any) {
    console.error('Doküman ekleme hatası:', error)
    return { success: false, error: error.message }
  }
}

// Doküman güncelle
export const updateDocument = async (collectionName: string, documentId: string, data: any) => {
  try {
    const docRef = doc(db, collectionName, documentId)
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    })
    return { success: true }
  } catch (error: any) {
    console.error('Doküman güncelleme hatası:', error)
    return { success: false, error: error.message }
  }
}

// Doküman sil
export const deleteDocument = async (collectionName: string, documentId: string) => {
  try {
    const docRef = doc(db, collectionName, documentId)
    await deleteDoc(docRef)
    return { success: true }
  } catch (error: any) {
    console.error('Doküman silme hatası:', error)
    return { success: false, error: error.message }
  }
}

// Sorgu yardımcı fonksiyonları
export { query, where, orderBy, limit, serverTimestamp }
