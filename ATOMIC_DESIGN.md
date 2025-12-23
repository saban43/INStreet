# INStreet - Atomic Design Mimarisi

## 🎯 Proje Yapısı

Bu proje **Atomic Design Metodolojisi** kullanılarak geliştirilmiştir. Atomic Design, Brad Frost tarafından geliştirilen bir tasarım sistemi metodolojisidir ve bileşenleri 5 katmanda organize eder.

---

## 📂 Dosya Yapısı

```
src/
├── components/
│   ├── atoms/              # En küçük, yeniden kullanılabilir bileşenler
│   │   ├── BaseButton.vue
│   │   ├── BaseInput.vue
│   │   ├── BaseBadge.vue
│   │   ├── BaseSelect.vue
│   │   └── icons/
│   │       ├── SearchIcon.vue
│   │       ├── CartIcon.vue
│   │       ├── UserIcon.vue
│   │       ├── TrashIcon.vue
│   │       └── AdminIcon.vue
│   │
│   ├── molecules/          # Atomların birleşimi
│   │   ├── PriceDisplay.vue
│   │   ├── QuantitySelector.vue
│   │   ├── SearchBox.vue
│   │   ├── SizeSelector.vue
│   │   └── CartItem.vue
│   │
│   └── organisms/          # Kompleks bileşenler
│       ├── Navbar.vue
│       ├── Footer.vue
│       ├── Banner.vue
│       ├── ProductCard.vue
│       └── ProductFilter.vue
│
├── views/                  # Template + Pages (Sayfalar)
│   ├── HomeView.vue
│   ├── ProductView.vue
│   ├── CartView.vue
│   ├── LoginView.vue
│   ├── RegisterView.vue
│   ├── ProfileView.vue
│   ├── AdminView.vue
│   └── AboutView.vue
│
├── store/                  # State Management (Pinia)
├── router/                 # Routing
├── composables/            # Yeniden kullanılabilir mantık
├── firebase/               # Backend entegrasyonu
└── utils/                  # Yardımcı fonksiyonlar
```

---

## ⚛️ ATOMLAR (Atoms)

**Tanım:** En küçük, bölünemeyen UI bileşenleri. Her yerden kullanılabilir.

### BaseButton.vue

**Amaç:** Tüm butonlar için temel bileşen

**Props:**

- `variant`: 'primary' | 'secondary' | 'danger' | 'outline'
- `size`: 'sm' | 'md' | 'lg'
- `disabled`: boolean

**Kullanım:**

```vue
<BaseButton variant="primary" size="lg">Sepete Ekle</BaseButton>
<BaseButton variant="danger" size="sm">Sil</BaseButton>
```

**Kullanıldığı yerler:**

- ProductCard (Sepete Ekle)
- CartView (Satın Al)
- ProductView (Sepete Ekle)
- Navbar, Footer, vs.

---

### BaseInput.vue

**Amaç:** Tüm input alanları için temel bileşen

**Props:**

- `type`: 'text' | 'email' | 'password' | 'number' | 'search'
- `placeholder`: string
- `modelValue`: string | number
- `disabled`: boolean
- `error`: boolean

**Kullanım:**

```vue
<BaseInput v-model="email" type="email" placeholder="Email" />
```

**Kullanıldığı yerler:**

- SearchBox (arama input)
- ProductFilter (fiyat aralığı)
- LoginView, RegisterView (form alanları)

---

### BaseBadge.vue

**Amaç:** Etiket/rozet gösterimi

**Props:**

- `variant`: 'primary' | 'success' | 'danger' | 'warning' | 'info'

**Kullanım:**

```vue
<BaseBadge variant="primary">%20 İndirim</BaseBadge>
<BaseBadge variant="danger">Stokta Yok</BaseBadge>
```

**Kullanıldığı yerler:**

- ProductCard (indirim ve stok etiketleri)
- Navbar (sepet sayısı)
- ProductView (stok durumu)

---

### BaseSelect.vue

**Amaç:** Dropdown seçim kutusu

**Props:**

- `modelValue`: string | number
- `disabled`: boolean

**Kullanım:**

```vue
<BaseSelect v-model="category">
  <option value="">Tümü</option>
  <option value="Sneakers">Spor Ayakkabı</option>
</BaseSelect>
```

**Kullanıldığı yerler:**

- ProductFilter (kategori, marka, cinsiyet seçimi)

---

### Icons (Atom Seviyesi)

**SearchIcon, CartIcon, UserIcon, TrashIcon, AdminIcon**

**Props:**

- `size`: number (varsayılan: 20)
- `color`: string (varsayılan: 'currentColor')

**Kullanım:**

```vue
<SearchIcon :size="24" />
<CartIcon color="#ff7f00" />
```

**Kullanıldığı yerler:**

- Navbar (arama, kullanıcı, sepet ikonları)
- CartItem (çöp kutusu ikonu)

