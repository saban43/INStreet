// Fiyat formatlama yardımcı fonksiyonu - Türk Lirası formatında gösterim
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)
}

// İndirimli fiyat hesaplama
export const calculateDiscountedPrice = (price: number, discount: number): number => {
  return price - price * discount
}

// İndirim yüzdesi hesaplama
export const getDiscountPercentage = (discount: number): number => {
  return Math.round(discount * 100)
}

// Tarih formatlama
export const formatDate = (date: Date | any): string => {
  if (!date) return ''

  const dateObj = date?.toDate ? date.toDate() : new Date(date)

  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj)
}

// Kısa tarih formatlama
export const formatShortDate = (date: Date | any): string => {
  if (!date) return ''

  const dateObj = date?.toDate ? date.toDate() : new Date(date)

  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(dateObj)
}

// Metin kısaltma
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// URL'den dosya adı çıkarma
export const getFileNameFromUrl = (url: string): string => {
  return url.split('/').pop()?.split('?')[0] || ''
}

// Validasyon fonksiyonları
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10,11}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export const isValidPassword = (password: string): boolean => {
  return password.length >= 6
}

// Ürün durumu kontrolü
export const getStockStatus = (stock: number): { text: string; color: string } => {
  if (stock === 0) {
    return { text: 'Stokta Yok', color: 'red' }
  } else if (stock < 5) {
    return { text: 'Son Ürünler', color: 'orange' }
  } else {
    return { text: 'Stokta', color: 'green' }
  }
}

// Sipariş durumu
export const getOrderStatus = (status: string): { text: string; color: string } => {
  const statusMap: Record<string, { text: string; color: string }> = {
    processing: { text: 'İşleniyor', color: 'blue' },
    shipped: { text: 'Kargoda', color: 'orange' },
    delivered: { text: 'Teslim Edildi', color: 'green' },
    cancelled: { text: 'İptal Edildi', color: 'red' },
  }
  return statusMap[status] || { text: 'Bilinmiyor', color: 'gray' }
}
