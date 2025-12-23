<!-- PriceDisplay - Molekül Bileşeni: Fiyat gösterimi (indirimli/normal) -->
<template>
  <div class="price-display">
    <span v-if="(discount || 0) > 0" class="original-price">
      {{ formatPrice(price) }}
    </span>
    <span class="final-price">
      {{ formatPrice(finalPrice) }}
    </span>
    <BaseBadge v-if="(discount || 0) > 0" variant="primary" class="discount-badge">
      {{ discountPercentage }}% İndirim
    </BaseBadge>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseBadge from '@/components/atoms/BaseBadge.vue'
import { formatPrice } from '@/utils/formatPrice'

const props = defineProps<{
  price: number
  discount?: number
}>()

const finalPrice = computed(() => {
  return props.price - props.price * (props.discount || 0)
})

const discountPercentage = computed(() => {
  return Math.round((props.discount || 0) * 100)
})
</script>

<style scoped>
.price-display {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.original-price {
  text-decoration: line-through;
  color: #999;
  font-size: 0.95rem;
}

.final-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #ff7f00;
}

.discount-badge {
  font-size: 0.75rem;
}
</style>