---

## 🧬 MOLEKÜLLER (Molecules)

**Tanım:** 2 veya daha fazla atomun birleşimi. Belirli bir işlevi var.

### PriceDisplay.vue

**Amaç:** Fiyat gösterimi (indirimli/normal)

**Props:**

- `price`: number
- `discount`: number (opsiyonel, 0-1 arası)

**İçerik:**

- Eski fiyat (çizgili)
- Yeni fiyat (vurgulu)
- İndirim badge'i (BaseBadge kullanır)

**Kullanım:**

```vue
<PriceDisplay :price="2999" :discount="0.2" />
<!-- Çıktı: ₺2.999 ₺2.399 %20 İndirim -->
```

**Kullanıldığı yerler:**

- ProductCard
- ProductView
- CartItem

---

### QuantitySelector.vue

**Amaç:** Miktar artırma/azaltma

**Props:**

- `modelValue`: number
- `min`: number (varsayılan: 1)
- `max`: number (opsiyonel)

**İçerik:**

- Azalt butonu (BaseButton)
- Miktar gösterimi
- Artır butonu (BaseButton)

**Kullanım:**

```vue
<QuantitySelector v-model="quantity" :min="1" :max="10" />
```

**Kullanıldığı yerler:**

- CartItem (sepetteki ürün miktarı)

---

### SearchBox.vue

**Amaç:** Arama kutusu

**Props:**

- `placeholder`: string

**Events:**

- `@search`: string (arama metni)

**İçerik:**

- BaseInput (arama input)
- BaseButton (arama butonu)
- SearchIcon

**Kullanım:**

```vue
<SearchBox @search="handleSearch" />
```

**Kullanıldığı yerler:**

- HomeView (ana sayfa arama)
- Navbar (açılır arama)

---

### SizeSelector.vue

**Amaç:** Beden seçimi

**Props:**

- `sizes`: string[]
- `modelValue`: string
- `label`: string
- `showLabel`: boolean

**İçerik:**

- Başlık (opsiyonel)
- Beden butonları (BaseButton)

**Kullanım:**

```vue
<SizeSelector :sizes="['40', '41', '42']" v-model="selectedSize" />
```

**Kullanıldığı yerler:**

- ProductView (ürün detay sayfası)

---

### CartItem.vue

**Amaç:** Sepetteki bir ürün satırı

**Props:**

- `item`: CartItem

**İçerik:**

- Ürün görseli
- Ürün bilgileri
- PriceDisplay (fiyat molekülü)
- QuantitySelector (miktar molekülü)
- Sil butonu (BaseButton + TrashIcon)

**Kullanım:**

```vue
<CartItem :item="cartItem" />
```

**Kullanıldığı yerler:**

- CartView (sepet sayfası)

---

## 🏗️ ORGANİZMALAR (Organisms)

**Tanım:** Moleküllerin ve atomların birleşimi. Kompleks, bağımsız bileşenler.

### Navbar.vue

**Amaç:** Üst navigasyon menüsü

**İçerik:**

- Logo
- Ana menü linkleri
- SearchIcon, UserIcon, AdminIcon, CartIcon (atomlar)
- BaseBadge (sepet sayısı)
- SearchBox (açılır arama molekülü)

**Özellikler:**

- Sticky pozisyon
- Kullanıcı durumuna göre değişir
- Admin yetkisi kontrolü
- Mobil responsive

---

### Footer.vue

**Amaç:** Alt bilgi bölümü

**İçerik:**

- Şirket bilgileri
- Hızlı linkler
- İletişim bilgileri
- Sosyal medya linkleri

---

### Banner.vue

**Amaç:** Ana sayfa carousel/slider

**İçerik:**

- Görsel slider
- BaseButton (CTA butonu)
- Navigasyon noktaları
- Önceki/Sonraki butonları

**Özellikler:**

- Otomatik geçiş (5 saniye)
- Manuel navigasyon
- Fade animasyonu

---

### ProductCard.vue

**Amaç:** Ürün kartı

**İçerik:**

- Ürün görseli
- BaseBadge (indirim ve stok)
- Marka ve ürün adı
- PriceDisplay (fiyat molekülü)
- BaseButton (Sepete Ekle)

**Özellikler:**

- Hover animasyonu
- Tıklanınca ürün detay sayfasına yönlendirir
- Hızlı sepete ekleme

---

### ProductFilter.vue

**Amaç:** Ürün filtreleme paneli

**İçerik:**

- BaseSelect (kategori, marka, cinsiyet)
- BaseInput (fiyat aralığı)
- BaseButton (temizle butonu)

**Özellikler:**

- Sticky pozisyon
- Gerçek zamanlı filtreleme
- Mobil responsive

---

## 📄 TEMPLATES & PAGES (Views)

