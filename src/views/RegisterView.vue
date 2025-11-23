<!-- RegisterView - Kayıt sayfası -->
<template>
  <div class="register-view">
    <div class="register-container">
      <h1>Kayıt Ol</h1>

      <form @submit.prevent="handleRegister" class="register-form">
        <div class="form-group">
          <label>Ad Soyad</label>
          <input v-model="name" type="text" required placeholder="Ad Soyad" class="form-input" />
        </div>

        <div class="form-group">
          <label>E-posta</label>
          <input
            v-model="email"
            type="email"
            required
            placeholder="ornek@email.com"
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label>Şifre (en az 6 karakter)</label>
          <input
            v-model="password"
            type="password"
            required
            minlength="6"
            placeholder="******"
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label>Şifre Tekrar</label>
          <input
            v-model="passwordConfirm"
            type="password"
            required
            placeholder="******"
            class="form-input"
          />
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <button type="submit" :disabled="isLoading" class="submit-btn">
          {{ isLoading ? 'Kayıt Yapılıyor...' : 'Kayıt Ol' }}
        </button>
      </form>

      <p class="login-link">
        Zaten hesabınız var mı?
        <router-link to="/login">Giriş Yap</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'

const { register, isLoading, error } = useAuth()

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')

const handleRegister = async () => {
  if (password.value !== passwordConfirm.value) {
    error.value = 'Şifreler eşleşmiyor'
    return
  }

  await register(email.value, password.value, name.value)
}
</script>

<style scoped>
.register-view {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.register-container {
  width: 100%;
  max-width: 450px;
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.register-container h1 {
  margin: 0 0 2rem;
  font-size: 2rem;
  text-align: center;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #333;
}

.form-input {
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.form-input:focus {
  outline: none;
  border-color: #ff7f00;
}

.error-message {
  padding: 0.75rem;
  background: #ffebee;
  color: #f44336;
  border-radius: 8px;
  text-align: center;
}

.submit-btn {
  padding: 1rem;
  background: #ff7f00;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover:not(:disabled) {
  background: #e67300;
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.login-link {
  margin-top: 1.5rem;
  text-align: center;
  color: #666;
}

.login-link a {
  color: #ff7f00;
  text-decoration: none;
  font-weight: 600;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
