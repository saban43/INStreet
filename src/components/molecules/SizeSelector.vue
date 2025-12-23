<!-- SizeSelector - Molekül Bileşeni: Beden seçici -->
<template>
  <div class="size-selector">
    <h3 v-if="showLabel">{{ label }}</h3>
    <div class="size-options">
      <BaseButton
        v-for="size in sizes"
        :key="size"
        :variant="modelValue === size ? 'primary' : 'outline'"
        size="md"
        @click="selectSize(size)"
      >
        {{ size }}
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/atoms/BaseButton.vue'

withDefaults(
  defineProps<{
    sizes: string[]
    modelValue?: string
    label?: string
    showLabel?: boolean
  }>(),
  {
    label: 'Beden Seçin:',
    showLabel: true,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const selectSize = (size: string) => {
  emit('update:modelValue', size)
}
</script>

<style scoped>
.size-selector h3 {
  margin: 0 0 1rem;
  font-size: 1rem;
  font-weight: 600;
}

.size-options {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}
</style>
