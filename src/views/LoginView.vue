<!-- LoginView - Giriş sayfası -->
<template>
  <div class="login-view">
    <div class="login-container">
      <h1>Giriş Yap</h1>

      <form @submit.prevent="handleLogin" class="login-form">
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
          <label>Şifre</label>
          <input
            v-model="password"
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
          {{ isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap' }}
        </button>
      </form>

      <p class="register-link">
        Hesabınız yok mu?
        <router-link to="/register">Kayıt Ol</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'

const { login, isLoading, error } = useAuth()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  await login(email.value, password.value)
}
</script>

<style scoped>
.login-view {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.login-container {
  width: 100%;
  max-width: 450px;
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.login-container h1 {
  margin: 0 0 2rem;
  font-size: 2rem;
  text-align: center;
}

.login-form {
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

.register-link {
  margin-top: 1.5rem;
  text-align: center;
  color: #666;
}

.register-link a {
  color: #ff7f00;
  text-decoration: none;
  font-weight: 600;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
