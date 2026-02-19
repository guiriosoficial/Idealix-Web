<template>
  <v-avatar
    :class="size"
    class="useravatar-component"
  >
    <img
      v-if="picture"
      :src="picture"
      alt="People"
    >
    <span v-else-if="nameInitials">
      {{ nameInitials.toUpperCase() }}
    </span>
    <v-icon
      v-else-if="icon"
      :icon="icon"
    />
    <span v-else>-</span>
  </v-avatar>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface IUserAvatarProps {
  name?: string,
  picture?: string,
  icon?: string,
  size?: string
}

const {
  name = '',
  picture = '',
  icon = '',
  size = ''
} = defineProps<IUserAvatarProps>()

const nameInitials = computed(() => {
  if (!name?.trim()) return ''

  let split = name.split(' ').filter(Boolean)

  if (split.length > 1) {
    return split[0].substring(0, 1) + split[split.length - 1].substring(0, 1)
  } else if (split.length === 1) {
    return split[0].substring(0, 2)
  }
})
</script>

<style lang="scss">
.useravatar-component {
  margin-right: 8px;
  margin-left: 0;
}
</style>
