// Admin Custom Claim Ayarlama Script'i
// Bu script'i çalıştırmak için Firebase Admin SDK gereklidir

// Kullanım:
// 1. npm install firebase-admin
// 2. Firebase Console > Project Settings > Service Accounts > "Generate new private key"
// 3. İndirilen JSON dosyasını projeye "serviceAccountKey.json" olarak kaydet
// 4. Aşağıdaki ADMIN_EMAIL'i kendi admin email'inle değiştir
// 5. node admin-setup.js

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Admin yapmak istediğiniz kullanıcının email'i
const ADMIN_EMAIL = 'admin@gmail.com'; // BURAYA KENDİ EMAIL'İNİZİ YAZIN

async function setAdminClaim() {
  try {
    // Email ile kullanıcıyı bul
    const user = await admin.auth().getUserByEmail(ADMIN_EMAIL);
    
    // Admin custom claim'i ekle
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    
    console.log('✅ Başarılı! Admin yetkisi verildi:', ADMIN_EMAIL);
    console.log('Kullanıcı UID:', user.uid);
    console.log('\n⚠️ Değişikliklerin geçerli olması için kullanıcının yeniden giriş yapması gerekiyor!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
}

setAdminClaim();
