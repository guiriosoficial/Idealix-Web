<template>
  <form
    class="login-view"
    novalidate
    @submit.prevent="doLogin">
    <h1 class="external-view__title">Login</h1>

    <md-field>
      <label for="email">E-mail</label>
      <md-input
        v-model="loginForm.email"
        id="email"
        name="email"
        type="email"
        autocomplete="email" />
    </md-field>

    <md-field>
      <label for="password">Senha</label>
      <md-input
        v-model="loginForm.password"
        id="password"
        name="password"
        type="password" />
    </md-field>

    <div class="external-view__submit">
      <md-checkbox
        v-model="loginForm.rememberme"
        class="md-raised md-primary">
        Lembre-se de mim
      </md-checkbox>
      <md-button
        class="md-raised md-primary"
        @click="doLogin">
        Entrar
      </md-button>
    </div>

    <span class="external-view__switch-link">
      Não possui uma conta?
      <router-link to="/register">Cadastre-se agora mesmo</router-link>
    </span>
  </form>
</template>

<script>
import { useAccountStore } from '@/store/account'
import { mapActions } from 'pinia'

export default {
  name: 'LoginView',
  data: () => ({
    loginForm: {
      email: '',
      password: '',
      rememberme: false
    }
  }),
  methods: {
    ...mapActions(useAccountStore, ['setLoggedPerson']),

    doLogin () {
      this.setLoggedPerson(this.loginForm)
        .then(res => {
          this.$router.push('dashboard')
        })
        .catch(err => {
          this.$toast.error('Ops! Houve uma falha ao fazer login')
          console.log(err)
        })
    }
  }
}
</script>
