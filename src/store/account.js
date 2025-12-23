import { defineStore } from 'pinia'
import axios from 'axios'
import axiosDispatch from './axiosDispatch'
import { useChildsStore } from './childs'
import { useHistoricStore } from './historic'

const resposablePath = '/responsible'

const getDefaultState = () => {
  const saved = localStorage.getItem('iDealixLoggedPerson')
  return saved ? JSON.parse(saved) : { id: '', name: '', email: '', token: '' }
}

export const useAccountStore = defineStore('account', {
  state: () => getDefaultState(),

  getters: {
    isLoggedIn: (state) => !!state.token,
    getResponsibleData: (state) => state
  },

  actions: {
    async createAccount(params) {
      const { accepted, ...rest } = params
      return axiosDispatch({
        url: `${resposablePath}/register`,
        method: 'POST',
        data: rest
      })
    },

    async setLoggedPerson(params) {
      const { rememberme, ...data } = params

      const response = await axiosDispatch({
        url: resposablePath,
        method: 'POST',
        data: data
      })

      this.$patch({
        id: response.id,
        name: response.name,
        email: response.email,
        token: response.token
      })

      if (rememberme) {
        localStorage.setItem('iDealixLoggedPerson', JSON.stringify(this.$state))
      }

      return response
    },

    clearLoggedPerson() {
      // Limpa Headers e Storage
      delete axios.defaults.headers.common['Authorization']
      localStorage.removeItem('iDealixLoggedPerson')

      // Reseta o estado
      this.$reset()

      // Chama as outras stores para limpar dados relacionados
      const childsStore = useChildsStore()
      const historicStore = useHistoricStore()
      childsStore.clearChildsList()
      historicStore.clearCurrentChild()
    }
  }
})