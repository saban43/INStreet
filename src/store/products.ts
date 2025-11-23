// Ürün durumu yönetimi - Ürünleri getirme, filtreleme ve arama
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getAllDocuments, query, where, orderBy } from '@/firebase/firestore'

export interface Product {
  id: string
  name: string
  brand: string
  category: string
  gender: string
  price: number
  discount: number
  sizes: string[]
  stock: number
  description: string
  images: string[]
  createdAt: any
}

export const useProductsStore = defineStore('products', () => {
  // Durum değişkenleri
  const products = ref<Product[]>([])
  const isLoading = ref(false)
  const selectedProduct = ref<Product | null>(null)

  // Filtre değişkenleri
  const filters = ref({
    category: '',
    brand: '',
    gender: '',
    minPrice: 0,
    maxPrice: 10000,
    search: '',
  })

  // Hesaplanan değerler - Filtrelenmiş ürünler
  const filteredProducts = computed(() => {
    let result = products.value

    // Kategori filtresi
    if (filters.value.category) {
      result = result.filter((p) => p.category === filters.value.category)
    }

    // Marka filtresi
    if (filters.value.brand) {
      result = result.filter((p) => p.brand === filters.value.brand)
    }

    // Cinsiyet filtresi
    if (filters.value.gender) {
      result = result.filter((p) => p.gender === filters.value.gender)
    }

    // Fiyat filtresi
    result = result.filter((p) => {
      const finalPrice = p.price - p.price * p.discount
      return finalPrice >= filters.value.minPrice && finalPrice <= filters.value.maxPrice
    })

    // Arama filtresi
    if (filters.value.search) {
      const searchLower = filters.value.search.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.brand.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower),
      )
    }

    return result
  })

  // Benzersiz markalar
  const brands = computed(() => {
    const brandSet = new Set(products.value.map((p) => p.brand))
    return Array.from(brandSet).sort()
  })

  // Benzersiz kategoriler
  const categories = computed(() => {
    const categorySet = new Set(products.value.map((p) => p.category))
    return Array.from(categorySet).sort()
  })

  // Tüm ürünleri getir
  const fetchProducts = async () => {
    isLoading.value = true
    try {
      const result = await getAllDocuments('products', [orderBy('createdAt', 'desc')])
      if (result.success) {
        products.value = result.data as Product[]
      }
    } catch (error) {
      console.error('Ürünler getirilemedi:', error)
    } finally {
      isLoading.value = false
    }
  }

  // Tek ürün getir
  const fetchProduct = async (productId: string) => {
    const product = products.value.find((p) => p.id === productId)
    if (product) {
      selectedProduct.value = product
      return product
    }

    // Eğer listede yoksa Firestore'dan getir
    isLoading.value = true
    try {
      const { getDocument } = await import('@/firebase/firestore')
      const result = await getDocument('products', productId)
      if (result.success) {
        selectedProduct.value = result.data as Product
        return result.data
      }
    } catch (error) {
      console.error('Ürün getirilemedi:', error)
    } finally {
      isLoading.value = false
    }
    return null
  }

  // Filtreleri güncelle
  const updateFilters = (newFilters: Partial<typeof filters.value>) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  // Filtreleri sıfırla
  const resetFilters = () => {
    filters.value = {
      category: '',
      brand: '',
      gender: '',
      minPrice: 0,
      maxPrice: 10000,
      search: '',
    }
  }

  return {
    products,
    filteredProducts,
    isLoading,
    selectedProduct,
    filters,
    brands,
    categories,
    fetchProducts,
    fetchProduct,
    updateFilters,
    resetFilters,
  }
})
