<script setup lang="ts">
import { VCard } from 'vuetify/components'

interface IIdxCardProps {
  title?: string
  text?: string
}

const {
  title,
  text,
} = defineProps<IIdxCardProps>()
</script>

<template>
  <VCard
    :title="title"
    :text="text"
  >
    <slot />
    <VCardActions v-if="$slots.actions">
      <slot name="actions" />
    </VCardActions>
  </VCard>
</template>
