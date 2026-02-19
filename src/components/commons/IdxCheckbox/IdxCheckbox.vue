<script setup lang="ts">
import { VCheckbox } from 'vuetify/components'

interface IIdxCheckboxProps {
  label?: string
}

const modelValue = defineModel<boolean>()

const {
  label
} = defineProps<IIdxCheckboxProps>()
</script>

<template>
  <VCheckbox
    v-model="modelValue"
    :label="label"
    color="primary"
    hide-details
  >
    <template
      v-if="$slots.label"
      #label
    >
      <slot name="label" />
    </template>
  </VCheckbox>
</template>
>