<!-- Footer Bileşeni - Alt sayfa bilgileri ve linkler -->
<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Hakkımızda -->
      <div class="footer-section">
        <h3>IN<span>Street</span></h3>
        <p>En yeni spor ayakkabı modellerini keşfedin. Kalite ve stil bir arada.</p>
      </div>

      <!-- Hızlı Linkler -->
      <div class="footer-section">
        <h4>Hızlı Linkler</h4>
        <ul>
          <li><router-link to="/">Ana Sayfa</router-link></li>
          <li><router-link to="/cart">Sepet</router-link></li>
          <li><router-link to="/profile">Profilim</router-link></li>
        </ul>
      </div>

      <!-- İletişim -->
      <div class="footer-section">
        <h4>İletişim</h4>
        <ul>
          <li>Email: info@instreet.com</li>
          <li>Tel: +90 555 123 45 67</li>
          <li>Adres: İstanbul, Türkiye</li>
        </ul>
      </div>

      <!-- Sosyal Medya -->
      <div class="footer-section">
        <h4>Bizi Takip Edin</h4>
        <div class="social-links">
          <a href="#" class="social-link">Instagram</a>
          <a href="#" class="social-link">Facebook</a>
          <a href="#" class="social-link">Twitter</a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2024 INStreet. Tüm hakları saklıdır.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #1a1a1a;
  color: #fff;
  padding: 3rem 2rem 1rem;
  margin-top: 4rem;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.footer-section h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.footer-section h3 span {
  color: #ff7f00;
}

.footer-section h4 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #ff7f00;
}

.footer-section p {
  color: #aaa;
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section li {
  margin-bottom: 0.5rem;
  color: #aaa;
}

.footer-section a {
  color: #aaa;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section a:hover {
  color: #ff7f00;
}

.social-links {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}

.social-link {
  color: #aaa;
  text-decoration: none;
  transition: color 0.3s;
}

.social-link:hover {
  color: #ff7f00;
}

.footer-bottom {
  max-width: 1200px;
  margin: 2rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid #333;
  text-align: center;
  color: #666;
}
</style>
