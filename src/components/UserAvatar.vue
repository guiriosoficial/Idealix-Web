<template>
  <v-avatar
    :class="size"
    class="useravatar-component">
    <img
      v-if="picture"
      :src="picture"
      alt="People">
    <span v-else-if="nameInitials">{{ nameInitials.toUpperCase() }}</span>
    <v-icon v-else-if="icon" :icon="icon" />
    <span v-else>-</span>
  </v-avatar>
</template>

<script>
export default {
  name: 'UserAvatar',
  props: {
    name: {
      type: String,
      default: ''
    },
    picture: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    }
  },
  computed: {
    nameInitials () {
      if (this.name && this.name.trim()) {
        let split = this.name.split(' ').filter(Boolean)
        if (split.length > 1) {
          return split[0].substring(0, 1) + split[split.length - 1].substring(0, 1)
        } else if (split.length === 1) {
          return split[0].substring(0, 2)
        }
      }
      return ''
    }
  }
}
</script>

<style lang="scss">
@import '../styles/variables.scss';

.useravatar-component {
  margin-right: 8px;
  margin-left: 0;
}
</style>
