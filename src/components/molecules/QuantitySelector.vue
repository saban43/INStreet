<!-- QuantitySelector - Molekül Bileşeni: Miktar seçici (+ - butonlar) -->
<template>
  <div class="quantity-selector">
    <BaseButton variant="secondary" size="sm" @click="decrease" :disabled="modelValue <= min">
      -
    </BaseButton>
    <span class="quantity-value">{{ modelValue }}</span>
    <BaseButton
      variant="secondary"
      size="sm"
      @click="increase"
      :disabled="max !== undefined && modelValue >= max"
    >
      +
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/atoms/BaseButton.vue'

const props = withDefaults(
  defineProps<{
    modelValue: number
    min?: number
    max?: number
  }>(),
  {
    min: 1,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const decrease = () => {
  if (props.modelValue > props.min) {
    emit('update:modelValue', props.modelValue - 1)
  }
}

const increase = () => {
  if (props.max === undefined || props.modelValue < props.max) {
    emit('update:modelValue', props.modelValue + 1)
  }
}
</script>

<style scoped>
.quantity-selector {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.quantity-value {
  min-width: 2rem;
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
}
</style>