**Tanım:** Organizmaların, moleküllerin ve atomların sayfa düzeninde birleşimi.

### HomeView.vue (Template + Page)

**Yapı:**

```
┌─────────────────────────────┐
│   Banner (organism)         │
├─────────────────────────────┤
│   SearchBox (molecule)      │
├──────────┬──────────────────┤
│ Product  │  Products Grid   │
│ Filter   │  ┌────┬────┬────┐│
│(organism)│  │Card│Card│Card││
│          │  └────┴────┴────┘│
└──────────┴──────────────────┘
```

**Kullanılan bileşenler:**

- Banner (organism)
- SearchBox (molecule)
- ProductFilter (organism)
- ProductCard (organism) x N

---

### ProductView.vue (Template + Page)

**Yapı:**

```
┌───────────────┬───────────────┐
│  Galeri       │  Detaylar     │
│ ┌─────────┐   │  Brand        │
│ │  Main   │   │  Title        │
│ │  Image  │   │  PriceDisplay │
│ └─────────┘   │  Description  │
│ [thumbnails]  │  SizeSelector │
│               │  Stock Badge  │
│               │  [Add Button] │
└───────────────┴───────────────┘
```

**Kullanılan bileşenler:**

- PriceDisplay (molecule)
- SizeSelector (molecule)
- BaseBadge (atom)
- BaseButton (atom)

---

### CartView.vue (Template + Page)

**Yapı:**

```
┌─────────────────────┬─────────┐
│  Sepet Öğeleri      │ Özet    │
│  ┌────────────────┐ │┌──────┐ │
│  │ CartItem       │ ││Toplam││
│  └────────────────┘ ││       ││
│  ┌────────────────┐ ││[Satın]││
│  │ CartItem       │ │└──────┘ │
│  └────────────────┘ │         │
└─────────────────────┴─────────┘
```

**Kullanılan bileşenler:**

- CartItem (molecule) x N
- BaseButton (atom)

---

## 🎨 ATOMIC DESIGN AVANTAJLARI

### 1. **Yeniden Kullanılabilirlik**

- BaseButton tüm projede kullanılıyor (tek yerden değişiklik)
- PriceDisplay 3 farklı yerde aynı şekilde çalışıyor

### 2. **Tutarlılık**

- Tüm butonlar aynı stil ve davranış
- Fiyat gösterimi her yerde aynı format

### 3. **Bakım Kolaylığı**

- Buton rengini değiştirmek için sadece BaseButton'u güncelle
- Tüm projede otomatik yansır

### 4. **Test Edilebilirlik**

- Her atom ayrı test edilebilir
- Moleküller atomları kullandığı için zaten test edilmiş

### 5. **Ekip Çalışması**

- Herkes aynı atomları kullanır
- Standart bileşen kütüphanesi

---

## 🔄 BİLEŞEN İLİŞKİLERİ

```
ATOMS (9 adet)
├── BaseButton
├── BaseInput
├── BaseBadge
├── BaseSelect
└── Icons (5 adet)

    ↓ Kullanılır

MOLECULES (5 adet)
├── PriceDisplay (BaseBadge kullanır)
├── QuantitySelector (BaseButton kullanır)
├── SearchBox (BaseInput, BaseButton, SearchIcon kullanır)
├── SizeSelector (BaseButton kullanır)
└── CartItem (PriceDisplay, QuantitySelector, BaseButton, TrashIcon kullanır)

    ↓ Kullanılır

ORGANISMS (5 adet)
├── Navbar (Icons, BaseBadge, SearchBox kullanır)
├── Footer
├── Banner (BaseButton kullanır)
├── ProductCard (BaseBadge, PriceDisplay, BaseButton kullanır)
└── ProductFilter (BaseSelect, BaseInput, BaseButton kullanır)

    ↓ Kullanılır

TEMPLATES/PAGES (8 adet)
├── HomeView (Banner, SearchBox, ProductFilter, ProductCard kullanır)
├── ProductView (PriceDisplay, SizeSelector, BaseBadge, BaseButton kullanır)
├── CartView (CartItem, BaseButton kullanır)
└── Diğer view'lar
```

---

## 📚 KAYNAKLAR

- [Atomic Design by Brad Frost](https://bradfrost.com/blog/post/atomic-web-design/)
- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/)

---

## ✅ PROJE İSTATİSTİKLERİ

- **Toplam Atom:** 9 (4 UI + 5 Icon)
- **Toplam Molekül:** 5
- **Toplam Organizma:** 5
- **Toplam Sayfa:** 8

**Atomic Design Skoru:** 9/10 ⭐

---

**Geliştirici Notu:** Bu proje tamamen Atomic Design metodolojisine uygun şekilde yeniden yapılandırılmıştır. Her bileşen kendi sorumluluğuna sahiptir ve yeniden kullanılabilirlik maksimum seviyededir.
