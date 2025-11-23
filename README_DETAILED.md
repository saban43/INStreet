# INStreet - E-Ticaret Uygulaması

Vue 3, TypeScript, Firebase ve Pinia kullanılarak geliştirilmiş modern bir spor ayakkabı e-ticaret platformu.

## 🚀 Özellikler

- ✅ **Kullanıcı Yönetimi**: Firebase Authentication ile kayıt ve giriş
- ✅ **Ürün Katalog**: Ürün listeleme, detay görüntüleme, filtreleme ve arama
- ✅ **Sepet Yönetimi**: LocalStorage tabanlı sepet işlemleri
- ✅ **Sipariş Sistemi**: Firestore'da sipariş kayıtları
- ✅ **Admin Paneli**: Ürün ve banner yönetimi (sadece admin kullanıcılar için)
- ✅ **Responsive Tasarım**: Mobil ve masaüstü uyumlu
- ✅ **Real-time Database**: Firebase Firestore entegrasyonu
- ✅ **Image Storage**: Firebase Storage ile görsel yönetimi

## 📁 Proje Yapısı

```
src/
├── assets/          # Resimler, ikonlar ve stiller
├── components/      # Vue bileşenleri
│   ├── Navbar.vue
│   ├── Footer.vue
│   ├── ProductCard.vue
│   ├── Banner.vue
│   ├── CartItem.vue
│   ├── ProductFilter.vue
│   ├── ProductSearch.vue
│   └── AdminProductForm.vue
├── views/           # Sayfa bileşenleri
│   ├── HomeView.vue
│   ├── ProductView.vue
│   ├── CartView.vue
│   ├── LoginView.vue
│   ├── RegisterView.vue
│   ├── ProfileView.vue
│   └── AdminView.vue
├── router/          # Vue Router yapılandırması
├── store/           # Pinia state management
│   ├── user.ts
│   ├── cart.ts
│   ├── products.ts
│   └── admin.ts
├── firebase/        # Firebase yapılandırması
│   ├── firebaseConfig.ts
│   ├── auth.ts
│   ├── firestore.ts
│   └── storage.ts
├── composables/     # Vue composables
│   ├── useAuth.ts
│   ├── useProducts.ts
│   ├── useCart.ts
│   └── useAdmin.ts
├── utils/           # Yardımcı fonksiyonlar
│   └── formatPrice.ts
├── App.vue          # Ana uygulama bileşeni
└── main.ts          # Uygulama giriş noktası
```

## 🛠️ Kurulum

### 1. Projeyi Klonlayın

```bash
git clone <repository-url>
cd INStreet
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. Firebase Yapılandırması

1. [Firebase Console](https://console.firebase.google.com/) üzerinden yeni bir proje oluşturun
2. Firebase projenizde aşağıdaki servisleri etkinleştirin:
   - Authentication (Email/Password)
   - Firestore Database
   - Storage

3. `.env.example` dosyasını `.env` olarak kopyalayın:

```bash
cp .env.example .env
```

4. `.env` dosyasını Firebase yapılandırma bilgilerinizle doldurun:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### 4. Firestore Güvenlik Kuralları

Firebase Console'da Firestore Security Rules'ı aşağıdaki gibi ayarlayın:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Kullanıcılar koleksiyonu
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    // Ürünler koleksiyonu
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null &&
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Siparişler koleksiyonu
    match /orders/{orderId} {
      allow read: if request.auth != null &&
                    (request.auth.uid == resource.data.userId ||
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow create: if request.auth != null;
    }

    // Banner koleksiyonu
    match /banners/{bannerId} {
      allow read: if true;
      allow write: if request.auth != null &&
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

### 5. Storage Güvenlik Kuralları

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /banners/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 🚀 Çalıştırma

### Development Server

```bash
npm run dev
```

Uygulama `http://localhost:5173` adresinde çalışacaktır.

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 👨‍💼 Admin Kullanıcı Oluşturma

1. Normal bir kullanıcı hesabı oluşturun
2. Firebase Console > Firestore Database'e gidin
3. `users` koleksiyonunda kullanıcınızı bulun
4. `role` alanını `"admin"` olarak değiştirin

## 📚 Kullanılan Teknolojiler

- **Vue 3** - Progressive JavaScript Framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next Generation Frontend Tooling
- **Pinia** - Vue State Management
- **Vue Router** - Official Router for Vue.js
- **Firebase** - Backend as a Service
  - Authentication
  - Firestore Database
  - Cloud Storage
- **ESLint** - Code Quality
- **Prettier** - Code Formatting

## 📝 Firestore Koleksiyonları

### Products Collection

```typescript
{
  name: string
  brand: string
  category: string
  gender: string
  price: number
  discount: number  // 0-1 arası (0.15 = %15 indirim)
  sizes: string[]
  stock: number
  description: string
  images: string[]
  createdAt: timestamp
}
```

### Users Collection

```typescript
{
  name: string
  email: string
  address: string
  phone: string
  role: 'user' | 'admin'
  createdAt: timestamp
}
```

### Orders Collection

```typescript
{
  userId: string
  userEmail: string
  userName: string
  items: Array<{
    productId: string
    name: string
    brand: string
    price: number
    discount: number
    size: string
    quantity: number
    image: string
  }>
  subtotal: number
  totalDiscount: number
  totalAmount: number
  shippingAddress: object
  paymentStatus: string
  orderStatus: string
  orderDate: timestamp
}
```

### Banners Collection

```typescript
{
  title: string
  imageUrl: string
  link: string
  isActive: boolean
  createdAt: timestamp
}
```

## 🎨 Özelleştirme

- Renk şeması: `src/assets/main.css`
- Ana renkler: Siyah (#000), Beyaz (#FFF), Turuncu (#ff7f00)

## 🐛 Bilinen Sorunlar ve Çözümler

1. **TypeScript Hataları**: Paketler yüklendikten sonra TypeScript hatalar kaybolacaktır
2. **Firebase Bağlantı Hatası**: `.env` dosyasını doğru yapılandırdığınızdan emin olun
3. **Admin Panel Erişimi**: Kullanıcı `role` alanının Firestore'da `"admin"` olarak ayarlandığından emin olun

## 📄 Lisans

Bu proje eğitim amaçlı geliştirilmiştir.

## 🤝 Katkıda Bulunma

Pull request'ler kabul edilmektedir. Büyük değişiklikler için lütfen önce bir issue açın.

## 📞 İletişim

Sorularınız için: info@instreet.com
