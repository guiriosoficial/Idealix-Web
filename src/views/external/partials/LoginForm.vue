<template>
  <IdxForm
    class="login-view external-view__content"
    novalidate
    @submit.prevent="handleLogin"
  >
    <h1 class="external-view__title">Login</h1>

    <IdxTextField
      v-model="loginForm.email"
      label="E-mail"
      type="email"
      autocomplete="email"
    />

    <IdxTextField
      v-model="loginForm.password"
      label="Password"
      type="password"
      autocomplete="password"
    />

    <div class="external-view__submit">
      <IdxCheckbox
        v-model="loginForm.rememberMe"
        label="Lembre-se de mim"
      />
      <IdxBtn
        color="primary"
        type="submit"
      >
        Entrar
      </IdxBtn>
    </div>

    <span class="external-view__switch-link">
      Não possui uma conta?
      <a @click="goToRegister">
        Cadastre-se agora mesmo
      </a>
    </span>
  </IdxForm>
</template>

<script setup lang="ts">
import { useAccountStore } from '@/store/account'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import { useToast } from 'vue-toast-notification'
import {IdxBtn} from '@/components/commons/IdxBtn'
import {IdxTextField} from '@/components/commons/IdxTextField'
import {IdxCheckbox} from '@/components/commons/IdxCheckbox'
import {IdxForm} from '@/components/commons/IdxForm'

const accountStore = useAccountStore()
const router = useRouter()
const toast = useToast()

// TODO: Move to Type File
class LoginForm {
  email = ''
  password = ''
  rememberMe = false
}

const loginForm = reactive(createLoginForm())

async function handleLogin () {
  try {
    await accountStore.setLoggedPerson(loginForm)
    resetLoginForm()
    goToDashboard()
  } catch {
    toast.error('Ops! Houve uma falha ao fazer login')
  }
}

function resetLoginForm () {
  Object.assign(loginForm, createLoginForm())
}

function createLoginForm () {
  return new LoginForm()
}

function goToRegister () {
  router.push({ name: 'register' })
}

function goToDashboard() {
  router.push({ name: 'dashboard' })
}
</script>
