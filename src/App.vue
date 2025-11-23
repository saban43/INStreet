<!-- Ana Uygulama Bileşeni - Layout ve router-view -->
<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useUserStore } from '@/store/user'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

const userStore = useUserStore()

// Uygulama başladığında kullanıcı durumunu başlat
onMounted(() => {
  userStore.initializeAuth()
})
</script>

<template>
  <div id="app">
    <Navbar />
    <main class="main-content">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style>
/* Global stiller */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Helvetica Neue', sans-serif;
  background: #f8f8f8;
  color: #333;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  width: 100%;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font-family: inherit;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
