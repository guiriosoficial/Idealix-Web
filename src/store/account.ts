import { defineStore } from 'pinia'
import { reactive, computed } from 'vue'
import axios from 'axios'
import axiosDispatch from './axiosDispatch'

import { useChildsStore } from './childs'
import { useHistoricStore } from './historic'

const resposablePath = '/responsible'

const initialState = () => {
  const saved = localStorage.getItem('iDealixLoggedPerson')
  return saved ? JSON.parse(saved) : { token: '', email: '', name: '', id: '' }
}

export const useAccountStore = defineStore('account', () => {
  const state = reactive(initialState())

  const isLoggedIn = computed(() => Boolean(state.token))
  const getResponsibleData = computed(() => state)

  async function createAccount(params) {
    const { accepted, ...rest } = params
    return axiosDispatch({
      url: `${resposablePath}/register`,
      method: 'POST',
      data: rest
    })
  }

  async function setLoggedPerson(params) {
    const { rememberme, ...data } = params

    const response = await axiosDispatch({
      url: resposablePath,
      method: 'POST',
      data: data
    })

    Object.assign(state, {
      id: response.id,
      name: response.name,
      email: response.email,
      token: response.token
    })

    if (rememberme) {
      localStorage.setItem('iDealixLoggedPerson', JSON.stringify(state))
    }

    return response
  }

  function reset() {
    Object.assign(state, initialState())
  }

  function clearLoggedPerson() {
    // Limpa Headers e Storage
    delete axios.defaults.headers.common['Authorization']
    localStorage.removeItem('iDealixLoggedPerson')

    // Reseta o estado
    reset()

    // Chama as outras stores para limpar dados relacionados
    const childsStore = useChildsStore()
    const historicStore = useHistoricStore()
    childsStore.clearChildsList()
    historicStore.clearCurrentChild()
  }

  return {
    isLoggedIn,
    getResponsibleData,
    createAccount,
    setLoggedPerson,
    clearLoggedPerson
  }
})
