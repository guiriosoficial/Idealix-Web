<template>
  <article>
    <v-form
      class="register-view"
      novalidate
      @submit.prevent="handleCreateAccount">
      <h1 class="external-view__title">Cadastre-se</h1>

        <v-text-field
          v-model="registerForm.name"
          id="name"
          name="name"
          label="Nome"
          autocomplete="name" />

        <v-text-field
          v-model="registerForm.email"
          id="email"
          label="E-mail"
          name="email"
          type="email"
          autocomplete="email" />

        <v-text-field
          v-model="registerForm.password"
          id="password"
          label="Senha"
          name="password"
          type="password" />

      <div class="external-view__submit">
        <v-checkbox
          v-model="registerForm.accepted"
        >
          <template v-slot:label>
            Li e aceito os <a @click="userTermsDialogVisible = true">Termos de Uso</a>
          </template>
        </v-checkbox>
        <v-btn
          class="md-raised md-primary"
          type="submit">
          Cadastrar
        </v-btn>
      </div>

      <span class="external-view__switch-link">
        Ja possui uma conta?
        <router-link to="/login">
          Clique aqui para acessar
        </router-link>
      </span>
    </v-form>

    <v-dialog v-model="userTermsDialogVisible">
      <v-card title="Termos de uso" text="Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Casamentiss faiz malandris se pirulitá. Aenean aliquam molestie leo, vitae iaculis nisl. Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget.
          Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis. Manduma pindureta quium dia nois paga. Suco de cevadiss deixa as pessoas mais interessantis. Quem manda na minha terra sou euzis!
          Mé faiz elementum girarzis, nisi eros vermeio. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Quem num gosta di mé, boa gentis num é.
          Per aumento de cachacis, eu reclamis. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.">
        <template v-slot:actions>
          <v-spacer />

          <v-btn
            class="md-primary"
            @click="userTermsDialogVisible = false">
            Ok
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </article>
</template>

<script>
import { mapActions } from 'pinia'
import { useAccountStore } from '@/store/account'

export default {
  name: 'RegisterView',
  data: () => ({
    registerForm: {
      name: '',
      email: '',
      password: '',
      accepted: false
    },
    userTermsDialogVisible: false
  }),
  methods: {
    ...mapActions(useAccountStore, ['createAccount']),

    handleCreateAccount () {
      this.createAccount(this.registerForm)
        .then(res => {
          this.registerForm = { name: '', email: '', password: '', accepted: false }
          this.$toast.success('Sua conta foi criada')
          this.$router.push('/login')
        })
        .catch(err => {
          // Ajustei para error (estava success no seu original)
          this.$toast.error('Ops! Houve um erro ao criar sua conta')
          console.log(err)
        })
    }
  }
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
