<!-- SearchIcon - Atom Bileşeni: Arama ikonu -->
<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    :stroke="color"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: number
    color?: string
  }>(),
  {
    size: 20,
    color: 'currentColor',
  },
)
</script>
