<!-- BaseBadge - Atom Bileşeni: Etiket/Badge -->
<template>
  <span :class="['badge', `badge-${variant}`]">
    <slot />
  </span>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'success' | 'danger' | 'warning' | 'info'
}>()
</script>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
}

.badge-primary {
  background: #ff7f00;
  color: white;
}

.badge-success {
  background: #28a745;
  color: white;
}

.badge-danger {
  background: #dc3545;
  color: white;
}

.badge-warning {
  background: #ffc107;
  color: #333;
}

.badge-info {
  background: #17a2b8;
  color: white;
}
</style>
