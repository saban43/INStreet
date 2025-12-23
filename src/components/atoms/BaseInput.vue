<!-- BaseInput - Atom Bileşeni: Temel input alanı -->
<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    :disabled="disabled"
    :class="['base-input', { 'input-error': error }]"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>

<script setup lang="ts">
defineProps<{
  type?: 'text' | 'email' | 'password' | 'number' | 'search'
  placeholder?: string
  modelValue?: string | number
  disabled?: boolean
  error?: boolean
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<style scoped>
.base-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.3s;
  outline: none;
}

.base-input:focus {
  border-color: #ff7f00;
}

.base-input:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

.input-error {
  border-color: #dc3545;
}

.base-input::placeholder {
  color: #999;
}
</style>
