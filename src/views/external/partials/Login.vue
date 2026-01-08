<template>
  <v-form
    class="login-view"
    novalidate
    @submit.prevent="doLogin"
  >
    <h1 class="external-view__title">Login</h1>

    <v-text-field
      v-model="loginForm.email"
      label="E-mail"
      type="email"
      autocomplete="email"
    />

    <v-text-field
      v-model="loginForm.password"
      label="Password"
      type="password"
      autocomplete="password"
    />

    <div class="external-view__submit">
      <v-checkbox
        v-model="loginForm.rememberme"
        label="Lembre-se de mim"
      />
      <v-btn
        color="primary"
        type="submit"
      >
        Entrar
      </v-btn>
    </div>

    <span class="external-view__switch-link">
      Não possui uma conta?
      <router-link to="/register">Cadastre-se agora mesmo</router-link>
    </span>
  </v-form>
</template>

<script setup lang="ts">
import { useAccountStore } from '@/store/account'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import { useToast } from 'vue-toast-notification'

const accounteStore = useAccountStore()
const router = useRouter()
const toast = useToast()

const loginForm = reactive({
  email: '',
  password: '',
  rememberme: false
})

function doLogin () {
  accounteStore.setLoggedPerson(loginForm)
    .then(() => {
      router.push('dashboard')
    })
    .catch(() => {
      toast.error('Ops! Houve uma falha ao fazer login')
    })
}
</script>
