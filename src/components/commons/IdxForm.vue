<script setup lang="ts">
import { VForm } from 'vuetify/components'
import type { SubmitEventPromise } from 'vuetify/lib/composables/form'

interface IIdxFormProps {

}

interface IIdxFormEmits {
  (e: 'submit', event: SubmitEventPromise): void
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
