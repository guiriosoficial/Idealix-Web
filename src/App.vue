<template>
  <v-app>
    <transition name="fade">
      <router-view />
    </transition>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
transition: opacity .3s;
}
.fade-enter-active {
display: none;
}
.fade-enter, .fade-leave-to {
opacity: 0;
}
</style>
