<template>
  <VList v-bind="$attrs">
    <slot />
  </VList>
</template>

<script setup lang="ts">
import { VList } from 'vuetify/components'
</script>
