<!-- SearchBox - Molekül Bileşeni: Arama kutusu (input + buton) -->
<template>
  <div class="search-box">
    <BaseInput
      v-model="searchQuery"
      type="search"
      :placeholder="placeholder"
      @input="onInput"
      @keyup.enter="onSearch"
    />
    <BaseButton variant="primary" size="md" @click="onSearch">
      <SearchIcon :size="20" />
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from '@/components/atoms/BaseInput.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'
import SearchIcon from '@/components/atoms/icons/SearchIcon.vue'

withDefaults(
  defineProps<{
    placeholder?: string
  }>(),
  {
    placeholder: 'Ürün, marka veya kategori ara...',
  },
)

const emit = defineEmits<{
  search: [query: string]
}>()

const searchQuery = ref('')

const onInput = () => {
  emit('search', searchQuery.value)
}

const onSearch = () => {
  emit('search', searchQuery.value)
}
</script>

<style scoped>
.search-box {
  display: flex;
  gap: 1rem;
  width: 100%;
}
</style>
