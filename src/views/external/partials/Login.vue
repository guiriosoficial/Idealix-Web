<template>
  <IdxForm
    class="login-view"
    novalidate
    @submit.prevent="doLogin"
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
        v-model="loginForm.rememberme"
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
      <router-link to="/register">Cadastre-se agora mesmo</router-link>
    </span>
  </IdxForm>
</template>

<script setup lang="ts">
import { useAccountStore } from '@/store/account'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import { useToast } from 'vue-toast-notification'
import IdxBtn from '@/components/commons/IdxBtn.vue'
import IdxTextField from '@/components/commons/IdxTextField.vue'
import IdxCheckbox from '@/components/commons/IdxCheckbox.vue'
import IdxForm from '@/components/commons/IdxForm.vue'

const accounteStore = useAccountStore()
const router = useRouter()
const toast = useToast()

const initialFormState = () => ({
  email: '',
  password: '',
  rememberme: false
})

const loginForm = reactive(initialFormState())

async function doLogin () {
  try {
    await accounteStore.setLoggedPerson(loginForm)
    await router.push('dashboard')
  } catch {
    toast.error('Ops! Houve uma falha ao fazer login')
  }
}
</script>
