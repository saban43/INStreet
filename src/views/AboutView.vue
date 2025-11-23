<!-- AboutView - Hakkımızda sayfası -->
<template>
  <div class="about-view">
    <div class="about-container">
      <h1>Hakkımızda</h1>
      <section class="about-section">
        <h2>IN<span>Street</span> - Spor Ayakkabı Mağazası</h2>
        <p>
          INStreet, en yeni ve trend spor ayakkabı modellerini sizlerle buluşturan online bir
          platformdur.
        </p>
      </section>
      <section class="about-section">
        <h2>Neden INStreet?</h2>
        <ul>
          <li>✓ Orijinal ürün garantisi</li>
          <li>✓ Hızlı ve güvenli kargo</li>
          <li>✓ Kolay iade ve değişim</li>
          <li>✓ 7/24 müşteri desteği</li>
        </ul>
      </section>
      <section class="about-section">
        <h2>İletişim</h2>
        <p><strong>E-posta:</strong> info@instreet.com</p>
        <p><strong>Telefon:</strong> +90 555 123 45 67</p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.about-view {
  min-height: 70vh;
  padding: 2rem;
}
.about-container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.about-container h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
}
.about-section {
  margin-bottom: 2.5rem;
}
.about-section h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}
.about-section h2 span {
  color: #ff7f00;
}
.about-section p {
  line-height: 1.8;
  color: #666;
  font-size: 1.1rem;
}
.about-section ul {
  list-style: none;
  padding: 0;
}
.about-section li {
  padding: 0.75rem 0;
  font-size: 1.1rem;
  color: #666;
}
</style>
