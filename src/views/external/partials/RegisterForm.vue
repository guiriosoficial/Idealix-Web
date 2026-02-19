<template>
  <IdxForm
    class="register-view external-view__content"
    novalidate
    @submit.prevent="handleCreateAccount"
  >
    <h1 class="external-view__title">Cadastre-se</h1>

    <IdxTextField
      v-model="registerForm.name"
      id="name"
      name="name"
      label="Nome"
      autocomplete="name"
    />

    <IdxTextField
      v-model="registerForm.email"
      id="email"
      label="E-mail"
      name="email"
      type="email"
      autocomplete="email"
    />

    <IdxTextField
      v-model="registerForm.password"
      id="password"
      label="Senha"
      name="password"
      type="password"
    />

    <div class="external-view__submit">
      <IdxCheckbox v-model="registerForm.accepted">
        <template #label>
          Li e aceito os
          <a @click.stop="userTermsDialogVisible = true">
            Termos de Uso
          </a>
        </template>
      </IdxCheckbox>
      <IdxBtn
        color="primary"
        type="submit"
      >
        Cadastrar
      </IdxBtn>
    </div>

    <span class="external-view__switch-link">
      Ja possui uma conta?
      <a @click="goToLogin">
        Clique aqui para acessar
      </a>
    </span>
  </IdxForm>

  <UserTermsDialog v-model="userTermsDialogVisible" />
</template>

<script setup lang="ts">
import { useAccountStore } from '@/store/account'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import {IdxBtn} from "@/components/commons/IdxBtn"
import {IdxTextField} from "@/components/commons/IdxTextField"
import {IdxForm} from "@/components/commons/IdxForm"
import {IdxCheckbox} from "@/components/commons/IdxCheckbox"
import UserTermsDialog from "@/views/external/partials/UserTermsDialog.vue"

const accountStore = useAccountStore()
const router = useRouter()
const toast = useToast()

// TODO: Move to a Type File
class RegisterForm {
  name = ''
  email = ''
  password = ''
  accepted = false
}

const userTermsDialogVisible = ref(false)
const registerForm = reactive(createRegisterForm())

async function handleCreateAccount () {
  try {
    await accountStore.createAccount(registerForm)
    resetRegisterForm()
    goToLogin()
    toast.success('Sua conta foi criada')
  } catch {
    toast.error('Ops! Houve um erro ao criar sua conta')
  }
}

function resetRegisterForm () {
  Object.assign(registerForm, createRegisterForm())
}

function createRegisterForm () {
  return new RegisterForm()
}

function goToLogin () {
  router.push({ name: 'login' })
}
</script>

<style lang="scss">
.external-view__dialog_body {
  overflow: auto;
  max-width: 400px;
  max-height: 400px;
  text-align: justify;
  margin: 24px;

  .external-view__body-text {
    margin: 0;
    padding-right: 16px;
    word-break: break-word;
  }
}
</style>
