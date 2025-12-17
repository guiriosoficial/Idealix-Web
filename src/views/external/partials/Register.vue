<template>
  <article>
    <form
      class="register-view"
      novalidate
      @submit.prevent="handleCreateAccount">
      <h1 class="external-view__title">Cadastre-se</h1>

      <md-field>
        <label for="first-name">Nome</label>
        <md-input
          v-model="registerForm.name"
          id="name"
          name="name"
          autocomplete="name" />
      </md-field>

      <md-field>
        <label for="email">E-mail</label>
        <md-input
          v-model="registerForm.email"
          id="email"
          name="email"
          type="email"
          autocomplete="email" />
      </md-field>

      <md-field>
        <label for="password">Senha</label>
        <md-input
          v-model="registerForm.password"
          id="password"
          name="password"
          type="password" />
      </md-field>

      <div class="external-view__submit">
        <md-checkbox
          v-model="registerForm.accepted"
          class="md-raised md-primary">
          Li e aceito os
          <a @click="useTermsDialogVisible = true">Termos de Uso</a>
        </md-checkbox>
        <md-button
          class="md-raised md-primary"
          @click="handleCreateAccount">
          Cadastrar
        </md-button>
      </div>

      <span class="external-view__switch-link">
        Ja possui uma conta?
        <router-link to="/login">
          Clique aqui para acessar
        </router-link>
      </span>
    </form>

    <md-dialog :md-active.sync="useTermsDialogVisible">
      <md-dialog-title>Termos de uso</md-dialog-title>
      <md-content class="external-view__dialog_body md-scrollbar">
        <p class="external-view__body-text">
          Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Casamentiss faiz malandris se pirulitá. Aenean aliquam molestie leo, vitae iaculis nisl. Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget.
          Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis. Manduma pindureta quium dia nois paga. Suco de cevadiss deixa as pessoas mais interessantis. Quem manda na minha terra sou euzis!
          Mé faiz elementum girarzis, nisi eros vermeio. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Quem num gosta di mé, boa gentis num é.
          Per aumento de cachacis, eu reclamis. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.
        </p>
      </md-content>
      <md-dialog-actions>
        <md-button
          class="md-primary"
          @click="useTermsDialogVisible = false">
          Ok
        </md-button>
      </md-dialog-actions>
    </md-dialog>
  </article>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'RegisterView',
  data: () => ({
    registerForm: {
      name: '',
      email: '',
      password: '',
      accepted: false
    },
    useTermsDialogVisible: false
  }),
  methods: {
    ...mapActions(['createAccount']),

    handleCreateAccount () {
      this.createAccount(this.registerForm)
        .then(res => {
          this.registerForm = { name: '', email: '', password: '', accepted: false }
          this.$toast.success('Sua conta foi criada')
          this.$router.push('/login')
        })
        .catch(err => {
          this.$toast.success('Ops! Houve um erro ao criar sua conta')
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
