<script setup lang="ts">
import { VForm } from 'vuetify/components'

interface IIdxFormProps {

}

interface IIdxFormEmits {
  (e: 'submit', event: SubmitEvent): void
}

const {

} = defineProps<IIdxFormProps>()

const emit = defineEmits<IIdxFormEmits>()
</script>

<template>
  <VForm
    v-bind="$attrs"
    @submit="emit('submit', $event)"
  >
    <slot />
  </VForm>
</template>
