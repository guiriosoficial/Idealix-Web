<script setup lang="ts">
import { VTextField } from 'vuetify/components'

interface IIdxTextFieldProps {
  id?: string
  label?: string
  type?: string
  suffix?: string
  prefix?: string
  appendIcon?: string
  autocomplete?: string
}

const modelValue = defineModel<string | Date>()

const {
  id,
  label,
  autocomplete,
  suffix,
  prefix,
  appendIcon,
  type = 'text',
} = defineProps<IIdxTextFieldProps>()
</script>

<template>
  <VTextField
    v-model="modelValue"
    :id="id"
    :label="label"
    :type="type"
    :suffix="suffix"
    :prefix="prefix"
    :append-icon="appendIcon"
    :autocomplete="autocomplete"
  />
</template>
