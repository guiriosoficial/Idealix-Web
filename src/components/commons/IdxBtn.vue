<script setup lang="ts">
import { VBtn } from 'vuetify/components'

interface IIdxBtnProps {
  color?: string
  type?: string
}

interface IIdxBtnEmits {
  (e: 'click'): void
}

const {
  color,
  type
} = defineProps<IIdxBtnProps>()

const emit = defineEmits<IIdxBtnEmits>()
</script>

<template>
  <VBtn
    :color="color"
    :type="type"
    @click="emit('click')"
  >
    <slot />
  </VBtn>
</template>
