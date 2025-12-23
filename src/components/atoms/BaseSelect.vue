<!-- BaseSelect - Atom Bileşeni: Dropdown select -->
<template>
  <select
    :value="modelValue"
    :disabled="disabled"
    class="base-select"
    @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
  >
    <slot />
  </select>
</template>

<script setup lang="ts">
defineProps<{
  modelValue?: string | number
  disabled?: boolean
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<style scoped>
.base-select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  background: white;
  transition: border-color 0.3s;
  outline: none;
}

.base-select:focus {
  border-color: #ff7f00;
}

.base-select:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}
</style>
