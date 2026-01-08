<template>
  <article>
    <IdxForm
      class="register-view"
      novalidate
      @submit.prevent="handleCreateAccount">
      <h1 class="external-view__title">Cadastre-se</h1>

        <IdxTextField
          v-model="registerForm.name"
          id="name"
          name="name"
          label="Nome"
          autocomplete="name" />

        <IdxTextField
          v-model="registerForm.email"
          id="email"
          label="E-mail"
          name="email"
          type="email"
          autocomplete="email" />

        <IdxTextField
          v-model="registerForm.password"
          id="password"
          label="Senha"
          name="password"
          type="password" />

      <div class="external-view__submit">
        <IdxCheckbox
          v-model="registerForm.accepted"
        >
          <template v-slot:label>
            Li e aceito os <a @click="userTermsDialogVisible = true">Termos de Uso</a>
          </template>
        </IdxCheckbox>
        <IdxBtn
          class="md-raised md-primary"
          type="submit">
          Cadastrar
        </IdxBtn>
      </div>

      <span class="external-view__switch-link">
        Ja possui uma conta?
        <router-link to="/login">
          Clique aqui para acessar
        </router-link>
      </span>
    </IdxForm>

    <IdxDialog v-model="userTermsDialogVisible">
      <IdxCard title="Termos de uso" text="Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Casamentiss faiz malandris se pirulitá. Aenean aliquam molestie leo, vitae iaculis nisl. Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget.
          Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis. Manduma pindureta quium dia nois paga. Suco de cevadiss deixa as pessoas mais interessantis. Quem manda na minha terra sou euzis!
          Mé faiz elementum girarzis, nisi eros vermeio. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Quem num gosta di mé, boa gentis num é.
          Per aumento de cachacis, eu reclamis. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.">
        <template #actions>
          <v-spacer />

          <IdxBtn
            class="md-primary"
            @click="userTermsDialogVisible = false">
            Ok
          </IdxBtn>
        </template>
      </IdxCard>
    </IdxDialog>
  </article>
</template>

<script setup lang="ts">
import { useAccountStore } from '@/store/account'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import IdxBtn from "@/components/commons/IdxBtn.vue";
import IdxTextField from "@/components/commons/IdxTextField.vue";
import IdxForm from "@/components/commons/IdxForm.vue";
import IdxCheckbox from "@/components/commons/IdxCheckbox.vue";
import IdxCard from "@/components/commons/IdxCard.vue";
import IdxDialog from "@/components/commons/IdxDialog.vue";

const accountStore = useAccountStore()
const router = useRouter()
const toast = useToast()

const initialFormState = () => ({
  name: '',
  email: '',
  password: '',
  accepted: false
})

const userTermsDialogVisible = ref(false)
const registerForm = reactive(initialFormState())

async function handleCreateAccount () {
  try {
    await accountStore.createAccount(registerForm)
    resetForm()
    await router.push('/login')
    toast.success('Sua conta foi criada')
  } catch {
    toast.error('Ops! Houve um erro ao criar sua conta')
  }
}

function resetForm () {
  Object.assign(registerForm, initialFormState())
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
