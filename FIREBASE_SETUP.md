# Firebase Storage Güvenlik Kuralları - Kurulum Rehberi

Firebase Storage'ınızın süresi dolmuş. Bu rehber ile sorunu çözüp güvenli bir yapı kuracaksınız.

## 📋 Yapılacaklar Listesi

### ✅ Adım 1: Firebase Storage Kurallarını Güncelle

1. **Firebase Console'a git:** https://console.firebase.google.com
2. **INStreet projenizi seçin**
3. Sol menüden **"Build" > "Storage"** tıklayın
4. Üst menüden **"Rules"** sekmesine geçin
5. Aşağıdaki kuralları kopyalayıp yapıştırın:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Ürün görselleri - herkes okuyabilir, sadece admin yazabilir
    match /products/{imageId} {
      allow read: if true;
      allow write: if request.auth != null &&
                   request.auth.token.admin == true;
    }

    // Kullanıcı profil fotoğrafları
    match /profiles/{userId}/{imageId} {
      allow read: if true;
      allow write: if request.auth != null &&
                   request.auth.uid == userId;
    }
  }
}
```

6. **"Publish"** (Yayınla) butonuna tıklayın
7. ✅ **Bu adım tamamlandı mı?** Evet ise bir sonraki adıma geç

---

### ✅ Adım 2: Admin Custom Claim Ayarla

Firebase Storage kuralları, Firestore'daki `role` alanını okuyamaz. Bu yüzden admin kullanıcılara özel bir "admin claim" eklememiz gerekiyor.

#### Seçenek A: Firebase Admin SDK ile (Önerilen - Basit)

1. **Terminal'i aç** (VSCode'da `Ctrl + ö` veya `Ctrl + ~`)

2. **Firebase Admin SDK'yı yükle:**

   ```bash
   npm install firebase-admin
   ```

3. **Service Account Key oluştur:**
   - Firebase Console > ⚙️ **Project Settings**
   - **"Service Accounts"** sekmesi
   - **"Generate New Private Key"** butonuna tıkla
   - İndirilen JSON dosyasını projenizin kök dizinine **`serviceAccountKey.json`** olarak kaydet

4. **Admin setup script'ini düzenle:**
   - `admin-setup.js` dosyasını aç
   - `ADMIN_EMAIL` değişkenini kendi admin email adresinle değiştir:

   ```javascript
   const ADMIN_EMAIL = 'senin@email.com' // BURAYA KENDİ EMAIL'İNİ YAZ
   ```

5. **Script'i çalıştır:**

   ```bash
   node admin-setup.js
   ```

6. **Başarılı mesajını gördüysen:**
   - ✅ Admin claim'i başarıyla eklendi!
   - ⚠️ **ÖNEMLİ:** Değişikliklerin geçerli olması için **çıkış yapıp tekrar giriş** yapmalısın!

7. **`serviceAccountKey.json` dosyasını .gitignore'a ekle:**
   ```bash
   echo "serviceAccountKey.json" >> .gitignore
   ```

#### Seçenek B: Firebase Console'dan Manuel (Sadece Test İçin)

Eğer Admin SDK kullanmak istemiyorsanız, geçici olarak Storage kurallarını şu şekilde değiştirebilirsiniz:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{imageId} {
      allow read: if true;
      allow write: if request.auth != null;  // Herkes yazabilir (GEÇİCİ)
    }

    match /profiles/{userId}/{imageId} {
      allow read: if true;
      allow write: if request.auth != null &&
                   request.auth.uid == userId;
    }
  }
}
```

⚠️ **Uyarı:** Bu güvenli değil! Sadece test için kullanın.

---

### ✅ Adım 3: Test Et

1. **Uygulamayı çalıştır:**

   ```bash
   npm run dev
   ```

2. **Admin kullanıcı ile giriş yap**

3. **Admin paneline git ve yeni ürün eklemeyi dene**

4. **Hata almazsan:** ✅ Her şey çalışıyor!

5. **Hata alırsan:**
   - Firebase Console > Storage > Rules'u kontrol et
   - Admin claim'in eklendiğini doğrula (admin-setup.js'i tekrar çalıştır)
   - Çıkış yapıp tekrar giriş yap
   - Browser console'da hata mesajlarına bak

---

## 🔧 Sorun Giderme

### "Permission denied" hatası alıyorum

**Çözüm 1:** Çıkış yapıp tekrar giriş yap (Token'ı yenilemek için)

**Çözüm 2:** Admin claim'in eklendiğini kontrol et:

```bash
node admin-setup.js
```

**Çözüm 3:** Firebase Console > Storage > Rules'u kontrol et ve yukarıdaki kuralları tekrar yapıştır

### Admin setup script'i çalışmıyor

**Hata:** "Cannot find module './serviceAccountKey.json'"

- Firebase Console'dan Service Account Key'i indirmeyi unuttunuz
- Dosyayı projenin kök dizinine `serviceAccountKey.json` olarak kaydetmelisiniz

**Hata:** "User not found"

- `ADMIN_EMAIL` adresini doğru yazdığınızdan emin olun
- Bu email ile kayıtlı bir kullanıcının olduğundan emin olun

### Profil fotoğrafı yüklenmiyor

Bu normaldir çünkü henüz profil fotoğrafı yükleme sisteminiz yok. İsterseniz ekleyebilirim!

---

## 📚 Ek Bilgiler

### Firebase Storage Kural Yapısı

```
/products/{imageId}         → Ürün görselleri
/profiles/{userId}/{imageId} → Kullanıcı profil fotoğrafları
```

### Admin Claim Nedir?

Firebase Auth'un özel bir özelliği. Kullanıcı token'ına özel veriler ekler. Storage ve Firestore kurallarında kullanılabilir.

### Güvenlik

- ✅ Herkes ürün resimlerini görebilir (public read)
- ✅ Sadece admin ürün resmi ekleyebilir/silebilir
- ✅ Kullanıcılar sadece kendi profil fotoğraflarını yönetebilir
- ✅ Auth olmayan kullanıcılar hiçbir şey yükleyemez

---

## 🚀 Sonraki Adımlar

Kurulum tamamlandıktan sonra:

- [ ] Production'a deploy etmeden önce kuralları test et
- [ ] Profil fotoğrafı yükleme özelliği ekle (isterseniz yardımcı olabilirim)
- [ ] `serviceAccountKey.json` dosyasının .gitignore'da olduğundan emin ol
- [ ] Yeni admin kullanıcı eklemek için `admin-setup.js`'i kullan

---

## ❓ Sorular?

Herhangi bir sorun yaşarsanız:

1. Firebase Console > Storage > Rules'u kontrol edin
2. Browser console'da hataları kontrol edin
3. Admin claim'in eklendiğinden emin olun
4. Çıkış yapıp tekrar giriş yapın

**İyi çalışmalar! 🎉**
