import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify'
import axios from '@/plugins/axios'

import VueToast from 'vue-toast-notification'
import VueMoney from 'v-money3'
import Vuelidate from 'vuelidate'

import './styles/main.scss'

import UserAvatar from '@/components/UserAvatar'

const app = createApp(App)
const pinia = createPinia()

app.component('UserAvatar', UserAvatar)

app.use(pinia)
app.use(router)
app.use(axios, { router })
app.use(vuetify)
app.use(VueToast, { position: 'top-right' })
app.use(VueMoney)
app.use(Vuelidate)

app.config.globalProperties.$material = {
  locale: {
    dateFormat: 'dd/MM/yyyy',
    days: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    shortDays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    shorterDays: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    shortMonths: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    shorterMonths: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    cancel: 'Cancelar',
    confirm: 'Ok'
  }
}

app.mount('#app')
