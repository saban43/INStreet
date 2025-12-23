<!-- BaseButton - Atom Bileşeni: Temel buton -->
<template>
  <button
    :class="['btn', `btn-${variant}`, `btn-${size}`, { 'btn-disabled': disabled }]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}>()

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<style scoped>
.btn {
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-family: inherit;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-primary {
  background: #ff7f00;
  color: white;
}

.btn-primary:hover {
  background: #e67300;
}

.btn-secondary {
  background: #f0f0f0;
  color: #333;
}

.btn-secondary:hover {
  background: #e0e0e0;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-danger:hover {
  background: #c82333;
}

.btn-outline {
  background: transparent;
  color: #ff7f00;
  border: 2px solid #ff7f00;
}

.btn-outline:hover {
  background: #ff7f00;
  color: white;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.btn-md {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-disabled:hover {
  background: inherit;
}
</style>
