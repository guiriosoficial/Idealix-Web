<template>
  <header class="profileheader-component">
    <v-menu location="bottom end">
      <template v-slot:activator="{ props }">
        <div v-bind="props" class="profileheader-component__dropdown-button">
          <UserAvatar
            :name="mainNames"
            class="profileheader-component__avatar-icon" />
          <span class="profileheader-component__dropdown-button--text">{{ mainNames }}</span>
          <v-icon class="profileheader-component__dropdown-button--text" icon="mdi-menu-down" />
        </div>
      </template>

      <v-list>
        <v-list-item
          class="profileheader-component__dropdown-item"
          append-icon="mdi-exit-run"
          title="Sair"
          @click="doLogout"
        />
      </v-list>
    </v-menu>
  </header>
</template>

<script setup lang="ts">
import { useAccountStore } from '@/store/account'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

interface IProfileHeaderProps {
  responsibleData: Object
}

const router = useRouter()
const accountStore = useAccountStore()

const { responsibleData } = defineProps<IProfileHeaderProps>()

const mainNames = computed(() => {
  const fullName = responsibleData.name.split(' ')
  return `${fullName[0]} ${fullName[fullName.length - 1]}`
})

function doLogout () {
  accountStore.clearLoggedPerson()
  router.push('/login')
}
</script>

<style lang="scss">
.profileheader-component {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 24px;
  margin: 30px 20px;

  .profileheader-component__dropdown-button {
    width: auto;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    padding: 10px 0px 10px 8px;
    &--text { font-size: 1.2em; }
  }
}

.profileheader-component__dropdown-item {
  &--icon { margin-right: 8px !important; }
}

@media (max-width: 1080px) {
  .profileheader-component {
    height: 20px;
    margin: 20px 20px;

    .profileheader-component__dropdown-button {
      padding: 8px 0 8px 8px;
      &--text { font-size: 1em; }
    }

    .profileheader-component__avatar-icon {
      width: 24px;
      max-width: 24px;
      height: 24px;
      max-height: 24px;
    }
  }
}
</style>
