<script setup lang="ts">
import { VDialog } from 'vuetify/components'

interface IIdxDialogProps {
  maxWidth?: string
}

const modelValue = defineModel<boolean>()

const { maxWidth } = defineProps<IIdxDialogProps>()
</script>

<template>
  <VDialog
    v-model="modelValue"
    :max-width="maxWidth"
  >
    <slot />
  </VDialog>
</template>
