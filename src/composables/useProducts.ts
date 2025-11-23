// Ürünler composable - Ürün işlemleri için yardımcı fonksiyonlar
import { computed } from 'vue'
import { useProductsStore } from '@/store/products'

export const useProducts = () => {
  const productsStore = useProductsStore()

  // Store verilerini dışa aktar
  const products = computed(() => productsStore.filteredProducts)
  const allProducts = computed(() => productsStore.products)
  const isLoading = computed(() => productsStore.isLoading)
  const selectedProduct = computed(() => productsStore.selectedProduct)
  const brands = computed(() => productsStore.brands)
  const categories = computed(() => productsStore.categories)

  // Ürünleri getir
  const loadProducts = async () => {
    await productsStore.fetchProducts()
  }

  // Tek ürün getir
  const loadProduct = async (productId: string) => {
    return await productsStore.fetchProduct(productId)
  }

  // Filtreleri güncelle
  const setFilters = (filters: any) => {
    productsStore.updateFilters(filters)
  }

  // Arama yap
  const search = (query: string) => {
    productsStore.updateFilters({ search: query })
  }

  // Kategoriye göre filtrele
  const filterByCategory = (category: string) => {
    productsStore.updateFilters({ category })
  }

  // Markaya göre filtrele
  const filterByBrand = (brand: string) => {
    productsStore.updateFilters({ brand })
  }

  // Cinsiyete göre filtrele
  const filterByGender = (gender: string) => {
    productsStore.updateFilters({ gender })
  }

  // Fiyat aralığına göre filtrele
  const filterByPrice = (minPrice: number, maxPrice: number) => {
    productsStore.updateFilters({ minPrice, maxPrice })
  }

  // Filtreleri temizle
  const clearFilters = () => {
    productsStore.resetFilters()
  }

  // İndirimli fiyat hesapla
  const calculateDiscountedPrice = (price: number, discount: number) => {
    return price - price * discount
  }

  // İndirim yüzdesi hesapla
  const getDiscountPercentage = (discount: number) => {
    return Math.round(discount * 100)
  }

  // Stok durumu kontrolü
  const isInStock = (stock: number) => {
    return stock > 0
  }

  // Ürünü bedene göre ara
  const hasSize = (sizes: string[], size: string) => {
    return sizes.includes(size)
  }

  return {
    products,
    allProducts,
    isLoading,
    selectedProduct,
    brands,
    categories,
    loadProducts,
    loadProduct,
    setFilters,
    search,
    filterByCategory,
    filterByBrand,
    filterByGender,
    filterByPrice,
    clearFilters,
    calculateDiscountedPrice,
    getDiscountPercentage,
    isInStock,
    hasSize,
  }
}
